// Fil: src/components/Header.jsx
import React from "react";
import OriginalLogo from "./Logo"; // Din standard logo
import LogoWithIcon from "./LogoWithIcon"; // Din logo som kan vise et ikon
// import { Link } from "react-router-dom"; // Husk å bytte ut <a> med <Link> fra ditt routing-bibliotek

const navLinks = [
  { text: "Home", path: "/" },
  { text: "Lessons", path: "/lesson" },
  { text: "Quiz", path: "/quiz" },
];

export default function Header({
  activeFrameworkIconComponent = null,
  onIconClick = null,
}) {
  return (
    // YTRE HEADER CONTAINER:
    // flex, items-center: Grunnleggende flexbox for vertikal sentrering.
    // w-full: Tar full tilgjengelig bredde fra sin forelder.
    // max-w-screen-xl: Begrenser den maksimale bredden til "extra large" (f.eks. 1280px).
    // mx-auto: Sentrerer hele header-blokken horisontalt på siden.
    // py-2 px-4... : Responsiv padding for luft rundt innholdet.
    <header className="flex items-center w-full max-w-screen-xl mx-auto py-2 px-4 sm:px-6 md:px-8 mb-4">
      {/* LOGO-DELEN: */}
      {/* Plasseres først, og vil derfor være til venstre. */}
      {/* flex-shrink-0 forhindrer at logoen blir klemt hvis skjermen blir smal. */}
      <div className="flex-shrink-0">
        {activeFrameworkIconComponent ? (
          <LogoWithIcon
            frameworkIconComponent={activeFrameworkIconComponent}
            onIconClick={onIconClick}
          />
        ) : (
          <OriginalLogo />
        )}
      </div>

      {/* NAVIGASJONSLENKER FOR DESKTOP: */}
      {/* hidden md:flex: Vises kun på medium skjermer og oppover. */}
      {/* ml-auto: Nøkkelen! "margin-left: auto" skyver denne nav-blokken helt til høyre. */}
      <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 ml-auto">
        {navLinks.map((link) => (
          <a // ERSTATT med <Link to={link.path}> for klient-side navigasjon
            key={link.text}
            href={link.path}
            className="text-base font-medium text-gray-600 hover:text-aqua transition-colors duration-150"
          >
            {link.text}
          </a>
        ))}
      </nav>
    </header>
  );
}
