import { useCartStore } from "./cart-store"
import { useOrdersStore } from "./orders-store";
import { useStockStore } from "./stock-store";
import { useUserInfoStore } from "./user-store";


export const resetAllStores = () => {
    useCartStore.getState().reset();
    useUserInfoStore.getState().reset();
    useOrdersStore.getState().reset();
    useStockStore.getState().reset();
}