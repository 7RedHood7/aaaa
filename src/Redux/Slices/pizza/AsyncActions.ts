import {createAsyncThunk} from "@reduxjs/toolkit";
import {Pizza} from "./Types";
import axios from "axios";
import {SearchPizzaParams} from "./Slice";

export const fetchPizza = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzasByStatus',
    async (params) => {
        const {  order, sortBy, category, search, currentPage } = params
        const res = await axios.get<Pizza[]>(`https://66fea5862b9aac9c997cd6fc.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
        return res.data
    },
)