"use client"; // Indicates this is a client-side component

import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react"; // Importing icons for light and dark modes
import { useTheme } from "next-themes"; // Hook for theme management

// Importing UI components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  // Using the setTheme function from the useTheme hook
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      {/* Dropdown trigger button */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-9 px-0">
          {/* Sun icon for light mode */}
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          {/* Moon icon for dark mode */}
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          {/* Accessibility text for screen readers */}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      {/* Dropdown menu content */}
      <DropdownMenuContent align="end">
        {/* Light theme option */}
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        {/* Dark theme option */}
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        {/* System theme option (follows system preference) */}
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
