import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import Media from "@/components/kit/Media";
import SnellenbergWordRise from "@/components/kit/SnellenbergWordRise";
import { Utensils, Wine, Beer, Sparkles, X, ChevronRight, Check } from "lucide-react";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export type MenuItem = {
  id: string;
  name: string;
  category: "burger" | "spritz" | "sfizi" | "birre" | "dolci";
  price: string;
  description: string;
  ingredients?: string[];
  imageSrc: string;
  imageAlt?: string;
  tag?: string;
  badgeColor?: "primary" | "accent" | "secondary";
  allergens?: string;
};

export type MenuCategory = {
  key: "all" | "burger" | "spritz" | "sfizi" | "birre" | "dolci";
  label: string;
  icon?: typeof Utensils;
};

const DEFAULT_CATEGORIES: MenuCategory[] = [
  { key: "all", label: "Tutti i Piatti & Drink", icon: Sparkles },
  { key: "burger", label: "Hamburger Gourmet", icon: Utensils },
  { key: "spritz", label: "Spritz & Aperitivi", icon: Wine },
  { key: "sfizi", label: "Sfizi & Patate", icon: Utensils },
  { key: "birre", label: "Birre & Drink", icon: Beer },
  { key: "dolci", label: "Dolci & Finale", icon: Sparkles },
];

