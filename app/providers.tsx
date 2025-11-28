"use client";

import { SessionProvider } from "next-auth/react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // ⭐ INITIAL THEME IS READ SYNCHRONOUSLY FROM THE DOM
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof document === "undefined") return "dark";
    return (
      (localStorage.getItem("theme") as Theme | null) ||
      (document.documentElement.dataset.theme as Theme) ||
      "dark"
    );
  });

  // Keep DOM in sync when theme changes
  useEffect(() => {
    const root = document.documentElement;

    root.dataset.theme = theme;

    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    localStorage.setItem("theme", t);
    setThemeState(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
}
