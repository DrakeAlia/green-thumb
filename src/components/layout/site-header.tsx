import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { CommandMenu } from "@/components/command-menu";
import { Icons } from "@/components/ui/icons";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import { buttonVariants } from "@/components/ui/button";

// SiteHeader component: Represents the main header of the website
export function SiteHeader() {
  return (
    // Header container with styling for sticky positioning and backdrop effect
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Inner container for header content */}
      <div className="container flex h-14 items-center justify-between">
        {/* Main navigation component for larger screens */}
        <MainNav />

        {/* Mobile navigation component for smaller screens */}
        <MobileNav />

        {/* Container for right-side elements (search, links, theme toggle) */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Command menu (likely a search or action input) */}
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>

          {/* Navigation links and theme toggle */}
          <nav className="flex items-center space-x-2 ">
            {/* GitHub link */}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                {/* Screen reader only text for accessibility */}
                <span className="sr-only">GitHub</span>
              </div>
            </Link>

            {/* Twitter link */}
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.twitter className="h-3 w-3 fill-current" />
                {/* Screen reader only text for accessibility */}
                <span className="sr-only">Twitter</span>
              </div>
            </Link>

            {/* Theme toggle component */}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
