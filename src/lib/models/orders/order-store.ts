import { Order } from "./order";

export interface OrdersStore {
    orders: Order[];
    addOrder: (order: Order) => void;
    getOrderById: (id: string) => Order | undefined;
    getOrderByNumber: (orderNumber: string) => Order | undefined;
    updateOrderStatus: (id: string, status: Order['status']) => void;
    cancelOrder: (id: string) => void;
    getAllOrders: () => Order[];
    setOrders: (orders: Order[]) => void;
    reset: () => void;
  }