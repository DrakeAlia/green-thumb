import {
  motion,
  useAnimationControls,
  LazyMotion,
  domAnimation,
  m,
  useMotionValue,
  useTransform,
  MotionValue,
} from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Button, buttonVariants } from "./ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

function useButtonMotion() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const textX = useTransform(x, (latest) => latest * 0.5);
  const textY = useTransform(y, (latest) => latest * 0.5);
  return { x, y, textX, textY };
}

const setTransform = (
  item: HTMLElement & EventTarget,
  event: React.PointerEvent,
  x: MotionValue<number>,
  y: MotionValue<number>
) => {
  const bounds = item.getBoundingClientRect();
  const relativeX = event.clientX - bounds.left;
  const relativeY = event.clientY - bounds.top;
  const xRange = mapRange(0, bounds.width, -1, 1)(relativeX);
  const yRange = mapRange(0, bounds.height, -1, 1)(relativeY);
  x.set(xRange * 5);
  y.set(yRange * 5);
};

const mapRange = (
  inputLower: number,
  inputUpper: number,
  outputLower: number,
  outputUpper: number
) => {
  const INPUT_RANGE = inputUpper - inputLower;
  const OUTPUT_RANGE = outputUpper - outputLower;
  return (value: number) =>
    outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0);
};

const MotionButton = motion(Button);

const features = [
  {
    title: "Automated Watering",
    image: "auto-watering.png",
    description:
      "Set it and forget it. Our system waters your plants at optimal times.",
  },
  {
    title: "Smart Lighting",
    image: "smart-lighting.png",
    description:
      "Adjusts lighting conditions to mimic natural sunlight for healthy growth.",
  },
  {
    title: "Climate Control",
    image: "climate-control.png",
    description: "Maintains ideal temperature and humidity for your plants.",
  },
  {
    title: "Mobile App",
    image: "mobile-app.png",
    description: "Control your garden from anywhere with our mobile app.",
  },
  {
    title: "Voice Commands",
    image: "voice-commands.png",
    description: "Control your garden with voice commands, hands-free.",
  },
  {
    title: "Customizable",
    image: "customize.png",
    description: "Customize your garden's settings to suit your plant's needs.",
  },
];

const FeatureCard = ({
  feature,
  setTransform,
}: {
  feature: (typeof features)[0];
  setTransform: (
    item: HTMLElement & EventTarget,
    event: React.PointerEvent,
    x: MotionValue<number>,
    y: MotionValue<number>
  ) => void;
}) => {
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
            className="text-lg sm:text-xl font-semibold text-primary"
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
            className="text-md sm:text-base text-muted-foreground text-center mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {feature.description}
          </m.p>
          <motion.div
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
              className={cn(buttonVariants())}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                style={{ x: buttonMotion.textX, y: buttonMotion.textY }}
                className="z-10 relative"
              >
                Learn More
              </motion.span>
            </MotionButton>
          </motion.div>
        </CardContent>
      </Card>
    </m.div>
  );
};

const FeaturesSection = () => {
  const controls = useAnimationControls();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

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
        className="py-16 sm:py-16 md:py-24 relative overflow-hidden"
      >
        {/* Background animation */}
        <m.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            transition: {
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <m.h2
            className="text-4xl font-bold text-center mb-12 text-primary relative overflow-hidden cursor-default"
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
              🌿
            </m.span>{" "}
            <m.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Key Features
            </m.span>
          </m.h2>

          <m.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            {features.map((feature, index) => (
              <m.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <FeatureCard feature={feature} setTransform={setTransform} />
              </m.div>
            ))}
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
};

export default FeaturesSection;
