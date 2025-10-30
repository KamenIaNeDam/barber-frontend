import { getGalleries } from "@entities/gallery/api/admin-gallery";
import { redirect } from "@sveltejs/kit";

export async function load({ fetch, cookies }) {
  const accessToken = cookies.get("access_token") || null;
  if (!accessToken) {
    throw redirect(302, "/admin/login");
  }
  const galleries = await getGalleries(fetch, accessToken, { limit: 25 });

  return {
    galleries,
  };
}
