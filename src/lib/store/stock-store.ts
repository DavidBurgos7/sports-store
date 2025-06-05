import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../models/products/product';
import { generateSlug } from '../utils';

interface StockStore {
    products: Product[];
    setProducts: (products: Product[]) => void;
    getProductBySlug: (slug: string) => Product | undefined;
    reset: () => void;
}

export const useStockStore = create<StockStore>()(
  persist(
    (set, get) => ({
      products: [],
      setProducts: (products) => {
        products.map(product => {
          if (!product.slug) {
            product.slug = generateSlug(product.name);
          }
        });

        set({ products })
      },
      getProductBySlug: (slug) => {
        return get().products.find(product => product.slug === slug);
      },
      reset: () => {
        set({ products: []});
      },
    }),
    {
      name: 'stock-storage',
    }
  )
);