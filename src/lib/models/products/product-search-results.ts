export type ProductSearchResult = {
    id: number;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    brand: string;
  };