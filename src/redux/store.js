import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import categoryReducer from "./slices/categorySlice";

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        category: categoryReducer
    }
});
