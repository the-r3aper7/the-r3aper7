"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/lib/store/useThemeStore";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    useThemeStore.persist.rehydrate();

    const prefersDark =
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (!theme) {
      setTheme(prefersDark ? "dark" : "light");
    }

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, setTheme]);

  return <>{children}</>;
}
