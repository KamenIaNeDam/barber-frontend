import { getLocation } from "@entities/location/api/admin-location";
import { getSeo } from "@entities/seo/api/seo";
import { adminSeoSchema } from "@entities/seo/model/schema.js";
import { error, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";

export async function load({ fetch, cookies, params }) {
  const accessToken = cookies.get("access_token") || null;
  if (!accessToken) {
    throw redirect(302, "/admin/login");
  }

  try {
    const seo = await getSeo(fetch, accessToken);
    const location = await getLocation(fetch, accessToken);
    return {
      seo,
      location,
      form: await superValidate(seo, zod4(adminSeoSchema)),
    };
  } catch (err) {
    return error(500);
  }
}
