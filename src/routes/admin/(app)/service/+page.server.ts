import { getServices } from "@entities/service/api/admin-service.js";
import { redirect } from "@sveltejs/kit";

export async function load({ fetch, cookies }) {
  const accessToken = cookies.get("access_token") || null;
  if (!accessToken) {
    throw redirect(302, "/admin/login");
  }
  const services = await getServices(fetch, accessToken, { limit: 25 });

  return {
    services,
  };
}
