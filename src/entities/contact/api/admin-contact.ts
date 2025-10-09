import { api } from "@shared/api/base";
import type {
  AdminContactCreateModel,
  AdminContactModel,
} from "../model/admin-contact";

const CONTACT_ADMIN_PATH = "/admin/contact";

export interface AdminContactsQueryParams {
  id?: number;
  published?: boolean;

  limit?: number;
  offset?: number;
}

export async function getContacts(
  fetchFn: typeof fetch,
  token: string,
  params: AdminContactsQueryParams,
) {
  const searchParams = new URLSearchParams({ ...params });
  return await api<AdminContactModel[]>(
    fetchFn,
    `${CONTACT_ADMIN_PATH}?${searchParams}`,
    {},
    token,
  );
}

export async function createContact(
  fetchFn: typeof fetch,
  token: string,
  payload: AdminContactCreateModel,
) {
  return await api<AdminContactModel>(
    fetchFn,
    CONTACT_ADMIN_PATH,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    token,
  );
}

export async function updateContact(
  fetchFn: typeof fetch,
  token: string,
  id: number,
  payload: AdminContactCreateModel,
) {
  return await api<AdminContactModel>(
    fetchFn,
    `${CONTACT_ADMIN_PATH}/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
    token,
  );
}

export async function getContactByID(
  fetchFn: typeof fetch,
  token: string,
  id: number,
) {
  return await api<AdminContactModel>(
    fetchFn,
    `${CONTACT_ADMIN_PATH}/${id}`,
    {},
    token,
  );
}

export async function deleteContact(
  fetchFn: typeof fetch,
  token: string,
  id: number,
) {
  return await api<null>(
    fetchFn,
    `${CONTACT_ADMIN_PATH}/${id}`,
    { method: "DELETE" },
    token,
  );
}
