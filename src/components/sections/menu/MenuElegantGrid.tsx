import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import SnellenbergWordRise from "@/components/kit/SnellenbergWordRise";
import {
  Flame,
  Sparkles,
  Smile,
  Salad,
  Fish,
  IceCream,
  GlassWater,
  Beer,
  Wine,
  ChevronRight,
  X,
  Check,
  Search,
  Leaf,
  Crown,
  Utensils
} from "lucide-react";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// Thematic SVG Icons
function BurgerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 11a8 8 0 0 1 16 0H4z" />
      <path d="M2 11h20" />
      <path d="M4 14h16" />
      <path d="M3 18h18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function FriesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 11 7 3h10l2 8" />
      <path d="M3 11h18l-2 10H5L3 11z" />
      <line x1="8.5" y1="3" x2="8.5" y2="11" />
      <line x1="12" y1="3" x2="12" y2="11" />
      <line x1="15.5" y1="3" x2="15.5" y2="11" />
    </svg>
  );
}

function GlutenFreeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m2 2 20 20" />
      <path d="M12 2v6" />
      <path d="M9 6a3 3 0 0 1 6 0" />
      <path d="M12 12v10" />
      <path d="M8 15a4 4 0 0 0 4 4" />
      <path d="M16 13.5a4 4 0 0 1-2.5 3.5" />
    </svg>
  );
}

function VeganIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
      <path d="M12 22V12" />
    </svg>
  );
}

export type MenuCategoryKey =
  | "all"
  | "burgers"
  | "special-burgers"
  | "gli-incredibili"
  | "veggie"
  | "per-i-piccoli"
  | "fish-and-chips"
  | "insalate"
  | "desserts"
  | "extra"
  | "bevande"
  | "birre"
  | "vini";

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategoryKey;
  price: string;
  description: string;
  ingredients?: string[];
  grammage?: string;
  tag?: string;
  badgeColor?: "primary" | "accent" | "secondary";
  allergens?: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
};

export type MenuCategory = {
  key: MenuCategoryKey;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
};

const DEFAULT_CATEGORIES: MenuCategory[] = [
  { key: "all", label: "Tutti i Prodotti", icon: Sparkles },
  { key: "burgers", label: "Burgers", icon: BurgerIcon },
  { key: "special-burgers", label: "Specials", icon: Flame },
  { key: "gli-incredibili", label: "Gli Incredibili", icon: Crown },
  { key: "veggie", label: "Veggie", icon: Leaf },
  { key: "per-i-piccoli", label: "Per I Piccoli", icon: Smile },
  { key: "fish-and-chips", label: "Fish & Chips", icon: Fish },
  { key: "insalate", label: "Insalate", icon: Salad },
  { key: "desserts", label: "Desserts", icon: IceCream },
  { key: "extra", label: "Extra & Contorni", icon: FriesIcon },
  { key: "bevande", label: "Bevande", icon: GlassWater },
  { key: "birre", label: "Birre", icon: Beer },
  { key: "vini", label: "Vini", icon: Wine },
];

