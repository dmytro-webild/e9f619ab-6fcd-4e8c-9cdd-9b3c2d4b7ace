import { createContext, useContext, useState, type ReactNode } from "react";

export type Language = "it" | "en" | "de";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
};

const STORAGE_KEY = "spritz_burger_lang";

const translations: Record<Language, Record<string, string>> = {
  it: {
    // Navigation
    "nav.menu": "Il Menu",
    "nav.services": "Spritz Culture",
    "nav.gallery": "Il Cortile",
    "nav.reviews": "Recensioni",
    "nav.contact": "Dove Siamo",
    "nav.book": "Prenota un Tavolo",
    "nav.openMenu": "Menu",
    "nav.closeMenu": "Chiudi",

    // Hero
    "hero.title": "Spritz & Burger",
    "hero.description": "Gourmet burger e aperitivi a Desenzano. Carne fresca ogni giorno e cortile coperto.",
    "hero.leftLabel": "/Attivi dal 2012",
    "hero.rightLabel": "/Scopri il menu",
    "hero.marquee1": "Hamburger Gourmet",
    "hero.marquee2": "Aperitivo Italiano",
    "hero.marquee3": "Cortile Coperto",

    // Menu section
    "menu.label": "/Il Menu di Desenzano",
    "menu.title": "Le nostre specialità gourmet & aperitivi",
    "menu.description": "Carne fresca 100% manzo selezionata ogni giorno, pane artigianale dorato, contorni croccanti e i leggendari Spritz preparati nel nostro cortile a Desenzano del Garda.",
    "menu.searchPlaceholder": "Cerca per nome o ingrediente (es. tartufo, capra, heidi, spritz)...",
    "menu.filterLabel": "Filtra Opzioni:",
    "menu.filterAll": "Tutti",
    "menu.filterVeggie": "Vegetariano",
    "menu.filterVegan": "Vegano",
    "menu.filterGlutenFree": "Senza Glutine",
    "menu.noResults": "Nessun prodotto trovato",
    "menu.noResultsSub": "Prova a cambiare la ricerca, la categoria o il filtro alimentari.",
    "menu.showAll": "Mostra tutti i prodotti",
    "menu.detailsBtn": "Dettagli & Allergeni",
    "menu.ingredientsLabel": "Ingredienti principali:",
    "menu.allergensLabel": "Allergeni:",
    "menu.closeModal": "Chiudi",
    "menu.orderModal": "Ordina / Prenota Tavolo",
    "menu.ctaTitle": "Vuoi un tavolo nel nostro cortile coperto a Desenzano?",
    "menu.ctaSub": "Prenota in anticipo per goderti hamburger gourmet e spritz rinfrescanti.",
    "menu.ctaBtn": "Prenota un Tavolo",

    // Menu Categories
    "cat.all": "Tutti i Prodotti",
    "cat.burgers": "Burgers",
    "cat.special-burgers": "Specials",
    "cat.gli-incredibili": "Gli Incredibili",
    "cat.veggie": "Veggie",
    "cat.per-i-piccoli": "Per I Piccoli",
    "cat.fish-and-chips": "Fish & Chips",
    "cat.insalate": "Insalate",
    "cat.desserts": "Desserts",
    "cat.extra": "Extra & Contorni",
    "cat.bevande": "Bevande",
    "cat.birre": "Birre",
    "cat.vini": "Vini",

    // Services / Aperitivo
    "services.label": "APERITIVO SUL GARDA",
    "services.title": "L'ora dello spritz a Desenzano",
    "services.item1Title": "Spritz Classici",
    "services.item1Desc": "Aperol, Campari o Hugo preparati a regola d'arte con Prosecco selezionato e guarnizioni fresche nel nostro cortile.",
    "services.item1Cta": "Scopri i burger",
    "services.item2Title": "Birre Artigianali",
    "services.item2Desc": "Bionde e rosse alla spina selezionate per esaltare i sapori intensi dei nostri hamburger di carne fresca.",
    "services.item2Cta": "Vedi menu",
    "services.item3Title": "Cortile Coperto",
    "services.item3Desc": "Un'atmosfera rilassata e accogliente a due passi dal lago, perfetta per la convivialità e il relax serale.",
    "services.item3Cta": "Prenota tavolo",

    // Pricing / Formulas
    "pricing.label": "Menu Speciali",
    "pricing.title": "Formule e menu speciali",
    "pricing.description": "Scopri le nostre proposte per abbinare hamburger gourmet, contorni croccanti e i classici spritz del Garda.",
    "pricing.featuredTag": "Più richiesto",
    "pricing.perPerson": "a persona",

    // Gallery
    "gallery.label": "IL LOCALE",
    "gallery.title": "Il cortile coperto",
    "gallery.cap1": "I nostri burger e birre",
    "gallery.cap2": "Aperitivo Aperol Spritz",
    "gallery.cap3": "Ambiente accogliente",
    "gallery.cap4": "Serate in compagnia",
    "gallery.cap5": "Selezione carne dello chef",
    "gallery.cap6": "Dettagli del locale",

    // Testimonials
    "testimonials.label": "Dicono di noi",
    "testimonials.title": "Le opinioni dei nostri ospiti",

    // Contact / Reservation
    "contact.label": "INFORMAZIONI",
    "contact.title": "Domande e prenotazioni",
    "contact.description": "Contattaci per informazioni o riserva subito un tavolo nel nostro cortile coperto nel centro di Desenzano.",
    "contact.submit": "Invia richiesta",
    "contact.success": "Grazie, ti confermeremo la prenotazione via email.",
    "contact.sticker": "Ti aspettiamo",
    "contact.nameLabel": "Nome",
    "contact.emailLabel": "Email",
    "contact.dateLabel": "Data",
    "contact.guestsLabel": "Ospiti",
    "contact.noteLabel": "Note",
    "contact.addrLabel": "Via Roma, 27, Desenzano del Garda BS",
    "contact.hoursLabel": "Tutti i giorni: 12-14:30 / 18:30-23",
    "contact.phoneLabel": "Tel: 030 618 9497",

    // Footer
    "footer.newsletter": "Rimani aggiornato",
    "footer.emailLabel": "Email*",
    "footer.submit": "Iscriviti",
    "footer.success": "Iscrizione effettuata con successo",
    "footer.caption": "/Il vero gusto di Desenzano del Garda",
    "footer.copyright": "© 2026 SPRITZ & BURGER DESENZANO. Tutti i diritti riservati.",
    "footer.credit": "Desenzano del Garda",
    "footer.colAddress": "Indirizzo",
    "footer.colHours": "Orari",
    "footer.colContact": "Contatti",
    "footer.colSocial": "Social",
    "footer.colPages": "Pagine",
    "footer.addressLine1": "Via Roma, 27, 25015 Desenzano del Garda BS",
    "footer.addressLine2": "Indicazioni stradali",
    "footer.hoursLine1": "Tutti i giorni 12:00-14:30 / 18:30-23:00",
    "footer.hoursLine2": "Cortile coperto aperto tutto l'anno",

    // QR Code
    "qr.title": "Menu Digitale QR",
    "qr.subtitle": "Scansiona col telefono per consultare il menu digitale da tavolo!",
    "qr.badge": "SCAN MENU",
    "qr.scanHint": "Inquadra per aprire il menu",
    "qr.clickToEnlarge": "Clicca per ingrandire",
    "qr.closeModal": "Chiudi QR Code"
  },
  en: {
    // Navigation
    "nav.menu": "The Menu",
    "nav.services": "Spritz Culture",
    "nav.gallery": "The Courtyard",
    "nav.reviews": "Reviews",
    "nav.contact": "Location",
    "nav.book": "Book a Table",
    "nav.openMenu": "Menu",
    "nav.closeMenu": "Close",

    // Hero
    "hero.title": "Spritz & Burger",
    "hero.description": "Gourmet burgers and aperitifs in Desenzano. Daily fresh beef and covered courtyard.",
    "hero.leftLabel": "/Serving since 2012",
    "hero.rightLabel": "/Explore the menu",
    "hero.marquee1": "Gourmet Burgers",
    "hero.marquee2": "Italian Aperitivo",
    "hero.marquee3": "Covered Courtyard",

    // Menu section
    "menu.label": "/The Desenzano Menu",
    "menu.title": "Our gourmet specialties & aperitifs",
    "menu.description": "100% fresh beef selected daily, golden artisanal buns, crispy sides, and legendary Spritz cocktails prepared in our courtyard in Desenzano del Garda.",
    "menu.searchPlaceholder": "Search by name or ingredient (e.g. truffle, goat cheese, spritz)...",
    "menu.filterLabel": "Filter Options:",
    "menu.filterAll": "All",
    "menu.filterVeggie": "Vegetarian",
    "menu.filterVegan": "Vegan",
    "menu.filterGlutenFree": "Gluten Free",
    "menu.noResults": "No items found",
    "menu.noResultsSub": "Try changing your search keywords, category, or dietary filters.",
    "menu.showAll": "Show all items",
    "menu.detailsBtn": "Details & Allergens",
    "menu.ingredientsLabel": "Main ingredients:",
    "menu.allergensLabel": "Allergens:",
    "menu.closeModal": "Close",
    "menu.orderModal": "Order / Book a Table",
    "menu.ctaTitle": "Would you like a table in our covered courtyard in Desenzano?",
    "menu.ctaSub": "Reserve in advance to enjoy gourmet burgers and refreshing spritz.",
    "menu.ctaBtn": "Book a Table",

    // Menu Categories
    "cat.all": "All Products",
    "cat.burgers": "Burgers",
    "cat.special-burgers": "Specials",
    "cat.gli-incredibili": "The Incredibles",
    "cat.veggie": "Veggie",
    "cat.per-i-piccoli": "Kids Menu",
    "cat.fish-and-chips": "Fish & Chips",
    "cat.insalate": "Salads",
    "cat.desserts": "Desserts",
    "cat.extra": "Extras & Sides",
    "cat.bevande": "Drinks",
    "cat.birre": "Beers",
    "cat.vini": "Wines",

    // Services / Aperitivo
    "services.label": "APERITIVO ON LAKE GARDA",
    "services.title": "Spritz time in Desenzano",
    "services.item1Title": "Classic Spritz",
    "services.item1Desc": "Aperol, Campari, or Hugo expertly crafted with selected Prosecco and fresh garnishes in our courtyard.",
    "services.item1Cta": "Explore burgers",
    "services.item2Title": "Craft Beers",
    "services.item2Desc": "Draft lagers and ales selected to enhance the bold flavors of our fresh beef burgers.",
    "services.item2Cta": "View menu",
    "services.item3Title": "Covered Courtyard",
    "services.item3Desc": "A relaxed and cozy atmosphere steps away from the lake, perfect for gathering and evening relaxation.",
    "services.item3Cta": "Reserve table",

    // Pricing / Formulas
    "pricing.label": "Special Menus",
    "pricing.title": "Combos and special set menus",
    "pricing.description": "Discover our combo offers pairing gourmet burgers, crispy sides, and classic Garda spritz.",
    "pricing.featuredTag": "Most Popular",
    "pricing.perPerson": "per person",

    // Gallery
    "gallery.label": "THE VENUE",
    "gallery.title": "The covered courtyard",
    "gallery.cap1": "Our burgers & craft beers",
    "gallery.cap2": "Aperol Spritz aperitif",
    "gallery.cap3": "Cozy ambience",
    "gallery.cap4": "Evenings with friends",
    "gallery.cap5": "Chef's beef selection",
    "gallery.cap6": "Venue details",

    // Testimonials
    "testimonials.label": "Testimonials",
    "testimonials.title": "What our guests say",

    // Contact / Reservation
    "contact.label": "INFORMATION",
    "contact.title": "Questions & Reservations",
    "contact.description": "Contact us for information or book a table now in our covered courtyard in central Desenzano.",
    "contact.submit": "Submit request",
    "contact.success": "Thank you, we will confirm your booking via email.",
    "contact.sticker": "We look forward to seeing you",
    "contact.nameLabel": "Name",
    "contact.emailLabel": "Email",
    "contact.dateLabel": "Date",
    "contact.guestsLabel": "Guests",
    "contact.noteLabel": "Notes / Special Requests",
    "contact.addrLabel": "Via Roma, 27, Desenzano del Garda BS",
    "contact.hoursLabel": "Every day: 12:00-14:30 / 18:30-23:00",
    "contact.phoneLabel": "Phone: +39 030 618 9497",

    // Footer
    "footer.newsletter": "Stay updated",
    "footer.emailLabel": "Email*",
    "footer.submit": "Subscribe",
    "footer.success": "Successfully subscribed",
    "footer.caption": "/The true taste of Desenzano del Garda",
    "footer.copyright": "© 2026 SPRITZ & BURGER DESENZANO. All rights reserved.",
    "footer.credit": "Desenzano del Garda",
    "footer.colAddress": "Address",
    "footer.colHours": "Hours",
    "footer.colContact": "Contact",
    "footer.colSocial": "Social",
    "footer.colPages": "Pages",
    "footer.addressLine1": "Via Roma, 27, 25015 Desenzano del Garda BS",
    "footer.addressLine2": "Get directions",
    "footer.hoursLine1": "Every day 12:00-14:30 / 18:30-23:00",
    "footer.hoursLine2": "Covered courtyard open all year round",

    // QR Code
    "qr.title": "Digital Menu QR Code",
    "qr.subtitle": "Scan with your mobile phone to view the interactive table menu!",
    "qr.badge": "SCAN MENU",
    "qr.scanHint": "Point camera to open menu",
    "qr.clickToEnlarge": "Click to enlarge",
    "qr.closeModal": "Close QR Code"
  },
  de: {
    // Navigation
    "nav.menu": "Speisekarte",
    "nav.services": "Spritz Kultur",
    "nav.gallery": "Der Innenhof",
    "nav.reviews": "Bewertungen",
    "nav.contact": "Standort",
    "nav.book": "Tisch reservieren",
    "nav.openMenu": "Menü",
    "nav.closeMenu": "Schließen",

    // Hero
    "hero.title": "Spritz & Burger",
    "hero.description": "Gourmet-Burger und Aperitifs in Desenzano. Täglich frisches Rindfleisch und überdachter Innenhof.",
    "hero.leftLabel": "/Aktiv seit 2012",
    "hero.rightLabel": "/Speisekarte entdecken",
    "hero.marquee1": "Gourmet-Burger",
    "hero.marquee2": "Italienischer Aperitif",
    "hero.marquee3": "Überdachter Innenhof",

    // Menu section
    "menu.label": "/Die Speisekarte von Desenzano",
    "menu.title": "Unsere Gourmet-Spezialitäten & Aperitifs",
    "menu.description": "Täglich ausgewähltes 100% frisches Rindfleisch, goldene handwerkliche Brötchen, knusprige Beilagen und legendärer Spritz in unserem Innenhof in Desenzano del Garda.",
    "menu.searchPlaceholder": "Nach Name oder Zutaten suchen (z. B. Trüffel, Ziegenkäse, Spritz)...",
    "menu.filterLabel": "Optionen filtern:",
    "menu.filterAll": "Alle",
    "menu.filterVeggie": "Vegetarisch",
    "menu.filterVegan": "Vegan",
    "menu.filterGlutenFree": "Glutenfrei",
    "menu.noResults": "Keine Produkte gefunden",
    "menu.noResultsSub": "Versuchen Sie, den Suchbegriff, die Kategorie oder den Ernährungsfilter zu ändern.",
    "menu.showAll": "Alle Produkte anzeigen",
    "menu.detailsBtn": "Details & Allergene",
    "menu.ingredientsLabel": "Hauptzutaten:",
    "menu.allergensLabel": "Allergene:",
    "menu.closeModal": "Schließen",
    "menu.orderModal": "Bestellen / Tisch reservieren",
    "menu.ctaTitle": "Möchten Sie einen Tisch in unserem überdachten Innenhof in Desenzano?",
    "menu.ctaSub": "Buchen Sie im Voraus, um Gourmet-Burger und erfrischenden Spritz zu genießen.",
    "menu.ctaBtn": "Tisch reservieren",

    // Menu Categories
    "cat.all": "Alle Produkte",
    "cat.burgers": "Burger",
    "cat.special-burgers": "Spezialitäten",
    "cat.gli-incredibili": "Die Unglaublichen",
    "cat.veggie": "Veggie",
    "cat.per-i-piccoli": "Für Kinder",
    "cat.fish-and-chips": "Fish & Chips",
    "cat.insalate": "Salate",
    "cat.desserts": "Desserts",
    "cat.extra": "Extras & Beilagen",
    "cat.bevande": "Getränke",
    "cat.birre": "Biere",
    "cat.vini": "Weine",

    // Services / Aperitivo
    "services.label": "APERITIF AM GARDASEE",
    "services.title": "Zeit für Spritz in Desenzano",
    "services.item1Title": "Klassischer Spritz",
    "services.item1Desc": "Aperol, Campari oder Hugo meisterhaft zubereitet mit ausgewähltem Prosecco und frischen Garnituren in unserem Innenhof.",
    "services.item1Cta": "Burger entdecken",
    "services.item2Title": "Handwerkliche Biere",
    "services.item2Desc": "Ausgewählte Biere vom Fass, um die intensiven Aromen unserer frischen Rindfleisch-Burger zu unterstreichen.",
    "services.item2Cta": "Speisekarte ansehen",
    "services.item3Title": "Überdachter Innenhof",
    "services.item3Desc": "Eine entspannte und gemütliche Atmosphäre nur wenige Schritte vom See entfernt, perfekt zum Beisammensein.",
    "services.item3Cta": "Tisch reservieren",

    // Pricing / Formulas
    "pricing.label": "Spezialmenüs",
    "pricing.title": "Angebote und Spezialmenüs",
    "pricing.description": "Entdecken Sie unsere Angebote zur Kombination von Gourmet-Burgern, knusprigen Beilagen und klassischem Garda-Spritz.",
    "pricing.featuredTag": "Beliebtestes",
    "pricing.perPerson": "pro Person",

    // Gallery
    "gallery.label": "DAS LOKAL",
    "gallery.title": "Der überdachte Innenhof",
    "gallery.cap1": "Unsere Burger & Biere",
    "gallery.cap2": "Aperol Spritz Aperitif",
    "gallery.cap3": "Gemütliche Atmosphäre",
    "gallery.cap4": "Abende mit Freunden",
    "gallery.cap5": "Rindfleischauswahl des Küchenchefs",
    "gallery.cap6": "Details des Lokals",

    // Testimonials
    "testimonials.label": "Bewertungen",
    "testimonials.title": "Das sagen unsere Gäste",

    // Contact / Reservation
    "contact.label": "INFORMATIONEN",
    "contact.title": "Fragen & Reservierungen",
    "contact.description": "Kontaktieren Sie uns für Informationen oder buchen Sie jetzt einen Tisch in unserem überdachten Innenhof im Zentrum von Desenzano.",
    "contact.submit": "Anfrage senden",
    "contact.success": "Vielen Dank, wir werden Ihre Reservierung per E-Mail bestätigen.",
    "contact.sticker": "Wir freuen uns auf Sie",
    "contact.nameLabel": "Name",
    "contact.emailLabel": "E-Mail",
    "contact.dateLabel": "Datum",
    "contact.guestsLabel": "Gäste",
    "contact.noteLabel": "Anmerkungen / Sonderwünsche",
    "contact.addrLabel": "Via Roma, 27, Desenzano del Garda BS",
    "contact.hoursLabel": "Täglich: 12:00-14:30 / 18:30-23:00",
    "contact.phoneLabel": "Tel: +39 030 618 9497",

    // Footer
    "footer.newsletter": "Bleiben Sie auf dem Laufenden",
    "footer.emailLabel": "E-Mail*",
    "footer.submit": "Abonnieren",
    "footer.success": "Erfolgreich abonniert",
    "footer.caption": "/Der wahre Geschmack von Desenzano del Garda",
    "footer.copyright": "© 2026 SPRITZ & BURGER DESENZANO. Alle Rechte vorbehalten.",
    "footer.credit": "Desenzano del Garda",
    "footer.colAddress": "Adresse",
    "footer.colHours": "Öffnungszeiten",
    "footer.colContact": "Kontakt",
    "footer.colSocial": "Social Media",
    "footer.colPages": "Seiten",
    "footer.addressLine1": "Via Roma, 27, 25015 Desenzano del Garda BS",
    "footer.addressLine2": "Anfahrt anzeigen",
    "footer.hoursLine1": "Täglich 12:00-14:30 / 18:30-23:00",
    "footer.hoursLine2": "Überdachter Innenhof das ganze Jahr über geöffnet",

    // QR Code
    "qr.title": "Digitaler Speisekarte QR-Code",
    "qr.subtitle": "Mit dem Smartphone scannen, um die interaktive Speisekarte abzurufen!",
    "qr.badge": "SPEISEKARTE SCANNEN",
    "qr.scanHint": "Kamera ausrichten zum Öffnen",
    "qr.clickToEnlarge": "Klicken zum Vergrößern",
    "qr.closeModal": "QR-Code schließen"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved && ["it", "en", "de"].includes(saved)) {
        return saved;
      }
    }
    return "it";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  const t = (key: string, fallback?: string): string => {
    return translations[language]?.[key] ?? translations["it"]?.[key] ?? fallback ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
