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
      name: "Herb Garden Starter Kit",
      image: "device-2.png",
    },
    {
      name: "Plant Care Monitor",
      image: "device-5.png",
    },
    {
      name: "Smart Watering Can",
      image: "device-4.png",
    },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="relative h-96">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">
                Smart Indoor Gardening
              </h1>
              <p
                className="
              text-lg text-green-700 mb-8 md:mb-12
              max-w-md md:max-w-lg
            "
              >
                Grow your own herbs and vegetables with ease using our
                intelligent gardening system.
              </p>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-300"
              >
                Get Started
              </Button>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/images/cover.png"
                alt="Smart Garden Device"
                width={600}
                height={400}
                className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>
        </motion.div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
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
                className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  key={index}
                  className="bg-green-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4 bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-green-700">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-16">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            Our Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-4 rounded-lg shadow-md"
              >
                <div
                  key={index}
                  className=" p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src={`/images/${product.image}`}
                      alt={product.name}
                      width={300}
                      height={200}
                      layout="responsive"
                      className="transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    {product.name}
                  </h3>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-green-50 transition-colors duration-300"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-green-400 to-green-600 text-white">
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
              size="lg"
              variant="secondary"
              className="w-full hover:bg-white hover:text-green-600 transition-colors"
            >
              Get Your Smart Garden
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </main>
  );
}
