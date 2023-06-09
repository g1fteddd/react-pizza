import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        changeCategoryId: (state, action) => {
            console.log(action);
            state.categoryId = action.payload;
        }
    }
});

export const { changeCategoryId } = categorySlice.actions;

export default categorySlice.reducer;
