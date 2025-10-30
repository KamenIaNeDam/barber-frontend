import { getGalleryByID } from "@entities/gallery/api/admin-gallery.js";
import { adminGalleryUpdateSchema } from "@entities/gallery/model/schema.js";
import { error, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";

export async function load({ fetch, cookies, params }) {
  const accessToken = cookies.get("access_token") || null;
  if (!accessToken) {
    throw redirect(302, "/admin/login");
  }
  try {
    const gallery = await getGalleryByID(fetch, accessToken, Number(params.id));
    return {
      gallery,
      form: await superValidate(gallery, zod4(adminGalleryUpdateSchema)),
    };
  } catch (err) {
    return error(404, "Gallery not found");
  }
}
