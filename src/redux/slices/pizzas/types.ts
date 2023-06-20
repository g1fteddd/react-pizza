export interface IPizza {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: Array<number>;
    types: Array<number>;
    rating: number;
}

export enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
}

export interface IPizzasState {
    pizzas: IPizza[];
    status: Status;
}

export interface IFetchPizzas {
    categoryQuery: string;
    sortByWithOrderQury: string;
    searchQuery: string;
}
