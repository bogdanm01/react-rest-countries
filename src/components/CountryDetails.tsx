function CountryDetails({ country }: any) {
  return (
    <div className="flex flex-col lg:flex-row gap-7 lg:gap-15">
      <ul className="flex flex-col gap-3">
        <li className="font-medium">
          Native Name:{" "}
          <span className="font-light">{country.name?.nativeName}</span>
        </li>
        <li className="font-medium">
          Population:{" "}
          <span className="font-light">
            {country.population?.toLocaleString()}
          </span>
        </li>
        <li className="font-medium">
          Region: <span className="font-light">{country.region || "N/A"}</span>
        </li>
        <li className="font-medium">
          Sub Region:{" "}
          <span className="font-light">{country.subregion || "N/A"}</span>
        </li>
        <li className="font-medium">
          Capital:{" "}
          <span className="font-light">{country.capital || "N/A"}</span>
        </li>
      </ul>
      <ul className="flex flex-col gap-3">
        <li className="font-medium">
          Top Level Domain: <span className="font-light">{country.tld}</span>
        </li>
        <li className="font-medium">
          Currencies: <span className="font-light">{country.currencies}</span>
        </li>
        <li className="font-medium">
          Languages: <span className="font-light">{country.languages}</span>
        </li>
      </ul>
    </div>
  );
}

export default CountryDetails;
