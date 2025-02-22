import { Country } from "../types/Country";

interface CountryCardProps {
  country: Country;
}

function CountryCard({ country }: CountryCardProps) {
  return (
    <div className="shadow-sm rounded-lg cursor-pointer bg-white hover:scale-[103%] transition-all">
      <img
        src={country.flags.png}
        className="xl:h-38 lg:max-h-40 bg-gray-200 rounded-t-lg w-full bg-cover"
      ></img>
      <div className="flex flex-col p-7 pb-10">
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
