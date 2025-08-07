// Fil: src/components/QuestionBar.jsx
import React from "react";

export default function QuestionBar({ question }) {
  return (
    <div
      className="flex items-center bg-[#00d8f1] text-[#1a1a1a] rounded-3xl w-full text-center 
                    px-6 py-3 text-base 
                    md:px-8 md:py-4 md:text-xl"
    >
      {/* Mobil: px-6 py-3 text-base */}
      {/* Desktop: md:px-8 md:py-4 md:text-xl */}
      <span className="flex-1 font-medium">{question}</span>
    </div>
  );
}
