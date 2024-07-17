import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  motion,
  useAnimationControls,
  LazyMotion,
  domAnimation,
  m,
  MotionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

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

const products = [
  {
    name: "GreenHaven",
    image: "greenhaven.png",
    description: "Automated watering and lighting system.",
  },
  {
    name: "BotaniTech",
    image: "botanitech.png",
    description: "Monitor your plant's health and growth.",
  },
  {
    name: "EcoGro",
    image: "ecogro.png",
    description: "Self-watering pot with built-in sensors.",
  },
  {
    name: "PurePlant",
    image: "pureplant.png",
    description: "Automated watering can with adjustable flow.",
  },
];

interface Product {
  name: string;
  image: string;
  description: string;
}

const ProductCard = ({
  product,
  setTransform,
}: {
  product: Product;
  setTransform: any;
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
      <Card className="h-full flex flex-col rounded-lg overflow-hidden backdrop-blur-sm p-4">
        <m.div
          className="relative pt-[100%] overflow-hidden rounded-md"
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={`/images/${product.image}`}
            alt={product.name}
            width={400}
            height={400}
            className="absolute top-0 left-0 w-full h-full transition-transform duration-300 hover:scale-110"
          />
        </m.div>
        <CardHeader>
          <m.h3
            className="text-lg font-semibold text-primary"
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
            className="text-md text-muted-foreground"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {product.description}
          </m.p>
        </CardContent>
        <CardFooter>
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
            className="w-full"
          >
            <MotionButton
              className={cn(buttonVariants({}), "w-full")}
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
                View Product
              </motion.span>
            </MotionButton>
          </motion.div>
        </CardFooter>
      </Card>
    </m.div>
  );
};

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
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
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
                <ProductCard product={product} setTransform={setTransform} />
              </m.div>
            ))}
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
};

export default ProductsSection;
