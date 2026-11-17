"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import useMenuDialog from "@/components/kit/useMenuDialog";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

type NavItem = { name: string; href: string };
type Button = { text: string; href: string };

type NavbarSlashLinksProps = {
  brand?: string;
  logoImageSrc?: string;
  mark?: string;
  navItems?: NavItem[];
  primaryButton?: Button;
  menuText?: string;
  closeText?: string;
  introDelay?: number;
};

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const NavbarSlashLinks = ({
  brand = "SPRITZ & BURGER",
  logoImageSrc = "https://storage.googleapis.com/webild/users/user_3MEga9cursqZnupWG2nTy9in2oL/uploaded-1794924053353-qycvma4f.png",
  mark,
  navItems,
  primaryButton,
  menuText,
  closeText,
  introDelay = 0,
}: NavbarSlashLinksProps) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  useMenuDialog(open, panelRef, () => setOpen(false));

  const items: NavItem[] = navItems ?? [
    { name: t("nav.menu", "Il Menu"), href: "#menu" },
    { name: t("nav.services", "Spritz Culture"), href: "#services" },
    { name: t("nav.gallery", "Il Cortile"), href: "#gallery-corner-masks" },
    { name: t("nav.reviews", "Recensioni"), href: "#testimonial" },
    { name: t("nav.contact", "Dove Siamo"), href: "#contact-reserve-form" },
  ];

  const button: Button = primaryButton ?? {
    text: t("nav.book", "Prenota un Tavolo"),
    href: "#contact-reserve-form",
  };

  const displayMenuText = menuText ?? t("nav.openMenu", "Menu");
  const displayCloseText = closeText ?? t("nav.closeMenu", "Chiudi");

  return (
    <>
      <motion.nav
        aria-label="Main"
        initial={reduce ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: introDelay }}
        className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md text-primary"
      >
        <div className="mx-auto flex h-[4rem] w-[var(--container)] items-center justify-between gap-[1rem] sm:gap-[1.5rem]">
          {/* Brand Logo */}
          <a href="#" className="flex min-w-0 shrink-0 items-center gap-[0.75rem]">
            {logoImageSrc && (
              <img
                src={logoImageSrc}
                alt={brand}
                className="h-9 w-auto max-h-9 object-contain rounded-sm"
              />
            )}
            <div className="flex flex-col">
              <p className="-mb-[0.2em] truncate pb-[0.2em] text-[length:var(--text-body-lg)] font-bold leading-none tracking-[-0.02em]">{brand}</p>
              {mark && <p className="text-[length:0.6em] font-semibold leading-none">{mark}</p>}
            </div>
          </a>

          {/* Desktop Nav Items */}
          {items.length > 0 && (
            <ul className="hidden min-w-0 items-center gap-[clamp(0.75rem,1.5vw,1.5rem)] lg:flex">
              {items.map((item, i) => (
                <li key={`${i}-${item.href}`}>
                  <a
                    href={item.href}
                    className="relative whitespace-nowrap font-mono text-[length:var(--text-label)] uppercase leading-none tracking-[var(--label-tracking)] after:absolute after:inset-x-0 after:-bottom-[0.3rem] after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100 hover:text-accent transition-colors"
                  >
                    {`/${item.name}`}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Right Action Area: Language Switcher + Reservation CTA */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <LanguageSwitcher />

            {button && (
              <a
                href={button.href}
                className="relative hidden whitespace-nowrap font-mono text-[length:var(--text-label)] uppercase leading-none tracking-[var(--label-tracking)] after:absolute after:inset-x-0 after:-bottom-[0.3rem] after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100 hover:text-accent transition-colors lg:block"
              >
                {`/${button.text}`}
              </a>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="flex min-h-[2.75rem] items-center font-mono text-[length:var(--text-label)] uppercase leading-none tracking-[var(--label-tracking)] lg:hidden hover:text-accent"
            >
              {`/${displayMenuText}`}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={displayMenuText}
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[70] flex flex-col bg-background text-primary lg:hidden"
          >
            <div className="mx-auto flex h-[4rem] w-[var(--container)] flex-none items-center justify-between border-b border-border">
              <div className="flex items-center gap-2 min-w-0">
                {logoImageSrc && (
                  <img src={logoImageSrc} alt={brand} className="h-8 w-auto max-h-8 object-contain rounded-sm" />
                )}
                <p className="-mb-[0.2em] truncate pb-[0.2em] text-[length:var(--text-body-lg)] font-bold leading-none tracking-[-0.02em]">{brand}</p>
              </div>
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex min-h-[2.75rem] items-center font-mono text-[length:var(--text-label)] uppercase leading-none tracking-[var(--label-tracking)]"
                >
                  {`/${displayCloseText}`}
                </button>
              </div>
            </div>
            <ul className="mx-auto mt-[clamp(2rem,8svh,4rem)] flex w-[var(--container)] flex-col gap-[0.5rem]">
              {items.map((item, i) => (
                <li key={`${i}-${item.href}`} className="overflow-hidden pb-[0.1em]">
                  <motion.a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.25 + i * 0.05 }}
                    className="block font-[family-name:var(--font-heading)] text-[length:var(--text-h1)] leading-[1.05] tracking-[var(--heading-tracking)] [overflow-wrap:anywhere] hover:text-accent"
                  >
                    {item.name}
                  </motion.a>
                </li>
              ))}
            </ul>
            {button && (
              <div className="mx-auto mt-auto w-[var(--container)] pb-[var(--gutter)] pt-[2rem]">
                <a href={button.href} onClick={() => setOpen(false)} className="btn-primary w-full">
                  <p className="btn-label">{button.text}</p>
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarSlashLinks;
