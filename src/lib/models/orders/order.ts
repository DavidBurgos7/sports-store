import { CartItem } from "../cart/cart-item";
import { OrderStatus } from "./dtos/OrderStatus";

export interface OrderAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  instructions?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  orderNumber: string;
  date: string;
  status: OrderStatus;
  shippingAddress: OrderAddress;
  total: number;
  subtotal: number;
  tax: number;
  shippingCost: number;
  trackingNumber?: string;
  paymentMethod: string;
  estimatedDeliveryDate?: string;
}