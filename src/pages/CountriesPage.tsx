import { useEffect, useMemo, useState } from "react";
import SearchField from "../components/SearchField";
import CountryCard from "../components/CountryCard";
import RegionFilter from "../components/Select";
import { Country } from "../types/Country";
import { Link } from "react-router-dom";

export default function Countries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchString, setSearchString] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  const filteredCountries = useMemo(() => {
    let filtered = [];

    if (searchString.length >= 3) {
      filtered = countries.filter(
        (c) =>
          c.name.common.toLowerCase().includes(searchString.toLowerCase()) ||
          c.name.official.toLowerCase().includes(searchString.toLowerCase())
      );
    } else {
      filtered = countries;
    }

    if (selectedRegion !== "") {
      filtered = filtered.filter((c) => c.region === selectedRegion);
    }

    return filtered;
  }, [countries, searchString, selectedRegion]);

  useEffect(() => {
    async function getCountries() {
      setIsLoading(true);
      setError("");

      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital,cca3"
        );
        const data: Country[] = await res.json();

        const sorted = data.sort((a, b) => {
          const aName = a.name.common;
          const bName = b.name.common;

          return aName.localeCompare(bName, "en-US", { sensitivity: "base" });
        });

        setCountries(sorted);
      } catch (error: any) {
        console.log(error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    }

    getCountries();
  }, []);

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
        <p className="text-gray-700 text-xl text-center mt-50">
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
