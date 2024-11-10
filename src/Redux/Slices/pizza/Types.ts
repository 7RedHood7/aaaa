export type Pizza = {
    title: string,
    price: number,
    sizes: number[],
    type: number[],
    image: string,
    id: string,
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface PizzasState {
    items: Pizza[],
    status: Status
}