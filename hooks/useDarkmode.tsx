import { useEffect, useState } from "react"

type variant = "dark" | "light";

export const useDarkMode = (): [variant, React.Dispatch<React.SetStateAction<variant>>] => {
    const [theme, setTheme] = useState<variant>("dark");
    const colorTheme = theme === "light" ? "dark" : "light";
  
    useEffect(() => {
      const root = window.document.documentElement;
      root.classList.remove(colorTheme);
      root.classList.add(theme);
    }, [theme, colorTheme]);
  
    return [colorTheme, setTheme];
  };