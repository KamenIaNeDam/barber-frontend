export interface AdminContactModel {
    id: number;
    title: string;
    value: string;
    href?: string;

    ordering: number;
    published: boolean;
}

export interface AdminContactCreateModel {
    title: string;
    value: string;
    href?: string;
    ordering: number;
    published: boolean;
}