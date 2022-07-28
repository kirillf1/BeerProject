export interface Category {
  categoryName: string;
  description: string;
  categoryId: number;
  beerCount: number;
}
export interface Style {
  styleId: number;
  styleName: string;
  description: string;
  categoryId: number;
}
export interface BJCP {
  category: Category;
  styles: Style[];
}
