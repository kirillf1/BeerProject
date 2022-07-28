import { Beer } from "../beer";

export interface BeerView extends Beer {
  description: string;

  filtration: boolean;
  pasterisation: boolean;
  styleId: number;
  categoryId: number;
  taste: string;
  isLocalShop: boolean;
  bitterness: number;
  initialWort: number;
}
