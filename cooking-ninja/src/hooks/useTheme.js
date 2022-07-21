import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme() must be used insdie a ThemeProvider");
  }//this fires if we in a component thats not wrapped by the provider tags


  return context;
};
