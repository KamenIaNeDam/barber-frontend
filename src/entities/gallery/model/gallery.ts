export interface GalleryItem {
    id: number;
    title: string;
    mobileImage: string;
    desktopImage: string;
}

export const gallery: GalleryItem[] = [
    {
        id: 1,
        title: "kek",
        mobileImage: "/compas.png",
        desktopImage: "/about-us.png",
    },
    {
        id: 2,
        title: "ve",
        mobileImage: "/compas.png",
        desktopImage: "/about-us.png",
    },
]