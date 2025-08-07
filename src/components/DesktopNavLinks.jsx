// Fil: src/components/DesktopNavLinks.jsx
import React from "react";
// Importer Link-komponenten fra ditt routing-bibliotek hvis du bruker et
// import { Link } from "react-router-dom"; // Eksempel for react-router-dom

const navLinks = [
  { text: "Home", path: "/" }, // Sørg for at disse stiene matcher rutingen din
  { text: "Lessons", path: "/lesson" },
  { text: "Quiz", path: "/quiz" },
];

export default function DesktopNavLinks() {
  return (
    // Skjules på mobil (hidden), vises som flex på desktop (md:flex)
    // ml-auto vil dytte denne nav-blokken helt til høyre i sin flex-forelder (Header)
    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 ml-auto">
      {navLinks.map((link) => (
        // Bytt ut <a> med <Link to={link.path}> hvis du bruker react-router-dom e.l.
        <a
          key={link.text}
          href={link.path} // For enkel HTML-navigasjon, ellers bruk 'to' prop for Link-komponent
          className="text-base font-medium text-gray-600 hover:text-aqua transition-colors duration-150 whitespace-nowrap"
          // Eksempel på aktiv lenke-styling (krever logikk for å vite nåværende rute):
          // isActive ? 'text-aqua font-semibold' : 'text-gray-600'
        >
          {link.text}
        </a>
      ))}
      {/* Her kan du legge til andre elementer som skal være helt til høyre på desktop,
          f.eks. et brukerikon eller logg-inn/ut-knapp, hvis de skal være en del av denne nav-blokken */}
    </nav>
  );
}
