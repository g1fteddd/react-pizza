import { ICartItem } from "../redux/cart/types";

export const calcTotalPrice = (items: ICartItem[]) => {
    return items.reduce((acc, currentValue) => {
        return acc + currentValue.price * currentValue.count;
    }, 0);
};
