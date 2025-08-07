// Fil: components/LogoWithIcon.jsx (Oppdatert med klikk-fanger)
import React from "react";

export default function LogoWithIcon({
  frameworkIconComponent,
  iconSize = 28,
  onIconClick, // Mottar funksjonen som før
}) {
  const svgWidth = 240;
  const svgHeight = 32;
  const textYPosition = 25;
  const fontSize = 32;
  const fontFamily = "'Oxygen Mono', monospace";
  const fontWeight = "700";

  // Dine posisjoner (uendret)
  const xFrame = 0;
  const xRateTextStart = 90;
  const xIconContainerStart = xRateTextStart + 85;
  const xClosingParen = xIconContainerStart + iconSize + 0;
  const iconTranslateY =
    textYPosition - fontSize * 0.75 + (fontSize * 0.75 - iconSize) / 2 + 4;

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2"
    >
      <text
        x={xFrame}
        y={textYPosition}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        fontSize={fontSize}
        fill="#00d8f1"
      >
        Frame
      </text>
      <text
        x={xRateTextStart}
        y={textYPosition}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        fontSize={fontSize}
        fill="#000000"
      >
        Rate(
      </text>

      {/* Rammeverk-ikon */}
      {frameworkIconComponent && (
        // Denne gruppen er KUN for posisjonering nå
        <g
          transform={`translate(${xIconContainerStart + 3}, ${iconTranslateY})`}
        >
          {React.cloneElement(frameworkIconComponent, {
            width: iconSize,
            height: iconSize,
          })}

          {/* 
            LEGG TIL ET USYNLIG, KLIKKBART REKTANGEL PÅ TOPPEN AV IKONET.
            Dette er en veldig pålitelig måte å fange klikk på i SVG.
          */}
          <rect
            x="0" // Starter på samme x som gruppen
            y="0" // Starter på samme y som gruppen
            width={iconSize}
            height={iconSize}
            fill="transparent" // Gjør den usynlig
            onClick={onIconClick} // Fest onClick-handleren HER
            className="cursor-pointer"
            aria-label="Framework Info" // For tilgjengelighet
          />
        </g>
      )}

      {/* Avsluttende parentes ) */}
      <text
        x={frameworkIconComponent ? xClosingParen : xIconContainerStart}
        y={textYPosition}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        fontSize={fontSize}
        fill="#000000"
      >
        )
      </text>
    </svg>
  );
}
