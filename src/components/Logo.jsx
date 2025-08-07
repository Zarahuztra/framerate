// Fil: Logo.jsx (Animasjon for den avsluttende parentesen stopper etter 5 blink)
import React from "react";

export default function Logo() {
  return (
    <svg
      width="250"
      height="60" //* 35
      viewBox="0 0 250 60"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2"
    >
      {/* FRAME & RATE */}
      <text
        x="0"
        y="40" //* 30
        fontFamily="'Oxygen Mono', monospace"
        fontWeight="700"
        fontSize="32"
      >
        <tspan fill="#00d8f1">Frame</tspan>
        <tspan fill="#000000" dx="0">
          Rate(
        </tspan>
      </text>
      {/* Blinking closing parenthesis --> ) <-- */}
      <text
        x="175"
        y="40"
        fontFamily="'Oxygen Mono', monospace"
        fontWeight="700"
        fontSize="32"
        fill="#000000"
      >
        ) {/* Dette er den avsluttende parentesen som skal animeres */}
        <animate
          attributeName="opacity"
          values="1;0;1"
          dur="1s"
          repeatCount="3" // ENDRET: Animerer 5 ganger
          fill="freeze" // ENDRET: Beholder siste verdi (opacity=1) etter animasjonen
        />
      </text>
    </svg>
  );
}
