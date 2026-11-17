import { useLanguage, type Language } from "@/context/LanguageContext";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Globe } from "lucide-react";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "it", label: "IT", flag: "🇮🇹" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "de", label: "DE", flag: "🇩🇪" },
];

export type LanguageSwitcherProps = {
  className?: string;
};

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-card/90 border border-border/80 p-1 shadow-sm backdrop-blur-sm",
        className
      )}
      aria-label="Seleziona lingua / Select language / Sprache wählen"
    >
      <Globe className="size-3.5 ml-1.5 text-accent opacity-70 shrink-0" aria-hidden="true" />
      <div className="flex items-center gap-0.5">
        {LANGUAGES.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.725rem] font-semibold tracking-wider transition-all duration-200 cursor-pointer select-none",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
              title={lang.code === "it" ? "Italiano (Principale)" : lang.code === "en" ? "English" : "Deutsch"}
            >
              <span className="text-[0.85em] leading-none">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
