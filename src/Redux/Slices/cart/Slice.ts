import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCartFromLC} from "../../../utils/getCartFromLC";
import {calcTotalPrice} from "../../../utils/calcTotalPrice";
import {CartItem, CartSliceState} from "./Types";


const {items, totalPrice} = getCartFromLC()

const initialState: CartSliceState = {
    totalPrice,
    items
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // addItem(state, action) {
        //     state.items.push(action.payload);
        //     state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price, 0);
        // },
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({...action.payload, count: 1});
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload);

            if (findItem) {
                findItem.count--;
            }
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
        },
        clearItem(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    }
})

export const { addItem, removeItem, minusItem, clearItem} = cartSlice.actions;

export default cartSlice.reducer