// Fil: src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import InfoModal from "../components/InfoModal";
import {
  allDisplayIcons,
  IconComponentsMap,
  JsCategoryIcon,
  CssCategoryIcon,
  FrameworkCategoryIcon,
  ThreeDCategoryIcon,
} from "../utils/iconMap";

const categories = [
  { name: "JavaScript", icon: JsCategoryIcon },
  { name: "CSS", icon: CssCategoryIcon },
  { name: "UI Framework", icon: FrameworkCategoryIcon },
  { name: "3D", icon: ThreeDCategoryIcon },
];

export default function Home() {
  const navigate = useNavigate();
  const [modalContent, setModalContent] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleIconClick = (iconData) => {
    if (!iconData.component) {
      console.error(`Icon component for "${iconData.name}" is missing.`);
      return;
    }
    setModalContent({
      name: iconData.name,
      type: iconData.type,
      description: iconData.description,
      iconComponent: <iconData.component className="w-16 h-16" />,
    });
  };

  const handleCloseModal = () => {
    setModalContent(null);
  };

  const handleCategoryClick = (categoryName) => {
    setActiveCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  const filteredIcons = activeCategory
    ? allDisplayIcons.filter((icon) => icon.type === activeCategory)
    : [];

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 overflow-hidden">
        <div
          className="bg-[#00d8f1] border-2 border-[#1a1a1a] text-[#1a1a1a] rounded-3xl
                       w-full max-w-screen-lg h-full p-6 md:p-8 
                       flex flex-col items-center text-center" // KORRIGERT: Fjernet justify-between
        >
          {/* Tekst-seksjon (øverst) */}
          <div className="flex-shrink-0">
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl">
              Discover, learn, and play
            </h1>
            <div className="font-display text-2xl sm:text-3xl md:text-4xl mt-2">
              <p>Pick a lesson, or try the quiz</p>
              <p>to test your coding skills.</p>
            </div>
          </div>

          {/* Spacer Div 1: Tar opp plass mellom tekst og knapper */}
          <div className="flex-grow"></div>

          {/* Knappe-seksjon (vil nå bli dyttet ned) */}
          <div className="flex space-x-4 flex-shrink-0">
            <button
              onClick={() => navigate("/lesson")}
              className="bg-brand-green hover:bg-brand-green-hover font-sans font-extralight text-black text-lg px-8 py-2 rounded-xl shadow-md transition-transform transform hover:scale-105"
            >
              Lessons
            </button>
            <button
              onClick={() => navigate("/quiz")}
              className="bg-brand-green hover:bg-brand-green-hover font-sans font-extralight text-black text-lg px-8 py-2 rounded-xl shadow-md transition-transform transform hover:scale-105"
            >
              Quiz
            </button>
          </div>

          {/* Spacer Div 2: Tar opp plass mellom knapper og ikoner */}
          <div className="flex-grow"></div>

          {/* Ikoner-seksjon (vil nå bli dyttet helt ned) */}
          <div className="w-full flex-shrink-0">
            {!activeCategory ? (
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                {categories.map((cat) => {
                  const CategoryIcon = cat.icon;
                  return (
                    <div
                      key={cat.name}
                      onClick={() => handleCategoryClick(cat.name)}
                      className="flex flex-col items-center w-20 cursor-pointer transition-transform transform hover:scale-110"
                    >
                      <CategoryIcon className="w-16 h-16" />
                      <span className="text-sm mt-1 font-semibold">
                        {cat.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="text-sm mb-4 text-white hover:opacity-80 transition-opacity"
                >
                  ← Back to Categories
                </button>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 md:gap-x-6">
                  {filteredIcons.map((icon) => {
                    const IconComponent = icon.component;
                    return IconComponent ? (
                      <div
                        key={icon.name}
                        onClick={() => handleIconClick(icon)}
                        className="group relative flex flex-col items-center w-14 transition-transform transform hover:-translate-y-1 cursor-pointer"
                      >
                        <IconComponent className="w-8 h-8" />
                        <span className="text-xs mt-1">{icon.name}</span>
                        <div className="absolute -top-8 hidden group-hover:block bg-black text-white text-xs rounded-md px-2 py-1 whitespace-nowrap z-20">
                          {icon.type}
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <InfoModal content={modalContent} onClose={handleCloseModal} />
      <BottomNav />
    </div>
  );
}
