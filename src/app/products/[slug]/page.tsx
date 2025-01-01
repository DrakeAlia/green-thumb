"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { products } from "@/data/products";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <PageHeader>
          <PageHeaderHeading>{product.name}</PageHeaderHeading>
          <PageHeaderDescription>{product.description}</PageHeaderDescription>
        </PageHeader>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={`/images/${product.image}`}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="prose prose-lg">
              <p>{product.details}</p>
            </div>
            <div className="text-3xl font-bold">{product.price}</div>
            <div className="flex gap-4">
              <Button size="lg">Add to Cart</Button>
              <Link href="/products">
                <Button variant="outline">Back to Products</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
