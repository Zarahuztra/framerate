// Fil: src/components/LessonViewer.jsx (Nytt, korrekt og endelig forsøk)
import React, { useState, useEffect } from "react";

export default function LessonViewer({
  lessonData,
  onNextLesson,
  isLastLesson,
}) {
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);

  useEffect(() => {
    setCurrentSegmentIndex(0);
  }, [lessonData]);

  if (!lessonData?.lessonContent?.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        No lesson content to display.
      </div>
    );
  }

  const currentSegmentData = lessonData.lessonContent[currentSegmentIndex];
  const isLastSegmentOfLesson =
    currentSegmentIndex >= (lessonData?.lessonContent?.length ?? 1) - 1;

  const handleNextSegmentOrLesson = () => {
    if (!isLastSegmentOfLesson) setCurrentSegmentIndex(currentSegmentIndex + 1);
    else onNextLesson();
  };
  const handlePreviousSegment = () => {
    if (currentSegmentIndex > 0)
      setCurrentSegmentIndex(currentSegmentIndex - 1);
  };

  const renderLessonBlock = (block, index) => {
    if (!block)
      return (
        <p key={`empty-${index}`} className="text-red-500">
          Error: Empty content block.
        </p>
      );

    // HVER case returnerer nå en komplett, selvstendig layout-blokk som er designet
    // for å fylle hele plassen den blir gitt.
    switch (block.type) {
      case "code":
        return (
          // Denne div-en tar full høyde og bredde.
          // Den bruker flex-col for å la <pre> vokse vertikalt.
          <div key={index} className="h-full w-full flex flex-col text-left">
            {block.language && (
              <span className="flex-shrink-0 text-xs text-gray-800 block mb-1 uppercase tracking-wider">
                {block.language}
              </span>
            )}
            <pre className="w-full flex-grow bg-gray-800 text-white p-3 rounded-md overflow-auto text-sm font-mono min-h-0">
              <code>{block.code}</code>
            </pre>
          </div>
        );

      // ALLE ANDRE TEKST-BASERTE BLOKKER BRUKER DENNE STRUKTUREN:
      default:
        let content;
        if (block.type === "paragraph") {
          content = (
            <p className="text-center text-base md:text-lg lg:text-xl leading-relaxed">
              {block.text}
            </p>
          );
        } else if (block.type === "explanation") {
          content = (
            <p className="text-center text-base md:text-lg bg-cyan-50 p-4 rounded-md border border-cyan-200 italic">
              {block.text}
            </p>
          );
        } else if (block.type === "tip") {
          content = (
            <div className="w-full max-w-2xl p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-md text-left">
              <strong className="font-medium">Tip:</strong> {block.text}
            </div>
          );
        } else if (block.type === "important") {
          content = (
            <div className="w-full max-w-2xl p-3 bg-red-50 border-l-4 border-red-400 text-red-800 rounded-r-md text-left">
              <strong className="font-medium">Important:</strong> {block.text}
            </div>
          );
        } else {
          content = (
            <div className="p-4 text-orange-500">
              Unsupported block type: {block.type}
            </div>
          );
        }

        return (
          // Denne div-en tar full høyde og bredde og sentrerer innholdet sitt.
          <div
            key={index}
            className="w-full h-full flex items-center justify-center p-2"
          >
            {content}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full max-w-screen-lg mx-auto">
      <div className="p-4 bg-gray-100 rounded-lg shadow-sm text-center md:text-left flex-shrink-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {lessonData.title}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Difficulty:{" "}
          <span className="capitalize">{lessonData.difficulty}</span>
        </p>
      </div>

      <div className="bg-[#00d8f1] border-2 border-[#1a1a1a] text-[#1a1a1a] rounded-3xl w-full flex flex-col flex-grow overflow-hidden h-[65vh] md:h-[60vh]">
        {/* INNHOLDS-SCENEN */}
        {/* Denne div-en gir padding og overflow, men INGEN layout-klasser som flex eller grid. */}
        <div className="flex-grow p-4 md:p-6 overflow-y-auto">
          {currentSegmentData ? (
            renderLessonBlock(currentSegmentData, currentSegmentIndex)
          ) : (
            <p>Loading segment...</p>
          )}
        </div>

        {/* KNAPPENE */}
        <div className="p-4 border-t border-[#1a1a1a]/50 flex justify-between items-center flex-shrink-0">
          <button
            onClick={handlePreviousSegment}
            disabled={currentSegmentIndex === 0}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Part {currentSegmentIndex + 1} of {lessonData.lessonContent.length}
          </span>
          <button
            onClick={handleNextSegmentOrLesson}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            {isLastSegmentOfLesson
              ? isLastLesson
                ? "Finish & New Difficulty"
                : "Next Lesson"
              : "Next Part"}
          </button>
        </div>
      </div>
    </div>
  );
}
