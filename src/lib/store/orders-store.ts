import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from '../models/orders/order';
import { OrdersStore } from '../models/orders/order-store';
import { OrderStatus } from '../models/orders/dtos/OrderStatus';

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders]
        }));
      },

      getOrderById: (id) => {
        return get().orders.find(order => order.id === id);
      },

      getOrderByNumber: (orderNumber) => {
        return get().orders.find(order => order.orderNumber === orderNumber);
      },

      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map(order => 
            order.id === id ? { ...order, status } : order
          )
        }));
      },

      cancelOrder: (id) => {
        set((state) => ({
          orders: state.orders.map(order => 
            order.id === id ? { ...order, status: OrderStatus.CANCELLED } : order
          )
        }));
      },

      getAllOrders: () => {
        return get().orders;
      },
      setOrders: (orders: Order[]) => { set({ orders }); },
      reset: () => {
        set({ orders: []});
      },
    }),
    {
      name: 'orders-storage',
    }
  )
);