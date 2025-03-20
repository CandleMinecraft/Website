"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useCookie } from "@/hooks/useCookie";
import { useEffect } from "react";
import { useTheme } from "./theme-provider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  console.log(theme, setTheme);
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {setTheme(theme === "dark" ? "light" : "dark")}}
    >
      <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    </Button>
  );
} 