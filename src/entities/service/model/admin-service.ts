export interface AdminServiceModel {
    id: number
    title: string
    price: number

    ordering: number;
    published: boolean;
}

export interface AdminServiceCreateModel {
    title: string
    price: number

    ordering: number;
    published: boolean;
}