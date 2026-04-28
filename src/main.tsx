import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Apply persisted theme before render to avoid flash
(() => {
  try {
    const saved = localStorage.getItem("hbs-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved === "dark" || saved === "light" ? saved : prefersDark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch {
    /* noop */
  }
})();

createRoot(document.getElementById("root")!).render(<App />);
