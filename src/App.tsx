import "./App.css";
import CountryCard from "./components/CountryCard";
import Header from "./components/Header";
import { useEffect, useState, useMemo } from "react";
import { Country } from "./types/Country";
import SearchField from "./components/SearchField";
import RegionFilter from "./components/Select";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital,cca3"
        );
        const data: Country[] = await res.json();

        const sorted = data.sort((a, b) => {
          if (a.name.common.toLowerCase() < b.name.common.toLowerCase()) {
            return -1;
          }

          if (a.name.common.toLowerCase() > b.name.common.toLowerCase()) {
            return 1;
          }

          return 0;
        });

        setCountries(sorted);
      } catch (error: any) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getCountries();
  }, []);

  return (
    <>
      <Header />
      <main className="max-w-7xl w-full my-0 mx-auto px-2">
        <div className="mb-12 flex justify-between items-center w-full">
          <SearchField
            searchString={searchString}
            setSearchString={setSearchString}
          />
          <RegionFilter
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
        </div>
        {filteredCountries.length === 0 && (
          <p className="text-gray-700 text-xl text-center mt-50">
            🤔 No countries found with matching criteria.
          </p>
        )}
        <div className="grid grid-cols-4 gap-17 pb-10">
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            filteredCountries.map((country: Country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
        </div>
      </main>
    </>
  );
}

export default App;
