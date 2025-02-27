import { Country } from "../types/Country";

interface CountryCardProps {
  country: Country;
}

function CountryCard({ country }: CountryCardProps) {
  return (
    <div className="shadow-sm rounded-lg cursor-pointer bg-white dark:bg-dark-blue hover:scale-[103%] transition-transform hover:shadow-lg">
      <img
        src={country.flags.png}
        className="sm:h-38 sm:max-h-40 lg:h-40 rounded-t-lg w-full bg-center object-center object-fill"
        alt={`${country.name.common} flag`}
      />
      <div className="flex flex-col p-7 pb-10 dark:text-very-light-gray">
        <h2 className="font-bold text-lg mb-2">{country.name.common}</h2>
        <ul className="flex flex-col gap-1">
          <li className="text-sm">
            <span className="font-semibold">Population: </span>
            {country.population.toLocaleString()}
          </li>
          <li className="text-sm">
            <span className="font-semibold">Region: </span> {country.region}
          </li>
          <li className="text-sm">
            <span className="font-semibold">Capital: </span> {country.capital}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CountryCard;
