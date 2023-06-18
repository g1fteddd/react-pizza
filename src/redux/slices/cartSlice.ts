import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: number;
    size: number;
    count: number;
};

interface ICartState {
    totalPrice: number;
    totalCount: number;
    pizzas: CartItem[];
}

const initialState: ICartState = {
    totalPrice: 0,
    totalCount: 0,
    pizzas: []
};

const cartlSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addPizza: (state, action: PayloadAction<CartItem>) => {
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

export const cartSelector = (state: RootState) => state.cart;

export const selectCartItemById = (id: string) => (state: RootState) =>
    state.cart.pizzas.find((obj) => obj.id === id);

export const { addPizza, clearPizzas, removePizza, deletePizza } =
    cartlSlice.actions;

export default cartlSlice.reducer;
