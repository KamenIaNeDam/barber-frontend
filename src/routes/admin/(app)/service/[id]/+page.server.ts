import { getServiceByID } from "@entities/service/api/admin-service.js";
import { adminServiceSchema } from "@entities/service/model/schema";
import { error, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";

export async function load({ fetch, cookies, params }) {
  const accessToken = cookies.get("access_token") || null;
  if (!accessToken) {
    throw redirect(302, "/admin/login");
  }

  try {
    const service = await getServiceByID(fetch, accessToken, Number(params.id));
    return {
      service,
      form: await superValidate(service, zod4(adminServiceSchema)),
    };
  } catch (err) {
    return error(404, "Service not found");
  }
}
