"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";

export function MainNav() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { path: "/features", name: "Features" },
    { path: "/products", name: "Products" },
  ];

  const MotionButton = motion(Button);

  const MotionLink = motion(Link);

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
    x: MotionValue,
    y: MotionValue
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
        <AnimatePresence>
          {links.map((link) => {
            const x = useMotionValue(0);
            const y = useMotionValue(0);
            const textX = useTransform(x, (latest) => latest * 0.5);
            const textY = useTransform(y, (latest) => latest * 0.5);
            return (
              <motion.div
                key={link.path}
                onPointerMove={(event) => {
                  const item = event.currentTarget;
                  setTransform(item, event, x, y);
                }}
                onPointerLeave={(event) => {
                  x.set(0);
                  y.set(0);
                }}
                style={{ x, y }}
              >
                <MotionButton
                  className={cn(buttonVariants())}
                >
                  <motion.span
                    style={{ x: textX, y: textY }}
                    className="z-10 relative"
                  >
                    {link.name}
                  </motion.span>
                  {pathname === link.path && (
                    <motion.div
                      transition={{ type: "spring" }}
                      layoutId="underline"
                      className="absolute w-full h-full rounded-md left-0 bottom-0 bg-blue-300 opacity-50"
                    />
                  )}
                </MotionButton>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </nav>
    </div>
  );
}