import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Pizza, PizzasState, Status} from "./Types";
import {fetchPizza} from "./AsyncActions";


const initialState: PizzasState = {
    items: [],
    status: Status.LOADING,
};

export type SearchPizzaParams = {
    order: string,
    sortBy: string,
    category: string,
    search: string,
    currentPage: string
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizza.pending, (state) => {
                state.status = Status.LOADING;
                state.items = [];
            })
            .addCase(fetchPizza.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
                state.items = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchPizza.rejected, (state) => {
                state.status = Status.ERROR;
                state.items = [];
            })
    }
});

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer