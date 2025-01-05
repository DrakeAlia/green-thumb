export interface Feature {
  slug: string;
  title: string;
  description: string;
  image: string;
  details: string;
  category?: string;
  benefits?: string[];
}

export const features: Feature[] = [
  {
    title: "Automated Watering",
    image: "auto-watering.png",
    description:
      "Set it and forget it. Our system waters your plants at optimal times.",
    slug: "automated-watering",
    details:
      "Our automated watering system uses advanced sensors to monitor soil moisture and deliver the perfect amount of water to each plant. Schedule waterings, set custom thresholds, and never worry about over or under-watering again.",
  },
  {
    title: "Smart Lighting",
    image: "smart-lighting.png",
    description:
      "Adjusts lighting conditions to mimic natural sunlight for healthy growth.",
    slug: "smart-lighting",
    details:
      "Our smart lighting system uses advanced LED technology to mimic natural sunlight, promoting healthy growth and energy efficiency.",
  },
  {
    title: "Climate Control",
    image: "climate-control.png",
    description: "Maintains ideal temperature and humidity for your plants.",
    slug: "climate-control",
    details:
      "Our climate control system uses advanced sensors to monitor temperature and humidity, maintaining ideal conditions for your plants.",
  },
  {
    title: "Mobile App",
    image: "mobile-app.png",
    description: "Control your garden from anywhere with our mobile app.",
    slug: "mobile-app",
    details:
      "Our mobile app allows you to control your garden from anywhere, with features such as scheduling, monitoring, and remote control.",
  },
  {
    title: "Voice Commands",
    image: "voice-commands.png",
    description: "Control your garden with voice commands, hands-free.",
    slug: "voice-commands",
    details:
      "Our voice commands system allows you to control your garden with voice commands, hands-free, using natural language processing technology.",
  },
  {
    title: "Customizable",
    image: "customize.png",
    description: "Customize your garden's settings to suit your plant's needs.",
    slug: "customizable",
    details:
      "Our customizable system allows you to customize your garden's settings to suit your plant's needs, with features such as scheduling, monitoring, and remote control.",
  },
];
