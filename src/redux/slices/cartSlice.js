import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    totalCount: 0,
    pizzas: []
};

const cartlSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addPizza: (state, action) => {
            const currentIndex = state.pizzas.findIndex(
                (obj) => obj.id === action.payload.id
            );

            if (currentIndex !== -1) {
                state.pizzas[currentIndex].count += 1;
            } else {
                state.pizzas.push({ ...action.payload, count: 1 });
            }

            state.totalPrice += action.payload.price;
            state.totalCount += 1;
        },
        clearPizzas: (state) => {
            state.pizzas = [];
            state.totalCount = 0;
            state.totalPrice = 0;
        },
        removePizza: (state, action) => {
            state.pizzas = state.pizzas.filter((obj) => {
                if (obj.id === action.payload) {
                    state.totalCount -= obj.count;
                    state.totalPrice -= obj.count * obj.price;
                    return false;
                }
                return true;
            });
        },
        deletePizza: (state, action) => {
            const currentIndex = state.pizzas.findIndex(
                (obj) => obj.id === action.payload
            );
            state.pizzas[currentIndex].count -= 1;
            state.totalCount -= 1;
            state.totalPrice -= state.pizzas[currentIndex].price;
        }
    }
});

export const { addPizza, clearPizzas, removePizza, deletePizza } =
    cartlSlice.actions;

export default cartlSlice.reducer;
