import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { Style } from "@/styles/styles";
import { Theme } from "@/components/theme";

// This useConfig hook plays a crucial role in managing the application's appearance and 
// behavior. It provides a centralized, persistent way to store user preferences or 
// application settings, contributing to a consistent and customizable user 
// experience across the entire application.

// Define the structure of the configuration object
type Config = {
  style: Style["name"]; // The name of the current style
  theme: Theme["name"]; // The name of the current theme
  radius: number; // A numerical value for border radius
};

// Create a Jotai atom with persistent storage
const configAtom = atomWithStorage<Config>("config", {
  style: "new-york", // Default style
  theme: "zinc", // Default theme
  radius: 0.5, // Default border radius
});

// Custom hook to access and modify the configuration
export function useConfig() {
  return useAtom(configAtom);
}
