import { getSocialMediaByID } from "@entities/social-media/api/admin-social-media.js";
import { adminSocialMediaSchema } from "@entities/social-media/model/schema.js";
import { error, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";

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
      form: await superValidate(socialMedia, zod4(adminSocialMediaSchema)),
    };
  } catch (err) {
    return error(404, "Media not found");
  }
}
