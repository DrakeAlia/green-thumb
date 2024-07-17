"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  miniNavConfig,
  handleScroll,
  useButtonMotion,
  setTransform,
} from "@/config/mini-nav";
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
import { X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// This is the mobile navigation component that is displayed on smaller screens.
export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const MotionButton = motion(Button);

  // Create button motions for each item in sectionNav
  const buttonMotion1 = useButtonMotion();
  const buttonMotion2 = useButtonMotion();
  const buttonMotions = [buttonMotion1, buttonMotion2];

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
        className="pr-0 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r transition-all duration-300"
      >
        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
        <MobileLink
          href="/"
          className="flex items-center mt-4"
          onOpenChange={setOpen}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              className="h-9 w-9 mr-3 rounded-lg"
              src="/images/logo.png"
              alt="Logo"
              width={50}
              height={50}
            />
          </motion.div>
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {miniNavConfig.sectionNav.map((item, index) => {
              const { x, y, textX, textY } = buttonMotions[index];
              return (
                <motion.div
                  key={item.title}
                  onPointerMove={(event) => {
                    const element = event.currentTarget;
                    setTransform(element, event, x, y);
                  }}
                  onPointerLeave={() => {
                    x.set(0);
                    y.set(0);
                  }}
                  style={{ x, y }}
                >
                  <MotionButton
                    className={cn(
                      "justify-start ml-2",
                      buttonVariants({ variant: "ghost" })
                    )}
                    onClick={() => {
                      handleScroll(item.href, router, pathname);
                      setOpen(false);
                    }}
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
                      {item.title}
                    </motion.span>
                  </MotionButton>
                </motion.div>
              );
            })}
            {miniNavConfig.mainNav?.map(
              (item, index) =>
                item.href && (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <MobileLink
                      href={item.href}
                      onOpenChange={setOpen}
                      className={cn(
                        "ml-2 p-2 flex items-center space-x-2",
                        item.external ? "text-bold" : ""
                      )}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.title}
                        {item.label && (
                          <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                            {item.label}
                          </span>
                        )}
                      </motion.div>
                    </MobileLink>
                  </motion.div>
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
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default Link behavior

    if (typeof href === "string") {
      if (href.startsWith("#")) {
        handleScroll(href.slice(1), router, pathname);
      } else if (href.startsWith("http")) {
        window.open(href, "_blank");
      } else {
        router.push(href);
      }
    } else {
      router.push(href.toString());
    }
    onOpenChange?.(false);
  };

  return (
    <motion.div>
      <Link
        href={href}
        onClick={handleClick}
        className={cn(className, "block")}
        {...props}
      >
        {children}
      </Link>
    </motion.div>
  );
}
