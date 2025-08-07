// Fil: src/pages/LessonPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import LessonViewer from "../components/LessonViewer";
import InfoModal from "../components/InfoModal"; // 1. NY IMPORT
import { getFrameworkIconElement, allDisplayIcons } from "../utils/iconMap"; // 2. NY IMPORT

const difficulties = ["easy", "medium", "advanced"];

export default function LessonPage() {
  const [currentDifficulty, setCurrentDifficulty] = useState(null);
  const [allLessonsForDifficulty, setAllLessonsForDifficulty] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(null);
  const [activeFrameworkIconComponent, setActiveFrameworkIconComponent] =
    useState(null);
  const [modalContent, setModalContent] = useState(null); // 3. NY STATE

  const loadLessons = useCallback(async (difficultyToLoad) => {
    if (!difficultyToLoad) return;
    setIsLoading(true);
    setErrorLoading(null);
    try {
      const response = await fetch(
        `data/${difficultyToLoad.toLowerCase()}.json`
      );
      if (!response.ok) throw new Error("File not found");
      const loadedDataRaw = await response.json();
      const loadedData = loadedDataRaw.filter(
        (item) => item.lessonContent?.length > 0
      );
      if (loadedData.length === 0)
        setErrorLoading(`No lessons found for ${difficultyToLoad}.`);
      setAllLessonsForDifficulty(loadedData.sort(() => 0.5 - Math.random()));
    } catch (err) {
      setErrorLoading(`Could not load lessons: ${err.message}`);
    } finally {
      setIsLoading(false);
      setCurrentLessonIndex(0);
    }
  }, []);

  useEffect(() => {
    if (!currentDifficulty) {
      const randomDifficulty =
        difficulties[Math.floor(Math.random() * difficulties.length)];
      setCurrentDifficulty(randomDifficulty);
    }
  }, [currentDifficulty]);

  useEffect(() => {
    if (currentDifficulty) loadLessons(currentDifficulty);
  }, [currentDifficulty, loadLessons]);

  const currentLessonData = allLessonsForDifficulty[currentLessonIndex];

  useEffect(() => {
    if (currentLessonData?.frameworkIconText) {
      setActiveFrameworkIconComponent(
        getFrameworkIconElement(currentLessonData.frameworkIconText)
      );
    } else {
      setActiveFrameworkIconComponent(getFrameworkIconElement("Default"));
    }
  }, [currentLessonData]);

  // 4. NYE FUNKSJONER FOR MODALEN
  const handleLogoIconClick = () => {
    if (!currentLessonData) return;
    const iconInfo = allDisplayIcons.find(
      (iconData) => iconData.name === currentLessonData.framework
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
  // ------------------------------------

  const handleNextLesson = () => {
    if (currentLessonIndex < allLessonsForDifficulty.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else {
      alert(
        `All ${currentDifficulty} lessons completed! Loading new random difficulty...`
      );
      const randomDifficulty =
        difficulties[Math.floor(Math.random() * difficulties.length)];
      setCurrentDifficulty(randomDifficulty);
    }
  };

  const LoadingErrorWrapper = ({ children }) => (
    <div className="flex flex-col h-screen bg-white">
      {/* 5. SEND onIconClick TIL HEADER */}
      <Header
        activeFrameworkIconComponent={activeFrameworkIconComponent}
        onIconClick={handleLogoIconClick}
      />
      <div className="flex-grow flex items-center justify-center p-4 text-center">
        {children}
      </div>
      <BottomNav />
    </div>
  );

  if (isLoading || !currentLessonData)
    return (
      <LoadingErrorWrapper>
        <h1>Loading Lesson...</h1>
      </LoadingErrorWrapper>
    );
  if (errorLoading)
    return (
      <LoadingErrorWrapper>
        <p className="text-red-500">{errorLoading}</p>
      </LoadingErrorWrapper>
    );

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white px-4 md:px-6 py-2">
      {/* 6. SEND onIconClick TIL HEADER */}
      <Header
        activeFrameworkIconComponent={activeFrameworkIconComponent}
        onIconClick={handleLogoIconClick}
      />

      <main className="flex-grow my-2 min-h-0">
        <LessonViewer
          lessonData={currentLessonData}
          onNextLesson={handleNextLesson}
          isLastLesson={
            currentLessonIndex >= allLessonsForDifficulty.length - 1
          }
        />
      </main>

      {/* 7. LEGG TIL InfoModal HER */}
      <InfoModal content={modalContent} onClose={handleCloseModal} />

      <BottomNav />
    </div>
  );
}
