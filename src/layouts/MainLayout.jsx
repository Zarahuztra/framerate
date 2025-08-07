import React from "react";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Her kan du ha en Header-komponent hvis ønskelig */}
      <main className="flex-grow">{children}</main>
      {/* BottomNav er inkludert i QuizPage, men du kan løfte den hit for alle sider */}
    </div>
  );
}
