import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { getCartFromLS } from "../../../utils/getCartFromLS";
import { ICartItem, ICartState } from "./types";

const { pizzas, totalPrice, totalCount } = getCartFromLS();

const initialState: ICartState = {
    totalPrice,
    totalCount,
    pizzas
};

const cartlSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addPizza: (state, action: PayloadAction<ICartItem>) => {
            const currentIndex = state.pizzas.findIndex(
                (obj) => obj.id === action.payload.id
            );

            if (currentIndex !== -1) {
                state.pizzas[currentIndex].count += 1;
            } else {
                state.pizzas.push({
                    ...action.payload,
                    count: 1
                });
            }

            state.totalPrice += action.payload.price;
            state.totalCount += 1;
        },
        addPizzaFromLocalStorage: (
            state,
            action: PayloadAction<ICartItem[]>
        ) => {
            state.pizzas = [...action.payload];
            state.totalCount = action.payload.reduce((acc, currentValue) => {
                return acc + currentValue.count;
            }, 0);
            state.totalPrice = action.payload.reduce((acc, currentValue) => {
                return acc + currentValue.price * currentValue.count;
            }, 0);
        },
        clearPizzas: (state) => {
            state.pizzas = [];
            state.totalCount = 0;
            state.totalPrice = 0;
        },
        removePizza: (state, action: PayloadAction<string>) => {
            state.pizzas = state.pizzas.filter((obj) => {
                if (obj.id === action.payload) {
                    state.totalCount -= obj.count;
                    state.totalPrice -= obj.count * obj.price;
                    return false;
                }
                return true;
            });
        },
        deletePizza: (state, action: PayloadAction<string>) => {
            const currentIndex = state.pizzas.findIndex(
                (obj) => obj.id === action.payload
            );
            state.pizzas[currentIndex].count -= 1;
            state.totalCount -= 1;
            state.totalPrice -= state.pizzas[currentIndex].price;
        }
    }
});

export const {
    addPizza,
    addPizzaFromLocalStorage,
    clearPizzas,
    removePizza,
    deletePizza
} = cartlSlice.actions;

export default cartlSlice.reducer;
