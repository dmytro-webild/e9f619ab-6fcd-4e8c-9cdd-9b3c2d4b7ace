import { useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ImageScrollParallax from "@/components/animation/ImageScrollParallax";
import ToastedSticker from "@/components/kit/ToastedSticker";
import QRCodeFooterBadge from "./QRCodeFooterBadge";
import { useLanguage } from "@/context/LanguageContext";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type FooterLink = { label: string; href?: string };
type FooterColumn = { title: string; items: FooterLink[] };

type FooterWordmarkMarqueeProps = {
  wordmark?: string;
  stickerText?: string;
  newsletterTitle?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  submitText?: string;
  successText?: string;
  imageSrc?: string;
  imageAlt?: string;
  caption?: string;
  columns?: FooterColumn[];
  copyright?: string;
  credit?: string;
  ariaLabel?: string;
  className?: string;
};

const FooterWordmarkMarquee = ({
  wordmark = "SPRITZ & BURGER",
  stickerText = "Gourmet & Aperitivo",
  newsletterTitle,
  emailLabel,
  emailPlaceholder = "info@spritzandburgerdesenzano.it",
  submitText,
  successText,
  imageSrc = "https://img.b2bpic.net/free-photo/tasty-sandwich-red-fork-wooden-cutting-board-dark-mix-color-surface_179666-42257.jpg",
  imageAlt = "Hamburger gourmet servito su tagliere di legno",
  caption,
  columns,
  copyright,
  credit,
  ariaLabel = "Piè di pagina",
  className,
}: FooterWordmarkMarqueeProps) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  const displayNewsletterTitle = newsletterTitle ?? t("footer.newsletter", "Rimani aggiornato");
  const displayEmailLabel = emailLabel ?? t("footer.emailLabel", "Email*");
  const displaySubmitText = submitText ?? t("footer.submit", "Iscriviti");
  const displaySuccessText = successText ?? t("footer.success", "Iscrizione effettuata con successo");
  const displayCaption = caption ?? t("footer.caption", "/Il vero gusto di Desenzano del Garda");
  const displayCopyright = copyright ?? t("footer.copyright", "© 2026 SPRITZ & BURGER DESENZANO. Tutti i diritti riservati.");
  const displayCredit = credit ?? t("footer.credit", "Desenzano del Garda");

  const localizedColumns: FooterColumn[] = columns ?? [
    {
      title: t("footer.colAddress", "Indirizzo"),
      items: [
        { label: t("footer.addressLine1", "Via Roma, 27, 25015 Desenzano del Garda BS") },
        { label: t("footer.addressLine2", "Indicazioni stradali"), href: "#" },
      ],
    },
    {
      title: t("footer.colHours", "Orari"),
      items: [
        { label: t("footer.hoursLine1", "Tutti i giorni 12:00-14:30 / 18:30-23:00") },
        { label: t("footer.hoursLine2", "Cortile coperto aperto tutto l'anno") },
      ],
    },
    {
      title: t("footer.colContact", "Contatti"),
      items: [
        { label: "030 618 9497", href: "tel:0306189497" },
        { label: "info@spritzandburgerdesenzano.it", href: "mailto:info@spritzandburgerdesenzano.it" },
      ],
    },
    {
      title: t("footer.colSocial", "Social"),
      items: [
        { label: "Instagram", href: "#" },
        { label: "Facebook", href: "#" },
      ],
    },
    {
      title: t("footer.colPages", "Pagine"),
      items: [
        { label: t("nav.menu", "Il Menu completo"), href: "#menu" },
        { label: t("nav.services", "Aperitivo Spritz"), href: "#services" },
        { label: t("nav.gallery", "Il locale"), href: "#gallery-corner-masks" },
        { label: t("nav.book", "Prenota un tavolo"), href: "#contact-reserve-form" },
      ],
    },
  ];

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <footer ref={ref} aria-label={ariaLabel} className={cn("relative overflow-x-clip bg-background pb-8 pt-[var(--section-space)] text-foreground", className)}>
      <p className="sr-only">{wordmark}</p>

      {/* Top Marquee */}
      <div aria-hidden="true" className="overflow-hidden">
        <motion.div style={{ x: reduce ? 0 : x }} className="flex w-max items-center">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <p className="whitespace-nowrap px-[clamp(1rem,2vw,2rem)] text-[length:var(--text-display)] leading-[1.1] tracking-[var(--heading-tracking)] [font-family:var(--font-heading)]">
                {wordmark}
              </p>
              <ToastedSticker text={stickerText} glyph="star" delay={i * 0.05} className="size-[clamp(5rem,10vw,9.5rem)] shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main Grid */}
      <div className="mx-auto mt-[clamp(3rem,6vw,5.5rem)] grid w-[var(--container)] grid-cols-1 gap-[clamp(3rem,5vw,5rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
        {/* Left Column: Newsletter + Image + Eye-Catching QR Code Badge */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-[length:var(--text-h3)] font-heading font-semibold">{displayNewsletterTitle}</h2>
            <form onSubmit={onSubmit} className="mt-5 flex max-w-[34rem] flex-col gap-4">
              <label className="flex flex-col gap-2">
                <p className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)]">{displayEmailLabel}</p>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={emailPlaceholder}
                  className="w-full border-b border-input bg-transparent py-2.5 text-[length:var(--text-body)] text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground"
                />
              </label>
              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" className="btn-primary">
                  <p className="btn-label font-mono uppercase tracking-[var(--label-tracking)]">{displaySubmitText}</p>
                </button>
                {sent && <p role="status" className="text-[length:var(--text-small)] text-accent">{displaySuccessText}</p>}
              </div>
            </form>
          </div>

          <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row items-start gap-6">
            {imageSrc && (
              <div className="w-full max-w-[20rem]">
                <ImageScrollParallax imageSrc={imageSrc} imageAlt={imageAlt} strength={0.15} className="aspect-[16/9] rounded-[var(--radius-image)]" />
                {displayCaption && <p className="mt-3 font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)]">{displayCaption}</p>}
              </div>
            )}

            {/* Custom Eye-Catching QR Code Badge */}
            <div className="w-full max-w-[20rem]">
              <QRCodeFooterBadge menuUrl="#menu" />
            </div>
          </div>
        </div>

        {/* Right Column: Footer Links */}
        <div className="grid grid-cols-2 gap-x-[var(--gap)] gap-y-[clamp(2.5rem,4vw,3.5rem)] sm:grid-cols-3">
          {localizedColumns.map((column, index) => (
            <div key={index} className="flex min-w-0 flex-col gap-5">
              <h3 className="text-[length:var(--text-h3)] font-heading font-semibold">{column.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {column.items.map((item, i) => (
                  <li key={i}>
                    {item.href ? (
                      <a href={item.href} className="group inline-flex items-center gap-1 font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] [overflow-wrap:anywhere] hover:text-accent transition-colors">
                        <p className="min-w-0">{item.label}</p>
                        <ArrowUpRight aria-hidden="true" className="size-[1em] shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ) : (
                      <p className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] [overflow-wrap:anywhere] opacity-80">{item.label}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto mt-[clamp(3rem,6vw,5rem)] flex w-[var(--container)] flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
        <p className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] opacity-70">{displayCopyright}</p>
        <p className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] opacity-70">{displayCredit}</p>
      </div>
    </footer>
  );
};

export default FooterWordmarkMarquee;
