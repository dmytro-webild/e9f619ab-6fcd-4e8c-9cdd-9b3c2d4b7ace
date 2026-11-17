import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QrCode, X, ExternalLink, Smartphone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { generateQRCodeMatrix } from "@/utils/qrCodeGenerator";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export type QRCodeFooterBadgeProps = {
  className?: string;
  menuUrl?: string;
};

export default function QRCodeFooterBadge({
  className,
  menuUrl = "#menu",
}: QRCodeFooterBadgeProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Full URL for QR Code scanner resolution
  const targetUrl = useMemo(() => {
    if (typeof window !== "undefined" && menuUrl.startsWith("#")) {
      return `${window.location.origin}${window.location.pathname}${menuUrl}`;
    }
    return menuUrl.startsWith("http") ? menuUrl : "https://spritzandburgerdesenzano.it/#menu";
  }, [menuUrl]);

  // Generate 2D QR matrix dynamically
  const matrix = useMemo(() => {
    try {
      return generateQRCodeMatrix(targetUrl);
    } catch {
      // Fallback matrix if generator fails
      return generateQRCodeMatrix("https://spritzandburgerdesenzano.it/#menu");
    }
  }, [targetUrl]);

  const matrixSize = matrix.length;

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.01, y: -2 }}
        className={cn(
          "group relative flex flex-col items-center justify-between rounded-2xl bg-card border border-border/80 p-5 shadow-md transition-all duration-300 hover:border-accent/50 hover:shadow-lg max-w-[22rem]",
          className
        )}
      >
        {/* Header Label */}
        <div className="w-full flex items-center justify-between mb-3 border-b border-border/50 pb-2.5">
          <div className="flex items-center gap-2">
            <QrCode className="size-4 text-accent" />
            <span className="font-heading text-[length:var(--text-small)] font-bold text-foreground">
              {t("qr.title", "Menu Digitale QR")}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent border border-accent/20 px-2.5 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-wider">
            {t("qr.badge", "MENU ONLINE")}
          </span>
        </div>

        {/* Classic Functional Black & White QR Code */}
        <div
          onClick={() => setIsOpen(true)}
          className="relative my-2 flex cursor-pointer items-center justify-center rounded-xl bg-white p-4 shadow-sm border border-border transition-transform duration-200 group-hover:scale-105"
          title={t("qr.clickToEnlarge", "Clicca per ingrandire")}
        >
          <svg
            viewBox={`0 0 ${matrixSize + 4} ${matrixSize + 4}`}
            className="size-36 w-36 h-36 shrink-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="crispEdges"
          >
            {/* White quiet zone */}
            <rect width={matrixSize + 4} height={matrixSize + 4} fill="#FFFFFF" />

            {/* Matrix modules */}
            {matrix.map((row, r) =>
              row.map((cell, c) =>
                cell ? (
                  <rect
                    key={`${r}-${c}`}
                    x={c + 2}
                    y={r + 2}
                    width={1}
                    height={1}
                    fill="#000000"
                  />
                ) : null
              )
            )}
          </svg>

          {/* Hover indicator overlay */}
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span className="rounded-full bg-white px-3 py-1 font-mono text-[0.7rem] font-bold text-black shadow-sm">
              🔍 {t("qr.clickToEnlarge", "Ingrandisci")}
            </span>
          </div>
        </div>

        {/* Text Caption & Scan Hint */}
        <div className="w-full text-center mt-2">
          <p className="font-sans text-[length:var(--text-small)] font-medium text-foreground">
            {t("qr.subtitle", "Scansiona per consultare il menu completo dal tuo smartphone")}
          </p>
          <div className="mt-2 flex items-center justify-center gap-1.5 font-mono text-[0.725rem] text-muted-foreground">
            <Smartphone className="size-3.5 text-accent" />
            <span>{t("qr.scanHint", "Inquadra il codice con la fotocamera")}</span>
          </div>
        </div>

        {/* Direct Link Action */}
        <a
          href={menuUrl}
          className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground py-2 px-3 font-mono text-[0.75rem] font-medium transition-colors border border-border/60"
        >
          <span>{t("qr.directLink", "Apri Menu direttamente")}</span>
          <ExternalLink className="size-3.5 opacity-70" />
        </a>
      </motion.div>

      {/* Modal Preview for Scanning on Desktop */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm rounded-2xl bg-card border border-border p-6 text-foreground shadow-2xl flex flex-col items-center text-center"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-muted text-foreground hover:bg-muted/80 transition-colors"
                aria-label={t("qr.closeModal", "Chiudi")}
              >
                <X className="size-4" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <QrCode className="size-5 text-accent" />
                <h3 className="font-heading text-[length:var(--text-h3)] font-bold">
                  {t("qr.title", "Menu Digitale QR")}
                </h3>
              </div>

              <p className="font-sans text-[length:var(--text-small)] text-muted-foreground mb-4">
                {t("qr.subtitle", "Scansiona il QR code per consultare il menu digitale")}
              </p>

              {/* High-res Classic Black & White QR */}
              <div className="rounded-xl bg-white p-5 shadow-md border border-border my-2">
                <svg
                  viewBox={`0 0 ${matrixSize + 4} ${matrixSize + 4}`}
                  className="size-56 w-56 h-56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  shapeRendering="crispEdges"
                >
                  <rect width={matrixSize + 4} height={matrixSize + 4} fill="#FFFFFF" />
                  {matrix.map((row, r) =>
                    row.map((cell, c) =>
                      cell ? (
                        <rect
                          key={`${r}-${c}`}
                          x={c + 2}
                          y={r + 2}
                          width={1}
                          height={1}
                          fill="#000000"
                        />
                      ) : null
                    )
                  )}
                </svg>
              </div>

              <div className="mt-4 flex flex-col gap-2 w-full">
                <a
                  href={menuUrl}
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full inline-flex items-center justify-center gap-2"
                >
                  <ExternalLink className="size-4" />
                  <span className="btn-label">{t("qr.openMenu", "Apri Menu Digitale")}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary w-full"
                >
                  <span className="btn-label">{t("qr.closeModal", "Chiudi")}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
