import { writable } from "svelte/store";

export const modalStore = writable<{
  isOpen: boolean;
  content: any | null;
  props: any | null;
}>({
  isOpen: false,
  content: null,
  props: null,
});

export function openModal(content: any, props: any = {}) {
  modalStore.set({ isOpen: true, content, props });
}

export function closeModal() {
  modalStore.set({ isOpen: false, content: null, props: null });
}
