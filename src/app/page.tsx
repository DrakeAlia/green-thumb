"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  motion,
  useInView,
  AnimatePresence,
  MotionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";
import ProductsSection from "@/components/products";
import FeaturesSection from "@/components/features";

function AnimatedSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

function useButtonMotion() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const textX = useTransform(x, (latest) => latest * 0.5);
  const textY = useTransform(y, (latest) => latest * 0.5);
  return { x, y, textX, textY };
}
const MotionButton = motion(Button);

export default function Home() {
  const buttonMotion = useButtonMotion();

  const [scrollY, setScrollY] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const coverImageHeight = Math.max(400, 800 - scrollY * 0.5);

  return (
    <main className="flex flex-col min-h-screen">
      <section
        className="relative overflow-hidden"
        style={{ height: `${coverImageHeight}px`, minHeight: "600px" }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/cover.png"
            alt="Garden System"
            fill
            sizes="100vw"
            priority
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center p-4 max-w-4xl mx-auto"
          >
            <PageHeader>
              <PageHeaderHeading>
                <span className="text-primary font-bold font-2xl">
                  Gardening Made Easy
                </span>
              </PageHeaderHeading>
              <PageHeaderDescription className="text-white">
                Nurture your indoor garden from anywhere with our smart watering
                system. Our intelligent technology ensures your green friends
                are always perfectly watered, whether you&apos;re home or away
              </PageHeaderDescription>
              <PageActions>
                <motion.div
                  onPointerMove={(event) => {
                    const item = event.currentTarget;
                    setTransform(item, event, buttonMotion.x, buttonMotion.y);
                  }}
                  onPointerLeave={() => {
                    buttonMotion.x.set(0);
                    buttonMotion.y.set(0);
                  }}
                  style={{ x: buttonMotion.x, y: buttonMotion.y }}
                >
                  <MotionButton
                    className={cn(buttonVariants({}))}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span
                      style={{ x: buttonMotion.textX, y: buttonMotion.textY }}
                      className="z-10 relative"
                    >
                      Get Started
                    </motion.span>
                  </MotionButton>
                </motion.div>
              </PageActions>
            </PageHeader>
          </motion.div>
        </div>
      </section>
      <section id="features" className="py-8 md:py-16">
        <AnimatedSection>
          <FeaturesSection />
        </AnimatedSection>
      </section>
      <section
        id="products"
        className="flex-grow flex flex-col items-center justify-center p-2"
      >
        <AnimatedSection>
          <ProductsSection />
        </AnimatedSection>
      </section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="flex flex-col justify-center items-center p-4">
          <CardHeader>
            <CardTitle className="text-primary text-4xl font-bold text-center">
              Ready to start your indoor garden?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg text-bold text-center">
              Our smart garden system is the perfect solution for busy plant
              lovers. Get started today and enjoy the benefits of a lush indoor
              garden without the hassle.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button className={cn(buttonVariants({}))}>
              Get Your Smart Garden
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </main>
  );
}