const DEFAULT_MENU_ITEMS: MenuItem[] = [
  {
    id: "b1",
    name: "Classic Royal Burger",
    category: "burger",
    price: "€14.00",
    description: "carne fresca 100% manzo selezionato ogni giorno, formaggio cheddar fuso, insalata croccante, pomodoro fresco e la nostra maionese speciale della casa.",
    ingredients: ["200g Manzo Scelto", "Cheddar Fuso", "Pomodoro e Insalata", "Pane Artigianale Dorato", "Salsa Speciale"],
    imageSrc: "https://img.b2bpic.net/free-photo/front-view-meat-burger-with-salad-cheese-tomatoes-dark-desk-bun-sandwich-fast-food_140725-89542.jpg",
    imageAlt: "Classic Royal Burger servito caldo",
    tag: "Bestseller",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio, Uova"
  },
  {
    id: "b2",
    name: "Crispy Bacon Deluxe",
    category: "burger",
    price: "€16.00",
    description: "Doppio bacon croccante dorato, manzo fresco 200g, cheddar stagionato, cipolle caramellate al vino rosso e salsa BBQ affumicata.",
    ingredients: ["200g Manzo Fresco", "Doppio Bacon Croccante", "Cheddar Stagionato", "Cipolla Caramellata", "Salsa BBQ"],
    imageSrc: "https://img.b2bpic.net/free-photo/side-view-burger-with-beef-patty-grilled-red-onion-tomato-lettuce-burger-buns-french-fries-orange-drink-table_141793-3607.jpg",
    imageAlt: "Crispy Bacon Deluxe con patatine",
    tag: "Il Più Amato",
    badgeColor: "accent",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "b3",
    name: "Truffle & Mushroom Special",
    category: "burger",
    price: "€18.00",
    description: "Crema al tartufo nero del Garda, manzo 100% italiano, funghi trifolati in padella, provola affumicata e rucola selvatica.",
    ingredients: ["Manzo Selezionato 200g", "Crema di Tartufi del Garda", "Funghi Trifolati", "Provola Affumicata", "Rucola"],
    imageSrc: "https://img.b2bpic.net/free-photo/potato-patties-topped-with-beef-patties-shoe-strings_140725-5889.jpg",
    imageAlt: "Truffle & Mushroom Special burger gourmet",
    tag: "Gourmet",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "b4",
    name: "Spicy Desenzano Fire",
    category: "burger",
    price: "€17.00",
    description: "Manzo piccante speziato, formaggio pepper jack fuso, jalapeños croccanti sott'olio, cipolla croccante e maionese al peperoncino.",
    ingredients: ["Manzo Speziato 200g", "Pepper Jack", "Jalapeños Sott'olio", "Maionese al Peperoncino"],
    imageSrc: "https://img.b2bpic.net/free-photo/black-burger-with-side-fries-cola_140725-2702.jpg",
    imageAlt: "Spicy Desenzano Fire burger",
    tag: "Piccante",
    badgeColor: "secondary",
    allergens: "Glutine, Lattosio, Uova"
  },
  {
    id: "b5",
    name: "Garden Fresh Veggie",
    category: "burger",
    price: "€15.00",
    description: "Burger 100% vegetale alle verdure grigliate e legumi, scamorza affumicata, maionese al basilico e pomodori secchi del Garda.",
    ingredients: ["Burger di Legumi e Verdure", "Scamorza Affumicata", "Pomodori Secchi", "Maionese al Basilico"],
    imageSrc: "https://img.b2bpic.net/free-photo/high-angle-close-up-burger-wooden-board_23-2148238518.jpg",
    imageAlt: "Garden Fresh Veggie burger vegetariano",
    tag: "Vegetariano",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "b6",
    name: "Bavarian Smoked Burger",
    category: "burger",
    price: "€16.50",
    description: "Carne di manzo scelta, wurstel artigianale grigliato, sauerkraut delicato, formaggio emmental e senape dolce bavarese.",
    ingredients: ["Manzo 200g", "Wurstel Artigianale", "Emmental Fuso", "Sauerkraut", "Senape Dolce"],
    imageSrc: "https://img.b2bpic.net/free-photo/american-diner-aesthetics_23-2151854439.jpg",
    imageAlt: "Bavarian Smoked Burger gourmet",
    tag: "Specialità",
    badgeColor: "secondary",
    allergens: "Glutine, Lattosio, Senape"
  },
  {
    id: "s1",
    name: "Aperol Spritz Classic",
    category: "spritz",
    price: "€7.00",
    description: "L'iconico aperitivo veneto-lombardo con Aperol, Prosecco DOC selezionato, soda vivace e fetta d'arancia fresca servito nel nostro cortile.",
    ingredients: ["Aperol Originale", "Prosecco DOC", "Soda Rinfrescante", "Fetta d'Arancia"],
    imageSrc: "https://img.b2bpic.net/free-photo/delicious-italian-cocktail-with-realistic-background_23-2150062921.jpg",
    imageAlt: "Aperol Spritz servito freddo",
    tag: "Icona del Cortile",
    badgeColor: "accent",
    allergens: "Solfiti"
  },
  {
    id: "s2",
    name: "Campari Spritz Deciso",
    category: "spritz",
    price: "€7.50",
    description: "Gusto amaro intenso e raffinato: Campari Bitter, Prosecco DOC, seltz e scorza d'arancia biologica espresso.",
    ingredients: ["Campari Bitter", "Prosecco DOC", "Seltz", "Scorza d'Arancia Bio"],
    imageSrc: "https://img.b2bpic.net/free-photo/hand-holding-italian-cocktail-still-life_23-2150645773.jpg",
    imageAlt: "Campari Spritz bicchiere con arancia",
    tag: "Carattere Deciso",
    badgeColor: "primary",
    allergens: "Solfiti"
  },
  {
    id: "s3",
    name: "Hugo Spritz del Garda",
    category: "spritz",
    price: "€7.50",
    description: "Profumato e leggero: Liquore ai fiori di sambuco, Prosecco DOC frizzante, menta profumata e spruzzo di lime.",
    ingredients: ["Liquore ai Fiori di Sambuco", "Prosecco DOC", "Menta Fresca", "Lime e Soda"],
    imageSrc: "https://img.b2bpic.net/free-photo/tropical-cocktail-with-grapefruit-flavor_140725-65.jpg",
    imageAlt: "Hugo Spritz ai fiori di sambuco e menta",
    tag: "Fresco & Aromatico",
    badgeColor: "primary",
    allergens: "Solfiti"
  },
  {
    id: "s4",
    name: "Spritz Maracuja & Red Fruit",
    category: "spritz",
    price: "€8.50",
    description: "Cocktail firma Spritz & Burger: Aperol, succo al frutto della passione, Prosecco DOC e guarnizione ai frutti rossi.",
    ingredients: ["Aperol", "Frutto della Passione", "Prosecco DOC", "Frutti di Bosco Freschi"],
    imageSrc: "https://img.b2bpic.net/free-photo/side-view-friends-holding-cocktails_23-2150124815.jpg",
    imageAlt: "Spritz Maracuja servito con frutti di bosco",
    tag: "Firma della Casa",
    badgeColor: "accent",
    allergens: "Solfiti"
  },
  {
    id: "f1",
    name: "Patate a Spicchi Speziali",
    category: "sfizi",
    price: "€6.00",
    description: "Patate fresche tagliate a spicchi con buccia croccante, speziate alle erbe aromatiche e servite con salsa maionese alla paprica dolce.",
    ingredients: ["Patate Fresche a Spicchi", "Erbe del Garda", "Salsa Maionese alla Paprica"],
    imageSrc: "https://img.b2bpic.net/free-photo/chicken-cutlet-with-zucchini_2829-10809.jpg",
    imageAlt: "Patate a spicchi dorate e croccanti",
    tag: "Imperdibile",
    badgeColor: "secondary",
    allergens: "Uova (nella salsa)"
  },
  {
    id: "f2",
    name: "Onion Rings Artigianali",
    category: "sfizi",
    price: "€6.50",
    description: "Anelli di cipolla dolci impastellati alla birra artigianale, fritti croccanti e serviti con salsa BBQ affumicata.",
    ingredients: ["Cipolle bionde dolci", "Pastella alla Birra", "Salsa BBQ"],
    imageSrc: "https://img.b2bpic.net/free-photo/closeup-shot-appetizing-burger-with-onion-rings_181624-46590.jpg",
    imageAlt: "Onion rings croccanti dorati",
    tag: "Sfizio della Casa",
    badgeColor: "primary",
    allergens: "Glutine"
  },
  {
    id: "dr1",
    name: "Birra Artigianale Bionda 0.4L",
    category: "birre",
    price: "€6.00",
    description: "Birra alla spina dorata non filtrata, dal corpo equilibrato e profumo di luppolo fresco. Perfetta in abbinamento ai nostri burger.",
    ingredients: ["Acqua di Sorgente", "Malto d'Orzo", "Luppoli Selezionati"],
    imageSrc: "https://img.b2bpic.net/free-photo/man-with-glass-beer_107420-65569.jpg",
    imageAlt: "Bicchiere di birra artigianale alla spina",
    tag: "Alla Spina",
    badgeColor: "primary",
    allergens: "Glutine (Orzo)"
  },
  {
    id: "dr2",
    name: "Birra Artigianale Rossa 0.4L",
    category: "birre",
    price: "€6.50",
    description: "Birra ambrata doppio malto dal gusto ricco e note tostate di caramello e nocciola. Ottima con hamburger strutturati.",
    ingredients: ["Malto Tostato", "Luppoli Aromatici"],
    imageSrc: "https://img.b2bpic.net/free-photo/couple-drinking-craft-beer-outdoors_23-2148111307.jpg",
    imageAlt: "Birra rossa artigianale versata nel bicchiere",
    tag: "Doppio Malto",
    badgeColor: "accent",
    allergens: "Glutine (Orzo)"
  },
  {
    id: "d1",
    name: "Tiramisù Tradizionale",
    category: "dolci",
    price: "€6.00",
    description: "Fatto in casa secondo la ricetta classica: savoiardi artigianali impregnati di caffè espresso del Garda e morbida crema al mascarpone.",
    ingredients: ["Mascarpone Fresco", "Savoiardi Artigianali", "Caffè Espresso", "Cacao Amaro"],
    imageSrc: "https://img.b2bpic.net/free-photo/tasty-sandwich-red-fork-wooden-cutting-board-dark-mix-color-surface_179666-42257.jpg",
    imageAlt: "Tiramisu fatto in casa servito al piatto",
    tag: "Fatto in Casa",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio, Uova"
  }
];

