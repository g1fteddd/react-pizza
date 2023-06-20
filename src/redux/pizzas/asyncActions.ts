import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFetchPizzas, IPizza } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    "pizzas/fetchPizzas",
    async (params: IFetchPizzas) => {
        const { categoryQuery, sortByWithOrderQury, searchQuery } = params;
        const res = await axios.get<IPizza[]>(
            `https://647c75c8c0bae2880ad0b72c.mockapi.io/items?${searchQuery}&${categoryQuery}&${sortByWithOrderQury}`
        );
        return res.data as IPizza[];
    }
);
