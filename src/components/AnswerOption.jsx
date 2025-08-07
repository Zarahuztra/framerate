// Fil: src/components/AnswerOption.jsx
import React from "react";

export default function AnswerOption({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 bg-[#00d8f1] text-white rounded-3xl 
        shadow-lg hover:opacity-90 transition-opacity duration-150 ease-in-out
        
        text-base md:text-lg font-semibold   /* Mobil: text-base, Desktop: md:text-lg */
        
        w-full /* Tar full bredde av sin grid-celle i AnswerGrid */

        h-24 md:h-32        /* Mobil: h-24 (6rem), Desktop: md:h-32 (8rem) */
        p-2 md:p-4          /* Mobil: p-2, Desktop: md:p-4 */
        
        overflow-hidden flex flex-col 
      `}
    >
      {/* Indre div for å sentrere tekst og håndtere overflow av tekst inni knappen */}
      <div className="w-full h-full flex items-center justify-center text-center overflow-y-auto py-1 md:py-2">
        <span className="max-w-full break-words">{text}</span>
      </div>
    </button>
  );
}
