import { useState, useEffect } from "react";

type Theme = "light" | "dark";

const THEME_KEY = "theme";

const getSystemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const getTheme = (): Theme => {
  const saved = localStorage.getItem(THEME_KEY) as Theme | null;
  if (saved === "dark" || saved === "light") return saved;
  return getSystemTheme();
};

const themeChangeEvent = new Event("themechange");

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getTheme);

  useEffect(() => {
    const updateTheme = () => setTheme(getTheme());
    window.addEventListener("storage", updateTheme);
    window.addEventListener("themechange", updateTheme);
    return () => {
      window.removeEventListener("storage", updateTheme);
      window.removeEventListener("themechange", updateTheme);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem(THEME_KEY, newTheme);
    setTheme(newTheme);
    window.dispatchEvent(themeChangeEvent);
  };

  return { theme, toggleTheme };
};
