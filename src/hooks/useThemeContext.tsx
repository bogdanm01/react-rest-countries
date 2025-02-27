import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("Theme Context Used Outside of Theme Provider");
  return context;
}
