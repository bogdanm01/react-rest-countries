import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import CountryDetails from "../components/CountryDetails";
import Chip from "../components/Chip";
import { useFetchCountry } from "../hooks/useFetchCountry";

function CountryPage() {
  const { code } = useParams();
  const { country, isLoading } = useFetchCountry(code!);

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
        <button className="cursor-pointer inline-flex gap-2 items-center justify-center bg-white dark:bg-dark-blue dark:text-very-light-gray hover:bg-zinc-50 hover:dark:bg-very-dark-blue-elements py-2 px-8 rounded-md shadow-md">
          <FaArrowLeft />
          Back
        </button>
      </Link>
      {!isLoading && (
        <div className="flex-col flex md:flex-row items-center mt-15 gap-5 md:gap-10 lg:gap-0">
          <div className="flex-1/2 animate-fade-in-left">
            <img
              src={country.flags.svg}
              className="sm:w-[500px] shadow-lg rounded-md"
              alt={`${country.name.common} flag`}
            />
          </div>
          <div className="flex flex-col self-start md:self-auto flex-1/2 animate-fade-in dark:text-very-light-gray">
            <h1 className="text-3xl font-extrabold mb-8 md:mt-0 mt-5">
              {country.name.common}
            </h1>
            <CountryDetails country={mappedCountry} />
            <footer className="mt-7 lg:mt-10 flex flex-col lg:flex-row gap-3 items-start">
              {mappedCountry.borders && mappedCountry.borders.length > 0 && (
                <>
                  <span className="font-medium text-nowrap">
                    Border Countries:
                  </span>
                  <span className="flex gap-2 flex-wrap">
                    {mappedCountry.borders?.map((borderCountry: any) => (
                      <Link
                        to={`/${borderCountry.cca3}`}
                        key={borderCountry.cca3}
                      >
                        <Chip>{borderCountry.name}</Chip>
                      </Link>
                    ))}
                  </span>
                </>
              )}
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryPage;
