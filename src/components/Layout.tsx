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
          emailPlaceholder="info@spritzandburgerdesenzano.it"
          imageSrc="https://img.b2bpic.net/free-photo/tasty-sandwich-red-fork-wooden-cutting-board-dark-mix-color-surface_179666-42257.jpg"
          imageAlt="Hamburger gourmet servito su tagliere di legno"
        />
      </footer>
    </div>
  );
}
