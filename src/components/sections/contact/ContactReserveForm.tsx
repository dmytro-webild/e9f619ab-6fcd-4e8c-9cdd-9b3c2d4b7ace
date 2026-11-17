import { useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ImageScrollParallax from "@/components/animation/ImageScrollParallax";
import SnellenbergWordRise from "@/components/kit/SnellenbergWordRise";
import ToastedSticker from "@/components/kit/ToastedSticker";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type FormLabels = { name?: string; email?: string; date?: string; guests?: string; note?: string };

type ContactReserveFormProps = {
  label?: string;
  labels?: FormLabels;
  title?: string;
  description?: string;
  submitText?: string;
  successText?: string;
  details?: string[];
  imageSrc?: string;
  imageAlt?: string;
  stickerText?: string;
  ariaLabel?: string;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

const ContactReserveForm = ({
  label = "Reservations",
  labels,
  title = "Reserve a table",
  description = "Tell us when you are coming and how many are hungry. We hold tables for fifteen minutes.",
  submitText = "Send request",
  successText = "Thanks, we will confirm by email",
  details = ["1824 West Division St, Chicago", "Every day, 8 AM to 4 PM"],
  imageSrc = "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=1600",
  imageAlt = "Dining room with tall windows",
  stickerText = "say hello",
  ariaLabel,
  className,
}: ContactReserveFormProps) => {
  const reduce = useReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "center center"] });
  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(14% 12% 14% 12%)", "inset(0% 0% 0% 0%)"]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  const fields = [
    { name: "name", label: `${labels?.name ?? "Name"}*`, type: "text", required: true, wide: true },
    { name: "email", label: `${labels?.email ?? "Email"}*`, type: "email", required: true, wide: true },
    { name: "date", label: `${labels?.date ?? "Date"}*`, type: "date", required: true, wide: false },
    { name: "guests", label: `${labels?.guests ?? "Guests"}*`, type: "number", required: true, wide: false },
  ];

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto grid w-[var(--container)] grid-cols-1 gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2 lg:items-stretch">
        <div className="flex flex-col">
          {label && <p className="mb-4 font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)]">{label}</p>}
          <SnellenbergWordRise tag="h2" text={title} className="text-balance text-[length:var(--text-h1)]" />
          {description && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease, delay: 0.15 }}
              className="mt-4 max-w-[30em] text-balance text-[length:var(--text-body-lg)] leading-[1.4]"
            >
              {description}
            </motion.p>
          )}
          <motion.form
            onSubmit={onSubmit}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
            className="mt-[clamp(1.5rem,3vw,3rem)] grid grid-cols-2 gap-x-[var(--gap)] gap-y-7"
          >
            {fields.map((field) => (
              <label key={field.name} className={cn("flex min-w-0 flex-col gap-2", field.wide ? "col-span-2" : "col-span-1")}>
                <p className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)]">{field.label}</p>
                <input
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  min={field.type === "number" ? 1 : undefined}
                  className="w-full min-w-0 border-b border-input bg-transparent py-2.5 text-[length:var(--text-body)] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
                />
              </label>
            ))}
            <label className="col-span-2 flex flex-col gap-2">
              <p className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)]">{labels?.note ?? "Note"}</p>
              <textarea name="note" rows={2} className="w-full resize-none border-b border-input bg-transparent py-2.5 text-[length:var(--text-body)] text-foreground outline-none focus:border-foreground" />
            </label>
            <div className="col-span-2 flex flex-wrap items-center gap-4">
              <button type="submit" className="btn-primary">
                <p className="btn-label font-mono uppercase tracking-[var(--label-tracking)]">{submitText}</p>
              </button>
              {sent && <p role="status" className="text-[length:var(--text-small)]">{successText}</p>}
            </div>
          </motion.form>
          {details.length > 0 && (
            <div className="mt-[clamp(2rem,4vw,3.5rem)] flex flex-col gap-1 border-t border-border pt-5">
              {details.map((line, index) => (
                <p key={index} className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)]">{line}</p>
              ))}
            </div>
          )}
        </div>
        <div ref={photoRef} className="relative min-h-[26rem] lg:min-h-[36rem]">
          <motion.div style={{ clipPath: reduce ? undefined : clipPath }} className="absolute inset-0">
            <ImageScrollParallax imageSrc={imageSrc} imageAlt={imageAlt} strength={0.18} className="aspect-auto size-full rounded-[var(--radius-image)]" />
          </motion.div>
          <ToastedSticker text={stickerText} glyph="heart" className="absolute -left-4 -top-6 size-24 lg:-left-10 lg:size-32" />
        </div>
      </div>
    </section>
  );
};

export default ContactReserveForm;
