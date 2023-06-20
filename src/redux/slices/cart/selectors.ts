import { RootState } from "../../store";

export const cartSelector = (state: RootState) => state.cart;

export const selectICartItemById = (id: string) => (state: RootState) =>
    state.cart.pizzas.find((obj) => obj.id === id);
