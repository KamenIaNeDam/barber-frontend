import type { ContactModel } from "@entities/contact/model/contact";
import { writable } from "svelte/store";

export const contactsStore = writable<ContactModel[]>([]);
