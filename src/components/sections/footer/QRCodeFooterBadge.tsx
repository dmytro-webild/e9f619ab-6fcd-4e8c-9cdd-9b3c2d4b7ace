import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QrCode, Sparkles, X, ExternalLink, Smartphone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export type QRCodeFooterBadgeProps = {
  className?: string;
  menuUrl?: string;
};

export default function QRCodeFooterBadge({
  className,
  menuUrl = "https://spritzandburgerdesenzano.it/#menu",
}: QRCodeFooterBadgeProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className={cn(
          "group relative flex flex-col items-center justify-between overflow-hidden rounded-2xl bg-card border border-border/80 p-5 shadow-lg transition-all duration-300 hover:border-accent/60 hover:shadow-2xl max-w-[22rem]",
          className
        )}
      >
        {/* Glow ambient background */}
        <div className="absolute -right-12 -top-12 size-36 rounded-full bg-accent/15 blur-2xl group-hover:bg-accent/25 transition-all duration-500 pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 size-36 rounded-full bg-primary/15 blur-2xl group-hover:bg-primary/25 transition-all duration-500 pointer-events-none" />

        {/* Top Header Label & Badge */}
        <div className="w-full flex items-center justify-between mb-3 border-b border-border/40 pb-2.5">
          <div className="flex items-center gap-2">
            <QrCode className="size-4 text-accent" />
            <span className="font-heading text-[length:var(--text-small)] font-bold text-foreground">
              {t("qr.title", "Menu Digitale QR")}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 text-accent border border-accent/30 px-2 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-wider animate-pulse">
            <Sparkles className="size-2.5" />
            <span>{t("qr.badge", "SCAN MENU")}</span>
          </span>
        </div>

        {/* Custom Eye-Catching SVG QR Code */}
        <div
          onClick={() => setIsOpen(true)}
          className="relative my-2 flex cursor-pointer items-center justify-center rounded-xl bg-white p-3.5 shadow-md border-2 border-border/60 transition-transform duration-300 group-hover:scale-105"
          title={t("qr.clickToEnlarge", "Clicca per ingrandire")}
        >
          {/* Stylized QR Code SVG Representation */}
          <svg
            viewBox="0 0 200 200"
            className="size-36 w-36 h-36 shrink-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Dark background matrix */}
            <rect width="200" height="200" rx="16" fill="#FFFFFF" />

            {/* Position Detection Pattern - Top Left */}
            <rect x="12" y="12" width="56" height="56" rx="12" fill="#0F172A" />
            <rect x="24" y="24" width="32" height="32" rx="6" fill="#FFFFFF" />
            <rect x="32" y="32" width="16" height="16" rx="4" fill="#F97316" />

            {/* Position Detection Pattern - Top Right */}
            <rect x="132" y="12" width="56" height="56" rx="12" fill="#0F172A" />
            <rect x="144" y="24" width="32" height="32" rx="6" fill="#FFFFFF" />
            <rect x="152" y="32" width="16" height="16" rx="4" fill="#F97316" />

            {/* Position Detection Pattern - Bottom Left */}
            <rect x="12" y="132" width="56" height="56" rx="12" fill="#0F172A" />
            <rect x="24" y="144" width="32" height="32" rx="6" fill="#FFFFFF" />
            <rect x="32" y="152" width="16" height="16" rx="4" fill="#F97316" />

            {/* Alignment / Data Modules (Rounded dots & bars for custom style) */}
            <g fill="#0F172A">
              {/* Row 1-3 data */}
              <rect x="80" y="16" width="12" height="12" rx="3" />
              <rect x="104" y="16" width="12" height="12" rx="3" />
              <rect x="80" y="40" width="12" height="12" rx="3" />
              <rect x="104" y="40" width="12" height="12" rx="3" fill="#F97316" />

              {/* Timing pattern */}
              <rect x="76" y="32" width="8" height="8" rx="2" />
              <rect x="116" y="32" width="8" height="8" rx="2" />

              {/* Middle Section */}
              <rect x="16" y="80" width="12" height="12" rx="3" />
              <rect x="40" y="80" width="12" height="12" rx="3" fill="#F97316" />
              <rect x="16" y="104" width="12" height="12" rx="3" />
              <rect x="40" y="104" width="12" height="12" rx="3" />

              <rect x="144" y="80" width="12" height="12" rx="3" />
              <rect x="168" y="80" width="12" height="12" rx="3" />
              <rect x="144" y="104" width="12" height="12" rx="3" fill="#F97316" />
              <rect x="168" y="104" width="12" height="12" rx="3" />

              {/* Bottom Right Data */}
              <rect x="80" y="132" width="12" height="12" rx="3" />
              <rect x="104" y="132" width="12" height="12" rx="3" fill="#F97316" />
              <rect x="132" y="132" width="12" height="12" rx="3" />
              <rect x="156" y="132" width="12" height="12" rx="3" />

              <rect x="80" y="156" width="12" height="12" rx="3" />
              <rect x="104" y="156" width="12" height="12" rx="3" />
              <rect x="132" y="156" width="12" height="12" rx="3" fill="#F97316" />
              <rect x="156" y="156" width="12" height="12" rx="3" />

              <rect x="80" y="176" width="12" height="12" rx="3" />
              <rect x="104" y="176" width="12" height="12" rx="3" />
              <rect x="132" y="176" width="12" height="12" rx="3" />
              <rect x="156" y="176" width="12" height="12" rx="3" />
            </g>

            {/* Center Custom Logo Badge (Spritz & Burger icon) */}
            <rect x="74" y="74" width="52" height="52" rx="14" fill="#0F172A" stroke="#F97316" strokeWidth="3" />
            {/* Burger / Cocktail graphic in center */}
            <text x="100" y="107" fontSize="26" textAnchor="middle" dominantBaseline="central">
              🍔
            </text>
          </svg>

          {/* Hover overlay indicator */}
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[0.7rem] font-bold text-black shadow-md">
              🔍 {t("qr.clickToEnlarge", "Ingrandisci")}
            </span>
          </div>
        </div>

        {/* Caption & Instruction */}
        <div className="w-full text-center mt-2">
          <p className="font-sans text-[length:var(--text-small)] font-medium text-foreground">
            {t("qr.subtitle", "Scansiona col telefono per consultare il menu completo!")}
          </p>
          <div className="mt-1.5 flex items-center justify-center gap-1.5 font-mono text-[0.725rem] text-accent">
            <Smartphone className="size-3.5" />
            <span>{t("qr.scanHint", "Inquadra con la fotocamera")}</span>
          </div>
        </div>
      </motion.div>

      {/* Expanded Modal Preview */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              className="relative w-full max-w-sm rounded-3xl bg-card border border-border p-6 text-foreground shadow-2xl flex flex-col items-center text-center"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-muted text-foreground hover:bg-muted/80 transition-colors"
                aria-label={t("qr.closeModal", "Chiudi")}
              >
                <X className="size-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <QrCode className="size-5 text-accent" />
                <h3 className="font-heading text-[length:var(--text-h3)] font-bold">
                  {t("qr.title", "Menu Digitale QR")}
                </h3>
              </div>

              <p className="font-sans text-[length:var(--text-small)] text-muted-foreground mb-4">
                {t("qr.subtitle", "Scansiona col telefono per consultare il menu digitale da tavolo!")}
              </p>

              {/* High-res QR Representation */}
              <div className="rounded-2xl bg-white p-5 shadow-xl border-4 border-accent/30 my-2">
                <svg
                  viewBox="0 0 200 200"
                  className="size-56 w-56 h-56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="200" height="200" rx="16" fill="#FFFFFF" />

                  {/* Top Left */}
                  <rect x="12" y="12" width="56" height="56" rx="12" fill="#0F172A" />
                  <rect x="24" y="24" width="32" height="32" rx="6" fill="#FFFFFF" />
                  <rect x="32" y="32" width="16" height="16" rx="4" fill="#F97316" />

                  {/* Top Right */}
                  <rect x="132" y="12" width="56" height="56" rx="12" fill="#0F172A" />
                  <rect x="144" y="24" width="32" height="32" rx="6" fill="#FFFFFF" />
                  <rect x="152" y="32" width="16" height="16" rx="4" fill="#F97316" />

                  {/* Bottom Left */}
                  <rect x="12" y="132" width="56" height="56" rx="12" fill="#0F172A" />
                  <rect x="24" y="144" width="32" height="32" rx="6" fill="#FFFFFF" />
                  <rect x="32" y="152" width="16" height="16" rx="4" fill="#F97316" />

                  <g fill="#0F172A">
                    <rect x="80" y="16" width="12" height="12" rx="3" />
                    <rect x="104" y="16" width="12" height="12" rx="3" />
                    <rect x="80" y="40" width="12" height="12" rx="3" />
                    <rect x="104" y="40" width="12" height="12" rx="3" fill="#F97316" />

                    <rect x="16" y="80" width="12" height="12" rx="3" />
                    <rect x="40" y="80" width="12" height="12" rx="3" fill="#F97316" />
                    <rect x="16" y="104" width="12" height="12" rx="3" />
                    <rect x="40" y="104" width="12" height="12" rx="3" />

                    <rect x="144" y="80" width="12" height="12" rx="3" />
                    <rect x="168" y="80" width="12" height="12" rx="3" />
                    <rect x="144" y="104" width="12" height="12" rx="3" fill="#F97316" />
                    <rect x="168" y="104" width="12" height="12" rx="3" />

                    <rect x="80" y="132" width="12" height="12" rx="3" />
                    <rect x="104" y="132" width="12" height="12" rx="3" fill="#F97316" />
                    <rect x="132" y="132" width="12" height="12" rx="3" />
                    <rect x="156" y="132" width="12" height="12" rx="3" />

                    <rect x="80" y="156" width="12" height="12" rx="3" />
                    <rect x="104" y="156" width="12" height="12" rx="3" />
                    <rect x="132" y="156" width="12" height="12" rx="3" fill="#F97316" />
                    <rect x="156" y="156" width="12" height="12" rx="3" />

                    <rect x="80" y="176" width="12" height="12" rx="3" />
                    <rect x="104" y="176" width="12" height="12" rx="3" />
                    <rect x="132" y="176" width="12" height="12" rx="3" />
                    <rect x="156" y="176" width="12" height="12" rx="3" />
                  </g>

                  {/* Center Badge */}
                  <rect x="74" y="74" width="52" height="52" rx="14" fill="#0F172A" stroke="#F97316" strokeWidth="3" />
                  <text x="100" y="107" fontSize="26" textAnchor="middle" dominantBaseline="central">
                    🍔
                  </text>
                </svg>
              </div>

              <div className="mt-4 flex flex-col gap-2 w-full">
                <a
                  href={menuUrl}
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full inline-flex items-center justify-center gap-2"
                >
                  <ExternalLink className="size-4" />
                  <span className="btn-label">Apri Menu Digitale</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary w-full"
                >
                  <span className="btn-label">{t("qr.closeModal", "Chiudi")}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
