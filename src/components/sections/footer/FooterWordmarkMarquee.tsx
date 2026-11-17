import { useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ImageScrollParallax from "@/components/animation/ImageScrollParallax";
import ToastedSticker from "@/components/kit/ToastedSticker";

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

const DEFAULT_COLUMNS: FooterColumn[] = [
  { title: "Address", items: [{ label: "1824 West Division St, Chicago" }, { label: "Directions", href: "#" }] },
  { title: "Hours", items: [{ label: "8 AM to 4 PM" }, { label: "Every day of the week" }] },
  { title: "Contact", items: [{ label: "+1 773 555 0192", href: "tel:+17735550192" }, { label: "hello@crumbandbutter.com", href: "mailto:hello@crumbandbutter.com" }] },
  { title: "Socials", items: [{ label: "Instagram", href: "#" }, { label: "TikTok", href: "#" }, { label: "Facebook", href: "#" }] },
  { title: "Pages", items: [{ label: "Menu", href: "#" }, { label: "Events", href: "#" }, { label: "Workshops", href: "#" }, { label: "Reserve a table", href: "#" }] },
];

const FooterWordmarkMarquee = ({
  wordmark = "Crumb & Butter",
  stickerText = "come say hi",
  newsletterTitle = "Newsletter",
  emailLabel = "Email*",
  emailPlaceholder = "you@email.com",
  submitText = "Submit",
  successText = "You are on the list",
  imageSrc = "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=1200",
  imageAlt = "Green bowl with soft eggs",
  caption = "/Your next bite is here",
  columns = DEFAULT_COLUMNS,
  copyright = "All rights reserved",
  credit = "Made with Webild",
  ariaLabel = "Footer",
  className,
}: FooterWordmarkMarqueeProps) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <footer ref={ref} aria-label={ariaLabel} className={cn("relative overflow-x-clip bg-background pb-8 pt-[var(--section-space)] text-foreground", className)}>
      <p className="sr-only">{wordmark}</p>
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
      <div className="mx-auto mt-[clamp(3rem,6vw,5.5rem)] grid w-[var(--container)] grid-cols-1 gap-[clamp(3rem,5vw,5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <div className="flex flex-col">
          <h2 className="text-[length:var(--text-h3)]">{newsletterTitle}</h2>
          <form onSubmit={onSubmit} className="mt-6 flex max-w-[34rem] flex-col gap-5">
            <label className="flex flex-col gap-2">
              <p className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)]">{emailLabel}</p>
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
                <p className="btn-label font-mono uppercase tracking-[var(--label-tracking)]">{submitText}</p>
              </button>
              {sent && <p role="status" className="text-[length:var(--text-small)]">{successText}</p>}
            </div>
          </form>
          {imageSrc && (
            <div className="mt-[clamp(2rem,4vw,3.5rem)] max-w-[30rem]">
              <ImageScrollParallax imageSrc={imageSrc} imageAlt={imageAlt} strength={0.15} className="aspect-[16/9] rounded-[var(--radius-image)]" />
              {caption && <p className="mt-3 font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)]">{caption}</p>}
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-[var(--gap)] gap-y-[clamp(2.5rem,4vw,3.5rem)] sm:grid-cols-3">
          {columns.map((column, index) => (
            <div key={index} className="flex min-w-0 flex-col gap-5">
              <h3 className="text-[length:var(--text-h3)]">{column.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {column.items.map((item, i) => (
                  <li key={i}>
                    {item.href ? (
                      <a href={item.href} className="group inline-flex items-center gap-1 font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] [overflow-wrap:anywhere] hover:opacity-70">
                        <p className="min-w-0">{item.label}</p>
                        <ArrowUpRight aria-hidden="true" className="size-[1em] shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ) : (
                      <p className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] [overflow-wrap:anywhere]">{item.label}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-[clamp(3rem,6vw,5rem)] flex w-[var(--container)] flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
        <p className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] opacity-70">{copyright}</p>
        <p className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] opacity-70">{credit}</p>
      </div>
    </footer>
  );
};

export default FooterWordmarkMarquee;
