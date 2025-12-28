import { createContext, useContext } from "react";
import type { ButtonContextValue } from "./Button.types";

export const ButtonContext = createContext<ButtonContextValue | null>(null);

export function useButtonContext() {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error(
      "Button compound components must be used within Button.Root"
    );
  }
  return context;
}
