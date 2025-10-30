import { getGalleries } from "@entities/gallery/api/admin-gallery";
import { getSocialMedias } from "@entities/social-media/api/admin-social-media.js";
import { redirect } from "@sveltejs/kit";

export async function load({ fetch, cookies }) {
  const accessToken = cookies.get("access_token") || null;
  if (!accessToken) {
    throw redirect(302, "/admin/login");
  }
  const socialMedias = await getSocialMedias(fetch, accessToken, { limit: 25 });

  return {
    socialMedias,
  };
}
