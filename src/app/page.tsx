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
  const products = [
    {
      name: "Smart Garden Device",
      image: "device-1.png",
    },
    {
      name: "Smart Plant Monitor",
      image: "device-2.png",
    },
    {
      name: "Smart Plant Pot",
      image: "device-5.png",
    },
    {
      name: "Smart Watering Can",
      image: "device-4.png",
    },
  ];
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
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-primary text-3xl font-bold text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Automated Watering",
                icon: "🚰",
                description:
                  "Set it and forget it. Our system waters your plants at optimal times.",
              },
              {
                title: "Smart Lighting",
                icon: "💡",
                description:
                  "Adjusts lighting conditions to mimic natural sunlight for healthy growth.",
              },
              {
                title: "Climate Control",
                icon: "🌡️",
                description:
                  "Maintains ideal temperature and humidity for your plants.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="text-4xl mb-4 bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold ">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-bold">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-16">
        <AnimatedSection>
          <h2 className="text-primary text-3xl font-bold text-center mb-12">
            Our Products
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {products.map((product, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative w-full pb-[75%] overflow-hidden">
                      <Image
                        src={`/images/${product.image}`}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </CardContent>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-green-800 dark:text-green-100">
                      {product.name}
                    </CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <Button className={cn(buttonVariants(), "w-full")}>
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
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
            <Button
              // size="lg"
              // variant="secondary"
              // className="w-full hover:bg-white hover:text-green-600 transition-colors"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Get Your Smart Garden
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </main>
  );
}
