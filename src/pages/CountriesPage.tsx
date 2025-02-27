import { useContext, useMemo, useState } from "react";
import SearchField from "../components/SearchField";
import CountryCard from "../components/CountryCard";
import RegionFilter from "../components/Select";
import { Country } from "../types/Country";
import { Link } from "react-router-dom";
import { CountriesContext } from "../context/CountriesContext";

export default function Countries() {
  const { countries, isLoading, error }: any = useContext(CountriesContext);
  const [searchString, setSearchString] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const filteredCountries = useMemo(() => {
    let filtered = [];

    if (searchString.length >= 3) {
      filtered = countries.filter(
        (c: Country) =>
          c.name.common.toLowerCase().includes(searchString.toLowerCase()) ||
          c.name.official.toLowerCase().includes(searchString.toLowerCase())
      );
    } else {
      filtered = countries;
    }

    if (selectedRegion !== "") {
      filtered = filtered.filter((c: Country) => c.region === selectedRegion);
    }

    return filtered;
  }, [countries, searchString, selectedRegion]);

  return (
    <main className="max-w-7xl w-full my-0 mx-auto px-6 sm:px-4">
      <div className="mb-12 flex flex-col items-start sm:flex-row gap-6 sm:gp-2 sm:justify-between sm:items-center w-full">
        <SearchField
          searchString={searchString}
          setSearchString={setSearchString}
        />
        <RegionFilter
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
      </div>
      {filteredCountries.length === 0 && !isLoading && !error && (
        <p className="text-gray-700 dark:text-gray-200 text-xl text-center mt-50">
          🤔 No countries found with matching criteria.
        </p>
      )}
      {error && (
        <p className="text-gray-700 text-xl text-center mt-50">🔴 {error}</p>
      )}
      {isLoading && (
        <p className="text-gray-700 text-xl text-center mt-50">Loading...</p>
      )}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:gap-17 lg:grid-cols-3 xl:grid-cols-4 gap-10 pb-10">
        {!isLoading &&
          filteredCountries.map((country: Country) => (
            <Link to={`${country.cca3}`} key={country.cca3}>
              <CountryCard country={country} />
            </Link>
          ))}
      </div>
    </main>
  );
}
