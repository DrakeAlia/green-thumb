import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { CommandMenu } from "@/components/command-menu";
import { ModeToggle } from "./mode-toggle";
import { buttonVariants } from "@/components/ui/button";
// import { MainNav } from "@/components/layout/main-nav";
// import { MobileNav } from "@/components/layout/mobile-nav";
// import { SessionProvider } from "next-auth/react";
// import SiteHeaderAuth from "./site-header-auth";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* <SessionProvider> */}
        {/* <MainNav />
          <MobileNav /> */}
        {/* </SessionProvider> */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center space-x-2 ">
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
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
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
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ModeToggle />
            {/* <SessionProvider>
              <SiteHeaderAuth />
            </SessionProvider> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
