/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        aqua: "#00d8f1",
        softBlack: "#1a1a1a",
        // Grønnfarge for knappene
        "brand-green": "#6ef26d",
        "brand-green-hover": "#5de45c",
      },
      fontFamily: {
        // Definerer en 'sans' som er default (kan være Poppins eller hva du foretrekker)
        sans: ["Poppins", "system-ui", "sans-serif"],
        // Definerer en egen klasse for din custom display-font
        display: ['"Baangkarr Press Right"', "cursive"], // anførselstegn er viktig for navn med mellomrom
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // Eksempel, hvis du har disse
    require("@tailwindcss/typography"),
  ],
};
