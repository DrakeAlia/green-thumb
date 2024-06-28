"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRef } from "react";
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

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="flex-grow flex flex-col items-center justify-center p-4 md:p-12 pt-0 md:pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center mb-4"
        >
          <PageHeader>
            <PageHeaderHeading>
              <span className="text-primary font-bold">
                Smart Gardening Made Easy
              </span>
            </PageHeaderHeading>
            <PageHeaderDescription>
              Nurture your indoor garden from anywhere with our smart watering
              system. Our intelligent technology ensures your green friends are
              always perfectly watered, whether you&apos;re home or away
            </PageHeaderDescription>
            <PageActions>
              <Button className={cn(buttonVariants())}>Get Started</Button>
            </PageActions>
          </PageHeader>
        </motion.div>
        <motion.div
          className="w-full max-w-6xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/images/cover.png"
            alt="Smart Garden Device"
            width={1200}
            height={1200}
            className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 mx-auto"
          />
        </motion.div>
      </section>
      <section className="py-8 md:py-16">
        <AnimatedSection>
          <FeaturesSection />
        </AnimatedSection>
      </section>
      <section className="flex-grow flex flex-col items-center justify-center p-2">
        <AnimatedSection>
          <ProductsSection />
        </AnimatedSection>
      </section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-blue-400 to-teal-200 text-white dark:from-tan-600 dark:to-teal-800 m-4">
          <CardHeader>
            <CardTitle className="text-4xl font-bold">
              Ready to start your indoor garden?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl">
              Join thousands of happy plant parents today!
            </p>
          </CardContent>
          <CardFooter>
            <Button className={cn(buttonVariants({ variant: "secondary" }))}>
              Get Your Smart Garden
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </main>
  );
}
