"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { features } from "@/data/features";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";

export default function FeatureDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const feature = features.find((f) => f.slug === params.slug);

  if (!feature) {
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
          <PageHeaderHeading>{feature.title}</PageHeaderHeading>
          <PageHeaderDescription>{feature.description}</PageHeaderDescription>
        </PageHeader>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={`/images/${feature.image}`}
              alt={feature.title}
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
              <p>{feature.details}</p>
            </div>
            <Link href="/features">
              <Button>Back to Features</Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
