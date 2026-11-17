/**
 * Pure TypeScript QR Code generator implementation (ISO/IEC 18004 compliant).
 * Generates exact, classic, functional 2D QR Code matrices.
 */

// GF(256) tables with primitive polynomial 0x11D (285)
const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256);

let x = 1;
for (let i = 0; i < 255; i++) {
  EXP_TABLE[i] = x;
  LOG_TABLE[x] = i;
  x <<= 1;
  if (x & 256) {
    x ^= 285;
  }
}
for (let i = 255; i < 512; i++) {
  EXP_TABLE[i] = EXP_TABLE[i - 255];
}

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return EXP_TABLE[LOG_TABLE[a] + LOG_TABLE[b]];
}

function rsPolyMul(p1: number[], p2: number[]): number[] {
  const result = new Array(p1.length + p2.length - 1).fill(0);
  for (let i = 0; i < p1.length; i++) {
    for (let j = 0; j < p2.length; j++) {
      result[i + j] ^= gfMul(p1[i], p2[j]);
    }
  }
  return result;
}

function rsGeneratorPoly(degree: number): number[] {
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    poly = rsPolyMul(poly, [1, EXP_TABLE[i]]);
  }
  return poly;
}

function calculateECC(data: number[], eccCount: number): number[] {
  const gen = rsGeneratorPoly(eccCount);
  const res = new Array(data.length + eccCount).fill(0);
  for (let i = 0; i < data.length; i++) {
    res[i] = data[i];
  }

  for (let i = 0; i < data.length; i++) {
    const coef = res[i];
    if (coef !== 0) {
      for (let j = 0; j < gen.length; j++) {
        res[i + j] ^= gfMul(gen[j], coef);
      }
    }
  }
  return res.slice(data.length);
}

// Version configs for Error Correction Level L
type VersionConfig = {
  version: number;
  size: number;
  dataCap: number;
  eccCap: number;
  alignments: number[];
};

const VERSIONS: VersionConfig[] = [
  { version: 1, size: 21, dataCap: 19, eccCap: 7, alignments: [] },
  { version: 2, size: 25, dataCap: 34, eccCap: 10, alignments: [6, 18] },
  { version: 3, size: 29, dataCap: 55, eccCap: 15, alignments: [6, 22] },
  { version: 4, size: 33, dataCap: 80, eccCap: 20, alignments: [6, 26] },
  { version: 5, size: 37, dataCap: 108, eccCap: 26, alignments: [6, 30] },
  { version: 6, size: 41, dataCap: 136, eccCap: 36, alignments: [6, 34] },
];

