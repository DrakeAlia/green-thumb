"use client";

import { motion as m } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { features, Feature } from "@/data/features";
import { useButtonMotion, setTransform } from "@/hooks/use-button-motion";

const MotionButton = m(Button);

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  const buttonMotion = useButtonMotion();

  return (
    <m.div
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 0px 15px rgba(229, 222, 20, 0.727)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full rounded-lg"
    >
      <Card className="h-full flex flex-col rounded-lg overflow-hidden backdrop-blur-sm p-4 sm:p-6">
        <CardHeader className="pb-2 sm:pb-4 text-center">
          <m.h3
            className="text-xl sm:text-2xl font-semibold text-primary"
            whileHover={{
              color: "#4ade80",
              textShadow: "0 0 8px rgba(74, 222, 128, 0.3)",
            }}
            transition={{ duration: 0.2 }}
          >
            {feature.title}
          </m.h3>
        </CardHeader>
        <m.div
          className="w-full aspect-video sm:aspect-square relative overflow-hidden mb-2 sm:mb-4 rounded-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Image
            src={`/images/${feature.image}`}
            alt={feature.title}
            width={300}
            height={300}
            className="absolute top-0 left-0 w-full h-full transition-transform duration-300 hover:scale-110 rounded-sm object-cover"
          />
        </m.div>
        <CardContent className="flex-grow flex flex-col items-center justify-center">
          <m.p
            className="text-md sm:text-base text-muted-foreground text-center mt-2 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {feature.description}
          </m.p>
          <Link href={`/features/${feature.slug}`} className="w-full">
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
                  Learn More
                </m.span>
              </MotionButton>
            </m.div>
          </Link>
        </CardContent>
      </Card>
    </m.div>
  );
};

export default FeatureCard;
