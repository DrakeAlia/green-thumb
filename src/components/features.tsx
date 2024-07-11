import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="h-full"
  >
    <Card className="h-full flex flex-col rounded-lg overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-primary">
          {feature.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex items-center">
        <p className="text-sm text-muted-foreground">{feature.description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const FeaturesSection = () => (
  <section className="py-16 md:py-24 ">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <motion.h2
        className="text-3xl font-bold text-center mb-12 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Key Features
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FeatureCard feature={feature} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
