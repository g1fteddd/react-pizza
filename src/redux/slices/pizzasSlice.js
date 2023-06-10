import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pizzas: []
};

export const pizzasSlice = createSlice({
    name: "pizzas",
    initialState,
    reducers: {
        setPizzas: (state, action) => {
            state.pizzas = action.payload;
        }
    }
});

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
