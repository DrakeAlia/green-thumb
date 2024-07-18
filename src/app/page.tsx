"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  motion,
  useInView,
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

// Home page component
export default function Home() {
  const buttonMotion = useButtonMotion();

  const scrollY = useMotionValue(0);

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
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const coverImageHeight = useTransform(scrollY, (latest) =>
    Math.max(400, 800 - latest * 0.5)
  );

  const y = useTransform(scrollY, [0, 1], [0, 0.5]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <main className="flex flex-col min-h-screen">
      <motion.section
        className="relative overflow-hidden"
        style={{ height: coverImageHeight, minHeight: "600px" }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ y }}
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
        <div className="absolute inset-0 bg-black/40">
          <div className="container mx-auto h-full flex items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.2 }}
              className="max-w-2xl text-left"
            >
              <PageHeader className="space-y-4">
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.6 }}
                >
                  <PageHeaderHeading>
                    <span className="text-white font-bold text-5xl md:text-6xl lg:text-7xl leading-tight block">
                      Gardening made
                      <br />
                      <span className="text-primary">For everyone</span>
                    </span>
                  </PageHeaderHeading>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.6 }}
                >
                  <PageHeaderDescription className="text-white/80 text-xl font-semibold md:text-2xl max-w-xl">
                    Our smart garden system makes it easy to grow your favorite
                    plants indoors
                  </PageHeaderDescription>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.6 }}
                >
                  <PageActions className="flex flex-col items-center justify-center w-full pt-4">
                    <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                      <motion.div
                        onPointerMove={(event) => {
                          const item = event.currentTarget;
                          setTransform(
                            item,
                            event,
                            buttonMotion.x,
                            buttonMotion.y
                          );
                        }}
                        onPointerLeave={() => {
                          buttonMotion.x.set(0);
                          buttonMotion.y.set(0);
                        }}
                        style={{ x: buttonMotion.x, y: buttonMotion.y }}
                      >
                        <MotionButton
                          className={cn(
                            buttonVariants({ size: "lg" }),
                            "w-full"
                          )}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          Get Started
                        </MotionButton>
                      </motion.div>

                      <MotionButton
                        className={cn(
                          buttonVariants({ size: "lg", variant: "secondary" }),
                          "w-full "
                        )}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        Learn More
                      </MotionButton>
                    </div>
                  </PageActions>
                </motion.div>
              </PageHeader>
            </motion.div>
          </div>
        </div>
      </motion.section>

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
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div className="container mx-auto h-full flex items-center">
            <Card className="flex flex-col justify-center items-center p-4">
              <CardHeader>
                <CardTitle className="text-primary text-4xl font-bold text-center">
                  Ready to start your indoor garden?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-bold text-center">
                  Our smart garden system is the perfect solution for busy plant
                  lovers. Get started today and enjoy the benefits of a lush
                  indoor garden without the hassle.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <MotionButton
                  className={cn(buttonVariants({}))}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                >
                  Get Your Smart Garden
                </MotionButton>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}
