// Fil: QuizPage.jsx (Korrekt versjon)
import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import CodePanel from "../components/CodePanel";
import QuestionBar from "../components/QuestionBar";
import AnswerGrid from "../components/AnswerGrid";
import BottomNav from "../components/BottomNav";
import InfoModal from "../components/InfoModal";
import { getFrameworkIconElement, allDisplayIcons } from "../utils/iconMap";

const difficulties = ["easy", "medium", "advanced"];

export default function QuizPage() {
  const [currentMode, setCurrentMode] = useState("quiz");
  const [currentDifficulty, setCurrentDifficulty] = useState(null);
  const [questionsForModeAndDifficulty, setQuestionsForModeAndDifficulty] =
    useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizState, setQuizState] = useState("question");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(null);
  const [activeFrameworkIconComponent, setActiveFrameworkIconComponent] =
    useState(null);
  const [modalContent, setModalContent] = useState(null);

  const loadData = useCallback(
    async (difficultyToLoad) => {
      if (!difficultyToLoad || !currentMode) {
        setErrorLoading("Configuration error: Difficulty or mode not set.");
        setQuestionsForModeAndDifficulty([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setErrorLoading(null);
      setQuestionsForModeAndDifficulty([]);
      try {
        const response = await fetch(
          `data/${difficultyToLoad.toLowerCase()}.json`
        );
        if (!response.ok) throw new Error("File not found");
        let loadedData = await response.json();
        if (!Array.isArray(loadedData))
          throw new Error("Loaded data is not an array.");
        if (currentMode === "quiz") {
          loadedData = loadedData.filter(
            (item) => item.quiz && typeof item.quiz === "object"
          );
        } else if (currentMode === "lesson") {
          loadedData = loadedData.filter(
            (item) =>
              item.lessonContent &&
              Array.isArray(item.lessonContent) &&
              item.lessonContent.length > 0
          );
        }
        if (loadedData.length === 0)
          setErrorLoading(
            `No ${currentMode} content found for ${difficultyToLoad} level.`
          );
        setQuestionsForModeAndDifficulty(
          loadedData.sort(() => 0.5 - Math.random())
        );
      } catch (err) {
        console.error(`Failed to load data for ${difficultyToLoad}:`, err);
        setErrorLoading(
          `Could not load ${currentMode} content. Details: ${err.message}`
        );
        setQuestionsForModeAndDifficulty([]);
      } finally {
        setIsLoading(false);
        setCurrentQuestionIndex(0);
        setQuizState("question");
        setSelectedAnswer(null);
      }
    },
    [currentMode]
  );

  useEffect(() => {
    if (!currentDifficulty) {
      const randomDifficulty =
        difficulties[Math.floor(Math.random() * difficulties.length)];
      setCurrentDifficulty(randomDifficulty);
    }
  }, [currentDifficulty]);

  useEffect(() => {
    if (currentDifficulty && currentMode) {
      loadData(currentDifficulty);
    }
  }, [currentDifficulty, currentMode, loadData]);

  const currentQuestionData =
    questionsForModeAndDifficulty[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestionData && currentQuestionData.frameworkIconText) {
      setActiveFrameworkIconComponent(
        getFrameworkIconElement(currentQuestionData.frameworkIconText)
      );
    } else {
      setActiveFrameworkIconComponent(getFrameworkIconElement("Default"));
    }
  }, [currentQuestionData]);

  const handleLogoIconClick = () => {
    if (!currentQuestionData) return;
    const iconInfo = allDisplayIcons.find(
      (iconData) => iconData.name === currentQuestionData.framework
    );
    if (iconInfo) {
      setModalContent({
        name: iconInfo.name,
        type: iconInfo.type,
        description: iconInfo.description,
        iconComponent: <iconInfo.component className="w-16 h-16" />,
      });
    }
  };

  const handleCloseModal = () => {
    setModalContent(null);
  };

  const handleSelectAnswer = (selectedIndex) => {
    if (
      quizState !== "question" ||
      !currentQuestionData ||
      !currentQuestionData.quiz
    )
      return;
    setSelectedAnswer(selectedIndex);
    if (selectedIndex === currentQuestionData.quiz.correctOptionIndex)
      setQuizState("correct");
    else setQuizState("wrong");
  };

  const handleNextQuestion = () => {
    if (!currentQuestionData) return;
    if (currentQuestionIndex < questionsForModeAndDifficulty.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(
        `All ${currentDifficulty} ${currentMode}s completed! Loading new random difficulty...`
      );
      const randomDifficulty =
        difficulties[Math.floor(Math.random() * difficulties.length)];
      setCurrentDifficulty(randomDifficulty);
    }
    setQuizState("question");
    setSelectedAnswer(null);
  };

  const handleTryAgain = () => {
    setQuizState("question");
    setSelectedAnswer(null);
  };

  // KORRIGERT: Her er hele den korrekte renderFeedbackContent-funksjonen
  const renderFeedbackContent = () => {
    if (!currentQuestionData || !currentQuestionData.quiz) return null;
    const commonButtonClass =
      "text-white font-bold py-3 px-6 rounded-lg text-lg md:text-xl";
    const explanationTextClass =
      "text-base md:text-lg font-normal mb-6 text-gray-700";
    const feedbackTitleClass = "mb-4 text-2xl md:text-3xl font-bold";

    if (quizState === "correct") {
      return (
        <>
          <p className={`${feedbackTitleClass} text-green-600`}>Correct!</p>
          {currentQuestionData.quiz.explanationAfterAnswer && (
            <p className={explanationTextClass}>
              {currentQuestionData.quiz.explanationAfterAnswer}
            </p>
          )}
          <button
            onClick={handleNextQuestion}
            className={`${commonButtonClass} bg-green-500 hover:bg-green-600`}
          >
            {currentQuestionIndex < questionsForModeAndDifficulty.length - 1
              ? "Next Question"
              : "Finish & New Difficulty"}
          </button>
        </>
      );
    }
    if (quizState === "wrong") {
      return (
        <>
          <p className={`${feedbackTitleClass} text-red-600`}>Wrong!</p>
          {currentQuestionData.quiz.explanationAfterAnswer && (
            <p className={explanationTextClass}>
              Hint: {currentQuestionData.quiz.explanationAfterAnswer}
            </p>
          )}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleTryAgain}
              className={`${commonButtonClass} bg-orange-500 hover:bg-orange-600`}
            >
              Try Again?
            </button>
            <button
              onClick={handleNextQuestion}
              className={`${commonButtonClass} bg-blue-500 hover:bg-blue-600`}
            >
              {currentQuestionIndex < questionsForModeAndDifficulty.length - 1
                ? "Next Question"
                : "Finish & New Difficulty"}
            </button>
          </div>
        </>
      );
    }
    return null;
  };

  const LoadingErrorWrapper = ({ children }) => (
    <div className="flex flex-col h-screen overflow-hidden bg-white px-4 sm:px-6 py-4">
      <Header
        activeFrameworkIconComponent={activeFrameworkIconComponent}
        onIconClick={handleLogoIconClick}
      />
      <main className="flex-grow mt-4 overflow-y-auto flex flex-col items-center justify-center text-center">
        <div className="text-xl">{children}</div>
      </main>
      <BottomNav />
    </div>
  );

  if (isLoading || !currentDifficulty)
    return (
      <LoadingErrorWrapper>
        Loading content for {currentDifficulty || "selected"} {currentMode}...
      </LoadingErrorWrapper>
    );
  if (errorLoading)
    return (
      <LoadingErrorWrapper>
        <p className="text-red-500 font-semibold">Error:</p>
        <p className="text-red-500 text-sm">{errorLoading}</p>
      </LoadingErrorWrapper>
    );
  if (
    !isLoading &&
    (!questionsForModeAndDifficulty ||
      questionsForModeAndDifficulty.length === 0)
  )
    return (
      <LoadingErrorWrapper>
        No {currentMode}s available for {currentDifficulty} level.
      </LoadingErrorWrapper>
    );
  if (!currentQuestionData)
    return <LoadingErrorWrapper>Preparing content...</LoadingErrorWrapper>;
  if (currentMode === "quiz" && !currentQuestionData.quiz)
    return (
      <LoadingErrorWrapper>
        This item is not a quiz.{" "}
        <button
          onClick={handleNextQuestion}
          className="p-2 bg-blue-400 text-white rounded ml-2 mt-2"
        >
          Next
        </button>
      </LoadingErrorWrapper>
    );
  if (currentMode === "lesson" && !currentQuestionData.lessonContent)
    return (
      <LoadingErrorWrapper>
        This item is not a lesson.{" "}
        <button
          onClick={handleNextQuestion}
          className="p-2 bg-blue-400 text-white rounded ml-2 mt-2"
        >
          Next
        </button>
      </LoadingErrorWrapper>
    );

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white px-4 sm:px-6 py-4">
      <Header
        activeFrameworkIconComponent={activeFrameworkIconComponent}
        onIconClick={handleLogoIconClick}
      />
      <main className="flex-grow flex flex-col min-h-0 mt-4">
        <div className="w-full h-full max-w-full mx-auto md:max-w-screen-xl flex flex-col md:grid md:grid-cols-2 md:gap-8 lg:gap-16">
          <div className="flex flex-col min-h-0">
            {quizState === "question" && (
              <div className="mb-3 flex-shrink-0">
                <QuestionBar question={currentQuestionData.quiz.questionText} />
              </div>
            )}
            <div className="flex-grow min-h-0">
              <CodePanel
                snippet={
                  quizState === "question"
                    ? currentQuestionData.quiz.snippet
                    : null
                }
                isFeedback={quizState !== "question"}
              >
                {quizState !== "question" && renderFeedbackContent()}
              </CodePanel>
            </div>
          </div>
          {quizState === "question" && (
            <div className="flex flex-col justify-center mt-3 md:mt-0">
              <AnswerGrid
                options={currentQuestionData.quiz.options}
                onSelect={handleSelectAnswer}
              />
            </div>
          )}
        </div>
      </main>
      <InfoModal content={modalContent} onClose={handleCloseModal} />
      <BottomNav />
    </div>
  );
}
