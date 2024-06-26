import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { Style } from "@/styles/styles";
import { Theme } from "@/components/theme";

type Config = {
  style: Style["name"];
  theme: Theme["name"];
  radius: number;
};

const configAtom = atomWithStorage<Config>("config", {
  style: "new-york",
  theme: "zinc",
  radius: 0.5,
});

export function useConfig() {
  return useAtom(configAtom);
}
