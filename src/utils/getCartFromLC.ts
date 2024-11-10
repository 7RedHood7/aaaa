import {calcTotalPrice} from "./calcTotalPrice";
import {CartItem} from "../Redux/Slices/cart/Types";

export const getCartFromLC = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : []
    const totalPrice =  calcTotalPrice(items)
    return {
        items: items as CartItem[],
        totalPrice
    };
}