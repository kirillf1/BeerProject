import { Country } from "../country/country";

export interface Factory {
  id: number;
  name: string;
  countryId: number;
  country: Country;
  beerCount: number;
  description: string;
}
