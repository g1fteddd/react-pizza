export interface ICartItem {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: number;
    size: number;
    count: number;
}

export interface ICartState {
    totalPrice: number;
    totalCount: number;
    pizzas: ICartItem[];
}
