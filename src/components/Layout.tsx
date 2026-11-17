import { Outlet } from "react-router-dom";
import NavbarSlashLinks from "@/components/navbars/NavbarSlashLinks";
import FooterWordmarkMarquee from "@/components/sections/footer/FooterWordmarkMarquee";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="pill" data-card="default" data-pattern="stripes">
      <header data-webild-section="Header">
        <NavbarSlashLinks
          brand="SPRITZ & BURGER"
          logoImageSrc="https://storage.googleapis.com/webild/users/user_3MEga9cursqZnupWG2nTy9in2oL/uploaded-1794924053353-qycvma4f.png"
          navItems={[
            {
              name: "Il Menu",
              href: "#menu"
            },
            {
              name: "Spritz Culture",
              href: "#services"
            },
            {
              name: "Il Cortile",
              href: "#gallery-corner-masks"
            },
            {
              name: "Recensioni",
              href: "#testimonial"
            },
            {
              name: "Dove Siamo",
              href: "#contact-reserve-form"
            }
          ]}
          primaryButton={{
            text: "Prenota un Tavolo",
            href: "#contact-reserve-form"
          }}
          introDelay={3}
        />
      </header>
      <main className="flex-grow" data-button="pill" data-card="default" data-pattern="stripes">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterWordmarkMarquee
          wordmark="SPRITZ & BURGER"
          stickerText="Gourmet & Aperitivo"
          newsletterTitle="Rimani aggiornato"
          emailLabel="Email*"
          emailPlaceholder="info@spritzandburgerdesenzano.it"
          submitText="Iscriviti"
          imageSrc="https://img.b2bpic.net/free-photo/tasty-sandwich-red-fork-wooden-cutting-board-dark-mix-color-surface_179666-42257.jpg"
          imageAlt="Hamburger gourmet servito su tagliere di legno"
          caption="/Il vero gusto di Desenzano del Garda"
          columns={[
            {
              title: "Indirizzo",
              items: [
                {
                  label: "Via Roma, 27, 25015 Desenzano del Garda BS"
                },
                {
                  label: "Indicazioni stradali",
                  href: "#"
                }
              ]
            },
            {
              title: "Orari",
              items: [
                {
                  label: "Tutti i giorni 12:00-14:30 / 18:30-23:00"
                },
                {
                  label: "Cortile coperto aperto tutto l'anno"
                }
              ]
            },
            {
              title: "Contatti",
              items: [
                {
                  label: "030 618 9497",
                  href: "tel:0306189497"
                },
                {
                  label: "info@spritzandburgerdesenzano.it",
                  href: "mailto:info@spritzandburgerdesenzano.it"
                }
              ]
            },
            {
              title: "Social",
              items: [
                {
                  label: "Instagram",
                  href: "#"
                },
                {
                  label: "Facebook",
                  href: "#"
                }
              ]
            },
            {
              title: "Pagine",
              items: [
                {
                  label: "Il Menu completo",
                  href: "#menu"
                },
                {
                  label: "Aperitivo Spritz",
                  href: "#services"
                },
                {
                  label: "Il locale",
                  href: "#gallery-corner-masks"
                },
                {
                  label: "Prenota un tavolo",
                  href: "#contact-reserve-form"
                }
              ]
            }
          ]}
          copyright="© 2026 SPRITZ & BURGER DESENZANO. Tutti i diritti riservati."
          credit="Desenzano del Garda"
          successText="Iscrizione effettuata con successo"
          ariaLabel="Piè di pagina"
        />
      </footer>
    </div>
  );
}
