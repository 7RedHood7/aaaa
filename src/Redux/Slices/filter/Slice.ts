import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilterState, Sort, SortPropertyEnum} from "./Types";

const initialState : FilterState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort:{
        name: 'популярности',
        sortProperty: SortPropertyEnum.RATING_DESC
    }
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterState>) {
            state.categoryId = Number(action.payload.categoryId);
            state.sort = action.payload.sort || initialState.sort;
            state.currentPage = Number(action.payload.currentPage);
        }
    }
})

export const { setCategoryId,setSearchValue, setSort,setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer