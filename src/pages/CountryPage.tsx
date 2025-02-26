import { AnyActionArg, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Country } from "../types/Country";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function CountryPage() {
  const { code } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadCountry() {
      try {
        setIsLoading(true);
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const data = await res.json();

        setCountry(data[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadCountry();
  }, [code]);

  if (!country) return null;

  let nativeName: { common: string } = { common: "N/A" };

  if (country.name.nativeName) {
    const obj = Object.values(country?.name.nativeName)[0] as {
      common: string;
    };

    nativeName = obj;
  }

  let currencies: any = [];

  if (country.currencies) {
    currencies = Object.values(country.currencies).map(
      (currency) => currency.name
    );
  }

  let languages: any = [];

  if (country.languages) {
    languages = Object.entries(country.languages).map(([key, val]) => {
      return val;
    });
  }

  return (
    <div className="px-4 max-w-7xl w-full my-0 mx-auto">
      <Link to="..">
        <button className="cursor-pointer inline-flex gap-2 items-center justify-center bg-white py-2 px-8 rounded-md shadow-md">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
      </Link>
      {!isLoading ? (
        <div className="flex-col flex md:flex-row items-center mt-15 gap-3">
          <div className="flex-1/2">
            <img
              src={country.flags.svg}
              className="sm:w-[420px]"
              alt={`${country.name.common} flag`}
            />
          </div>
          <div className="flex flex-col self-start md:self-auto flex-1/2">
            <h1 className="text-3xl font-extrabold mb-8 md:mt-0 mt-5">
              {country.name.common}
            </h1>
            <div className="flex flex-col md:flex-row gap-10 md:gap-15">
              <ul className="flex flex-col gap-3">
                <li className="font-medium">
                  Native Name:{" "}
                  <span className="font-light">
                    {nativeName?.common ?? "N/A"}
                  </span>
                </li>
                <li className="font-medium">
                  Population:{" "}
                  <span className="font-light">
                    {country.population.toLocaleString()}
                  </span>
                </li>
                <li className="font-medium">
                  Region: <span className="font-light">{country.region}</span>
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
                  <span className="font-light">{currencies.join(", ")}</span>
                </li>
                <li className="font-medium">
                  Languages:{" "}
                  <span className="font-light">{languages.join(", ")}</span>
                </li>
              </ul>
            </div>
            <div className="mt-10 flex flex-col md:flex-row gap-3 items-start">
              <span className="font-medium text-nowrap">Border Countries:</span>
              {country.borders ? (
                <span className="flex gap-2 flex-wrap">
                  {country.borders?.map((country) => (
                    <Link to={`/${country}`}>
                      <span
                        key={country}
                        className="bg-white px-4 py-1 text-sm rounded-sm shadow-sm cursor-pointer hover:bg-zinc-50"
                      >
                        {country}
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
