"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { DialogProps } from "@radix-ui/react-dialog";
import {
  CircleIcon,
  FileIcon,
  LaptopIcon,
  MoonIcon,
  SunIcon,
  LayoutIcon, // for Features
  PackageIcon, // for Products
} from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

import { miniNavConfig } from "@/config/mini-nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

// Wrap CommandDialog with motion
const MotionCommandDialog = motion(CommandDialog);

// Wrap CommandItem with motion
const MotionCommandItem = motion(CommandItem);

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const handleScroll = (sectionId: string) => {
    if (window.location.pathname !== "/") {
      // If not on home page, navigate there first
      router.push("/");
      // Use setTimeout to wait for navigation to complete
      setTimeout(() => scrollToSection(sectionId), 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80; // Adjust this value based on your header height
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <AnimatePresence>
        {open && (
          <MotionCommandDialog
            open={open}
            onOpenChange={setOpen}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Sections">
                <MotionCommandItem
                  value="Features"
                  onSelect={() => {
                    runCommand(() => handleScroll("features"));
                  }}
                  whileHover={{
                    backgroundColor: "rgba(0,0,0,0.05)",
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LayoutIcon className="mr-2 h-4 w-4" />
                  Features
                </MotionCommandItem>
                <MotionCommandItem
                  value="Products"
                  onSelect={() => {
                    runCommand(() => handleScroll("products"));
                  }}
                  whileHover={{
                    backgroundColor: "rgba(0,0,0,0.05)",
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <PackageIcon className="mr-2 h-4 w-4" />
                  Products
                </MotionCommandItem>
              </CommandGroup>
              <CommandGroup heading="Links">
                {miniNavConfig.mainNav
                  .filter((navitem) => !navitem.external)
                  .map((navItem) => (
                    <CommandItem
                      key={navItem.href}
                      value={navItem.title}
                      onSelect={() => {
                        runCommand(() => router.push(navItem.href as string));
                      }}
                    >
                      <FileIcon className="mr-2 h-4 w-4" />
                      {navItem.title}
                    </CommandItem>
                  ))}
              </CommandGroup>
              {miniNavConfig.sidebarNav.map((group) => (
                <CommandGroup key={group.title} heading={group.title}>
                  {group.items.map((navItem) => (
                    <CommandItem
                      key={navItem.href}
                      value={navItem.title}
                      onSelect={() => {
                        runCommand(() => router.push(navItem.href as string));
                      }}
                    >
                      <div className="mr-2 flex h-4 w-4 items-center justify-center">
                        <CircleIcon className="h-3 w-3" />
                      </div>
                      {navItem.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
              <CommandSeparator />
              <CommandGroup heading="Theme">
                <CommandItem
                  onSelect={() => runCommand(() => setTheme("light"))}
                >
                  <SunIcon className="mr-2 h-4 w-4" />
                  Light
                </CommandItem>
                <CommandItem
                  onSelect={() => runCommand(() => setTheme("dark"))}
                >
                  <MoonIcon className="mr-2 h-4 w-4" />
                  Dark
                </CommandItem>
                <CommandItem
                  onSelect={() => runCommand(() => setTheme("system"))}
                >
                  <LaptopIcon className="mr-2 h-4 w-4" />
                  System
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </MotionCommandDialog>
        )}
      </AnimatePresence>
    </>
  );
}
