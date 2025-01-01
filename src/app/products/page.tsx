"use client";

import { motion } from "framer-motion";
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/components/ui/page-header";
import ProductGrid from "@/components/layout/products/product-grid";

export default function ProductsPage() {
  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.main
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="flex min-h-screen flex-col items-center justify-between p-4"
    >
      <motion.div
        variants={childVariants}
        className="container mx-auto relative"
      >
        {/* Background decorative element */}
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-secondary/5 rounded-3xl"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <PageHeader className="text-center pb-8 space-y-4">
          <motion.div variants={childVariants} className="space-y-2">
            <PageHeaderHeading>
              <motion.span
                initial={{ display: "inline-block" }}
                animate={{ rotate: [0, 10, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="inline-block mr-2"
              >
                🌿
              </motion.span>
              Our Products
            </PageHeaderHeading>
            <PageHeaderDescription>
              Discover our range of smart gardening solutions designed to make
              plant care effortless
            </PageHeaderDescription>
          </motion.div>
        </PageHeader>

        <motion.div variants={childVariants} className="relative z-10">
          <ProductGrid />
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
