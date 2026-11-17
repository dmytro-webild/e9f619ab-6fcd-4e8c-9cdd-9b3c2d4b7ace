import HeroWordmarkWindow from "@/components/sections/hero/HeroWordmarkWindow";
import ProductBestsellerTrack from "@/components/sections/product/ProductBestsellerTrack";
import MenuElegantGrid from "@/components/sections/menu/MenuElegantGrid";
import FeaturesStackedOffers from "@/components/sections/features/FeaturesStackedOffers";
import PricingWorkshopTickets from "@/components/sections/pricing/PricingWorkshopTickets";
import GalleryCornerMasks from "@/components/sections/gallery/GalleryCornerMasks";
import TestimonialVideoCoverflow from "@/components/sections/testimonial/TestimonialVideoCoverflow";
import ContactReserveForm from "@/components/sections/contact/ContactReserveForm";
import LoaderPanelFlick from "@/components/loaders/LoaderPanelFlick";

export default function HomePage() {
  return (
    <>
      <LoaderPanelFlick
        images={[
          "https://img.b2bpic.net/free-photo/tasty-sandwich-red-fork-wooden-cutting-board-dark-mix-color-surface_179666-42257.jpg",
          "https://img.b2bpic.net/free-photo/delicious-italian-cocktail-with-realistic-background_23-2150062921.jpg",
          "https://img.b2bpic.net/free-photo/view-delicious-burger-with-buns-cheese_23-2150887800.jpg",
          "https://img.b2bpic.net/free-photo/enjoying-street-food-fest_23-2151543708.jpg",
          "https://img.b2bpic.net/free-photo/top-view-friends-clinking-glasses_23-2149412441.jpg"
        ]}
        label="/ Griglia in carica"
        caption="/ Aperitivo & Burger dal 2012"
      />

      <div id="hero" data-webild-section="HeroWordmarkWindow" data-webild-section-id="HeroWordmarkWindow-1" data-section="hero" data-scene>
        <HeroWordmarkWindow
          title="Spritz & Burger"
          description="Gourmet burger e aperitivi a Desenzano. Carne fresca ogni giorno e cortile coperto."
          imageSrc="https://img.b2bpic.net/free-photo/delicious-sandwich-ketchup-tomatoes-with-stem-dark-mix-color-surface-with-free-space_179666-42225.jpg"
          imageAlt="classic beef burger on dark surface"
          leftLabel="/Attivi dal 2012"
          rightLabel="/Scopri il menu"
          marquee={[
            "Hamburger Gourmet",
            "Aperitivo Italiano",
            "Cortile Coperto"
          ]}
          introDelay={3}
          handoff
        />
      </div>

      <div id="menu" data-webild-section="MenuElegantGrid" data-webild-section-id="MenuElegantGrid-1" data-section="menu" data-scene>
        <MenuElegantGrid
          label="/Il Menu di Desenzano"
          title="Le nostre specialità gourmet & aperitivi"
          description="Carne fresca 100% manzo selezionata ogni giorno, pane artigianale dorato, contorni croccanti e i leggendari Spritz preparati nel nostro cortile a Desenzano del Garda."
        />
      </div>

      <div id="product" data-webild-section="ProductBestsellerTrack" data-webild-section-id="ProductBestsellerTrack-1" data-section="product" data-scene>
        <ProductBestsellerTrack
          label="/I bestseller della casa"
          title="Gusto unico e carne fresca ogni giorno a Desenzano"
          items={[
            {
              name: "Classic Royal",
              price: "€14",
              imageSrc: "https://img.b2bpic.net/free-photo/front-view-meat-burger-with-salad-cheese-tomatoes-dark-desk-bun-sandwich-fast-food_140725-89542.jpg",
              imageAlt: "Front view meat burger with salad cheese and tomatoes on dark desk bun sandwich fast-food"
            },
            {
              name: "Crispy Bacon",
              price: "€16",
              imageSrc: "https://img.b2bpic.net/free-photo/side-view-burger-with-beef-patty-grilled-red-onion-tomato-lettuce-burger-buns-french-fries-orange-drink-table_141793-3607.jpg",
              imageAlt: "Side view burger with beef patty grilled red onion tomato lettuce in burger buns french fries and orange drink on the table"
            },
            {
              name: "Truffle Delight",
              price: "€18",
              imageSrc: "https://img.b2bpic.net/free-photo/potato-patties-topped-with-beef-patties-shoe-strings_140725-5889.jpg",
              imageAlt: "Potato patties topped with beef patties and shoe strings"
            },
            {
              name: "Garden Fresh",
              price: "€15",
              imageSrc: "https://img.b2bpic.net/free-photo/high-angle-close-up-burger-wooden-board_23-2148238518.jpg",
              imageAlt: "High angle close-up of burger on wooden board"
            },
            {
              name: "Spicy Desenzano",
              price: "€17",
              imageSrc: "https://img.b2bpic.net/free-photo/black-burger-with-side-fries-cola_140725-2702.jpg",
              imageAlt: "Black burger with side fries and cola"
            },
            {
              name: "Bavarian Style",
              price: "€16",
              imageSrc: "https://img.b2bpic.net/free-photo/american-diner-aesthetics_23-2151854439.jpg",
              imageAlt: "American diner aesthetics"
            },
            {
              name: "Patate a spicchi",
              price: "€6",
              imageSrc: "https://img.b2bpic.net/free-photo/chicken-cutlet-with-zucchini_2829-10809.jpg",
              imageAlt: "Chicken cutlet with zucchini"
            }
          ]}
          button={{
            text: "Esplora tutto il Menu",
            href: "#menu"
          }}
        />
      </div>

      <div id="services" data-webild-section="FeaturesStackedOffers" data-webild-section-id="FeaturesStackedOffers-1" data-section="services" data-scene>
        <FeaturesStackedOffers
          label="APERITIVO SUL GARDA"
          title="L'ora dello spritz a Desenzano"
          items={[
            {
              title: "Spritz Classici",
              description: "Aperol, Campari o Hugo preparati a regola d'arte con Prosecco selezionato e guarnizioni fresche nel nostro cortile.",
              imageSrc: "https://img.b2bpic.net/free-photo/tropical-cocktail-with-grapefruit-flavor_140725-65.jpg",
              imageAlt: "tropical cocktail with grapefruit flavor",
              detailSrc: "https://img.b2bpic.net/free-photo/side-view-friends-holding-cocktails_23-2150124815.jpg",
              detailAlt: "Side view friends holding cocktails",
              cta: {
                text: "Scopri i burger",
                href: "#product"
              }
            },
            {
              title: "Birre Artigianali",
              description: "Bionde e rosse alla spina selezionate per esaltare i sapori intensi dei nostri hamburger di carne fresca.",
              imageSrc: "https://img.b2bpic.net/free-photo/man-with-glass-beer_107420-65569.jpg",
              imageAlt: "Man with glass of beer",
              detailSrc: "https://img.b2bpic.net/free-photo/couple-drinking-craft-beer-outdoors_23-2148111307.jpg",
              detailAlt: "Couple drinking craft beer outdoors",
              cta: {
                text: "Vedi menu",
                href: "#product"
              }
            },
            {
              title: "Cortile Coperto",
              description: "Un'atmosfera rilassata e accogliente a due passi dal lago, perfetta per la convivialità e il relax serale.",
              imageSrc: "https://img.b2bpic.net/free-photo/medium-shot-happy-people-with-sangria_23-2149436821.jpg",
              imageAlt: "Medium shot happy people with sangria",
              detailSrc: "https://img.b2bpic.net/free-photo/always-is-great-spend-some-time-with-friends_329181-2895.jpg",
              detailAlt: "Always is great to spend some time with friends",
              cta: {
                text: "Prenota tavolo",
                href: "#contact-reserve-form"
              }
            }
          ]}
        />
      </div>

      <div id="pricing-workshop-tickets" data-webild-section="PricingWorkshopTickets" data-webild-section-id="PricingWorkshopTickets-1" data-section="pricing-workshop-tickets">
        <PricingWorkshopTickets
          label="Menu Speciali"
          title="Formule e menu speciali"
          description="Scopri le nostre proposte per abbinare hamburger gourmet, contorni croccanti e i classici spritz del Garda."
          featuredTag="Più richiesto"
          items={[
            {
              label: "Aperitivo Classic",
              name: "Spritz & Chips",
              price: "€12",
              period: "a persona",
              features: [
                "1 Spritz a scelta",
                "Patate speziate croccanti",
                "Selezione di salse della casa"
              ],
              cta: {
                text: "Prenota tavolo",
                href: "#contact-reserve-form"
              }
            },
            {
              label: "Il più amato",
              name: "Gourmet Burger Combo",
              price: "€18",
              period: "a persona",
              features: [
                "1 Hamburger Gourmet a scelta",
                "Patate spesa a spicchi",
                "1 Spritz o birra alla spina",
                "Caffè del Garda"
              ],
              cta: {
                text: "Prenota tavolo",
                href: "#contact-reserve-form"
              },
              featured: true
            },
            {
              label: "Opzione Veg",
              name: "Veggie & Spritz",
              price: "€15",
              period: "a persona",
              features: [
                "1 Burger vegetariano",
                "Patate al forno speziate",
                "1 Spritz a scelta"
              ],
              cta: {
                text: "Prenota tavolo",
                href: "#contact-reserve-form"
              }
            }
          ]}
        />
      </div>

      <div id="gallery-corner-masks" data-webild-section="GalleryCornerMasks" data-webild-section-id="GalleryCornerMasks-1" data-section="gallery-corner-masks">
        <GalleryCornerMasks
          label="IL LOCALE"
          title="Il cortile coperto"
          ariaLabel="Galleria fotografica del locale"
          items={[
            {
              imageSrc: "https://img.b2bpic.net/free-photo/closeup-shot-appetizing-burger-with-onion-rings_181624-46590.jpg",
              imageAlt: "Closeup shot of an appetizing burger with onion rings",
              caption: "I nostri burger e birre"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/hand-holding-italian-cocktail-still-life_23-2150645773.jpg",
              imageAlt: "Hand holding italian cocktail still life",
              caption: "Aperitivo Aperol Spritz"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/smiling-waitress-holding-tray_23-2147985012.jpg",
              imageAlt: "Smiling waitress holding tray",
              caption: "Ambiente accogliente"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/medium-shot-smiley-women-with-drinks_23-2148947909.jpg",
              imageAlt: "Medium shot smiley women with drinks",
              caption: "Serate in compagnia"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/meat-burger-tomato-cucumber-egg-coleslaw-lettuce-cheese-olives-side-view_141793-1801.jpg",
              imageAlt: "Meat burger tomato cucumber egg coleslaw lettuce cheese olives side view",
              caption: "Selezione carne dello chef"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/hanging-lamp_1339-2398.jpg",
              imageAlt: "hanging lamp",
              caption: "Dettagli del locale"
            }
          ]}
        />
      </div>

      <div id="testimonial" data-webild-section="TestimonialVideoCoverflow" data-webild-section-id="TestimonialVideoCoverflow-1" data-section="testimonial">
        <TestimonialVideoCoverflow
          label="Dicono di noi"
          title="Le opinioni dei nostri ospiti"
          items={[
            {
              name: "Leopoldo Murino",
              caption: "Cliente abituale",
              quote: "Carne strepitosa cucinata in modo impeccabile. Lo chef Antonio è davvero superlativo!",
              imageSrc: "https://img.b2bpic.net/free-photo/view-delicious-burger-with-buns-cheese_23-2150887800.jpg"
            },
            {
              name: "James Christian",
              caption: "Turista in visita",
              quote: "Dopo giorni di cucina locale volevo un grande burger. Carne succosa e patate croccanti.",
              imageSrc: "https://img.b2bpic.net/free-photo/dinner-with-wine_1182-784.jpg"
            },
            {
              name: "Marco Russo",
              caption: "Cliente di Desenzano",
              quote: "Aperitivo perfetto nel cortile coperto. Uno Spritz preparato a regola d'arte.",
              imageSrc: "https://img.b2bpic.net/free-photo/friends-having-fun-white-party_23-2149530394.jpg"
            },
            {
              name: "Martina Conti",
              caption: "Ospite del weekend",
              quote: "Ambiente davvero accogliente e hamburger spettacolari. Una garanzia in centro.",
              imageSrc: "https://img.b2bpic.net/free-photo/delicious-italian-cocktail-with-realistic-background_23-2150062921.jpg"
            },
            {
              name: "Federico Ricci",
              caption: "Cliente abituale",
              quote: "Ottime birre alla spina e ingredienti sempre freschissimi. Tappa fissa a Desenzano.",
              imageSrc: "https://img.b2bpic.net/free-photo/enjoying-street-food-fest_23-2151543708.jpg"
            }
          ]}
        />
      </div>

      <div id="contact-reserve-form" data-webild-section="ContactReserveForm" data-webild-section-id="ContactReserveForm-1" data-section="contact-reserve-form">
        <ContactReserveForm
          label="INFORMAZIONI"
          title="Domande e prenotazioni"
          description="Contattaci per informazioni o riserva subito un tavolo nel nostro cortile coperto nel centro di Desenzano."
          submitText="Invia richiesta"
          successText="Grazie, ti confermeremo la prenotazione via email."
          details={[
            "Via Roma, 27, Desenzano del Garda BS",
            "Tutti i giorni: 12-14:30 / 18:30-23",
            "Tel: 030 618 9497"
          ]}
          imageAlt="Tavolo nel cortile coperto di Spritz & Burger"
          stickerText="Ti aspettiamo"
          labels={{
            name: "Nome",
            email: "Email",
            date: "Data",
            guests: "Ospiti",
            note: "Note"
          }}
        />
      </div>
    </>
  );
}
