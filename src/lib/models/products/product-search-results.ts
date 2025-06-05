export type ProductSearchResult = {
    id: number;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    imageUrl: string;
    category: string;
    brand: string;
  };