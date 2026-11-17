import HeroWordmarkWindow from "@/components/sections/hero/HeroWordmarkWindow";
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
          imageSrc="https://img.b2bpic.net/free-photo/delicious-sandwich-ketchup-tomatoes-with-stem-dark-mix-color-surface-with-free-space_179666-42225.jpg"
          imageAlt="classic beef burger on dark surface"
          introDelay={3}
          handoff
        />
      </div>

      <div id="menu" data-webild-section="MenuElegantGrid" data-webild-section-id="MenuElegantGrid-1" data-section="menu" data-scene>
        <MenuElegantGrid />
      </div>

      <div id="services" data-webild-section="FeaturesStackedOffers" data-webild-section-id="FeaturesStackedOffers-1" data-section="services" data-scene>
        <FeaturesStackedOffers />
      </div>

      <div id="pricing-workshop-tickets" data-webild-section="PricingWorkshopTickets" data-webild-section-id="PricingWorkshopTickets-1" data-section="pricing-workshop-tickets">
        <PricingWorkshopTickets />
      </div>

      <div id="gallery-corner-masks" data-webild-section="GalleryCornerMasks" data-webild-section-id="GalleryCornerMasks-1" data-section="gallery-corner-masks">
        <GalleryCornerMasks ariaLabel="Galleria fotografica del locale" />
      </div>

      <div id="testimonial" data-webild-section="TestimonialVideoCoverflow" data-webild-section-id="TestimonialVideoCoverflow-1" data-section="testimonial">
        <TestimonialVideoCoverflow />
      </div>

      <div id="contact-reserve-form" data-webild-section="ContactReserveForm" data-webild-section-id="ContactReserveForm-1" data-section="contact-reserve-form">
        <ContactReserveForm imageAlt="Tavolo nel cortile coperto di Spritz & Burger" />
      </div>
    </>
  );
}
