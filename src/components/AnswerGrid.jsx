// Fil: src/components/AnswerGrid.jsx
import React from "react";
import AnswerOption from "./AnswerOption";

export default function AnswerGrid({ options, onSelect }) {
  return (
    // Mobil: grid-cols-2 for 2x2 rutenett
    // Desktop: md:grid-cols-1 for 1x4 vertikal liste
    // w-full for å fylle bredden av sin grid-celle
    // gap-3 for mobil, md:gap-4 for litt mer vertikal luft på desktop
    <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4 w-full">
      {options.map((opt, idx) => (
        <AnswerOption key={idx} text={opt} onClick={() => onSelect(idx)} />
      ))}
    </div>
  );
}
