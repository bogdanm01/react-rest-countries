import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface ThemeContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

interface ThemeContextProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "",
  setTheme: () => {},
});

function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeContextProvider };
