import {
  motion,
  useAnimationControls,
  LazyMotion,
  domAnimation,
  m,
} from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const features = [
  {
    title: "Automated Watering",
    description:
      "Set it and forget it. Our system waters your plants at optimal times.",
  },
  {
    title: "Smart Lighting",
    description:
      "Adjusts lighting conditions to mimic natural sunlight for healthy growth.",
  },
  {
    title: "Climate Control",
    description: "Maintains ideal temperature and humidity for your plants.",
  },
  {
    title: "Mobile App",
    description: "Control your garden from anywhere with our mobile app.",
  },
  {
    title: "Voice Commands",
    description: "Control your garden with voice commands, hands-free.",
  },
  {
    title: "Customizable",
    description: "Customize your garden's settings to suit your plant's needs.",
  },
];

const FeatureCard = ({ feature }: { feature: (typeof features)[0] }) => (
  <m.div
    whileHover={{
      scale: 1.05,
      boxShadow: "0px 0px 15px rgba(74, 222, 128, 0.2)",
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="h-full"
  >
    <Card className="h-full flex flex-col rounded-lg overflow-hidden border-primary/10">
      <CardHeader className="pb-2">
        <m.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <m.h3
            className="text-lg font-semibold text-primary"
            whileHover={{
              color: "#4ade80",
              textShadow: "0 0 8px rgba(74, 222, 128, 0.3)",
            }}
            transition={{ duration: 0.2 }}
          >
            {feature.title}
          </m.h3>
        </m.div>
      </CardHeader>
      <CardContent className="flex-grow flex items-center">
        <m.p
          className="text-sm text-muted-foreground"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          {feature.description}
        </m.p>
      </CardContent>
    </Card>
  </m.div>
);

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
        className="py-16 md:py-24 relative overflow-hidden"
      >
        {/* Background animation */}
        <m.div
          className="absolute inset-0  from-primary/5 to-secondary/5"
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                <FeatureCard feature={feature} />
              </m.div>
            ))}
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
};

export default FeaturesSection;