const DEFAULT_MENU_ITEMS: MenuItem[] = [
  // --- BURGERS ---
  {
    id: "b1",
    name: "Classic",
    category: "burgers",
    price: "€9.50",
    description: "Pane fragrante, carne di manzo scelta, bacon croccante, insalata fresca, pomodoro, cipolla, formaggio fuso e la nostra salsa speciale della casa.",
    grammage: "Disponibile da: 150g (€9.50), 200g (€11.50), 300g (€13.50), 400g (€15.50)",
    ingredients: ["Pane Artigianale", "Carne Scelta 100% Manzo", "Bacon Croccante", "Insalata & Pomodoro", "Cipolla & Formaggio Fuso", "Salsa della Casa"],
    tag: "Classico",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "b2",
    name: "Chicken",
    category: "burgers",
    price: "€9.50",
    description: "Pane croccante, deliziosa cotoletta di pollo impanata dorata, insalata fresca, pomodoro, formaggio fuso e salsa speciale della casa.",
    ingredients: ["Pane Artigianale", "Cotoletta di Pollo Croccante", "Insalata Fresca", "Pomodoro Rosso", "Formaggio Fuso", "Salsa della Casa"],
    tag: "Croccante",
    badgeColor: "accent",
    allergens: "Glutine, Lattosio, Uova"
  },
  {
    id: "b3",
    name: "Asia",
    category: "burgers",
    price: "€9.50",
    description: "Pane artigianale, saporita carne di manzo, insalata croccante, pomodoro fresco, morbida mozzarella filante e salsa agrodolce aromatica.",
    ingredients: ["Pane Artigianale", "Carne di Manzo", "Mozzarella Filante", "Insalata & Pomodoro", "Salsa Agrodolce"],
    tag: "Fusion",
    badgeColor: "secondary",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "b4",
    name: "French",
    category: "burgers",
    price: "€9.50",
    description: "Pane artigianale soffice, carne di manzo gustosa, bacon croccante, insalata, pomodoro fresco, cremoso formaggio Brie fuso e salsa della casa.",
    ingredients: ["Pane Artigianale", "Carne di Manzo", "Formaggio Brie Cremoso", "Bacon Croccante", "Pomodoro & Insalata", "Salsa della Casa"],
    tag: "Brie Cremoso",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "b5",
    name: "Genovese",
    category: "burgers",
    price: "€9.50",
    description: "Pane dorato, carne fresca, insalata, pomodoro, profumato pesto alla genovese artigianale, mozzarella filante e salsa della casa.",
    ingredients: ["Pane Dorato", "Carne Fresca", "Pesto Fresco alla Genovese", "Mozzarella Filante", "Pomodoro & Insalata", "Salsa della Casa"],
    tag: "Pesto Fresco",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio, Frutta a guscio"
  },
  {
    id: "b6",
    name: "Lago",
    category: "burgers",
    price: "€9.50",
    description: "Pane soffice, insalata fresca, croccante filetto di nasello fritto in pastella dorata, pomodoro e salsa speciale della casa.",
    grammage: "Disponibile da: 100g (€9.50), 200g (€12.50)",
    ingredients: ["Filetto di Nasello Fritto", "Pane Soffice", "Insalata Croccante", "Pomodoro Rosso", "Salsa Speciale della Casa"],
    tag: "Specialità Pesce",
    badgeColor: "accent",
    allergens: "Glutine, Pesce, Uova"
  },
  {
    id: "b7",
    name: "Monte",
    category: "burgers",
    price: "€9.50",
    description: "Pane dorato, carne di manzo, bacon croccante, insalata, pomodoro, cipolla e saporito gorgonzola cremoso con salsa della casa.",
    ingredients: ["Carne Scelta", "Gorgonzola Cremoso DOP", "Bacon Croccante", "Cipolla", "Pomodoro & Insalata", "Salsa della Casa"],
    tag: "Gorgonzola",
    badgeColor: "secondary",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "b8",
    name: "Forest",
    category: "burgers",
    price: "€9.50",
    description: "Pane artigianale, carne saporita, bacon croccante, deliziosi funghi porcini saltati in padella, cipolla, insalata, pomodoro e salsa della casa.",
    ingredients: ["Funghi Porcini Saltati", "Carne di Manzo", "Bacon Croccante", "Cipolla", "Pomodoro & Insalata", "Salsa della Casa"],
    tag: "Funghi Porcini",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "b9",
    name: "Hawaii",
    category: "burgers",
    price: "€11.30",
    description: "Pane soffice, carne di manzo, ananas dolce, insalata fresca, formaggio fuso, salsa alle fragole e salsa speciale della casa.",
    ingredients: ["Ananas Grigliato", "Carne di Manzo", "Formaggio Fuso", "Salsa alle Fragole", "Insalata", "Salsa della Casa"],
    tag: "Exotic",
    badgeColor: "accent",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "b10",
    name: "Greco",
    category: "burgers",
    price: "€9.50",
    description: "Pane artigianale, carne di manzo gustosa, insalata croccante, pomodoro, cipolla rossa, formaggio feta sbriciolato e salsa all'aglio.",
    ingredients: ["Carne di Manzo", "Feta Greca", "Cipolla Rossa", "Salsa all'Aglio", "Pomodoro & Insalata"],
    tag: "Feta & Aglio",
    badgeColor: "secondary",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "b11",
    name: "Philadelphia",
    category: "burgers",
    price: "€9.50",
    description: "Pane artigianale dorato, carne saporita, bacon croccante, insalata, pomodoro fresco, morbida crema Philadelphia e salsa della casa.",
    ingredients: ["Crema Philadelphia", "Carne di Manzo", "Bacon Croccante", "Pomodoro & Insalata", "Salsa della Casa"],
    tag: "Philadelphia",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "b12",
    name: "Heidi Burger",
    category: "burgers",
    price: "€11.50",
    description: "Pane artigianale tostato, carne di manzo fresca, morbido formaggio di capra artigianale, deliziosa marmellata di fichi dolce, insalata fresca e salsa della casa.",
    ingredients: ["Formaggio di Capra", "Marmellata di Fichi", "Carne 100% Manzo", "Insalata Fresca", "Salsa della Casa"],
    tag: "Capra & Fichi",
    badgeColor: "accent",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "b13",
    name: "Vegetarian",
    category: "burgers",
    price: "€9.50",
    description: "Pane soffice, insalata croccante, deliziosa cotoletta di soia dorata, olive nere, pomodoro maturo e formaggio fuso a scelta.",
    ingredients: ["Cotoletta di Soia", "Olive Nere", "Pomodoro Maturo", "Formaggio Fuso", "Insalata Fresca"],
    tag: "Vegetariano",
    badgeColor: "primary",
    allergens: "Glutine, Soia, Lattosio",
    isVegetarian: true
  },

  // --- SPECIAL BURGERS ---
  {
    id: "sb1",
    name: "Tartufo",
    category: "special-burgers",
    price: "€12.50",
    description: "Pane artigianale, carne scelta di manzo, pregiato olio al tartufo nero, formaggio Brie cremoso, insalata fresca e pomodoro.",
    grammage: "Disponibile da: 150g (€12.50), 200g (€14.50), 300g (€16.50), 400g (€18.50)",
    ingredients: ["Carne Scelta 100% Manzo", "Olio al Tartufo Nero", "Formaggio Brie Cremoso", "Insalata Fresca", "Pomodoro Rosso"],
    tag: "Tartufo Gourmet",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "sb2",
    name: "Datterino",
    category: "special-burgers",
    price: "€12.50",
    description: "Pane artigianale, carne scelta, saporiti pomodorini secchi datterini, philadelphia, bacon croccante, insalata e salsa della casa.",
    ingredients: ["Pomodorini Secchi Datterini", "Philadelphia Cremoso", "Carne Scelta", "Bacon Croccante", "Insalata & Salsa"],
    tag: "Datterini Secchi",
    badgeColor: "accent",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "sb3",
    name: "Smoky Forest",
    category: "special-burgers",
    price: "€12.50",
    description: "Pane brioche, carne saporita, bacon croccante affumicato, provola affumicata fusa, funghi porcini e profumata salsa BBQ affumicata.",
    ingredients: ["Provola Affumicata Fusa", "Funghi Porcini", "Bacon Affumicato", "Salsa BBQ", "Carne di Manzo"],
    tag: "Smoky BBQ",
    badgeColor: "secondary",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "sb4",
    name: "Pistacchio & Bacon",
    category: "special-burgers",
    price: "€13.00",
    description: "Pane artigianale soffice, carne di manzo, vellutata crema di pistacchio artigianale, bacon croccante, provola fusa e abbondante granella di pistacchi.",
    ingredients: ["Crema di Pistacchio", "Granella di Pistacchio", "Bacon Croccante", "Provola Fusa", "Carne Scelta"],
    tag: "Top Seller",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio, Frutta a guscio"
  },
  {
    id: "sb5",
    name: "Pulled Pork",
    category: "special-burgers",
    price: "€12.50",
    description: "Pane artigianale, succulenta spalla di maiale sfilacciata cotta a bassa temperatura in salsa BBQ, insalata coleslaw e formaggio fuso.",
    ingredients: ["Pulled Pork Cotto 12h", "Salsa BBQ", "Coleslaw Fresco", "Formaggio Fuso", "Pane Artigianale"],
    tag: "Slow Cooked",
    badgeColor: "accent",
    allergens: "Glutine, Lattosio, Senape"
  },
  {
    id: "sb6",
    name: "Pulled Chicken",
    category: "special-burgers",
    price: "€12.00",
    description: "Pane dorato, tenero pollo sfilacciato e speziato, insalata croccante, maionese alla paprika dolce e formaggio cheddar fuso.",
    ingredients: ["Pulled Chicken Speziato", "Cheddar Fuso", "Maionese alla Paprika", "Insalata Croccante"],
    tag: "Pollo Speziato",
    badgeColor: "secondary",
    allergens: "Glutine, Lattosio, Uova"
  },
  {
    id: "sb7",
    name: "Bacon Cheese",
    category: "special-burgers",
    price: "€12.50",
    description: "Pane artigianale, carne scelta, abbondante doppio bacon croccante, doppio formaggio cheddar fuso, cipolla caramellata e salsa house.",
    ingredients: ["Doppio Bacon Croccante", "Doppio Cheddar Fuso", "Cipolla Caramellata", "Salsa della Casa"],
    tag: "Doppio Bacon",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio"
  },

  // --- GLI INCREDIBILI ---
  {
    id: "inc1",
    name: "Smash Burger",
    category: "gli-incredibili",
    price: "€13.50",
    description: "Soffice pane brioche, doppio patty smash 200g schiacciato sulla piastra rovente per bordi super croccanti, cheddar fuso, bacon e salsa Smash.",
    ingredients: ["Doppio Patty Smash 200g", "Cheddar Fuso", "Bacon Croccante", "Pane Brioche Tostato", "Salsa Smash"],
    tag: "Smash Style",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "inc2",
    name: "Monster Burger",
    category: "gli-incredibili",
    price: "€17.50",
    description: "Il re del menu! Pane brioche, triplo patty 450g di carne fresca, triplo bacon croccante, triplo cheddar, anelli di cipolla e salsa BBQ.",
    ingredients: ["Triplo Patty 450g Manzo", "Triplo Bacon Croccante", "Triplo Cheddar", "Anelli di Cipolla", "Salsa BBQ"],
    tag: "XL 450g",
    badgeColor: "secondary",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "inc3",
    name: "Double Bacon Cheese",
    category: "gli-incredibili",
    price: "€14.50",
    description: "Pane brioche tostato, doppio patty 300g di carne fresca, 4 fette di bacon croccante, doppio cheddar fuso e salsa speciale della casa.",
    ingredients: ["Doppio Patty 300g Manzo", "4x Bacon Croccante", "Doppio Cheddar", "Salsa della Casa"],
    tag: "Double 300g",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "inc4",
    name: "Tower Burger",
    category: "gli-incredibili",
    price: "€16.50",
    description: "Torre spettacolare con quadruplo patty di manzo 100%, abbondante cheddar fuso a cascata, bacon croccante e salsa speciale house.",
    ingredients: ["Quadruplo Patty Manzo", "Cheddar Fuso a Cascata", "Bacon Croccante", "Salsa House"],
    tag: "Quadruplo Patty",
    badgeColor: "accent",
    allergens: "Glutine, Lattosio"
  },

  // --- VEGGIE ---
  {
    id: "v1",
    name: "Veggie Classic",
    category: "veggie",
    price: "€9.50",
    description: "Pane artigianale soffice, burger vegetale saporito a base di legumi e verdure, insalata fresca, pomodoro, formaggio e salsa della casa.",
    ingredients: ["Burger Vegetale ai Legumi", "Insalata Fresca", "Pomodoro Rosso", "Formaggio Fuso", "Salsa della Casa"],
    tag: "Vegetariano",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio",
    isVegetarian: true
  },
  {
    id: "v2",
    name: "Veggie Genovese",
    category: "veggie",
    price: "€10.00",
    description: "Pane artigianale, gustoso burger vegetale, pesto fresco alla genovese con basilico, mozzarella fresca filante e pomodoro maturo.",
    ingredients: ["Burger Vegetale", "Pesto alla Genovese", "Mozzarella Fresca", "Pomodoro Rosso"],
    tag: "Pesto & Mozzarella",
    badgeColor: "accent",
    allergens: "Glutine, Lattosio, Frutta a guscio",
    isVegetarian: true
  },
  {
    id: "v3",
    name: "Veggie Greco",
    category: "veggie",
    price: "€10.00",
    description: "Pane artigianale dorato, burger vegetale alle verdure, formaggio feta saporito, cipolla croccante, pomodoro, insalata e salsa all'aglio.",
    ingredients: ["Burger Vegetale", "Formaggio Feta Greca", "Cipolla Croccante", "Salsa all'Aglio", "Insalata & Pomodoro"],
    tag: "Feta & Aglio",
    badgeColor: "secondary",
    allergens: "Glutine, Lattosio",
    isVegetarian: true
  },

  // --- PER I PICCOLI (SEZIONE BIMBI) ---
  {
    id: "p1",
    name: "Menu Bimbo Burger",
    category: "per-i-piccoli",
    price: "€8.50",
    description: "Mini hamburger di manzo 100g con formaggio fuso, servito con un'abbondante porzione di patatine fritte dorate e bibita a scelta.",
    ingredients: ["Hamburger 100g Manzo", "Formaggio Fuso", "Patatine Fritte Dorate", "Bibita a scelta"],
    tag: "Menu Bimbi",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "p2",
    name: "Menu Bimbo Cotoletta",
    category: "per-i-piccoli",
    price: "€8.00",
    description: "Tenera cotoletta di petto di pollo dorata e croccante impanata, servita con patatine fritte e ketchup della casa.",
    ingredients: ["Cotoletta di Pollo Croccante", "Patatine Fritte Dorate", "Ketchup della Casa"],
    tag: "Menu Bimbi",
    badgeColor: "accent",
    allergens: "Glutine, Uova"
  },
  {
    id: "p3",
    name: "Nuggets & Patatine",
    category: "per-i-piccoli",
    price: "€7.50",
    description: "6 croccanti bocconcini di pollo fritti, accompagnati da patatine fritte croccanti e maionese delicata.",
    ingredients: ["6x Nuggets di Pollo Croccanti", "Patatine Fritte", "Maionese Delicata"],
    tag: "Menu Bimbi",
    badgeColor: "secondary",
    allergens: "Glutine, Uova"
  },
  {
    id: "p4",
    name: "Spritz Kid",
    category: "per-i-piccoli",
    price: "€8.50",
    description: "Delizioso hamburger per bambini servito con insalata fresca, pomodoro, cipolla dolce, formaggio fuso, maionese e patatine fritte.",
    ingredients: ["Mini Burger Manzo", "Insalata & Pomodoro", "Formaggio Fuso", "Maionese", "Patatine Fritte"],
    tag: "Menu Bimbi",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio, Uova"
  },

  // --- FISH & CHIPS ---
  {
    id: "fc1",
    name: "Fish & Chips Lago",
    category: "fish-and-chips",
    price: "€9.50",
    description: "Croccanti filetti di nasello fritti in pastella dorata, serviti con abbondanti patatine fritte croccanti e deliziosa salsa tartar della casa.",
    ingredients: ["Filetti di Nasello in Pastella", "Patatine Fritte Croccanti", "Salsa Tartar della Casa", "Spicchio di Limone"],
    tag: "Specialità Pesce",
    badgeColor: "accent",
    allergens: "Glutine, Pesce, Uova"
  },

  // --- INSALATE ---
  {
    id: "in1",
    name: "Martina",
    category: "insalate",
    price: "€14.00",
    description: "Insalata mista croccante, sfilacci di petto di pollo grigliato speziato, crostini dorati al forno, scaglie di Grana Padano DOP e salsa Caesar della casa.",
    ingredients: ["Sfilacci di Pollo Grigliato", "Insalata Mista Fresca", "Crostini Dorati", "Grana Padano DOP", "Salsa Caesar"],
    tag: "Caesar Special",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio, Uova"
  },
  {
    id: "in2",
    name: "Spritz & Burger",
    category: "insalate",
    price: "€14.00",
    description: "Insalata mista fresca di stagione, 150g di deliziose polpette di manzo grigliate al momento, pomodorini secchi e salsa della casa.",
    ingredients: ["150g Polpette di Manzo", "Insalata Mista Fresca", "Pomodorini Secchi", "Salsa della Casa"],
    tag: "Specialità Casa",
    badgeColor: "accent",
    allergens: "Glutine, Lattosio"
  },
  {
    id: "in3",
    name: "Insalata Greca",
    category: "insalate",
    price: "€9.50",
    description: "Fresca insalata misto verde, pomodoro maturo, cetrioli croccanti, cipolla rossa di Tropea, olive nere, formaggio feta greca originale e origano.",
    ingredients: ["Formaggio Feta Greca", "Pomodoro Maturo", "Cetrioli Freschi", "Cipolla Rossa di Tropea", "Olive Nere", "Origano"],
    tag: "Fresca & Light",
    badgeColor: "secondary",
    allergens: "Lattosio",
    isVegetarian: true,
    isGlutenFree: true
  },

  // --- DESSERTS ---
  {
    id: "d1",
    name: "Tiramisù Della Casa",
    category: "desserts",
    price: "€6.00",
    description: "Il classico tiramisù artigianale preparato con savoiardi imbevuti di vero caffè espresso, crema al mascarpone e spolverata di cacao amaro.",
    ingredients: ["Savoiardi Artigianali", "Caffè Espresso", "Crema al Mascarpone", "Cacao Amaro in Polvere"],
    tag: "Fatto in Casa",
    badgeColor: "primary",
    allergens: "Glutine, Lattosio, Uova",
    isVegetarian: true
  },
  {
    id: "d2",
    name: "Cheesecake Della Casa",
    category: "desserts",
    price: "€6.00",
    description: "Deliziosa e morbida cheesecake artigianale con base di biscotto croccante, servita con topping ai frutti di bosco freschi o cioccolato.",
    ingredients: ["Base Biscotto Croccante", "Crema al Formaggio", "Coulis ai Frutti di Bosco"],
    tag: "Frutti di Bosco",
    badgeColor: "accent",
    allergens: "Glutine, Lattosio",
    isVegetarian: true
  },
  {
    id: "d3",
    name: "Panna Cotta Della Casa",
    category: "desserts",
    price: "€6.00",
    description: "Panna cotta vellutata e delicata preparata fresca ogni giorno, servita con coulì di fragole mature o caramello mou.",
    ingredients: ["Panna Fresca Italiana", "Bacche di Vaniglia", "Coulì di Fragole Fresche"],
    tag: "Vellutata",
    badgeColor: "secondary",
    allergens: "Lattosio",
    isVegetarian: true,
    isGlutenFree: true
  },

  // --- EXTRA ---
  {
    id: "ex1",
    name: "Selezione Salse Gourmet",
    category: "extra",
    price: "€1.50",
    description: "Salse artigianali per accompagnare burger e patatine: Salsa BBQ Affumicata (€1.50), Salsa Piccante (€1.50), Guacamole Fresco (€2.00), Sour Cream (€1.50), Salsa alla Cipolla (€1.50), Dip al Formaggio Caldo (€2.00).",
    ingredients: ["Salsa BBQ", "Salsa Piccante", "Guacamole", "Sour Cream", "Salsa Cipolla", "Dip Formaggio"],
    tag: "Salse & Dip",
    badgeColor: "primary",
    allergens: "Lattosio, Uova",
    isVegetarian: true
  },
  {
    id: "ex2",
    name: "Condimenti & Extra",
    category: "extra",
    price: "€1.50",
    description: "Personalizza il tuo burger con i nostri extra freschi: Uovo all'occhio di bue (€1.50), Bacon Croccante (€2.00), Formaggio Fuso (€1.50), Cipolla Caramellata (€2.00), Cetrioli Freschi / Sottaceto (€2.50).",
    ingredients: ["Uovo Fritto", "Bacon Croccante", "Formaggio Fuso", "Cipolla Caramellata", "Cetrioli Freschi/Sottaceto"],
    tag: "Extra Top",
    badgeColor: "accent",
    allergens: "Uova, Lattosio",
    isVegetarian: true
  },
  {
    id: "ex3",
    name: "Pane Gluten Free",
    category: "extra",
    price: "€2.50",
    description: "Soffice pane per hamburger senza glutine di altissima qualità, tostato al momento e disponibile per qualsiasi burger a menu.",
    ingredients: ["Pane per Burger Senza Glutine Certificato"],
    tag: "Senza Glutine",
    badgeColor: "secondary",
    allergens: "Senza Glutine",
    isGlutenFree: true,
    isVegetarian: true,
    isVegan: true
  },

  // --- BEVANDE ---
  {
    id: "bev1",
    name: "Spritz Aperol della Casa",
    category: "bevande",
    price: "€8.50",
    description: "Il classico Spritz del Garda con Aperol, Prosecco DOC selezionato, selz frizzante e fetta d'arancia fresca. Servito con ghiaccio.",
    ingredients: ["Aperol", "Prosecco DOC", "Soda / Selz", "Fetta d'Arancia Fresca"],
    tag: "Aperitivo Top",
    badgeColor: "accent",
    allergens: "Solfiti",
    isGlutenFree: true,
    isVegan: true
  },
  {
    id: "bev2",
    name: "Spritz Campari",
    category: "bevande",
    price: "€8.50",
    description: "Spritz dal carattere deciso con Bitter Campari, Prosecco DOC, soda e scorza d'arancio.",
    ingredients: ["Bitter Campari", "Prosecco DOC", "Soda", "Ghiaccio & Arancia"],
    tag: "Intenso",
    badgeColor: "primary",
    allergens: "Solfiti",
    isGlutenFree: true,
    isVegan: true
  },
  {
    id: "bev3",
    name: "Sangria della Casa",
    category: "bevande",
    price: "€10.00",
    description: "Profumata sangria artigianale preparata con vino rosso locale, frutta fresca a pezzetti e spezie. Disponibile da 1/2 Litro (€10.00) o 1 Litro (€18.00).",
    grammage: "1/2 Litro (€10.00) / 1 Litro (€18.00)",
    ingredients: ["Vino Rosso locale", "Frutta Fresca di Stagione", "Spezie & Agrumi"],
    tag: "Caraffa",
    badgeColor: "secondary",
    allergens: "Solfiti",
    isGlutenFree: true,
    isVegan: true
  },
  {
    id: "bev4",
    name: "Bibite Analcoliche & Acqua",
    category: "bevande",
    price: "€2.00",
    description: "Acqua minerale 0.5L Naturale/Frizzante (€2.00), Coca Cola 0.33L (€3.50), Fanta 0.33L (€3.50), Sprite 0.33L (€3.50), Ice Tea Limone/Pesca 0.33L (€3.50), Succo di Frutta 0.2L (€3.00).",
    ingredients: ["Acqua 0.5L", "Coca Cola", "Fanta", "Sprite", "Ice Tea", "Succhetto di Frutta"],
    tag: "Refresh",
    badgeColor: "primary",
    allergens: "Nessuno",
    isGlutenFree: true,
    isVegan: true
  },
  {
    id: "bev5",
    name: "Caffetteria & Tè",
    category: "bevande",
    price: "€1.50",
    description: "Caffè Espresso (€1.50), Caffè d'Orzo (€1.80), Ginseng (€2.00), Cappuccino (€2.50), Caffè Americano (€2.20), Tè Zenzero e Limone (€3.50), Tè Melograno e Mirtillo (€3.50).",
    ingredients: ["Miscela Espresso Italiana", "Orzo / Ginseng", "Latte Fresco", "Infusi e Tè Pregiati"],
    tag: "Caffè & Tè",
    badgeColor: "secondary",
    allergens: "Lattosio (per cappuccino)",
    isGlutenFree: true,
    isVegetarian: true
  },

  // --- BIRRE ---
  {
    id: "bir1",
    name: "Birra alla Spina",
    category: "birre",
    price: "€3.50",
    description: "Birra bionda lager tedesca alla spina, fresca, dorata e fragrante con schiuma compatta. Disponibile in formato Piccola 0.2L (€3.50), Media 0.4L (€6.00) o Caraffa 2L (€22.00).",
    grammage: "Formati: 0.2L (€3.50), 0.4L (€6.00), Caraffa 2L (€22.00)",
    ingredients: ["Lager Bionda alla Spina", "Malto d'Orzo", "Luppolo Selezione"],
    tag: "Alla Spina",
    badgeColor: "primary",
    allergens: "Glutine"
  },
  {
    id: "bir2",
    name: "Birra Weizen 0,5 L",
    category: "birre",
    price: "€6.50",
    description: "Classica birra di frumento bavarese non filtrata 0.5L, dal gusto fruttato, con note di chiodo di garofano e banana.",
    ingredients: ["Malto di Frumento", "Malto d'Orzo", "Lievito Non Filtrato"],
    tag: "Weizen 50cl",
    badgeColor: "accent",
    allergens: "Glutine"
  },
  {
    id: "bir3",
    name: "Birra in Bottiglia 0,33 L",
    category: "birre",
    price: "€4.50",
    description: "Selezione di birre bionde e rosse in bottiglia 33cl delle migliori tradizioni brassicole.",
    ingredients: ["Birra in Bottiglia 33cl"],
    tag: "Bottiglia 33cl",
    badgeColor: "secondary",
    allergens: "Glutine"
  },
  {
    id: "bir4",
    name: "Birra Gluten Free 0,33 L",
    category: "birre",
    price: "€5.00",
    description: "Birra senza glutine in bottiglia 33cl, gusto pieno e rinfrescante senza compromessi.",
    ingredients: ["Birra Senza Glutine Certificata 33cl"],
    tag: "Senza Glutine",
    badgeColor: "primary",
    allergens: "Senza Glutine",
    isGlutenFree: true,
    isVegan: true
  },

  // --- VINI ---
  {
    id: "vin1",
    name: "Vino del Garda al Calice",
    category: "vini",
    price: "€5.00",
    description: "Selezione di vini locali del Garda serviti al calice: Vino Bianco (Lugana DOC / Custoza), Vino Rosso (Bardolino DOC / Groppello) o Prosecco DOC Bollicine.",
    ingredients: ["Lugana DOC / Custoza", "Bardolino DOC / Groppello", "Prosecco DOC Brut"],
    tag: "Al Calice",
    badgeColor: "accent",
    allergens: "Solfiti",
    isGlutenFree: true,
    isVegan: true
  },
  {
    id: "vin2",
    name: "Bottiglia Vino del Garda / Prosecco",
    category: "vini",
    price: "€22.00",
    description: "Bottiglia 0.75L selezionata dalla nostra cantina: Lugana DOC, Bardolino DOC Rosso o Prosecco DOC Treviso Brut.",
    ingredients: ["Bottiglia 75cl Vino DOC del Garda / Prosecco"],
    tag: "Bottiglia 75cl",
    badgeColor: "secondary",
    allergens: "Solfiti",
    isGlutenFree: true,
    isVegan: true
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
  label = "/Il Menu di Spritz & Burger",
  title = "Menu completo & specialità della casa",
  description = "Tutti i nostri hamburger con carne fresca 100% manzo, i nostri Special Burgers gourmet, la linea Gli Incredibili, opzioni Veggie, menu Bimbi, Fish & Chips, insalate, dolci fatti in casa, extra, aperitivi, birre e vini a Desenzano del Garda.",
  categories = DEFAULT_CATEGORIES,
  items = DEFAULT_MENU_ITEMS,
  ariaLabel = "Menu completo di Spritz & Burger",
  className,
}: MenuGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const [activeCategory, setActiveCategory] = useState<MenuCategoryKey>("all");
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "veggie" | "vegan" | "gluten-free">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesDietary =
      dietaryFilter === "all" ||
      (dietaryFilter === "veggie" && (item.isVegetarian || item.isVegan)) ||
      (dietaryFilter === "vegan" && item.isVegan) ||
      (dietaryFilter === "gluten-free" && item.isGlutenFree);
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients?.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesDietary && matchesSearch;
  });

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
        <div className="mx-auto mb-[clamp(2.5rem,5vw,3.5rem)] flex max-w-[48rem] flex-col items-center gap-[clamp(0.875rem,1.8vw,1.5rem)] text-center">
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

        {/* Search Bar & Category Filters */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: kit.base, ease: kit.ease, delay: 0.2 }}
          className="mb-10 flex flex-col items-center gap-6"
        >
          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cerca per nome o ingrediente (es. tartufo, capra, heidi, spritz)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-border/80 bg-card py-2.5 pl-10 pr-4 font-sans text-[length:var(--text-small)] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.key);
                  }}
                  className={cn(
                    "relative inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[length:var(--text-small)] transition-all duration-300 cursor-pointer select-none",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md scale-105"
                      : "bg-card text-foreground hover:bg-muted border border-border/70"
                  )}
                >
                  {Icon && <Icon className="size-4 shrink-0" />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dietary Legend / Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-border/40 w-full max-w-2xl">
            <span className="font-mono text-[0.75rem] text-muted-foreground uppercase tracking-wider mr-1">
              Filtra Opzioni:
            </span>
            <button
              type="button"
              onClick={() => setDietaryFilter("all")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.75rem] transition-all cursor-pointer",
                dietaryFilter === "all"
                  ? "bg-foreground text-background font-semibold"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border/60"
              )}
            >
              <span>Tutti</span>
            </button>
            <button
              type="button"
              onClick={() => setDietaryFilter(dietaryFilter === "veggie" ? "all" : "veggie")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.75rem] transition-all cursor-pointer border",
                dietaryFilter === "veggie"
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500 font-semibold"
                  : "bg-card text-emerald-600 dark:text-emerald-400/80 border-emerald-500/30 hover:bg-emerald-500/10"
              )}
            >
              <Leaf className="size-3.5" />
              <span>Vegetariano</span>
            </button>
            <button
              type="button"
              onClick={() => setDietaryFilter(dietaryFilter === "vegan" ? "all" : "vegan")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.75rem] transition-all cursor-pointer border",
                dietaryFilter === "vegan"
                  ? "bg-green-500/20 text-green-400 border-green-500 font-semibold"
                  : "bg-card text-green-600 dark:text-green-400/80 border-green-500/30 hover:bg-green-500/10"
              )}
            >
              <VeganIcon className="size-3.5" />
              <span>Vegano</span>
            </button>
            <button
              type="button"
              onClick={() => setDietaryFilter(dietaryFilter === "gluten-free" ? "all" : "gluten-free")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.75rem] transition-all cursor-pointer border",
                dietaryFilter === "gluten-free"
                  ? "bg-amber-500/20 text-amber-400 border-amber-500 font-semibold"
                  : "bg-card text-amber-600 dark:text-amber-400/80 border-amber-500/30 hover:bg-amber-500/10"
              )}
            >
              <GlutenFreeIcon className="size-3.5" />
              <span>Senza Glutine</span>
            </button>
          </div>
        </motion.div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="my-12 flex flex-col items-center justify-center text-center p-8 rounded-[var(--radius-card)] bg-card border border-border/60">
            <Utensils className="size-10 text-muted-foreground mb-3 opacity-50" />
            <p className="font-heading text-[length:var(--text-h3)] text-foreground">Nessun prodotto trovato</p>
            <p className="font-sans text-[length:var(--text-small)] text-muted-foreground mt-1">
              Prova a cambiare la ricerca, la categoria o il filtro alimentari.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setDietaryFilter("all");
                setSearchQuery("");
              }}
              className="btn-secondary mt-4"
            >
              <span className="btn-label">Mostra tutti i prodotti</span>
            </button>
          </div>
        )}

        {/* Dynamic Category Blocks & Product Grid (Without Dish Photos) */}
        {filteredItems.length > 0 && (
          <div className="space-y-12">
            {categories
              .filter((c) => c.key !== "all" && (activeCategory === "all" || activeCategory === c.key))
              .map((cat) => {
                const catItems = filteredItems.filter((i) => i.category === cat.key);
                if (catItems.length === 0) return null;
                const CatIcon = cat.icon ?? Utensils;

                return (
                  <motion.div
                    key={cat.key}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Category Header with Thematic Icon */}
                    <div className="flex items-center justify-between border-b border-border/60 pb-3 pt-2">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-accent/15 text-accent shadow-sm shrink-0">
                          <CatIcon className="size-5" />
                        </div>
                        <div className="flex items-baseline gap-2.5">
                          <h3 className="font-heading text-[length:var(--text-h2)] font-bold text-foreground">
                            {cat.label}
                          </h3>
                          <span className="font-mono text-[length:var(--text-small)] text-accent font-semibold">
                            ({catItems.length})
                          </span>
                        </div>
                      </div>
                      {searchQuery && activeCategory === "all" && (
                        <span className="font-mono text-[length:var(--text-small)] text-muted-foreground hidden sm:block">
                          Risultati ricerca
                        </span>
                      )}
                    </div>

                    {/* Products Grid in Category */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                      {catItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={reduce ? false : { opacity: 0, scale: 0.95, y: 16 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -16 }}
                          transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.2) }}
                          className="group relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] bg-card border border-border/70 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-accent/40"
                        >
                          <div>
                            {/* Card Top: Dish Name + Intolerance Symbols beside it + Price */}
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className="flex flex-col gap-1.5 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="font-heading text-[length:var(--text-h3)] font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
                                    {item.name}
                                  </h3>

                                  {/* Intolerance / Dietary Symbols right next to the title */}
                                  {(item.isVegetarian || item.isVegan || item.isGlutenFree) && (
                                    <div className="inline-flex flex-wrap items-center gap-1">
                                      {item.isVegetarian && (
                                        <span
                                          className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 font-mono text-[0.6875rem] font-medium"
                                          title="Opzione Vegetariana"
                                        >
                                          <Leaf className="size-3 shrink-0" />
                                          <span>Veggie</span>
                                        </span>
                                      )}
                                      {item.isVegan && (
                                        <span
                                          className="inline-flex items-center gap-1 rounded-full bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/30 px-2 py-0.5 font-mono text-[0.6875rem] font-medium"
                                          title="Opzione Vegana"
                                        >
                                          <VeganIcon className="size-3 shrink-0" />
                                          <span>Vegan</span>
                                        </span>
                                      )}
                                      {item.isGlutenFree && (
                                        <span
                                          className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-2 py-0.5 font-mono text-[0.6875rem] font-medium"
                                          title="Senza Glutine"
                                        >
                                          <GlutenFreeIcon className="size-3 shrink-0" />
                                          <span>No Glutine</span>
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>

                                {item.tag && (
                                  <span
                                    className={cn(
                                      "inline-block rounded-md px-2 py-0.5 font-mono text-[0.6875rem] font-medium uppercase tracking-wider w-fit",
                                      item.badgeColor === "accent"
                                        ? "bg-accent/15 text-accent border border-accent/30"
                                        : item.badgeColor === "secondary"
                                        ? "bg-secondary/15 text-secondary-foreground border border-secondary/30"
                                        : "bg-primary/15 text-primary border border-primary/30"
                                    )}
                                  >
                                    {item.tag}
                                  </span>
                                )}
                              </div>

                              {/* Price */}
                              <span className="font-mono text-[length:var(--text-h3)] font-bold text-accent shrink-0 pt-0.5">
                                {item.price}
                              </span>
                            </div>

                            {/* Description */}
                            <p className="font-sans text-[length:var(--text-small)] leading-relaxed text-muted-foreground mt-1">
                              {item.description}
                            </p>

                            {/* Grammage */}
                            {item.grammage && (
                              <p className="mt-2.5 font-mono text-[0.725rem] text-accent/90 bg-accent/10 px-2.5 py-1 rounded-md border border-accent/20">
                                {item.grammage}
                              </p>
                            )}

                            {/* Ingredients */}
                            {item.ingredients && item.ingredients.length > 0 && (
                              <div className="mt-3.5 pt-3 border-t border-border/40">
                                <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground block mb-1.5">
                                  Ingredienti principali:
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {item.ingredients.map((ing, i) => (
                                    <span
                                      key={i}
                                      className="inline-flex items-center gap-1 font-mono text-[0.7rem] text-foreground/80 bg-muted/70 border border-border/50 px-2 py-0.5 rounded-md"
                                    >
                                      <Check className="size-3 text-accent shrink-0" />
                                      {ing}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Action Button */}
                          <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => setSelectedItem(item)}
                              className="inline-flex items-center gap-1.5 font-mono text-[length:var(--text-small)] text-primary hover:text-accent transition-colors duration-200 font-medium cursor-pointer"
                            >
                              <span>Dettagli & Allergeni</span>
                              <ChevronRight className="size-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
          </div>
        )}

        {/* Bottom CTA / Note */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: kit.base, ease: kit.ease, delay: 0.3 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[var(--radius-card)] bg-card border border-border/80 p-6 sm:p-8 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Sparkles className="size-6" />
            </div>
            <div>
              <h4 className="font-heading text-[length:var(--text-h3)] text-foreground">
                Vuoi un tavolo nel nostro cortile coperto a Desenzano?
              </h4>
              <p className="font-sans text-[length:var(--text-small)] text-muted-foreground mt-0.5">
                Prenota in anticipo per goderti hamburger gourmet e spritz rinfrescanti.
              </p>
            </div>
          </div>
          <a href="#contact-reserve-form" className="btn-primary shrink-0">
            <span className="btn-label">Prenota un Tavolo</span>
          </a>
        </motion.div>
      </div>

      {/* Modal Detail Dialog (Without Dish Photo) */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-2xl text-foreground p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full bg-muted/80 text-foreground hover:bg-muted transition-colors shadow-sm"
                aria-label="Chiudi"
              >
                <X className="size-5" />
              </button>

              {/* Modal Header */}
              <div className="pr-8">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {selectedItem.tag && (
                    <span className="rounded-full bg-accent/15 text-accent border border-accent/30 px-3 py-0.5 font-mono text-[0.75rem] uppercase font-semibold">
                      {selectedItem.tag}
                    </span>
                  )}
                  {selectedItem.isVegetarian && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 font-mono text-[0.75rem] font-medium">
                      <Leaf className="size-3.5" />
                      <span>Vegetariano</span>
                    </span>
                  )}
                  {selectedItem.isVegan && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/30 px-2.5 py-0.5 font-mono text-[0.75rem] font-medium">
                      <VeganIcon className="size-3.5" />
                      <span>Vegano</span>
                    </span>
                  )}
                  {selectedItem.isGlutenFree && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-2.5 py-0.5 font-mono text-[0.75rem] font-medium">
                      <GlutenFreeIcon className="size-3.5" />
                      <span>Senza Glutine</span>
                    </span>
                  )}
                </div>

                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-heading text-[length:var(--text-h2)] font-normal text-foreground">
                    {selectedItem.name}
                  </h3>
                  <span className="font-mono text-[length:var(--text-h2)] font-bold text-accent">
                    {selectedItem.price}
                  </span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="mt-4">
                <p className="font-sans text-[length:var(--text-body)] text-muted-foreground leading-relaxed">
                  {selectedItem.description}
                </p>

                {selectedItem.grammage && (
                  <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <p className="font-mono text-[length:var(--text-small)] text-accent font-semibold">
                      {selectedItem.grammage}
                    </p>
                  </div>
                )}

                {selectedItem.ingredients && selectedItem.ingredients.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] text-foreground mb-3 before:content-['/']">
                      Ingredienti & Composizione
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

                <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-border/40">
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
