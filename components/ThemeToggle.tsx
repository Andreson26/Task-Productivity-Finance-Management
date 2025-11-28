"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/providers";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
   
    return (
      <button
        aria-label="Toggle Theme"
        className="theme-toggle-btn opacity-0"
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="theme-toggle-btn"
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-accent" />
      ) : (
        <Moon size={18} className="text-accent" />
      )}
    </button>
  );
}