import { useMotionValue, useTransform, MotionValue } from "framer-motion";
import { MainNavItem, SidebarNavItem } from "../types/nav";

// This mini-nav configuration and utility file plays a crucial role in the application's
// navigation system and UI interactions. It provides a centralized place for
// navigation structure and reusable functions for animations and scrolling,
// contributing to a consistent and interactive user experience across the application.

// Custom hook for button motion effects
export function useButtonMotion() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const textX = useTransform(x, (latest) => latest * 0.5);
  const textY = useTransform(y, (latest) => latest * 0.5);
  return { x, y, textX, textY };
}

// Function to set transform based on pointer position
export const setTransform = (
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

// Utility function to map a range of values
export const mapRange = (
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

// Interface for the navigation configuration
interface MiniNavConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
  sectionNav: {
    title: string;
    href: string;
  }[];
}

// Navigation configuration object
export const miniNavConfig: MiniNavConfig = {
  mainNav: [
    {
      title: "GitHub",
      href: "http://www.github.com/DrakeAlia",
      external: true,
    },
    {
      title: "Twitter",
      href: "https://twitter.com/drake___alia",
      external: true,
    },
  ],
  sidebarNav: [],
  sectionNav: [
    {
      title: "Features",
      href: "features",
    },
    {
      title: "Products",
      href: "products",
    },
  ],
};

// Function to handle scrolling to sections
export function handleScroll(sectionId: string, router: any, pathname: string) {
  if (pathname === "/") {
    scrollToSection(sectionId);
  } else {
    router.push("/");
    setTimeout(() => scrollToSection(sectionId), 100);
  }
}

// Helper function to scroll to a specific section
function scrollToSection(sectionId: string) {
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
}
