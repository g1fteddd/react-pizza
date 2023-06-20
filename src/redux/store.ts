import { configureStore } from "@reduxjs/toolkit";

import pizzasReducer from "./slices/pizzasSlice";
import filterReducer from "./slices/filterSlice";
import searchReducer from "./slices/searchSlice";
import cartReducer from "./slices/cart/slice";
import { useDispatch } from "react-redux";
export const store = configureStore({
    reducer: {
        pizzas: pizzasReducer,
        filter: filterReducer,
        search: searchReducer,
        cart: cartReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
