import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import ImageScrollParallax from "@/components/animation/ImageScrollParallax";
import SnellenbergWordRise from "@/components/kit/SnellenbergWordRise";
import { useLanguage } from "@/context/LanguageContext";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Offer = {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  detailSrc?: string;
  detailAlt?: string;
  cta?: { text: string; href: string };
};

type FeaturesStackedOffersProps = {
  label?: string;
  title?: string;
  items?: Offer[];
  ariaLabel?: string;
  className?: string;
};

type RowProps = { item: Offer; index: number; total: number; progress: MotionValue<number> };

const SHRINK = 0.05;
const TILT = 8;
const PEEK = 14;

const Row = ({ item, index, total, progress }: RowProps) => {
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const lastIndex = total - 1;
  const segment = 1 / Math.max(lastIndex, 1);
  const start = Math.min(index * segment, 0.999);
  const behind = lastIndex - index;
  const scale = useTransform(progress, [start, 1], [1, 1 - behind * SHRINK]);
  const rotateX = useTransform(progress, [start, Math.min(start + segment, 1)], [0, behind ? TILT : 0]);
  const dim = useTransform(progress, [start, 1], [0, Math.min(behind * 0.16, 0.5)]);
  const still = reduce || !behind;

  return (
    <li className="sticky [perspective:1600px]" style={{ top: `calc(clamp(4.5rem, 10svh, 7rem) + ${index * PEEK}px)` }}>
      <motion.article
        style={still ? undefined : { scale, rotateX }}
        className="relative grid w-full origin-top grid-cols-1 bg-background will-change-transform lg:h-[min(76svh,44rem)] lg:grid-cols-2"
      >
        <ImageScrollParallax imageSrc={item.imageSrc} imageAlt={item.imageAlt ?? item.title} strength={0.12 + (index % 3) * 0.04} className="aspect-[16/9] rounded-[var(--radius-image)] lg:aspect-auto lg:h-full" />
        <div className="flex min-w-0 flex-col justify-between gap-[clamp(1.5rem,4vw,3rem)] bg-[var(--sand,var(--card))] px-[clamp(1.25rem,3.5vw,3rem)] py-[clamp(1.5rem,3.5vw,3rem)] text-foreground">
          <div className="flex flex-col gap-[clamp(1rem,2.4vw,2rem)]">
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: kit.base, ease: kit.ease }}
              className="flex items-baseline justify-between gap-[1rem] border-b border-[color-mix(in_srgb,var(--foreground)_18%,transparent)] pb-[0.9rem] font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)]"
            >
              <p aria-hidden="true">{String(index + 1).padStart(2, "0")}</p>
              <p aria-hidden="true" className="text-muted-foreground">/ {String(total).padStart(2, "0")}</p>
            </motion.div>
            <SnellenbergWordRise tag="h3" text={item.title} className="max-w-[10em] text-balance text-[length:var(--text-display)] leading-[0.95] tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere] lg:text-[length:clamp(3rem,5.2vw,5.5rem)]" />
          </div>
          <div className="flex items-end gap-[clamp(1rem,2.4vw,1.75rem)]">
            {item.detailSrc && (
              <ImageScrollParallax imageSrc={item.detailSrc} imageAlt={item.detailAlt ?? ""} strength={0.1} className="aspect-[4/5] w-[clamp(5rem,9vw,8.5rem)] flex-none rounded-[var(--radius-image)]" />
            )}
            <div className="flex min-w-0 flex-col items-start gap-[clamp(0.75rem,1.6vw,1.25rem)]">
              {item.description && (
                <motion.p
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: kit.base, ease: kit.ease, delay: 0.1 }}
                  className="max-w-[26em] text-pretty text-[length:var(--text-body)] leading-[1.5] text-foreground/80"
                >
                  {item.description}
                </motion.p>
              )}
              {item.cta && (
                <a href={item.cta.href} className="btn-link font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)]">
                  {item.cta.text}
                  <svg viewBox="0 0 12 12" aria-hidden="true" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 10 L10 2 M4 2 H10 V8" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
        {!still && <motion.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-black" />}
      </motion.article>
    </li>
  );
};

const FeaturesStackedOffers = ({
  label,
  title,
  items,
  ariaLabel,
  className,
}: FeaturesStackedOffersProps) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.0005 });

  const displayLabel = label ?? t("services.label", "APERITIVO SUL GARDA");
  const displayTitle = title ?? t("services.title", "L'ora dello spritz a Desenzano");

  const displayItems: Offer[] = items ?? [
    {
      title: t("services.item1Title", "Spritz Classici"),
      description: t("services.item1Desc", "Aperol, Campari o Hugo preparati a regola d'arte con Prosecco selezionato e guarnizioni fresche nel nostro cortile."),
      imageSrc: "https://img.b2bpic.net/free-photo/tropical-cocktail-with-grapefruit-flavor_140725-65.jpg?_wi=2",
      imageAlt: "tropical cocktail with grapefruit flavor",
      detailSrc: "https://img.b2bpic.net/free-photo/side-view-friends-holding-cocktails_23-2150124815.jpg",
      detailAlt: "Side view friends holding cocktails",
      cta: {
        text: t("services.item1Cta", "Scopri i burger"),
        href: "#menu",
      },
    },
    {
      title: t("services.item2Title", "Birre Artigianali"),
      description: t("services.item2Desc", "Bionde e rosse alla spina selezionate per esaltare i sapori intensi dei nostri hamburger di carne fresca."),
      imageSrc: "https://img.b2bpic.net/free-photo/man-with-glass-beer_107420-65569.jpg?_wi=2",
      imageAlt: "Man with glass of beer",
      detailSrc: "https://img.b2bpic.net/free-photo/couple-drinking-craft-beer-outdoors_23-2148111307.jpg",
      detailAlt: "Couple drinking craft beer outdoors",
      cta: {
        text: t("services.item2Cta", "Vedi menu"),
        href: "#menu",
      },
    },
    {
      title: t("services.item3Title", "Cortile Coperto"),
      description: t("services.item3Desc", "Un'atmosfera rilassata e accogliente a due passi dal lago, perfetta per la convivialità e il relax serale."),
      imageSrc: "https://img.b2bpic.net/free-photo/medium-shot-happy-people-with-sangria_23-2149436821.jpg?_wi=2",
      imageAlt: "Medium shot happy people with sangria",
      detailSrc: "https://img.b2bpic.net/free-photo/always-is-great-spend-some-time-with-friends_329181-2895.jpg",
      detailAlt: "Always is great to spend some time with friends",
      cta: {
        text: t("services.item3Cta", "Prenota tavolo"),
        href: "#contact-reserve-form",
      },
    },
  ];

  return (
    <section aria-label={ariaLabel ?? displayTitle ?? "Services"} className={cn("relative overflow-x-clip bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        {(displayLabel || displayTitle) && (
          <div className="mx-auto mb-[clamp(2rem,4vw,3.5rem)] flex max-w-[40rem] flex-col items-center gap-[clamp(0.75rem,1.4vw,1.25rem)] text-center">
            {displayLabel && (
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: kit.base, ease: kit.ease }}
                className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] before:content-['/']"
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
        <ul ref={listRef} className="flex flex-col gap-[12svh]">
          {displayItems.map((item, index) => (
            <Row key={index} item={item} index={index} total={displayItems.length} progress={progress} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturesStackedOffers;
