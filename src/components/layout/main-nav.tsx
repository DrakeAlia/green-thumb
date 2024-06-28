"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";

// Define types for your motion values
type LinkMotion = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  textX: MotionValue<number>;
  textY: MotionValue<number>;
};

const LINKS = [
  { path: "/features", name: "Features" },
  { path: "/products", name: "Products" },
];

// Custom Hook to create motion values for each link
const useLinkMotion = (): LinkMotion => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const textX = useTransform(x, (latest) => latest * 0.5);
  const textY = useTransform(y, (latest) => latest * 0.5);
  return { x, y, textX, textY };
};

export function MainNav() {
  const pathname = usePathname();
  const MotionLink = motion(Link);

  // Create motion values for each link
  const linkMotions = LINKS.map(() => useLinkMotion());

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

  return (
    <div className="mr-4 hidden md:flex items-center">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image
          className="h-9 w-9 rounded-lg"
          src="/images/logo.png"
          alt="Logo"
          width={50}
          height={50}
        />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-5 text-sm">
        <ul className="flex gap-8">
          <AnimatePresence>
            {LINKS.map((link, index) => {
              const { x, y, textX, textY } = linkMotions[index];
              return (
                <motion.li
                  onPointerMove={(event) => {
                    const item = event.currentTarget;
                    setTransform(item, event, x, y);
                  }}
                  key={link.path}
                  onPointerLeave={() => {
                    x.set(0);
                    y.set(0);
                  }}
                  style={{ x, y }}
                >
                  <MotionLink
                    className={cn(
                      "font-medium relative rounded-md text-sm py-2 px-4 transition-all duration-500 ease-out hover:bg-blue-200",
                      pathname === link.path ? "bg-slate-300" : ""
                    )}
                    href={link.path}
                  >
                    <motion.span
                      style={{ x: textX, y: textY }}
                      className="z-10 relative"
                    >
                      {link.name}
                    </motion.span>
                    {pathname === link.path ? (
                      <motion.div
                        transition={{ type: "spring" }}
                        layoutId="underline"
                        className="absolute w-full h-full rounded-md left-0 bottom-0 bg-blue-400"
                      >
                        {" "}
                      </motion.div>
                    ) : null}
                  </MotionLink>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </nav>
    </div>
  );
}
