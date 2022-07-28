import { Factory } from "../factory/factory";

export interface Country {
 id: number;
  name: string;
  factories: Factory[];
  beerCount: number;
  factoryCount: number;
}
