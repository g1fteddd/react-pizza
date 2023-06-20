import { configureStore } from "@reduxjs/toolkit";

import pizzasReducer from "./pizzas/slice";
import filterReducer from "./filter/slice";
import searchReducer from "./search/slice";
import cartReducer from "./cart/slice";
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
