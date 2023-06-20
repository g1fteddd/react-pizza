import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ISort {
    name: string;
    property: string;
    order: string;
}

interface IFilterState {
    categoryId: number;
    sort: ISort;
}

const initialState: IFilterState = {
    categoryId: 0,
    sort: {
        name: "популярности",
        property: "rating",
        order: "desc"
    }
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload;
        },
        setSort: (state, action: PayloadAction<ISort>) => {
            state.sort = action.payload;
        },
        setFilters: (state, action: PayloadAction<IFilterState>) => {
            state.categoryId = Number(action.payload.categoryId);
            state.sort = action.payload.sort;
        }
    }
});

export const filterSelector = (state: RootState) => state.filter;
export const filterCategorySelector = (state: RootState) =>
    state.filter.categoryId;
export const filterSortSelector = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
