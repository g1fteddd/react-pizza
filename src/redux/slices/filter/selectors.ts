import { RootState } from "../../store";

export const filterSelector = (state: RootState) => state.filter;
export const filterCategorySelector = (state: RootState) =>
    state.filter.categoryId;
export const filterSortSelector = (state: RootState) => state.filter.sort;
