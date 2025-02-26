import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { memo } from "react";

function Header() {
  return (
    <header className="w-full shadow-sm text-very-dark-blue-text bg-white mb-12">
      <div className="max-w-7xl flex items-center justify-between px-6 sm:px-4 py-5 my-0 mx-auto">
        <h1 className="text-md sm:text-2xl font-extrabold font-display">
          Where in the world?
        </h1>
        <button className="text-sm sm:text-[1rem] cursor-pointer font-semibold flex gap-2 items-center py-2 px-3 hover:bg-zinc-50 rounded-md">
          <FontAwesomeIcon icon={faMoon} size="lg" />
          Dark Mode
        </button>
      </div>
    </header>
  );
}

export default memo(Header);
