import { getServiceByID } from "@entities/service/api/admin-service.js";
import { error, redirect } from "@sveltejs/kit";

export async function load({ fetch, cookies, params }) {
  const accessToken = cookies.get("access_token") || null;
  if (!accessToken) {
    throw redirect(302, "/admin/login");
  }

  try {
    const service = await getServiceByID(fetch, accessToken, Number(params.id));
    return {
      service,
    };
  } catch (err) {
    return error(404, "Service not found");
  }
}
