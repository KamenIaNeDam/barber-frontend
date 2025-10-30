import type { ContactModel } from "@entities/contact/model/types";
import { writable } from "svelte/store";

export const contactsStore = writable<ContactModel[]>([]);
