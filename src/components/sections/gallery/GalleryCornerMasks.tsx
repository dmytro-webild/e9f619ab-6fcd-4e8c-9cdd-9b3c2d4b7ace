import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import ImageScrollParallax from "@/components/animation/ImageScrollParallax";
import SnellenbergWordRise from "@/components/kit/SnellenbergWordRise";
import { useLanguage } from "@/context/LanguageContext";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Photo = { imageSrc: string; imageAlt?: string; caption?: string };

type GalleryCornerMasksProps = {
  label?: string;
  title?: string;
  items?: Photo[];
  ariaLabel?: string;
  className?: string;
};

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
  label,
  title,
  items,
  ariaLabel,
  className,
}: GalleryCornerMasksProps) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const [desktop, setDesktop] = useState(true);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const fast = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  const displayLabel = label ?? t("gallery.label", "IL LOCALE");
  const displayTitle = title ?? t("gallery.title", "Il cortile coperto");

  const displayItems: Photo[] = items ?? [
    {
      imageSrc: "https://img.b2bpic.net/free-photo/closeup-shot-appetizing-burger-with-onion-rings_181624-46590.jpg?_wi=2",
      imageAlt: "Closeup shot of an appetizing burger with onion rings",
      caption: t("gallery.cap1", "I nostri burger e birre"),
    },
    {
      imageSrc: "https://img.b2bpic.net/free-photo/hand-holding-italian-cocktail-still-life_23-2150645773.jpg",
      imageAlt: "Hand holding italian cocktail still life",
      caption: t("gallery.cap2", "Aperitivo Aperol Spritz"),
    },
    {
      imageSrc: "https://img.b2bpic.net/free-photo/smiling-waitress-holding-tray_23-2147985012.jpg",
      imageAlt: "Smiling waitress holding tray",
      caption: t("gallery.cap3", "Ambiente accogliente"),
    },
    {
      imageSrc: "https://img.b2bpic.net/free-photo/medium-shot-smiley-women-with-drinks_23-2148947909.jpg",
      imageAlt: "Medium shot smiley women with drinks",
      caption: t("gallery.cap4", "Serate in compagnia"),
    },
    {
      imageSrc: "https://img.b2bpic.net/free-photo/meat-burger-tomato-cucumber-egg-coleslaw-lettuce-cheese-olives-side-view_141793-1801.jpg",
      imageAlt: "Meat burger tomato cucumber egg coleslaw lettuce cheese olives side view",
      caption: t("gallery.cap5", "Selezione carne dello chef"),
    },
    {
      imageSrc: "https://img.b2bpic.net/free-photo/hanging-lamp_1339-2398.jpg",
      imageAlt: "hanging lamp",
      caption: t("gallery.cap6", "Dettagli del locale"),
    },
  ];

  useEffect(() => {
    const query = window.matchMedia("(min-width: 880px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const count = Math.min(desktop ? 3 : 2, Math.max(displayItems.length, 1));
  const columns = Array.from({ length: count }, (_, column) => displayItems.map((item, index) => ({ item, index })).filter(({ index }) => index % count === column));

  return (
    <section ref={sectionRef} aria-label={ariaLabel ?? displayTitle ?? "Gallery"} className={cn("relative overflow-x-clip bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        {(displayLabel || displayTitle) && (
          <div className="mx-auto mb-[clamp(2rem,4vw,3.5rem)] flex max-w-[40rem] flex-col items-center gap-[clamp(0.75rem,1.4vw,1.25rem)] text-center">
            {displayLabel && (
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: kit.base, ease: kit.ease }}
                className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] text-accent before:content-['/']"
              >
                {displayLabel}
              </motion.p>
            )}
            {displayTitle && (
              <SnellenbergWordRise
                tag="h2"
                text={displayTitle}
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
