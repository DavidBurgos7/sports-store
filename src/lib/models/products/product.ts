export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  imageUrl: string;
  category: string;
  brand: string;
  isOnSale?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  sizes?: string[] | any[]; //TODO modificar para usar los types del api
  colors?: string[] | any[]; //TODO modificar para usar los types del api
  description?: string;
  slug?: string;
}