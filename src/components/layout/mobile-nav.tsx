"use client";

import React, { useEffect } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { miniNavConfig } from "@/config/mini-nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "../ui/icons";
import Image from "next/image";
import { X } from "lucide-react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";

function useButtonMotion() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const textX = useTransform(x, (latest) => latest * 0.5);
  const textY = useTransform(y, (latest) => latest * 0.5);
  return { x, y, textX, textY };
}

// This is the mobile navigation component that is displayed on smaller screens.

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [pendingScroll, setPendingScroll] = React.useState<string | null>(null);

  const MotionButton = motion(Button);

  const buttonMotion1 = useButtonMotion();
  const buttonMotion2 = useButtonMotion();
  const buttonMotions = [buttonMotion1, buttonMotion2];

  useEffect(() => {
    if (pendingScroll && pathname === "/") {
      scrollToSection(pendingScroll);
      setPendingScroll(null);
    }
  }, [pathname, pendingScroll]);

  const handleScroll = (sectionId: string) => {
    if (pathname === "/") {
      scrollToSection(sectionId);
    } else {
      setPendingScroll(sectionId);
      router.push("/");
    }
    setOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const setTransform = (
    item: HTMLElement & EventTarget,
    event: React.PointerEvent,
    x: MotionValue<number>,
    y: MotionValue<number>
  ) => {
    const bounds = item.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;
    const xRange = mapRange(0, bounds.width, -1, 1)(relativeX);
    const yRange = mapRange(0, bounds.height, -1, 1)(relativeY);
    x.set(xRange * 5);
    y.set(yRange * 5);
  };

  const mapRange = (
    inputLower: number,
    inputUpper: number,
    outputLower: number,
    outputUpper: number
  ) => {
    const INPUT_RANGE = inputUpper - inputLower;
    const OUTPUT_RANGE = outputUpper - outputLower;
    return (value: number) =>
      outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0);
  };
  

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="pr-0 bg-background/80 backdrop-blur-sm border-r transition-all duration-300"
      >
        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Image
            className="h-9 w-9 mr-3 rounded-lg"
            src="/images/logo.png"
            alt="Logo"
            width={50}
            height={50}
          />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {["Features", "Products"].map((buttonName, index) => {
              const { x, y, textX, textY } = buttonMotions[index];
              return (
                <motion.div
                  key={buttonName}
                  onPointerMove={(event) => {
                    const item = event.currentTarget;
                    setTransform(item, event, x, y);
                  }}
                  onPointerLeave={() => {
                    x.set(0);
                    y.set(0);
                  }}
                  style={{ x, y }}
                >
                  <MotionButton
                    className={cn(
                      "justify-start",
                      buttonVariants({ variant: "ghost" })
                    )}
                    onClick={() => handleScroll(buttonName.toLowerCase())}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span
                      style={{ x: textX, y: textY }}
                      className="z-10 relative"
                    >
                      {buttonName}
                    </motion.span>
                  </MotionButton>
                </motion.div>
              );
            })}
            {miniNavConfig.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>
          <div className="flex flex-col space-y-2">
            {miniNavConfig.sidebarNav.map((item, index) => (
              <div key={index} className="flex flex-col space-y-3 pt-6">
                <h4 className="font-medium">{item.title}</h4>
                {item?.items?.length &&
                  item.items.map((item) => (
                    <React.Fragment key={item.href}>
                      {!item.disabled &&
                        (item.href ? (
                          <MobileLink
                            href={item.href}
                            onOpenChange={setOpen}
                            className="text-muted-foreground"
                          >
                            {item.title}
                            {item.label && (
                              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                                {item.label}
                              </span>
                            )}
                          </MobileLink>
                        ) : (
                          item.title
                        ))}
                    </React.Fragment>
                  ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  handleScroll?: (sectionId: string) => void; // Make it optional
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  handleScroll,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  const isScrollLink = href === "#features" || href === "#products";

  const handleClick = () => {
    if (isScrollLink && handleScroll) {
      handleScroll(href.slice(1)); // Remove the '#' from the href
    } else {
      router.push(href.toString());
    }
    onOpenChange?.(false);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
