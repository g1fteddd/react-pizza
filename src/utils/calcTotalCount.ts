import { ICartItem } from "../redux/slices/cart/types";

export const calcTotalCount = (items: ICartItem[]) => {
    return items.reduce((acc, currentValue) => {
        return acc + currentValue.count;
    }, 0);
};
