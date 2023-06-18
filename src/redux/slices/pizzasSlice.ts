import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface IPizza {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: Array<number>;
    types: Array<number>;
    rating: number;
}

export enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
}

interface IPizzasState {
    pizzas: IPizza[];
    status: Status;
}

interface IFetchPizzas {
    categoryQuery: string;
    sortByWithOrderQury: string;
    searchQuery: string;
}

export const fetchPizzas = createAsyncThunk(
    "pizzas/fetchPizzas",
    async (params: IFetchPizzas) => {
        const { categoryQuery, sortByWithOrderQury, searchQuery } = params;
        const res = await axios.get<IPizza[]>(
            `https://647c75c8c0bae2880ad0b72c.mockapi.io/items?${searchQuery}&${categoryQuery}&${sortByWithOrderQury}`
        );
        return res.data as IPizza[];
    }
);

const initialState: IPizzasState = {
    pizzas: [],
    status: Status.LOADING
};

const pizzasSlice = createSlice({
    name: "pizzas",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.pizzas = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.pending, (state) => {
            state.pizzas = [];
            state.status = Status.LOADING;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.pizzas = [];
            state.status = Status.ERROR;
        });
    }
});

export const pizzasSelector = (state: RootState) => state.pizzas;

export default pizzasSlice.reducer;