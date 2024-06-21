import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const products = [
    {
      name: "Herb Garden",
      image: "device-1.png",
    },
    {
      name: "Vegetable Planter",
      image: "device-2.png",
    },
    {
      name: "Succulent Collection",
      image: "device-5.png",
    },
    {
      name: "Vertical Garden",
      image: "device-4.png",
    },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">
              Smart Indoor Gardening
            </h1>
            <p className="text-xl text-green-700 mb-6">
              Grow your own herbs and vegetables with ease using our intelligent
              gardening system.
            </p>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-300"
            >
              Get Started
            </Button>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/images/cover.png"
              alt="Smart Garden Device"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
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
                description:
                  "Maintains ideal temperature and humidity for your plants.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4 bg-green-200 rounded-full w-16 h-16 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-green-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
          Our Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Image
                  src={`/images/${product.image}`}
                  alt={product.name}
                  width={300}
                  height={200}
                  layout="responsive"
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                {product.name}
              </h3>
              <Button
                variant="outline"
                className="w-full hover:bg-green-50 transition-colors duration-300"
              >
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to start your indoor garden?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of happy plant parents today!
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="hover:bg-white hover:text-green-700 transition-colors duration-300"
          >
            Get Your Smart Garden
          </Button>
        </div>
      </section>
    </main>
  );
}
