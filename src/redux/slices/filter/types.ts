export interface ISort {
    name: string;
    property: string;
    order: string;
}

export interface IFilterState {
    categoryId: number;
    sort: ISort;
}
