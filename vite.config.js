// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr"; // Importer plugin

export default defineConfig({
  plugins: [
    react(),
    svgr(), // Legg til svgr plugin
  ],
});
