"use client";

import { motion as m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { useButtonMotion, setTransform } from "@/hooks/use-button-motion";

const MotionButton = m(Button);

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const buttonMotion = useButtonMotion();

  return (
    <m.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 0px 15px rgba(229, 222, 20, 0.727)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full rounded-lg"
    >
      <Card className="h-full flex flex-col rounded-lg overflow-hidden backdrop-blur-sm p-4 sm:p-6 lg:p-8">
        <m.div
          className="relative pt-[100%] sm:pt-[120%] lg:pt-[100%] overflow-hidden rounded-md"
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={`/images/${product.image}`}
            alt={product.name}
            width={400}
            height={400}
            className="absolute top-0 left-0 w-full h-full transition-transform duration-300 hover:scale-110 object-cover"
          />
        </m.div>
        <CardHeader>
          <m.h3
            className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary"
            whileHover={{
              color: "#4ade80",
              textShadow: "0 0 8px rgba(74, 222, 128, 0.3)",
            }}
            transition={{ duration: 0.2 }}
          >
            {product.name}
          </m.h3>
        </CardHeader>
        <CardContent className="flex-grow">
          <m.p
            className="text-base sm:text-lg lg:text-xl text-muted-foreground"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {product.description}
          </m.p>
          <p className="text-xl font-bold text-primary mt-4">{product.price}</p>
        </CardContent>
        <CardFooter>
          <Link href={`/products/${product.slug}`} className="w-full">
            <m.div
              onPointerMove={(event) => {
                const item = event.currentTarget;
                setTransform(item, event, buttonMotion.x, buttonMotion.y);
              }}
              onPointerLeave={() => {
                buttonMotion.x.set(0);
                buttonMotion.y.set(0);
              }}
              style={{ x: buttonMotion.x, y: buttonMotion.y }}
              className="w-full"
            >
              <MotionButton
                className="w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <m.span
                  style={{ x: buttonMotion.textX, y: buttonMotion.textY }}
                  className="z-10 relative"
                >
                  View Details
                </m.span>
              </MotionButton>
            </m.div>
          </Link>
        </CardFooter>
      </Card>
    </m.div>
  );
};

export default ProductCard;
