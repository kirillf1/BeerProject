

export interface BeerForm  {
  beerId: number;
  name: string;
  
  price: number;
  alcohol: number;
  photoId: string;
  rating: number;
  categoryId:    number;
  styleId: number;
  countryId: number,
  factoryId: number,
  colorId: number,
  description: string;
  
  filtration: boolean;
  pasterisation: boolean;

  taste: string;
  isLocalShop: boolean;
  bitterness: number;
  initialWort: number;
}
