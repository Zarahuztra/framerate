// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import LessonPage from "./pages/LessonPage";
import QuizPage from "./pages/QuizPage";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson" element={<LessonPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </MainLayout>
  );
}
