import {CartItem} from "../Redux/Slices/cart/Types";


export const calcTotalPrice = (items: CartItem[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum , 0);
}