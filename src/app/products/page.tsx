"use client";

import { motion } from "framer-motion";
import { PageHeader, PageHeaderHeading } from "@/components/ui/page-header";
import ProductGrid from "@/components/layout/products/product-grid";

export default function ProductsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto"
      >
        <PageHeader className="text-center">
          <PageHeaderHeading></PageHeaderHeading>
        </PageHeader>

        <ProductGrid />
      </motion.div>
    </main>
  );
}
