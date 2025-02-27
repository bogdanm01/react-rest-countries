import { useEffect, useState } from "react";
import { Country } from "../types/Country";

const BASE_URL = "https://restcountries.com/v3.1";

export function useFetchCountry(code: string) {
  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadCountry() {
      setIsLoading(true);

      try {
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

  return { country, isLoading };
}
