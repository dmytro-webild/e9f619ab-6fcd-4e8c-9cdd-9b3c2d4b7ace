import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import DepthTiltCard from "@/components/library/effects/DepthTiltCard";
import SnellenbergWordRise from "@/components/kit/SnellenbergWordRise";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Ticket = {
  label?: string;
  name: string;
  price?: string;
  period?: string;
  features?: string[];
  cta?: { text: string; href?: string };
  featured?: boolean;
};

type PricingWorkshopTicketsProps = {
  label?: string;
  title?: string;
  description?: string;
  featuredTag?: string;
  items?: Ticket[];
  ariaLabel?: string;
  className?: string;
};

const DEFAULT_ITEMS: Ticket[] = [
  { label: "Saturday class", name: "Burger Lab", price: "$65", period: "per person", features: ["Two hours with our chef", "Your own smash burger", "A drink on us"], cta: { text: "Book a seat", href: "#" } },
  { label: "Weekend table", name: "Brunch Feast", price: "$48", period: "per person", features: ["Four shared courses", "Bottomless coffee", "Seats up to ten"], cta: { text: "Book a table", href: "#" }, featured: true },
  { label: "Morning class", name: "Laminated Dough", price: "$80", period: "per person", features: ["Croissants from scratch", "Take home a dozen", "Small groups of eight"], cta: { text: "Book a seat", href: "#" } },
];

const ease = [0.22, 1, 0.36, 1] as const;

const PricingWorkshopTickets = ({
  label = "Workshops",
  title = "Workshops and set menus",
  description = "Pull up a stool, roll up your sleeves, then eat what you made.",
  featuredTag = "/Most booked",
  items = DEFAULT_ITEMS,
  ariaLabel,
  className,
}: PricingWorkshopTicketsProps) => {
  const reduce = useReducedMotion();

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative z-10 bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="mx-auto mb-[clamp(1.5rem,3vw,3rem)] flex max-w-[44rem] flex-col items-center gap-4 text-center">
          {label && <p className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)]">{label}</p>}
          <SnellenbergWordRise tag="h2" text={title} className="text-balance text-[length:var(--text-h1)]" />
          {description && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease, delay: 0.15 }}
              className="max-w-[32em] text-balance text-[length:var(--text-body-lg)] leading-[1.4]"
            >
              {description}
            </motion.p>
          )}
        </div>
        <ul className="flex flex-wrap justify-center gap-[var(--gap)]">
          {items.map((item, index) => {
            const tone = item.featured ? "deep" : undefined;
            const ground = item.featured ? "bg-background [--accent:var(--brand)] [--accent-foreground:var(--deep-foreground)]" : "bg-[var(--sand)] [--foreground:var(--brand)] [--primary:var(--brand)] [--accent:var(--background)] [--accent-foreground:var(--brand)]";
            return (
              <motion.li
                key={index}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.9, ease, delay: (index % 3) * 0.1 }}
                className="w-full sm:w-[calc(50%-var(--gap)/2)] lg:w-[calc((100%-2*var(--gap))/3)] lg:max-w-[26rem]"
              >
                <DepthTiltCard maxTilt={8} className="h-full">
                  <div className="flex h-full flex-col">
                    <div
                      data-tone={tone}
                      className={cn(
                        "relative flex flex-col gap-3 px-[clamp(1.25rem,2.4vw,2rem)] pb-6 pt-[clamp(1.5rem,2.6vw,2.25rem)] text-foreground [mask:radial-gradient(circle_at_0_100%,transparent_0.85rem,black_0.9rem)_left/51%_100%_no-repeat,radial-gradient(circle_at_100%_100%,transparent_0.85rem,black_0.9rem)_right/51%_100%_no-repeat]",
                        ground,
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        {item.label && <p className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)]">{item.label}</p>}
                        {item.featured && featuredTag && <p className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)]">{featuredTag}</p>}
                      </div>
                      <h3 className="text-[length:var(--text-h2)] [overflow-wrap:anywhere]">{item.name}</h3>
                      {item.price && <p className="mt-2 text-[length:calc(var(--text-h1)*1.25)] leading-none tracking-[var(--heading-tracking)] [font-family:var(--font-heading)]">{item.price}</p>}
                      {item.period && <p className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] opacity-80">{item.period}</p>}
                    </div>
                    <div
                      data-tone={tone}
                      className={cn(
                        "relative flex flex-1 flex-col gap-6 border-t-2 border-dashed border-foreground/30 px-[clamp(1.25rem,2.4vw,2rem)] pb-[clamp(1.5rem,2.6vw,2.25rem)] pt-6 text-foreground [mask:radial-gradient(circle_at_0_0,transparent_0.85rem,black_0.9rem)_left/51%_100%_no-repeat,radial-gradient(circle_at_100%_0,transparent_0.85rem,black_0.9rem)_right/51%_100%_no-repeat]",
                        ground,
                      )}
                    >
                      {item.features && item.features.length > 0 && (
                        <ul className="flex flex-col gap-3">
                          {item.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <div aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-primary" />
                              <p className="text-[length:var(--text-body)] leading-[1.4]">{feature}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.cta && (
                        <a href={item.cta.href ?? "#"} className="btn-primary mt-auto self-start">
                          <p className="btn-label font-mono uppercase tracking-[var(--label-tracking)]">{item.cta.text}</p>
                        </a>
                      )}
                    </div>
                  </div>
                </DepthTiltCard>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default PricingWorkshopTickets;
