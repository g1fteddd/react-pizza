import { createSlice } from "@reduxjs/toolkit";
import { IPizzasState, Status } from "./types";
import { fetchPizzas } from "./asyncActions";

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

export default pizzasSlice.reducer;
