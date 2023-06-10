import { configureStore } from "@reduxjs/toolkit";
import pizzasReducer from "./slices/pizzasSlice";
import categoryReducer from "./slices/categorySlice";
import sortReducer from "./slices/sortSlice";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
    reducer: {
        pizzas: pizzasReducer,
        category: categoryReducer,
        sort: sortReducer,
        search: searchReducer
    }
});
