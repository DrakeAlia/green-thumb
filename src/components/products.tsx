import { motion } from "framer-motion";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card className="h-full flex flex-col overflow-hidden p-2">
      <div className="relative pt-[100%]">
        <Image
          src={`/images/${product.image}`}
          alt={product.name}
          width={200}
          height={200}
          className="absolute top-0 left-0 w-full h-full transition-transform duration-300 hover:scale-110 rounded-sm"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">
          {product.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Learn More</Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const ProductsSection = () => (
  <section className="py-16 ">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-primary">
        Our Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  </section>
);

export default ProductsSection;
