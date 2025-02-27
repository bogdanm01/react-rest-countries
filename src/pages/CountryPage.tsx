import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Country } from "../types/Country";
import { FaArrowLeft } from "react-icons/fa6";

const BASE_URL = "https://restcountries.com/v3.1";

function CountryPage() {
  const { code } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadCountry() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/alpha/${code}`);
        const data = await res.json();
        let country: Country = data[0];

        const borderCodes = country.borders?.map((b) => b);
        let borderCountries = [];

        if (borderCodes?.length) {
          const borderRes = await fetch(
            `${BASE_URL}/alpha?codes=${borderCodes}&fields=name,cca3`
          );
          const borderCountriesData = await borderRes.json();

          borderCountries = borderCountriesData.map((country: any) => {
            return { cca3: country.cca3, name: country.name.common };
          });
        }

        country = {
          ...country,
          borders: borderCountries,
        };

        setCountry(country);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadCountry();
  }, [code]);

  const mappedCountry = useMemo(() => {
    const nativeNameObj = country?.name?.nativeName
      ? (Object.values(country.name.nativeName)[0] as { common: string })
      : undefined;
    const nativeName = nativeNameObj?.common || "N/A";

    const name = {
      ...country?.name,
      nativeName,
    };

    const currencies = country?.currencies
      ? (Object.values(country.currencies) as { name: string }[])
          .map((currency) => currency.name)
          .join(", ")
      : "N/A";

    const languages = country?.languages
      ? Object.values(country.languages).join(", ")
      : "N/A";

    return {
      ...country,
      name,
      currencies,
      languages,
    };
  }, [country]);

  if (!country) return null;

  return (
    <div className="px-4 max-w-7xl w-full my-0 mx-auto pb-10">
      <Link to="..">
        <button className="cursor-pointer inline-flex gap-2 items-center justify-center bg-white hover:bg-zinc-50 py-2 px-8 rounded-md shadow-md">
          <FaArrowLeft />
          Back
        </button>
      </Link>
      {!isLoading ? (
        <div className="flex-col flex md:flex-row items-center mt-15 gap-5 md:gap-10 lg:gap-0">
          <div className="flex-1/2 animate-fade-in-left">
            <img
              src={country.flags.svg}
              className="sm:w-[500px] shadow-lg rounded-md"
              alt={`${country.name.common} flag`}
            />
          </div>
          <div className="flex flex-col self-start md:self-auto flex-1/2 animate-fade-in">
            <h1 className="text-3xl font-extrabold mb-8 md:mt-0 mt-5">
              {country.name.common}
            </h1>
            <div className="flex flex-col lg:flex-row gap-7 lg:gap-15">
              <ul className="flex flex-col gap-3">
                <li className="font-medium">
                  Native Name:{" "}
                  <span className="font-light">
                    {mappedCountry.name?.nativeName}
                  </span>
                </li>
                <li className="font-medium">
                  Population:{" "}
                  <span className="font-light">
                    {country.population.toLocaleString()}
                  </span>
                </li>
                <li className="font-medium">
                  Region:{" "}
                  <span className="font-light">{mappedCountry.region}</span>
                </li>
                <li className="font-medium">
                  Sub Region:{" "}
                  <span className="font-light">{country.subregion}</span>
                </li>
                <li className="font-medium">
                  Capital: <span className="font-light">{country.capital}</span>
                </li>
              </ul>
              <ul className="flex flex-col gap-3">
                <li className="font-medium">
                  Top Level Domain:{" "}
                  <span className="font-light">{country.tld}</span>
                </li>
                <li className="font-medium">
                  Currencies:{" "}
                  <span className="font-light">{mappedCountry.currencies}</span>
                </li>
                <li className="font-medium">
                  Languages:{" "}
                  <span className="font-light">{mappedCountry.languages}</span>
                </li>
              </ul>
            </div>
            <div className="mt-7 lg:mt-10 flex flex-col lg:flex-row gap-3 items-start">
              <span className="font-medium text-nowrap">Border Countries:</span>
              {country.borders ? (
                <span className="flex gap-2 flex-wrap">
                  {country.borders?.map((code: any) => (
                    <Link to={`/${code.cca3}`} key={code}>
                      <span
                        key={code.cca3}
                        className="bg-white px-4 py-1 text-sm rounded-sm shadow-sm cursor-pointer hover:bg-zinc-50"
                      >
                        {code.name}
                      </span>
                    </Link>
                  ))}
                </span>
              ) : (
                "N/A"
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-xl font-medium text-gray-700 mt-20">Loading...</p>
      )}
    </div>
  );
}

export default CountryPage;
