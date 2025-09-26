import { writable } from "svelte/store";


export const modalStore = writable<{
    isOpen: boolean;
    content: any | null;
}>({
    isOpen: false,
    content: null
});

export function openModal(content: any) {
    modalStore.set({ isOpen: true, content });
}

export function closeModal() {
    modalStore.set({ isOpen: false, content: null });
}