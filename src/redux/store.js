import { configureStore } from "@reduxjs/toolkit";

import pizzasReducer from "./slices/pizzasSlice";
import filterReducer from "./slices/filterSlice";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
    reducer: {
        pizzas: pizzasReducer,
        filter: filterReducer,
        search: searchReducer
    }
});
