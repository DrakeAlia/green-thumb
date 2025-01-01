"use client";

import { motion as m, LazyMotion, domAnimation } from "framer-motion";
import { useAnimationControls } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ProductCard from "./product-card";
import { products } from "@/data/products";

const ProductGrid = () => {
  const controls = useAnimationControls();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              when: "beforeChildren",
              staggerChildren: 0.1,
            },
          },
        }}
        className="py-16 sm:py-24 lg:py-32 relative overflow-hidden"
      >
        <m.div
          className="absolute inset-0 from-primary/5 to-secondary/5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-full">
          {isHomePage && (
            <m.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-16 sm:mb-20 lg:mb-24 text-primary relative overflow-hidden cursor-default"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
            >
              <m.span
                initial={{ display: "inline-block" }}
                animate={{ rotate: [0, 10, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                🛒
              </m.span>{" "}
              <m.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Our Products
              </m.span>
            </m.h2>
          )}

          <m.div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 sm:gap-12 lg:gap-16"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            {products.map((product, index) => (
              <m.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <ProductCard product={product} />
              </m.div>
            ))}
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
};

export default ProductGrid;
