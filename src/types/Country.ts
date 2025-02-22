export type Country = {
  name: {
    common: string;
    official: string;
  };
  population: number;
  flags: {
    png: string;
  };
  capital: string;
  region: string;
  cca3: string;
};
