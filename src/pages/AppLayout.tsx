import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useContext, useEffect } from "react";

function AppLayout() {
  const { theme }: any = useContext(ThemeContext);

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
