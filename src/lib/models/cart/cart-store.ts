import { Product } from "../products/product";
import { CartItem } from "./cart-item";

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  getItemsCount: () => number;
  getTotalPrice: () => number;
  getUniqueItemsCount: () => number;
  reset: () => void;
}