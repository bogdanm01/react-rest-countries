import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useThemeContext } from "../hooks/useThemeContext";
import { CountriesContextProvider } from "../context/CountriesContext";

function AppLayout() {
  const { theme } = useThemeContext();

  useEffect(() => {
    if (theme === "dark") {
      document.getElementById("body")?.classList.add("dark");
    } else {
      document.getElementById("body")?.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <Header />
      <CountriesContextProvider>
        <Outlet />
      </CountriesContextProvider>
    </>
  );
}

export default AppLayout;
