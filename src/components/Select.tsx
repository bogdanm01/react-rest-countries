import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef, memo } from "react";

const REGIONS = Object.freeze({
  AFRICA: "Africa",
  AMERICAS: "Americas",
  Asia: "Asia",
  EUROPE: "Europe",
  OCEANIA: "Oceania",
});

function RegionFilter({ selectedRegion, setSelectedRegion }: any) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const ref: any = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  function handleRegionSelect(region: string) {
    if (selectedRegion === region) {
      setSelectedRegion("");
    } else {
      setSelectedRegion(region);
    }

    setIsDropdownOpen(false);
  }

  return (
    <div className="relative text-gray-700 select-none shrink-0" ref={ref}>
      {selectedRegion !== "" && (
        <>
          <div className="w-[8px] h-[8px] absolute bg-very-dark-blue-elements rounded-full -top-0.5 -right-0.5"></div>
        </>
      )}
      <span
        className="flex items-center gap-8 text-md bg-white py-[16px] px-6 rounded-md shadow-md cursor-pointer"
        onClick={() => setIsDropdownOpen((val) => !val)}
      >
        Filter by Region
        <FontAwesomeIcon icon={faChevronDown} size="xs" />
      </span>
      {isDropdownOpen && (
        <div className="absolute bg-white w-full rounded-md shadow-md top-15 py-3 px-8 z-2">
          <ul>
            {Object.values(REGIONS).map((region) => (
              <li
                className="py-1 cursor-pointer hover:text-gray-500"
                onClick={() => handleRegionSelect(region)}
              >
                <span className="flex gap-1.5 items-center relative">
                  {selectedRegion === region && (
                    <FontAwesomeIcon
                      className="absolute -left-3.5"
                      icon={faCheck}
                      size="sm"
                    />
                  )}
                  {region}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default memo(RegionFilter);
