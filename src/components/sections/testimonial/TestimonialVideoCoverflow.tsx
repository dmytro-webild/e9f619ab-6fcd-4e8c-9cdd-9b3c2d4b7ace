import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import { useCoverNext } from "@/components/kit/sectionNeighbour";
import CoverflowTeam from "@/components/library/scenes/team/CoverflowTeam";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Testimonial = { name: string; caption?: string; quote?: string; imageSrc: string; videoSrc?: string; imageAlt?: string };

type TestimonialVideoCoverflowProps = {
  label?: string;
  title?: string;
  items?: Testimonial[];
  interval?: number;
  angle?: number;
  ariaLabel?: string;
  className?: string;
};

const photo = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&w=800`;

const defaultItems: Testimonial[] = [
  { name: "Clara", caption: "Clara fuels up right", quote: "The brunch stack is the best way to start a Saturday. I come back every week.", imageSrc: photo(774909) },
  { name: "Anna", caption: "Anna found her vibe", quote: "Warm buns, good coffee and a room full of people who look happy to be there.", imageSrc: photo(30567143) },
  { name: "Isabella", caption: "Isabella approves", quote: "I ordered one burger and left planning my next visit. Soft bun, crisp edges, perfect.", imageSrc: photo(15483629) },
  { name: "Emma", caption: "Emma is hooked on cold brew", quote: "Their cold brew is smooth and strong, and the staff remember my order.", imageSrc: photo(35018082) },
  { name: "Mia and Roy", caption: "Mia and Roy found their spot", quote: "We booked the baking workshop for a date night and it was the highlight of our month.", imageSrc: photo(1222271) },
];

const TestimonialVideoCoverflow = ({ label = "Social buzz", title = "What do people say about us?", items = defaultItems, interval = 6, angle = 36, ariaLabel, className }: TestimonialVideoCoverflowProps) => {
  const reduce = useReducedMotion() ?? false;
  const kit = useKitMotion();
  const list = items.slice(0, 12);
  const count = list.length;
  const words = title ? title.split(/\s+/) : [];
  const loop = count > 2;
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { amount: 0.4 });
  const [pos, setPos] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);
  const flow = useMotionValue(0);
  const active = count ? ((pos % count) + count) % count : 0;
  const { scrollYProgress: held } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const shade = useTransform(held, (p) => Math.min(1, Math.max(0, p / 0.5)) * 0.45);

  useCoverNext(sectionRef);

  useEffect(() => {
    if (reduce) {
      flow.set(pos);
      return;
    }
    const controls = animate(flow, pos, { duration: kit.slow, ease: kit.ease });
    return () => controls.stop();
  }, [pos, reduce, flow, kit.slow, kit.ease]);

  const step = (current: number, target: number) => {
    if (!loop) return ((target % count) + count) % count;
    const from = ((current % count) + count) % count;
    let delta = (((target - from) % count) + count) % count;
    if (delta > count / 2) delta -= count;
    return current + delta;
  };

  useEffect(() => {
    if (reduce || paused || !inView || count < 2 || interval <= 0) return;
    const id = window.setTimeout(() => setPos((p) => (loop ? p + 1 : (p + 1) % count)), interval * 1000);
    return () => window.clearTimeout(id);
  }, [reduce, paused, inView, count, interval, loop, pos, cycle]);

  const go = (index: number) => {
    setPos((p) => step(p, index));
    setCycle((c) => c + 1);
  };

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: "0.75rem" },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -10% 0px" },
    transition: { duration: kit.base, ease: kit.ease, delay },
  });

  if (!count) return null;

  const current = list[active] ?? list[0];
  const quoteWords = current.quote ? `“${current.quote}”`.split(/\s+/) : [];
  const timed = !reduce && !paused && inView && interval > 0;

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel ?? title ?? label ?? "Testimonials"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={cn("relative overflow-x-clip bg-background text-foreground lg:-mb-[100svh] lg:h-[200svh]", className)}
    >
      <div className="relative flex flex-col items-center justify-center gap-[clamp(1.25rem,3svh,2.5rem)] overflow-x-clip py-[var(--section-space)] lg:sticky lg:top-0 lg:h-svh lg:py-[clamp(2rem,6svh,4rem)]">
        <motion.div aria-hidden="true" style={{ opacity: shade }} className="pointer-events-none absolute inset-0 z-[30] hidden bg-black lg:block" />
        {(label || title) && (
          <div className="mx-auto flex w-[var(--container)] max-w-[48rem] flex-col items-center gap-[clamp(0.75rem,1.6vw,1.25rem)] text-center">
            {label && (
              <motion.p {...rise(0)} className="font-mono text-[length:var(--text-label)] uppercase leading-none tracking-[var(--label-tracking)] text-foreground before:content-['/']">
                {label}
              </motion.p>
            )}
            {title && (
              <h2 className="text-balance text-[length:var(--text-h1)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]">
                <div className="sr-only">{title}</div>
                <div aria-hidden="true">
                {words.map((word, i) => (
                  <div key={i} className={cn("-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom", i < words.length - 1 && "mr-[0.25em]")}>
                    <motion.div
                      initial={reduce ? false : { y: "110%" }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                      transition={{ duration: kit.base, ease: kit.ease, delay: 0.05 + i * 0.05 }}
                      className="inline-block"
                    >
                      {word}
                    </motion.div>
                  </div>
                ))}
                </div>
              </h2>
            )}
          </div>
        )}

        <motion.div
          ref={stageRef}
          {...rise(0.15)}
          onPanEnd={(_, info) => {
            if (info.offset.x < -40) go(active + 1);
            else if (info.offset.x > 40) go(active - 1);
          }}
          aria-roledescription="carousel"
          className="w-full touch-pan-y select-none"
        >
          <CoverflowTeam
            angle={angle}
            flowProgress={flow}
            flowOnReducedMotion
            flowLoop
            className="h-[clamp(22rem,108vw,30rem)] lg:h-[clamp(20rem,46svh,34rem)]"
            stageClassName="aspect-[3/5] h-full"
            cardClassName="rounded-[calc(var(--radius)*3)] bg-sand"
            items={list.map((item) => ({ imageSrc: item.imageSrc, videoSrc: item.videoSrc, imageAlt: item.imageAlt ?? item.caption ?? item.name }))}
          />
        </motion.div>

        <div className="mx-auto flex w-[var(--container)] max-w-[36rem] flex-col items-center gap-[clamp(1rem,2.4svh,1.5rem)] text-center">
          <div className="grid w-full">
            <div aria-hidden="true" className="invisible col-start-1 row-start-1 grid">
              {list.map((item, index) => (
                <div key={index} className="col-start-1 row-start-1 flex flex-col items-center gap-[0.875rem]">
                  {item.quote && <p className="text-balance font-[family-name:var(--font-heading)] text-[length:var(--text-h3)] leading-[1.2] [overflow-wrap:anywhere]">{`“${item.quote}”`}</p>}
                  <div className="flex flex-col items-center gap-[0.5rem]">
                    <p className="text-[length:var(--text-body)] font-medium leading-[1.3]">{item.name}</p>
                    {item.caption && <p className="font-mono text-[length:var(--text-small)] uppercase leading-none tracking-[var(--label-tracking)] before:content-['/']">{item.caption}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div aria-live="polite" className="col-start-1 row-start-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={active}
                  initial={reduce ? false : "enter"}
                  animate="show"
                  exit="leave"
                  variants={{ leave: { opacity: 0, transition: { duration: kit.fast } } }}
                  className="flex flex-col items-center gap-[0.875rem]"
                >
                  {current.quote && (
                    <blockquote className="text-balance font-[family-name:var(--font-heading)] text-[length:var(--text-h3)] leading-[1.2] [overflow-wrap:anywhere]">
                      <p className="sr-only">{current.quote}</p>
                      {quoteWords.map((word, i) => (
                        <div key={i} aria-hidden="true" className={cn("-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom", i < quoteWords.length - 1 && "mr-[0.25em]")}>
                          <motion.div
                            variants={{ enter: { y: "110%" }, show: { y: 0, transition: { duration: kit.base, ease: kit.ease, delay: i * 0.03 } } }}
                            className="inline-block"
                          >
                            {word}
                          </motion.div>
                        </div>
                      ))}
                    </blockquote>
                  )}
                  <figcaption className="flex flex-col items-center gap-[0.5rem]">
                    <motion.p
                      variants={{ enter: { opacity: 0, y: "0.5em" }, show: { opacity: 1, y: 0, transition: { duration: kit.base, ease: kit.ease, delay: 0.2 } } }}
                      className="text-[length:var(--text-body)] font-medium leading-[1.3]"
                    >
                      {current.name}
                    </motion.p>
                    {current.caption && (
                      <motion.p
                        variants={{ enter: { opacity: 0, y: "0.5em" }, show: { opacity: 1, y: 0, transition: { duration: kit.base, ease: kit.ease, delay: 0.28 } } }}
                        className="font-mono text-[length:var(--text-small)] uppercase leading-none tracking-[var(--label-tracking)] text-muted-foreground before:content-['/']"
                      >
                        {current.caption}
                      </motion.p>
                    )}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>

          {count > 1 && (
            <div className="flex w-full max-w-[20rem] gap-[0.5rem]">
              {list.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show review ${index + 1} from ${item.name}`}
                  aria-current={index === active}
                  onClick={() => go(index)}
                  className="relative h-[1.5rem] flex-1 cursor-pointer"
                >
                  <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-foreground/20" />
                  {index === active && (
                    <motion.div
                      key={`${active}-${cycle}-${timed}`}
                      initial={{ scaleX: timed ? 0 : 1 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: timed ? interval : 0, ease: "linear" }}
                      className="absolute inset-x-0 top-1/2 -mt-px h-[2px] origin-left rounded-full bg-foreground"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialVideoCoverflow;
