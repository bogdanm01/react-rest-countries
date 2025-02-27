import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useThemeContext } from "../context/useThemeContext";

function AppLayout() {
  const { theme } = useThemeContext();

  useEffect(() => {
    console.log(theme);

    if (theme === "dark") {
      document.getElementById("body")?.classList.add("dark");
    } else {
      document.getElementById("body")?.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default AppLayout;
