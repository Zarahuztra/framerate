// Fil: src/utils/iconMap.jsx
import React from "react";

// IMPORTER DINE FAKTISKE SVG-IKONER SOM REACT-KOMPONENTER
import ReactIcon from "../assets/icons/react.svg?react";
import JavaScriptIcon from "../assets/icons/javascript.svg?react";
import NextJsIcon from "../assets/icons/next.svg?react";
import VueIcon from "../assets/icons/vue.svg?react";
import AngularIcon from "../assets/icons/angular.svg?react";
import NodeJsIcon from "../assets/icons/node.svg?react";
import SvelteIcon from "../assets/icons/svelte.svg?react";
import TailwindIcon from "../assets/icons/tailwind.svg?react";
import BootstrapIcon from "../assets/icons/bootstrap.svg?react";
import BulmaIcon from "../assets/icons/bulma.svg?react";
import ThreeJsIcon from "../assets/icons/three.svg?react";
import PixiJsIcon from "../assets/icons/pixi.svg?react";
import TypescriptIcon from "../assets/icons/typescript.svg?react";
import CSSIcon from "../assets/icons/css.svg?react";
import ExpressIcon from "../assets/icons/express.svg?react";
import NestJSIcon from "../assets/icons/nest.svg?react";
import NuxtIcon from "../assets/icons/nuxt.svg";
import JsCategoryIcon from "../assets/icons/javascript1.svg?react";
import CssCategoryIcon from "../assets/icons/css1.svg?react";
import FrameworkCategoryIcon from "../assets/icons/frame1.svg?react";
import ThreeDCategoryIcon from "../assets/icons/3d1.svg?react";

import { AlertCircle } from "lucide-react"; // Fallback-ikon
const DefaultIconComponent = () => (
  <AlertCircle size={24} className="text-gray-500 opacity-80" />
);

export const IconComponentsMap = {
  JS: JavaScriptIcon,
  JavaScript: JavaScriptIcon,
  React: ReactIcon,
  "Next.js": NextJsIcon,
  "Vue.js": VueIcon,
  Angular: AngularIcon,
  "Node.js": NodeJsIcon,
  Svelte: SvelteIcon,
  "Tailwind CSS": TailwindIcon,
  Tailwind: TailwindIcon,
  Bootstrap: BootstrapIcon,
  Bulma: BulmaIcon,
  "Three.js": ThreeJsIcon,
  PixiJS: PixiJsIcon,
  TypeScript: TypescriptIcon,
  CSS: CSSIcon,
  "Express.js": ExpressIcon,
  Express: ExpressIcon,
  NestJS: NestJSIcon,
  "Nuxt.js": NuxtIcon,
  Default: DefaultIconComponent,
};

