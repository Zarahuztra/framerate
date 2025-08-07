import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: "/framerate/", // ← LEGG TIL DENNE LINJEN
  plugins: [
    react(),
    svgr(), // Legg til svgr plugin
  ],
});
