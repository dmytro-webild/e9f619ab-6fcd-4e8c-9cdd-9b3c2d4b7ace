import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import DepthTiltCard from "@/components/library/effects/DepthTiltCard";
import SnellenbergWordRise from "@/components/kit/SnellenbergWordRise";
import { useLanguage } from "@/context/LanguageContext";

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

const ease = [0.22, 1, 0.36, 1] as const;

const PricingWorkshopTickets = ({
  label,
  title,
  description,
  featuredTag,
  items,
  ariaLabel,
  className,
}: PricingWorkshopTicketsProps) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const displayLabel = label ?? t("pricing.label", "Menu Speciali");
  const displayTitle = title ?? t("pricing.title", "Formule e menu speciali");
  const displayDescription = description ?? t("pricing.description", "Scopri le nostre proposte per abbinare hamburger gourmet, contorni croccanti e i classici spritz del Garda.");
  const displayFeaturedTag = featuredTag ?? t("pricing.featuredTag", "Più richiesto");

  const displayItems: Ticket[] = items ?? [
    {
      label: "Aperitivo Classic",
      name: "Spritz & Chips",
      price: "€12",
      period: t("pricing.perPerson", "a persona"),
      features: [
        t("pricing.f1", "1 Spritz a scelta"),
        t("pricing.f2", "Patate speziate croccanti"),
        t("pricing.f3", "Selezione di salse della casa"),
      ],
      cta: {
        text: t("nav.book", "Prenota tavolo"),
        href: "#contact-reserve-form",
      },
    },
    {
      label: "Il più amato",
      name: "Gourmet Burger Combo",
      price: "€18",
      period: t("pricing.perPerson", "a persona"),
      features: [
        t("pricing.f4", "1 Hamburger Gourmet a scelta"),
        t("pricing.f5", "Patate spesa a spicchi"),
        t("pricing.f6", "1 Spritz o birra alla spina"),
        t("pricing.f7", "Caffè del Garda"),
      ],
      cta: {
        text: t("nav.book", "Prenota tavolo"),
        href: "#contact-reserve-form",
      },
      featured: true,
    },
    {
      label: "Opzione Veg",
      name: "Veggie & Spritz",
      price: "€15",
      period: t("pricing.perPerson", "a persona"),
      features: [
        t("pricing.f8", "1 Burger vegetariano"),
        t("pricing.f9", "Patate al forno speziate"),
        t("pricing.f10", "1 Spritz a scelta"),
      ],
      cta: {
        text: t("nav.book", "Prenota tavolo"),
        href: "#contact-reserve-form",
      },
    },
  ];

  return (
    <section aria-label={ariaLabel ?? displayTitle} className={cn("relative z-10 bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="mx-auto mb-[clamp(1.5rem,3vw,3rem)] flex max-w-[44rem] flex-col items-center gap-4 text-center">
          {displayLabel && <p className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] text-accent">{displayLabel}</p>}
          <SnellenbergWordRise tag="h2" text={displayTitle} className="text-balance text-[length:var(--text-h1)]" />
          {displayDescription && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease, delay: 0.15 }}
              className="max-w-[32em] text-balance text-[length:var(--text-body-lg)] leading-[1.4] text-muted-foreground"
            >
              {displayDescription}
            </motion.p>
          )}
        </div>
        <ul className="flex flex-wrap justify-center gap-[var(--gap)]">
          {displayItems.map((item, index) => {
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
                        {item.featured && displayFeaturedTag && <p className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)]">{displayFeaturedTag}</p>}
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
