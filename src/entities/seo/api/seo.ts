import { api } from "@shared/api/base";
import type { Seo } from "../model/seo";

const SEO_ADMIN_PATH = "/admin/seo";

export async function getSeo(fetchFn: typeof fetch, token: string) {
  return await api<Seo>(fetchFn, `${SEO_ADMIN_PATH}`, {}, token);
}

export async function setSeo(fetchFn: typeof fetch, token: string, data: Seo) {
  return await api<Seo>(
    fetchFn,
    SEO_ADMIN_PATH,
    { method: "POST", body: JSON.stringify(data) },
    token,
  );
}
