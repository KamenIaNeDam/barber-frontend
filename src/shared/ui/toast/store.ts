import { toast } from "svelte-sonner";
import { writable } from "svelte/store";

export type Toast = { id: number; message: string; type: "success" | "error" };
export const toasts = writable<Toast[]>([]);

let nextId = 1;

export function addToast(
  message: string,
  type: "success" | "error" = "success",
) {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  }
}
