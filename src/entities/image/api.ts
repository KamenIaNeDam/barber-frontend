import { api } from "@shared/api/base";
import type { ImageModel } from "./model";

export async function uploadImage(
  fetchFn: typeof fetch,
  token: string,
  file: any,
) {
  const formData = new FormData();
  formData.append("image", file);
  return await api<ImageModel>(
    fetchFn,
    "/admin/image",
    {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
    token,
  );
}

export interface AdminImageQueryParams {
  id?: number;

  limit?: number;
  offset?: number;
}

export async function getImages(
  fetchFn: typeof fetch,
  token: string,
  params: AdminImageQueryParams,
) {
  // @ts-ignore
  const searchParams = new URLSearchParams({ ...params });
  return await api<ImageModel[]>(
    fetchFn,
    `/admin/image?${searchParams}`,
    {},
    token,
  );
}
