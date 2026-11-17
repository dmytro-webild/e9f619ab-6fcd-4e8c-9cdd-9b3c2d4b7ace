import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import HorizontalScrollSection from "@/components/animation/HorizontalScrollSection";
import SnellenbergWordRise from "@/components/kit/SnellenbergWordRise";
import { useImageReady, useKitMotion } from "@/components/kit/kitMotion";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Dish = { name: string; price?: string; imageSrc: string; imageAlt?: string };

type ProductBestsellerTrackProps = {
  label?: string;
  title?: string;
  items?: Dish[];
  button?: { text: string; href?: string };
  ariaLabel?: string;
  className?: string;
};

const px = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

const DEFAULT_ITEMS: Dish[] = [
  { name: "Double smash", price: "$16", imageSrc: px(1639557) },
  { name: "Grain bowl", price: "$14", imageSrc: px(1640777) },
  { name: "Honey stack", price: "$12", imageSrc: px(357573) },
  { name: "Burger and fries", price: "$18", imageSrc: px(3219547) },
  { name: "Green bowl", price: "$13", imageSrc: px(1410235) },
  { name: "Loaded fries", price: "$8", imageSrc: px(1893555) },
];

const DishCard = ({ item, index, trackX }: { item: Dish; index: number; trackX: MotionValue<number> }) => {
  const ref = useRef<HTMLDivElement>(null);
  const geo = useRef({ center: 0, half: 1 });
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const inView = useInView(ref, { once: true });
  const ready = useImageReady(ref, inView);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      geo.current = { center: el.offsetLeft + el.offsetWidth / 2, half: Math.max(1, window.innerWidth / 2) };
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const offset = useTransform(trackX, (x) => {
    const { center, half } = geo.current;
    return Math.max(-1, Math.min(1, (center + x - half) / half));
  });
  const rotateY = useTransform(offset, (o) => -12 * Math.sin((o * Math.PI) / 2));
  const scale = useTransform(offset, (o) => 1 - 0.06 * o * o);
  const originX = useTransform(offset, (o) => (o > 0 ? 0 : 1));

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={inView && ready ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: kit.base, ease: kit.ease, delay: Math.min(index, 5) * 0.06 }}
      style={reduce ? undefined : { rotateY, scale, originX, transformPerspective: 1400 }}
      className="w-[min(68vw,20rem)] lg:w-[min(24vw,calc(100svh-22rem))]"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-image)] bg-muted">
        <Media src={item.imageSrc} alt={item.imageAlt ?? item.name} loading="lazy" decoding="async" draggable={false} className="absolute inset-0 size-full object-cover" />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <p className="min-w-0 font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] text-foreground [overflow-wrap:anywhere] before:content-['/']">{item.name}</p>
        {item.price && <p className="shrink-0 font-mono text-[length:var(--text-label)] text-muted-foreground">{item.price}</p>}
      </div>
    </motion.div>
  );
};

const ProductBestsellerTrack = ({
  label = "/Our bestsellers",
  title = "The corner that is always up to something in the most delicious way",
  items = DEFAULT_ITEMS,
  button = { text: "View food menu", href: "#menu" },
  ariaLabel,
  className,
}: ProductBestsellerTrackProps) => {
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const trackX = useMotionValue(0);

  const header = (
    <div className="mx-auto flex max-w-[48rem] flex-col items-center gap-4 text-center">
      {label && (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: kit.base, ease: kit.ease }}
          className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] text-foreground"
        >
          {label}
        </motion.p>
      )}
      {title && (
        <SnellenbergWordRise
          tag="h2"
          text={title}
          className="text-balance text-[length:var(--text-h1)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] text-foreground [font-family:var(--font-heading)] [font-weight:var(--heading-weight)]"
        />
      )}
    </div>
  );

  return (
    <section aria-label={ariaLabel ?? title ?? "Bestsellers"} className={cn("relative overflow-x-clip bg-background pb-[var(--section-space)] text-foreground", className)}>
      <HorizontalScrollSection header={header} progress={false} compact x={trackX} trackClassName="gap-[var(--gap)] py-6 lg:gap-[clamp(1.5rem,2.5vw,2.5rem)]">
        {items.map((item, index) => (
          <DishCard key={index} item={item} index={index} trackX={trackX} />
        ))}
      </HorizontalScrollSection>
      {button?.text && (
        <div className="mx-auto mt-[clamp(1.5rem,3vw,3rem)] flex w-[var(--container)] justify-center">
          <a href={button.href ?? "#"} className="btn-secondary border border-foreground bg-transparent">
            {button.text}
          </a>
        </div>
      )}
    </section>
  );
};

export default ProductBestsellerTrack;
