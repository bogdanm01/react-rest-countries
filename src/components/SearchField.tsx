import { memo } from "react";
import { IoMdSearch } from "react-icons/io";

export default memo(function SearchField({
  searchString,
  setSearchString,
}: any) {
  return (
    <div className="bg-white dark:bg-dark-blue flex shrink w-full sm:max-w-[450px] items-center gap-5 px-8 shadow-md rounded-md">
      <IoMdSearch color="#666" size="1.25em" />
      <input
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        className="py-[16px] border-none outline-none text-zinc-700 dark:text-zinc-100 w-full"
        placeholder="Search for a country..."
      />
    </div>
  );
});
