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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="container max-w-6xl mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PageHeader className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Badge className="mb-6 text-lg px-4 py-1 bg-primary/10 text-primary">
                Smart Garden Product
              </Badge>
              <PageHeaderHeading className="text-primary mb-6">
                {product.name}
              </PageHeaderHeading>
              <PageHeaderDescription className="text-xl max-w-2xl mx-auto">
                {product.description}
              </PageHeaderDescription>
            </motion.div>
          </PageHeader>

          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-square"
              >
                <Image
                  src={`/images/${product.image}`}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  priority
                />
              </motion.div>
            </Card>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-8"
            >
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="prose prose-lg dark:prose-invert">
                    <h3 className="text-2xl font-semibold mb-4 text-primary">
                      About this Product
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {product.details}
                    </p>
                    <div className="mt-8 space-y-4">
                      <h4 className="text-xl font-semibold text-primary">
                        Product Features:
                      </h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Smart automation technology</li>
                        <li>Energy-efficient design</li>
                        <li>Mobile app integration</li>
                        <li>Easy setup and maintenance</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-muted-foreground">
                        Price
                      </h3>
                      <p className="text-4xl font-bold text-primary">
                        {product.price}
                      </p>
                    </div>
                    <Badge className="text-lg px-4 py-2">In Stock</Badge>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-4">
                <Button size="lg" className="w-full text-lg py-6">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Link href="/" className="w-full">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full text-lg py-6"
                  >
                    Back to Home
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