export const allDisplayIcons = [
  {
    name: "React",
    type: "UI Framework",
    component: IconComponentsMap["React"],
    description:
      "React is a JavaScript library for building user interfaces, especially single-page applications. Used by Facebook, Instagram, and many others, and is very popular for modern web development.",
  },
  {
    name: "Next.js", // ← matcher dataene dine
    type: "UI Framework",
    component: IconComponentsMap["Next.js"],
    description:
      "Next.js is a framework for building React applications. Makes it easy to create SEO-friendly and fast websites with server-side rendering and static site generation.",
  },
  {
    name: "Vue.js", // ← matcher dataene dine
    type: "UI Framework",
    component: IconComponentsMap["Vue.js"],
    description:
      "Vue.js is a popular and lightweight frontend framework for building interactive user interfaces. Simpler than Angular, but very powerful.",
  },
  {
    name: "Angular",
    type: "UI Framework",
    component: IconComponentsMap["Angular"],
    description:
      "Angular is a large frontend framework from Google for building complex apps. Uses TypeScript and provides everything you need: routing, state management, forms, etc.",
  },
  {
    name: "Svelte",
    type: "UI Framework",
    component: IconComponentsMap["Svelte"],
    description:
      "Svelte is a modern frontend framework where most of the work happens at compile time. The result is super-fast and tiny apps with no runtime overhead.",
  },
  {
    name: "Nuxt.js", // ← matcher dataene dine hvis du bruker "Nuxt.js"
    type: "UI Framework",
    component: IconComponentsMap["Nuxt.js"],
    description:
      "Nuxt.js is a framework for building “universal” (server-side rendered) Vue.js applications. Makes it easier to create SEO-friendly and fast Vue-based websites.",
  },
  {
    name: "JavaScript",
    type: "JavaScript",
    component: IconComponentsMap["JavaScript"],
    description:
      "JavaScript is the language behind all interactivity on the web. Used on both the frontend (browser) and backend (Node.js).",
  },
  {
    name: "TypeScript",
    type: "JavaScript",
    component: IconComponentsMap["TypeScript"],
    description:
      "TypeScript is a superset of JavaScript that adds static typing. Offers better tools, fewer bugs, and more robust apps—especially in larger projects.",
  },
  {
    name: "Node.js", // ← matcher dataene dine hvis du bruker "Node.js"
    type: "JavaScript",
    component: IconComponentsMap["Node.js"],
    description:
      "Node.js lets you run JavaScript on the server. Used to build everything from small APIs to large backend systems.",
  },
  {
    name: "NestJS",
    type: "JavaScript",
    component: IconComponentsMap["NestJS"],
    description:
      "NestJS is a progressive backend framework for Node.js, built with TypeScript. Inspired by Angular, it provides structure for larger projects with modules, dependency injection, and more.",
  },
  {
    name: "Express.js", // ← matcher dataene dine hvis du bruker "Express.js"
    type: "JavaScript",
    component: IconComponentsMap["Express.js"],
    description:
      "Express.js is a minimalist backend framework for Node.js. Used to build APIs and servers. Known for being fast, simple, and flexible.",
  },
  {
    name: "Tailwind CSS", // ← matcher dataene dine hvis du bruker "Tailwind CSS"
    type: "CSS",
    component: IconComponentsMap["Tailwind CSS"],
    description:
      "Tailwind CSS is a utility-first CSS framework where you build your design directly in your HTML using small classes. Gives you extreme flexibility, fast prototyping, and a lot of control over styling.",
  },
  {
    name: "Bootstrap",
    type: "CSS",
    component: IconComponentsMap["Bootstrap"],
    description:
      "Bootstrap is the most popular CSS framework for building responsive and mobile-first websites. Comes with a large selection of pre-built components, grid system, and customization support.",
  },
  {
    name: "Bulma",
    type: "CSS",
    component: IconComponentsMap["Bulma"],
    description:
      "Bulma is a modern CSS framework based on Flexbox. Makes it easy to build responsive websites with ready-to-use components and a simple class system.",
  },
  {
    name: "CSS",
    type: "CSS",
    component: IconComponentsMap["CSS"],
    description:
      "CSS (Cascading Style Sheets) is used to style websites—colors, fonts, spacing, animations, and layout. All styling of HTML is done with CSS, either “vanilla” or using frameworks like Bulma, Bootstrap, or Tailwind.",
  },
  {
    name: "Three.js", // ← matcher dataene dine hvis du bruker "Three.js"
    type: "3D",
    component: IconComponentsMap["Three.js"],
    description:
      "Three.js is the most popular JavaScript library for creating 3D graphics in the browser. Provides easy access to WebGL and allows you to build advanced 3D scenes, games, and visualizations.",
  },
  {
    name: "PixiJS", // ← matcher dataene dine hvis du bruker "PixiJS"
    type: "3D",
    component: IconComponentsMap["PixiJS"],
    description:
      "PixiJS is a fast 2D graphics library for HTML5. Used for creating games, animations, and interactive graphics projects in the browser with WebGL.",
  },
];

export {
  JsCategoryIcon,
  CssCategoryIcon,
  FrameworkCategoryIcon,
  ThreeDCategoryIcon,
};

export function getFrameworkIconElement(frameworkIconText) {
  const IconComponent =
    IconComponentsMap[frameworkIconText] || IconComponentsMap["Default"];
  if (!IconComponentsMap[frameworkIconText]) {
    console.warn(
      "[FEIL]: Fant ikke ikon for:",
      frameworkIconText,
      "\nTilgjengelige keys i IconComponentsMap:",
      Object.keys(IconComponentsMap)
    );
  } else {
    console.info("[INFO]: Viser ikon for:", frameworkIconText);
  }
  return IconComponent ? <IconComponent /> : null;
}
