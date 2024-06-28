import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Automated Watering",
    icon: "🚰",
    description:
      "Set it and forget it. Our system waters your plants at optimal times.",
  },
  {
    title: "Smart Lighting",
    icon: "💡",
    description:
      "Adjusts lighting conditions to mimic natural sunlight for healthy growth.",
  },
  {
    title: "Climate Control",
    icon: "🌡️",
    description: "Maintains ideal temperature and humidity for your plants.",
  },
];

const FeatureCard = ({ feature }: { feature: (typeof features)[0] }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card className="h-full">
      <CardHeader>
        <div className="text-4xl mb-4 bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center">
          {feature.icon}
        </div>
        <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-bold">{feature.description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const FeaturesSection = () => (
  <section className="py-8 md:py-16">
    <div className="container mx-auto px-4 md:px-8">
      <h2 className="text-primary text-3xl font-bold text-center mb-12">
        Key Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
