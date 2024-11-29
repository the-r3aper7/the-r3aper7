"use client";

import { Moon, SquareKanban, Sun } from "lucide-react";
import { useThemeStore } from "@/lib/store/useThemeStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <nav
      className={`w-full py-4 px-6 ${
        theme === "dark" ? "bg-background" : "bg-white"
      } sticky`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href={"/"} className="text-xl font-bold">
              Sai Srikar Dumpeti
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-x-2">
            <Link href={"/projects"}>
              <Button variant={"ghost"}>
                <SquareKanban /> Projects
              </Button>
            </Link>
            <Button onClick={toggleTheme} size={"icon"} variant={"ghost"}>
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
          </div>

          <div className="md:hidden gap-x-2">
            <Link href={"/projects"}>
              <Button variant={"ghost"} size={"icon"}>
                <SquareKanban />
              </Button>
            </Link>
            <Button onClick={toggleTheme} size={"icon"} variant={"ghost"}>
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
