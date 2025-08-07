// Fil: src/components/InfoModal.jsx
import React from "react";
import { X } from "lucide-react";

export default function InfoModal({ content, onClose }) {
  if (!content) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Selve modal-kortet */}
      <div
        className="relative bg-[#00d8f1] border-2 border-[#1a1a1a] text-[#1a1a1a] rounded-3xl shadow-xl p-6 md:p-8 w-full max-w-md text-center transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Lukkeknapp */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#1a1a1a] hover:opacity-70 transition-opacity"
          aria-label="Close modal"
        >
          <X size={28} />
        </button>

        {/* Ikon og Tittel */}
        <div className="flex flex-col items-center mb-4">
          {content.iconComponent &&
            React.cloneElement(content.iconComponent, {
              className: "w-16 h-16 mb-3",
            })}
          <h2 className="text-3xl font-bold">{content.name}</h2>
          {content.type && (
            <p className="text-sm font-semibold opacity-80 mt-1">
              {content.type}
            </p>
          )}
        </div>

        {/* Beskrivelse */}
        <p className="text-base leading-relaxed">{content.description}</p>
      </div>
    </div>
  );
}
