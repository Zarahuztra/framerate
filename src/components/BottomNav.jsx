// Fil: src/components/BottomNav.jsx
import React from "react";
import { Home, BookOpen, Code } from "lucide-react"; // Eller dine valgte ikoner
import { useNavigate, useLocation } from "react-router-dom"; // Importer hooks

export default function BottomNav() {
  const navigate = useNavigate(); // Hook for å navigere programmatisk
  const location = useLocation(); // Hook for å finne nåværende sti

  // Funksjon for å sjekke om en sti er aktiv
  const isActive = (path) => location.pathname === path;

  // Definer navigasjonslenkene for enklere mapping
  const navItems = [
    { name: "Lessons", path: "/lesson", icon: BookOpen },
    { name: "Home", path: "/", icon: Home },
    { name: "Quiz", path: "/quiz", icon: Code },
  ];

  return (
    // md:hidden - Skjuler denne på desktop
    <nav className="w-full max-w-lg mx-auto flex justify-around py-3 mt-4 md:hidden">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const active = isActive(item.path);
        // Betinget styling for aktiv lenke
        const activeClass = active ? "text-[#00d8f1]" : "text-[#1a1a1a]";

        return (
          <div
            key={item.name}
            onClick={() => navigate(item.path)} // LEGG TIL onClick-HANDLER
            className={`flex flex-col items-center text-xs cursor-pointer transition-colors duration-150 ${activeClass} hover:text-[#00d8f1]/80`}
          >
            <IconComponent className="w-8 h-8" />
            <span>{item.name}</span>
          </div>
        );
      })}
    </nav>
  );
}
