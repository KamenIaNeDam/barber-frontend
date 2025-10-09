import { getSocialMediaByID } from "@entities/social-media/api/admin-social-media.js";
import { error, redirect } from "@sveltejs/kit";

export async function load({ fetch, cookies, params }) {
  const accessToken = cookies.get("access_token") || null;
  if (!accessToken) {
    throw redirect(302, "/admin/login");
  }

  try {
    const socialMedia = await getSocialMediaByID(
      fetch,
      accessToken,
      Number(params.id),
    );
    return {
      socialMedia,
    };
  } catch (err) {
    return error(404, "Media not found");
  }
}
