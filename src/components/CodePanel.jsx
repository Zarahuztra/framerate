// Fil: src/components/CodePanel.jsx (Forenklet og tilpasset flex-grow)
import React from "react";

export default function CodePanel({ snippet, children, isFeedback = false }) {
  // Feedback-modus vises nå som en modal, så vi håndterer den separat og returnerer tidlig.
  if (isFeedback && children) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#00d8f1] border-2 border-[#1a1a1a] text-[#1a1a1a] rounded-3xl shadow-xl p-6 md:p-8 w-full max-w-md text-center flex flex-col items-center justify-center min-h-[200px]">
          <div className="text-xl md:text-2xl font-bold">{children}</div>
        </div>
      </div>
    );
  }

  // Felles klasser for både snippet og lesson-modus
  // h-full vil nå respektere flex-grow på forelderen i QuizPage.jsx
  const panelClasses =
    "bg-[#00d8f1] border-2 border-[#1a1a1a] text-[#1a1a1a] rounded-3xl w-full h-full flex flex-col p-4 md:p-6";
  const preTagClassName = "font-mono text-base md:text-lg whitespace-pre-wrap";

  return (
    <div className={panelClasses}>
      {snippet ? (
        // Indre div for scrolling hvis snippet er for lang
        <div className="flex-grow min-h-0 overflow-y-auto">
          {" "}
          {/* min-h-0 er en flexbox-triks for å få overflow til å virke riktig */}
          <pre className={preTagClassName}>{snippet}</pre>
        </div>
      ) : children ? (
        // For lesson content (som children)
        <div className="flex-grow min-h-0 overflow-y-auto">
          <div className="md:text-lg">{children}</div>
        </div>
      ) : (
        <p className="p-4 text-center m-auto">Innhold mangler.</p>
      )}
    </div>
  );
}
