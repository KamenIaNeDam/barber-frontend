import { api } from "@shared/api/base";
import type { ContactModel } from "../model/contact";

const CONTACT_PATH = "/api/contact";

export async function getContacts(fetchFn: typeof fetch) {
  return await api<ContactModel[]>(fetchFn, `${CONTACT_PATH}`, {});
}
