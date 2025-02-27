import { createContext, useEffect, useReducer } from "react";
import { Country } from "../types/Country";

const BASE_URL = "https://restcountries.com/v3.1";

const CountriesContext = createContext({});

interface CountriesState {
  countries: Country[];
  isLoading: boolean;
  error: string;
  searchString: string;
  selectedRegion: string;
}

const initialState: CountriesState = {
  countries: [],
  isLoading: false,
  error: "",
  searchString: "",
  selectedRegion: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading": {
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    }
    case "rejected": {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case "countries/loaded": {
      return {
        ...state,
        isLoading: false,
        countries: action.payload,
      };
    }
  }
};

function CountriesContextProvider({ children }: any) {
  const [{ countries, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getCountries() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(
          `${BASE_URL}/all?fields=flags,name,population,region,capital,cca3`
        );
        const data: Country[] = await res.json();

        const sorted = data.sort((a, b) => {
          const aName = a.name.common;
          const bName = b.name.common;

          return aName.localeCompare(bName, "en-US", { sensitivity: "base" });
        });

        dispatch({ type: "countries/loaded", payload: sorted });
      } catch (error: any) {
        console.log(error);
        dispatch({ type: "rejected", payload: "Failed to load countries" });
      }
    }

    getCountries();
  }, []);

  return (
    <CountriesContext.Provider
      value={{
        countries,
        isLoading,
        error,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
}

export { CountriesContext, CountriesContextProvider };
