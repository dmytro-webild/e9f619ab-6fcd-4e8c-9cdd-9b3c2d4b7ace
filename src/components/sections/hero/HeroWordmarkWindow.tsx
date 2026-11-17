import { Fragment, useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useCoverNext } from "@/components/kit/sectionNeighbour";
import { MotionMedia } from "@/components/kit/Media";

type Cta = { text: string; href?: string };

type HeroWordmarkWindowProps = {
  title?: string;
  description?: string;
  primaryButton?: Cta;
  imageSrc?: string;
  imageAlt?: string;
  leftLabel?: string;
  rightLabel?: string;
  marquee?: string[];
  introDelay?: number;
  handoff?: boolean;
  ariaLabel?: string;
};

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

const STRIPES = {
  backgroundImage: "repeating-linear-gradient(to right, var(--border) 0 1px, transparent 1px 2.25rem)",
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const HeroWordmarkWindow = ({
  title = "Crumb & Butter",
  description = "All-day brunch and smash burgers on a Chicago corner, made from scratch every morning.",
  primaryButton,
  imageSrc = "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1600",
  imageAlt = "",
  leftLabel = "/Serving since 2012",
  rightLabel = "/Scroll down",
  marquee = ["Bun", "Based in Chicago", "Your corner for crispiness"],
  introDelay = 0,
  handoff = false,
  ariaLabel,
}: HeroWordmarkWindowProps) => {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  useCoverNext(ref);
  const reduce = !!useReducedMotion();
  const live = !reduce;

  const top = useMotionValue(40);
  const slit = useMotionValue(live ? 50 : 0);

  useEffect(() => {
    const stage = stageRef.current;
    const head = headRef.current;
    if (!stage || !head) return;
    const measure = () => {
      if (stage.offsetHeight) top.set((head.offsetHeight / stage.offsetHeight) * 100);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(head);
    return () => observer.disconnect();
  }, [top]);

  useEffect(() => {
    if (!live) {
      slit.set(0);
      return;
    }
    const control = animate(slit, 0, { duration: 1.1, ease: EASE_IN_OUT, delay: handoff ? Math.max(introDelay - 0.6, 0) : introDelay + 0.35 });
    return () => control.stop();
  }, [live, introDelay, handoff, slit]);

  const { scrollYProgress: pin } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const grow = useTransform(pin, (v) => (live ? clamp01(v / 0.4) : 0));
  const clip = useTransform(() => {
    const g = grow.get();
    const t = top.get() * (1 - g);
    const h = 100 - t;
    const s = slit.get();
    return `inset(${t + (h * s) / 100}% 0% ${(h * s) / 100}% 0%)`;
  });
  const imageY = useTransform(pin, (v) => (live ? `${-v * 7}%` : "0%"));
  const imageScale = useTransform(grow, (g) => 1.12 - 0.12 * g);
  const headOpacity = useTransform(grow, (g) => 1 - clamp01(g * 1.4));
  const headY = useTransform(grow, (g) => `${-g * 4}rem`);
  const shade = useTransform(pin, (v) => (live ? clamp01((v - 0.35) / 0.65) * 0.35 : 0));

  const words = title.trim().split(/\s+/);
  const line = `${marquee.join(" // ")} //`;
  const rise = (delay: number) =>
    live
      ? { initial: { opacity: 0, y: "0.75rem" }, animate: { opacity: 1, y: "0rem" }, transition: { duration: 0.9, ease: EASE_OUT, delay } }
      : {};
  const textAt = handoff ? Math.max(introDelay - 0.45, 0) : introDelay + 0.35;

  return (
    <section ref={ref} aria-label={ariaLabel || "Hero section"} className={live ? "relative -mb-[100svh] h-[240svh]" : "relative h-svh"}>
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden bg-background text-foreground">
        <div ref={stageRef} className="relative flex min-h-0 flex-1 flex-col">
          <div aria-hidden="true" style={STRIPES} className="pointer-events-none absolute inset-0" />

          <motion.div
            ref={headRef}
            style={live ? { opacity: headOpacity, y: headY } : undefined}
            className="relative z-[1] flex flex-col items-center pb-[clamp(1.5rem,4svh,3rem)] pt-[clamp(5.5rem,13svh,8.5rem)] text-center"
          >
            <h1
              data-hero-title
              aria-label={title}
              className="w-[var(--container)] text-balance text-center font-[family-name:var(--font-heading)] text-[length:var(--text-display)] leading-[0.9] tracking-[var(--heading-tracking)] text-primary [font-weight:var(--heading-weight)]"
            >
              {words.map((word, i) => (
                <Fragment key={`${i}-${word}`}>
                  {i > 0 && " "}
                  <div aria-hidden="true" className="inline-flex overflow-hidden pb-[0.22em] -mb-[0.22em] align-top">
                    <motion.div
                      initial={live && !handoff ? { y: "135%" } : false}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, ease: EASE_OUT, delay: introDelay + i * 0.05 }}
                      className="inline-block"
                    >
                      {word}
                    </motion.div>
                  </div>
                </Fragment>
              ))}
            </h1>
            {description && (
              <motion.p
                {...rise(textAt)}
                className="mt-[clamp(0.75rem,2.5svh,1.5rem)] w-[min(var(--container),27rem)] text-balance text-[length:var(--text-body-lg)] leading-[1.45] text-muted-foreground"
              >
                {description}
              </motion.p>
            )}
            {primaryButton && (
              <motion.div {...rise(textAt + 0.1)} className="mt-[clamp(1rem,2.5svh,1.5rem)]">
                <a href={primaryButton.href ?? "#"} className="btn-primary">
                  <p className="btn-label">{primaryButton.text}</p>
                </a>
              </motion.div>
            )}
          </motion.div>

          <motion.div style={{ clipPath: clip }} className="absolute inset-0 z-[5] overflow-hidden bg-tint-1">
            <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform">
              <MotionMedia
                src={imageSrc}
                alt={imageAlt}
                aria-hidden={imageAlt === ""}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                animate={live ? { transform: ["scale(1)", "scale(1.06)", "scale(1)"] } : undefined}
                transition={{ duration: 28, ease: "linear", repeat: Infinity }}
                className="size-full object-cover"
              />
            </motion.div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-linear-to-t from-black/45 to-transparent" />
            <div className="absolute bottom-0 left-1/2 flex w-[var(--container)] -translate-x-1/2 items-end justify-between gap-[1rem] pb-[clamp(1.5rem,4svh,2.75rem)] font-mono text-[length:var(--text-label)] uppercase leading-none tracking-[var(--label-tracking)] text-white">
              <p>{leftLabel}</p>
              <p>{rightLabel}</p>
            </div>
          </motion.div>
        </div>

        {live && <motion.div aria-hidden="true" style={{ opacity: shade }} className="pointer-events-none absolute inset-0 z-[8] bg-black" />}
      </div>

      <div className={live ? "absolute inset-x-0 top-[140svh] z-[9] -translate-y-full overflow-hidden border-b border-border bg-background py-[1.1rem] text-primary" : "relative overflow-hidden border-b border-border bg-background py-[1.1rem] text-primary"}>
        <p className="sr-only">{line}</p>
        <motion.div
          aria-hidden="true"
          animate={live ? { transform: ["translateX(0%)", "translateX(-50%)"] } : undefined}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="flex w-max"
        >
          {Array.from({ length: 8 }, (_, i) => (
            <p key={i} className="shrink-0 whitespace-nowrap pr-[2em] font-mono text-[length:var(--text-label)] uppercase leading-none tracking-[0.08em] [word-spacing:0.6em]">
              {line}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroWordmarkWindow;
