import { FaRegMoon } from "react-icons/fa";

import { memo } from "react";
import { useThemeContext } from "../hooks/useThemeContext";

function Header() {
  const { theme, setTheme } = useThemeContext();

  function toggleDarkMode() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  return (
    <header className="w-full shadow-sm text-very-dark-blue-text bg-white dark:bg-dark-blue dark:text-white mb-12">
      <div className="max-w-7xl flex items-center justify-between px-6 sm:px-4 py-5 my-0 mx-auto">
        <h1 className="text-md sm:text-2xl font-extrabold font-display">
          Where in the world?
        </h1>
        <button
          className="text-sm sm:text-[1rem] cursor-pointer font-semibold flex gap-2 items-center py-2 px-3 hover:bg-zinc-50 dark:hover:bg-very-dark-blue-elements rounded-md"
          onClick={toggleDarkMode}
        >
          <FaRegMoon />
          Dark Mode
        </button>
      </div>
    </header>
  );
}

export default memo(Header);
