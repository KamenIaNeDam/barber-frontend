import { api } from "@shared/api/base";
import type {
  AdminServiceCreateModel,
  AdminServiceModel,
} from "../model/admin-service";

const SERVICE_ADMIN_PATH = "/admin/service";

export interface AdminServicesQueryParams {
  id?: number;
  published?: boolean;

  limit?: number;
  offset?: number;
}

export async function getServices(
  fetchFn: typeof fetch,
  token: string,
  params: AdminServicesQueryParams,
) {
  const searchParams = new URLSearchParams({ ...params });
  return await api<AdminServiceModel[]>(
    fetchFn,
    `${SERVICE_ADMIN_PATH}?${searchParams}`,
    {},
    token,
  );
}

export async function createService(
  fetchFn: typeof fetch,
  token: string,
  payload: AdminServiceCreateModel,
) {
  return await api<AdminServiceModel>(
    fetchFn,
    SERVICE_ADMIN_PATH,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    token,
  );
}

export async function updateService(
  fetchFn: typeof fetch,
  token: string,
  id: number,
  payload: AdminServiceCreateModel,
) {
  return await api<AdminServiceModel>(
    fetchFn,
    `${SERVICE_ADMIN_PATH}/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
    token,
  );
}

export async function getServiceByID(
  fetchFn: typeof fetch,
  token: string,
  id: number,
) {
  return await api<AdminServiceModel>(
    fetchFn,
    `${SERVICE_ADMIN_PATH}/${id}`,
    {},
    token,
  );
}

export async function deleteService(
  fetchFn: typeof fetch,
  token: string,
  id: number,
) {
  return await api<null>(
    fetchFn,
    `${SERVICE_ADMIN_PATH}/${id}`,
    { method: "DELETE" },
    token,
  );
}
