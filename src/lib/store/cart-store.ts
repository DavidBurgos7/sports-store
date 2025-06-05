import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartStore } from '../models/cart/cart-store';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, size?, color?) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => 
              item.product.id === product.id && 
              item.selectedSize === size && 
              item.selectedColor === color
          );

          if (existingItemIndex > -1) {
            // Actualizar cantidad si el item ya existe
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            return { items: updatedItems };
          } else {
            // Agregar nuevo item
            return {
              items: [...state.items, {
                product,
                quantity,
                selectedSize: size,
                selectedColor: color,
              }]
            };
          }
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId)
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          ).filter((item) => item.quantity > 0)
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      setCartOpen: (open) => {
        set({ isOpen: open });
      },

      getItemsCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },

      getUniqueItemsCount: () => {
        return get().items.length;
      },
      reset: () => {
        set({ items: [], isOpen: false });
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);