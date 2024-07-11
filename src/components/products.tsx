import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  motion,
  useAnimationControls,
  LazyMotion,
  domAnimation,
  m,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const products = [
  {
    name: "Smart Garden Device",
    image: "device-1.png",
    description: "Automated watering and lighting system.",
  },
  {
    name: "Smart Plant Monitor",
    image: "device-2.png",
    description: "Monitor your plant's health and growth.",
  },
  {
    name: "Smart Plant Pot",
    image: "device-5.png",
    description: "Self-watering pot with built-in sensors.",
  },
  {
    name: "Smart Watering Can",
    image: "device-4.png",
    description: "Automated watering can with adjustable flow.",
  },
];

interface Product {
  name: string;
  image: string;
  description: string;
}

const ProductCard = ({ product }: { product: Product }) => (
  <m.div
    whileHover={{
      scale: 1.05,
      boxShadow: "0px 0px 15px rgba(74, 222, 128, 0.2)",
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="h-full"
  >
    <Card className="h-full flex flex-col overflow-hidden p-2">
      <m.div className="relative pt-[100%]" whileHover={{ scale: 1.05 }}>
        <Image
          src={`/images/${product.image}`}
          alt={product.name}
          width={200}
          height={200}
          className="absolute top-0 left-0 w-full h-full transition-transform duration-300 hover:scale-110 rounded-sm"
        />
      </m.div>
      <CardHeader>
        <m.h3
          className="text-lg font-semibold text-primary"
          whileHover={{ color: "#4ade80" }}
          transition={{ duration: 0.2 }}
        >
          {product.name}
        </m.h3>
      </CardHeader>
      <CardContent className="flex-grow">
        <m.p
          className="text-sm text-muted-foreground"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {product.description}
        </m.p>
      </CardContent>
      <CardFooter>
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button className="w-full">Learn More</Button>
        </m.div>
      </CardFooter>
    </Card>
  </m.div>
);

const ProductsSection = () => {
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
        className="py-16 relative overflow-hidden"
      >
        <m.div
          className="absolute inset-0 from-primary/5 to-secondary/5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            transition: {
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
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
              🛒
            </m.span>{" "}
            <m.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Our Products
            </m.span>
          </m.h2>

          <m.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            {products.map((product, index) => (
              <m.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <ProductCard product={product} />
              </m.div>
            ))}
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
};

export default ProductsSection;
