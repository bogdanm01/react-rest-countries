export type Country = {
  name: {
    common: string;
    official: string;
    nativeName?: any;
  };
  population: number;
  flags: {
    png: string;
    svg: string;
  };
  capital: string;
  region: string;
  cca3: string;
  languages?: any;
  subregion?: string;
  tld?: string[];
  currencies?: any;
  borders?: string[];
};
