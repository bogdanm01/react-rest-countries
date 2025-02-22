import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchField({ searchString, setSearchString }: any) {
  return (
    <div className="bg-white flex shrink w-full sm:max-w-[450px] items-center gap-6  px-8 shadow-md rounded-md">
      <FontAwesomeIcon icon={faMagnifyingGlass} color="#666" />
      <input
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        className="py-[18px] border-none outline-none text-gray-600 text-sm w-full"
        placeholder="Search for a country..."
      />
    </div>
  );
}