export type MenuGridProps = {
  label?: string;
  title?: string;
  description?: string;
  categories?: MenuCategory[];
  items?: MenuItem[];
  ariaLabel?: string;
  className?: string;
};

export default function MenuElegantGrid({
  label = "/Il Menu di Desenzano",
  title = "Scopri il nostro menu artigianale",
  description = "Carne fresca 100% manzo selezionata ogni giorno, pane fragrante, contorni croccanti e i leggendari Spritz serviti nel cortile coperto a Desenzano del Garda.",
  categories = DEFAULT_CATEGORIES,
  items = DEFAULT_MENU_ITEMS,
  ariaLabel = "Menu di Spritz & Burger",
  className,
}: MenuGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = activeCategory === "all" 
    ? items 
    : items.filter((item) => item.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel}
      className={cn(
        "relative overflow-hidden bg-background py-[var(--section-space)] text-foreground",
        className
      )}
    >
      <div className="mx-auto w-[var(--container)]">
        {/* Header */}
        <div className="mx-auto mb-[clamp(2.5rem,5vw,4rem)] flex max-w-[48rem] flex-col items-center gap-[clamp(0.875rem,1.8vw,1.5rem)] text-center">
          {label && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: kit.base, ease: kit.ease }}
              className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] text-accent before:content-['/']"
            >
              {label}
            </motion.p>
          )}

          {title && (
            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: kit.base, ease: kit.ease, delay: 0.08 }}
              className="font-heading text-[length:var(--text-h1)] font-[var(--heading-weight)] tracking-[var(--heading-tracking)] leading-[var(--heading-leading)] text-foreground"
            >
              <SnellenbergWordRise text={title} />
            </motion.h2>
          )}

          {description && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: kit.base, ease: kit.ease, delay: 0.16 }}
              className="max-w-[36rem] font-sans text-[length:var(--text-body-lg)] text-muted-foreground"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Category Filters */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: kit.base, ease: kit.ease, delay: 0.2 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "relative inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[length:var(--text-small)] transition-all duration-300",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-foreground hover:bg-muted border border-border/60"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Items Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={reduce ? false : { opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -20 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.2) }}
                className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-card border border-border/70 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <Media
                    src={item.imageSrc}
                    alt={item.imageAlt ?? item.name}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Tag / Badge */}
                  {item.tag && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className={cn(
                        "inline-flex items-center gap-1 rounded-full px-3 py-1 font-mono text-[0.75rem] font-medium tracking-wide uppercase shadow-sm",
                        item.badgeColor === "accent"
                          ? "bg-accent text-accent-foreground"
                          : item.badgeColor === "secondary"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-primary text-primary-foreground"
                      )}>
                        {item.tag}
                      </span>
                    </div>
                  )}

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="inline-block rounded-full bg-background/90 backdrop-blur-md px-3.5 py-1 font-mono text-[length:var(--text-body)] font-semibold text-foreground shadow-md border border-border/50">
                      {item.price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-heading text-[length:var(--text-h3)] font-normal text-foreground group-hover:text-accent transition-colors duration-200">
                      {item.name}
                    </h3>
                  </div>

                  <p className="mt-2.5 flex-1 font-sans text-[length:var(--text-small)] leading-relaxed text-muted-foreground line-clamp-3">
                    {item.description}
                  </p>

                  {/* Ingredients Preview */}
                  {item.ingredients && item.ingredients.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
                      {item.ingredients.slice(0, 3).map((ing, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 font-mono text-[0.75rem] text-muted-foreground/90 bg-muted/60 px-2 py-0.5 rounded"
                        >
                          <Check className="size-3 text-accent" />
                          {ing}
                        </span>
                      ))}
                      {item.ingredients.length > 3 && (
                        <span className="font-mono text-[0.75rem] text-muted-foreground self-center">
                          +{item.ingredients.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="mt-5 flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="inline-flex items-center gap-1.5 font-mono text-[length:var(--text-small)] text-primary hover:text-accent transition-colors duration-200 font-medium"
                    >
                      <span>Vedi Dettagli & Foto</span>
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA / Note */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: kit.base, ease: kit.ease, delay: 0.3 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[var(--radius-card)] bg-card border border-border/80 p-6 sm:p-8"
        >
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Sparkles className="size-6" />
            </div>
            <div>
              <h4 className="font-heading text-[length:var(--text-h3)] text-foreground">
                Desideri un tavolo nel nostro cortile coperto?
              </h4>
              <p className="font-sans text-[length:var(--text-small)] text-muted-foreground mt-0.5">
                Prenota in anticipo per garantirti i posti migliori nel centro di Desenzano del Garda.
              </p>
            </div>
          </div>
          <a
            href="#contact-reserve-form"
            className="btn-primary shrink-0"
          >
            <span className="btn-label">Prenota un Tavolo</span>
          </a>
        </motion.div>
      </div>

      {/* Modal Detail Dialog */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-card border border-border shadow-2xl text-foreground"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground hover:bg-background transition-colors shadow-md"
                aria-label="Chiudi"
              >
                <X className="size-5" />
              </button>

              {/* Modal Image Header */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                <Media
                  src={selectedItem.imageSrc}
                  alt={selectedItem.imageAlt ?? selectedItem.name}
                  className="size-full object-cover"
                />
                {selectedItem.tag && (
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-accent px-3 py-1 font-mono text-[0.75rem] uppercase text-accent-foreground font-semibold shadow">
                    {selectedItem.tag}
                  </span>
                )}
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-heading text-[length:var(--text-h2)] font-normal text-foreground">
                    {selectedItem.name}
                  </h3>
                  <span className="font-mono text-[length:var(--text-h3)] font-bold text-accent">
                    {selectedItem.price}
                  </span>
                </div>

                <p className="mt-3 font-sans text-[length:var(--text-body)] text-muted-foreground leading-relaxed">
                  {selectedItem.description}
                </p>

                {selectedItem.ingredients && selectedItem.ingredients.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] text-foreground mb-3 before:content-['/']">
                      Ingredienti & Preparazione
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedItem.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-center gap-2 font-sans text-[length:var(--text-small)] text-foreground/90">
                          <Check className="size-4 text-accent shrink-0" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedItem.allergens && (
                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-[length:var(--text-small)]">
                    <span className="font-mono text-muted-foreground">Allergeni:</span>
                    <span className="font-mono text-foreground font-medium">{selectedItem.allergens}</span>
                  </div>
                )}

                <div className="mt-8 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="btn-secondary"
                  >
                    <span className="btn-label">Chiudi</span>
                  </button>
                  <a
                    href="#contact-reserve-form"
                    onClick={() => setSelectedItem(null)}
                    className="btn-primary"
                  >
                    <span className="btn-label">Ordina / Prenota Tavolo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
