import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    "pizzas/fetchPizzas",
    async (params) => {
        const { categoryQuery, sortByWithOrderQury, searchQuery } = params;
        const res = await axios.get(
            `https://647c75c8c0bae2880ad0b72c.mockapi.io/items?${searchQuery}&${categoryQuery}&${sortByWithOrderQury}`
        );
        return res.data;
    }
);

const initialState = {
    pizzas: [],
    status: "loading" // loading | success | error
};

const pizzasSlice = createSlice({
    name: "pizzas",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.pizzas = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchPizzas.pending, (state) => {
            state.pizzas = [];
            state.status = "loading";
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.pizzas = [];
            state.status = "error";
        });
    }
});

export const pizzasSelector = (state) => state.pizzas;

export default pizzasSlice.reducer;
