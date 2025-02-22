import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { memo } from "react";

function Header() {
  return (
    <header className="w-full shadow-sm text-very-dark-blue-text bg-white mb-12">
      <div className="max-w-7xl flex items-center justify-between px-2 py-6 my-0 mx-auto">
        <h1 className="text-2xl font-extrabold font-display">
          Where in the world?
        </h1>
        <button className="cursor-pointer font-semibold flex gap-2 items-center">
          <FontAwesomeIcon icon={faMoon} size="lg" />
          Dark Mode
        </button>
      </div>
    </header>
  );
}

export default memo(Header);
