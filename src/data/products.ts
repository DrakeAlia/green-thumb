
export interface Product {
  slug: string;
  name: string;
  image: string;
  description: string;
  details: string;
  price: string;
  features?: string[];
  stockStatus?: "In Stock" | "Out of Stock" | "Pre-order";
}

export const products: Product[] = [
  {
    slug: "greenhaven",
    name: "GreenHaven",
    image: "greenhaven.png",
    description: "Automated watering and lighting system.",
    details:
      "The GreenHaven system combines state-of-the-art automation with intuitive controls. Features include precision watering, smart LED lighting, and mobile app integration.",
    price: "$299.99",
  },
  {
    slug: "botanitech",
    name: "BotaniTech",
    image: "botanitech.png",
    description: "Monitor your plant's health and growth.",
    details:
      "BotaniTech's advanced sensors provide real-time monitoring of soil conditions, plant growth, and environmental factors for optimal plant care.",
    price: "$199.99",
  },
  {
    slug: "ecogro",
    name: "EcoGro",
    image: "ecogro.png",
    description: "Self-watering pot with built-in sensors.",
    details:
      "The EcoGro smart pot features integrated moisture sensors and a self-watering system that ensures your plants get exactly what they need.",
    price: "$89.99",
  },
  {
    slug: "pureplant",
    name: "PurePlant",
    image: "pureplant.png",
    description: "Automated watering can with adjustable flow.",
    details:
      "PurePlant's smart watering system offers precision flow control and scheduling, making plant care effortless and efficient.",
    price: "$129.99",
  },
];
