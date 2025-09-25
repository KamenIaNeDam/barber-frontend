export interface Review {
    id: number;
    text: string;
    createdAt: string;
    rate: number;
    avatar: string;
}

export const reviews: Review[] = [
    {
        id: 1,
        text: "Amazing service, super fast delivery and great support!",
        createdAt: "2025-09-24",
        rate: 4,
        avatar: "https://i.pravatar.cc/100?img=5"
    },

    {
        id: 2,
        text: "ФВФЫВАФЫАВ service, super fast delivery and great support!",
        createdAt: "2025-09-24",
        rate: 4,
        avatar: "https://i.pravatar.cc/100?img=5"
    },
]