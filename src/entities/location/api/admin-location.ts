import { api } from "@shared/api/base";
import type { LocationModel } from "../model/location";

const LOCATION_ADMIN_PATH = "/admin/location";

export async function getLocation(fetchFn: typeof fetch, token: string) {
  return await api<LocationModel>(fetchFn, `${LOCATION_ADMIN_PATH}`, {}, token);
}

export async function setLocation(
  fetchFn: typeof fetch,
  token: string,
  payload: LocationModel,
) {
  return await api<LocationModel>(
    fetchFn,
    LOCATION_ADMIN_PATH,
    {
      method: "POST",
      body: JSON.stringify({ published: true, ...payload }),
    },
    token,
  );
}
