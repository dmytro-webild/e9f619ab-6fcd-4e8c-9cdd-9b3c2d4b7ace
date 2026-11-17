import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import ImageScrollParallax from "@/components/animation/ImageScrollParallax";
import SnellenbergWordRise from "@/components/kit/SnellenbergWordRise";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Photo = { imageSrc: string; imageAlt?: string; caption?: string };

type GalleryCornerMasksProps = {
  label?: string;
  title?: string;
  items?: Photo[];
  ariaLabel?: string;
  className?: string;
};

const px = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

const defaultItems: Photo[] = [
  { imageSrc: px(1813466), caption: "Morning regulars" },
  { imageSrc: px(357573) },
  { imageSrc: px(1267697), caption: "Friday crowd" },
  { imageSrc: px(1633578) },
  { imageSrc: px(4253312), caption: "At the pass" },
  { imageSrc: px(1565982) },
];

const ratios = ["aspect-[4/5]", "aspect-[1/1]", "aspect-[3/4]", "aspect-[4/3]", "aspect-[2/3]", "aspect-[5/6]"];

type TileProps = { item: Photo; index: number };

const Tile = ({ item, index }: TileProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "center 0.45"] });
  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(12% 12% 12% 12%)", "inset(0% 0% 0% 0%)"]);

  return (
    <li className="min-w-0">
      <motion.div ref={ref} style={{ clipPath: reduce ? "none" : clipPath }}>
        <ImageScrollParallax imageSrc={item.imageSrc} imageAlt={item.imageAlt ?? item.caption ?? ""} strength={0.12 + (index % 3) * 0.05} className={cn("rounded-[var(--radius-image)]", ratios[index % ratios.length])} />
      </motion.div>
      {item.caption && (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: kit.base, ease: kit.ease }}
          className="mt-3 font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] [overflow-wrap:anywhere] before:content-['/']"
        >
          {item.caption}
        </motion.p>
      )}
    </li>
  );
};

const GalleryCornerMasks = ({
  label = "Life at the corner",
  title = "Come for the buns, stay for the people",
  items = defaultItems,
  ariaLabel,
  className,
}: GalleryCornerMasksProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const [desktop, setDesktop] = useState(true);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const fast = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 880px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const count = Math.min(desktop ? 3 : 2, Math.max(items.length, 1));
  const columns = Array.from({ length: count }, (_, column) => items.map((item, index) => ({ item, index })).filter(({ index }) => index % count === column));

  return (
    <section ref={sectionRef} aria-label={ariaLabel ?? title ?? "Gallery"} className={cn("relative overflow-x-clip bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        {(label || title) && (
          <div className="mx-auto mb-[clamp(2rem,4vw,3.5rem)] flex max-w-[40rem] flex-col items-center gap-[clamp(0.75rem,1.4vw,1.25rem)] text-center">
            {label && (
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: kit.base, ease: kit.ease }}
                className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] before:content-['/']"
              >
                {label}
              </motion.p>
            )}
            {title && (
              <SnellenbergWordRise
                tag="h2"
                text={title}
                className="max-w-[14em] text-balance text-[length:var(--text-h1)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]"
              />
            )}
          </div>
        )}
        <div className={cn("grid items-start gap-[var(--gap)]", count === 1 ? "mx-auto max-w-[32rem] grid-cols-1" : count === 2 ? "grid-cols-2" : "grid-cols-3")}>
          {columns.map((column, columnIndex) => (
            <motion.ul key={columnIndex} style={{ y: reduce || columnIndex !== 1 ? 0 : fast }} className="flex min-w-0 flex-col gap-[var(--gap)]">
              {column.map(({ item, index }) => (
                <Tile key={index} item={item} index={index} />
              ))}
            </motion.ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryCornerMasks;
