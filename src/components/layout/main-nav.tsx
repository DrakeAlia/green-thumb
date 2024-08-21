// Importing necessary dependencies and components
"use client"; // Indicates this is a client-side component

import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Button, buttonVariants } from "../ui/button";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";

// Array of button names for navigation
const BUTTONS = ["Features", "Products"];

// Custom hook for button motion effects
function useButtonMotion() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Transform x and y values for text movement (half of the button movement)
  const textX = useTransform(x, (latest) => latest * 0.5);
  const textY = useTransform(y, (latest) => latest * 0.5);
  return { x, y, textX, textY };
}
// MainNav component: Representing the main navigation bar of the website.
export function MainNav() {
  const router = useRouter();

  // Creating a motion-enabled Button component
  const MotionButton = motion(Button);

  // Motion values for logo animation
  const logoMotion = useButtonMotion();

  // Create motion values for each navigation button
  const buttonMotion1 = useButtonMotion();
  const buttonMotion2 = useButtonMotion();
  const buttonMotions = [buttonMotion1, buttonMotion2];

  // Utility function to map a value from one range to another
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

  // Function to set transform values based on pointer position
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

  // Function to handle scrolling to sections
  const handleScroll = (sectionId: string) => {
    if (window.location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      // If not on home page, navigate there first
      router.push("/");
      // Use setTimeout to wait for navigation to complete
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  };

  // Function to scroll to a specific section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Calculate the offset to account for fixed headers if any
      const offset = 80; // Adjust this value based on your header height
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // State to keep track of active section
  const [activeSection, setActiveSection] = React.useState("");

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="hidden md:flex items-center justify-between w-full">
      {/* Logo button */}
      <MotionButton
        variant="ghost"
        className="mr-6 flex items-center space-x-2 min-w-[150px]"
        onClick={scrollToTop}
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <Image
            className="h-9 w-9 rounded-lg"
            src="/images/logo.png"
            alt="Logo"
            width={50}
            height={50}
          />
        </motion.div>
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </MotionButton>

      {/* Navigation menu */}
      <nav className="flex-grow flex justify-center items-center">
        <ul className="flex gap-8">
          <AnimatePresence>
            {BUTTONS.map((buttonName, index) => {
              const { x, y, textX, textY } = buttonMotions[index];
              return (
                <motion.li
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
                    variant="ghost"
                    className="relative"
                    onClick={() => {
                      setActiveSection(buttonName.toLowerCase());
                      handleScroll(buttonName.toLowerCase());
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
                      {buttonName}
                    </motion.span>
                  </MotionButton>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </nav>

      {/* Placeholder div for layout balance */}
      <div className="w-[100px]"></div>
    </div>
  );
}