export function generateQRCodeMatrix(text: string): boolean[][] {
  const bytes = new TextEncoder().encode(text);

  // Select minimum QR version that fits the text
  // 4 bits mode + 8 bits length + 8*bytes.length bits
  const neededDataBytes = bytes.length + 2;
  const cfg = VERSIONS.find((v) => v.dataCap >= neededDataBytes) || VERSIONS[VERSIONS.length - 1];

  const size = cfg.size;

  // 1. Bitstream construction (Byte mode)
  const bitBuffer: number[] = [];
  const pushBits = (val: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) {
      bitBuffer.push((val >> i) & 1);
    }
  };

  // Mode: 0100 (Byte mode)
  pushBits(0b0100, 4);
  // Character count (8 bits for versions 1-9)
  pushBits(bytes.length, 8);
  // Data bytes
  for (let i = 0; i < bytes.length; i++) {
    pushBits(bytes[i], 8);
  }
  // Terminator
  const maxBits = cfg.dataCap * 8;
  const termLen = Math.min(4, maxBits - bitBuffer.length);
  pushBits(0, termLen);

  // Pad to byte boundary
  while (bitBuffer.length % 8 !== 0) {
    bitBuffer.push(0);
  }

  // Pad bytes 0xEC and 0x11
  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bitBuffer.length < maxBits) {
    pushBits(padBytes[padIdx % 2], 8);
    padIdx++;
  }

  // Convert bitBuffer to byte array
  const dataBytes: number[] = [];
  for (let i = 0; i < bitBuffer.length; i += 8) {
    let byteVal = 0;
    for (let j = 0; j < 8; j++) {
      byteVal = (byteVal << 1) | bitBuffer[i + j];
    }
    dataBytes.push(byteVal);
  }

  // ECC generation
  const eccBytes = calculateECC(dataBytes, cfg.eccCap);
  const totalCodewords = [...dataBytes, ...eccBytes];

  // 2. Matrix allocation
  const grid: (boolean | null)[][] = Array.from({ length: size }, () => Array(size).fill(null));
  const isReserved: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  const markReserved = (r: number, c: number, val: boolean) => {
    if (r >= 0 && r < size && c >= 0 && c < size) {
      grid[r][c] = val;
      isReserved[r][c] = true;
    }
  };

  // Draw Finder Pattern (7x7)
  const drawFinder = (top: number, left: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const nr = top + r;
        const nc = left + c;
        if (nr < 0 || nr >= size || nc < 0 || nc >= size) continue;
        const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
        const isCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        const isQuiet = r === -1 || r === 7 || c === -1 || c === 7;
        markReserved(nr, nc, !isQuiet && (isBorder || isCenter));
      }
    }
  };

  // 3. Place Function Patterns
  // Finders
  drawFinder(0, 0);
  drawFinder(0, size - 7);
  drawFinder(size - 7, 0);

  // Alignment patterns
  const aligns = cfg.alignments;
  for (const r of aligns) {
    for (const c of aligns) {
      // Skip if overlaps finder pattern
      if (
        (r < 9 && c < 9) ||
        (r < 9 && c >= size - 9) ||
        (r >= size - 9 && c < 9)
      ) {
        continue;
      }
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const isBorder = Math.abs(dr) === 2 || Math.abs(dc) === 2;
          const isCenter = dr === 0 && dc === 0;
          markReserved(r + dr, c + dc, isBorder || isCenter);
        }
      }
    }
  }

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    if (!isReserved[6][i]) markReserved(6, i, i % 2 === 0);
    if (!isReserved[i][6]) markReserved(i, 6, i % 2 === 0);
  }

  // Dark module
  markReserved(4 * cfg.version + 9, 8, true);

  // Reserve format info areas
  for (let i = 0; i < 9; i++) {
    if (!isReserved[8][i]) markReserved(8, i, false);
    if (!isReserved[i][8]) markReserved(i, 8, false);
  }
  for (let i = size - 8; i < size; i++) {
    if (!isReserved[8][i]) markReserved(8, i, false);
    if (!isReserved[i][8]) markReserved(i, 8, false);
  }

  // 4. Data placement (zigzag scan)
  const allBits: number[] = [];
  for (const b of totalCodewords) {
    for (let i = 7; i >= 0; i--) {
      allBits.push((b >> i) & 1);
    }
  }

  let bitIdx = 0;
  let dir = -1; // up = -1, down = 1
  let col = size - 1;

  while (col > 0) {
    if (col === 6) col--; // skip timing column

    const rowStart = dir === -1 ? size - 1 : 0;
    const rowEnd = dir === -1 ? -1 : size;

    for (let r = rowStart; r !== rowEnd; r += dir) {
      for (let cOffset = 0; cOffset < 2; cOffset++) {
        const c = col - cOffset;
        if (!isReserved[r][c]) {
          const bitVal = bitIdx < allBits.length ? allBits[bitIdx++] === 1 : false;
          grid[r][c] = bitVal;
        }
      }
    }

    dir = -dir;
    col -= 2;
  }

  // 5. Apply Mask 0 ( (row + col) % 2 === 0 )
  // Mask pattern 0 works well for standard URLs
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!isReserved[r][c]) {
        if ((r + c) % 2 === 0) {
          grid[r][c] = !grid[r][c];
        }
      }
    }
  }

  // 6. Write Format Info (EC Level L = 01, Mask = 000 -> Format = 0b01000 = 8)
  // Format code with BCH (15,5) error correction & XOR mask 0x5412
  // EC Level L (01) + Mask 0 (000) => 0b01000 = 8
  // BCH(15,5) for 8: 8 << 10 = 8192 => remainder by 0x537 is 0x0C7
  // Format info = (8 << 10) | 0x0C7 = 0x20C7 ^ 0x5412 = 0x74D5
  const formatInfo = 0x74d5;

  const formatBits: boolean[] = [];
  for (let i = 14; i >= 0; i--) {
    formatBits.push(((formatInfo >> i) & 1) === 1);
  }

  // Top-left finder format placement
  const formatPosTL: [number, number][] = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8],
    [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8],
  ];

  for (let i = 0; i < 15; i++) {
    const [r, c] = formatPosTL[i];
    grid[r][c] = formatBits[i];
  }

  // Bottom-left / Top-right finder format placement
  const formatPosOther: [number, number][] = [
    [size - 1, 8], [size - 2, 8], [size - 3, 8], [size - 4, 8], [size - 5, 8], [size - 6, 8], [size - 7, 8],
    [8, size - 8], [8, size - 7], [8, size - 6], [8, size - 5], [8, size - 4], [8, size - 3], [8, size - 2], [8, size - 1],
  ];

  for (let i = 0; i < 15; i++) {
    const [r, c] = formatPosOther[i];
    grid[r][c] = formatBits[i];
  }

  // Convert (boolean | null)[][] to boolean[][]
  return grid.map((row) => row.map((cell) => cell === true));
}
