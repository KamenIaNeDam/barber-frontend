import { api } from "@shared/api/base";
import type {
  AdminSocialMediaCreateModel,
  AdminSocialMediaModel,
} from "../model/admin-social-media";

const SOCIAL_MEDIA_ADMIN_PATH = "/admin/social-media";

export interface AdminSocialMediaParams {
  id?: number;
  published?: boolean;

  limit?: number;
  offset?: number;
}

export async function getSocialMedias(
  fetchFn: typeof fetch,
  token: string,
  params: AdminSocialMediaParams,
) {
  const searchParams = new URLSearchParams({ ...params });
  return await api<AdminSocialMediaModel[]>(
    fetchFn,
    `${SOCIAL_MEDIA_ADMIN_PATH}?${searchParams}`,
    {},
    token,
  );
}

export async function createSocialMedia(
  fetchFn: typeof fetch,
  token: string,
  payload: AdminSocialMediaCreateModel,
) {
  return await api<AdminSocialMediaModel>(
    fetchFn,
    SOCIAL_MEDIA_ADMIN_PATH,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    token,
  );
}

export async function updateSocialMedia(
  fetchFn: typeof fetch,
  token: string,
  id: number,
  payload: AdminSocialMediaCreateModel,
) {
  return await api<AdminSocialMediaModel>(
    fetchFn,
    `${SOCIAL_MEDIA_ADMIN_PATH}/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
    token,
  );
}

export async function getSocialMediaByID(
  fetchFn: typeof fetch,
  token: string,
  id: number,
) {
  return await api<AdminSocialMediaModel>(
    fetchFn,
    `${SOCIAL_MEDIA_ADMIN_PATH}/${id}`,
    {},
    token,
  );
}

export async function deleteSocialMedia(
  fetchFn: typeof fetch,
  token: string,
  id: number,
) {
  return await api<null>(
    fetchFn,
    `${SOCIAL_MEDIA_ADMIN_PATH}/${id}`,
    { method: "DELETE" },
    token,
  );
}
