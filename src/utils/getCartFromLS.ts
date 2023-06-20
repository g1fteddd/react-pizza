// get data from Local Storage

import { ICartItem } from "../redux/cart/types";
import { calcTotalCount } from "./calcTotalCount";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
    const data = window.localStorage.getItem("cart");
    const json: ICartItem[] = data ? JSON.parse(data) : [];

    return {
        totalPrice: calcTotalPrice(json),
        totalCount: calcTotalCount(json),
        pizzas: json
    };
};
