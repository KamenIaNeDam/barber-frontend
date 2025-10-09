import { getContactByID } from "@entities/contact/api/admin-contact";
import { error, redirect } from "@sveltejs/kit";

export async function load({ fetch, cookies, params }) {
  const accessToken = cookies.get("access_token") || null;
  if (!accessToken) {
    throw redirect(302, "/admin/login");
  }

  try {
    const contact = await getContactByID(fetch, accessToken, Number(params.id));
    return {
      contact,
    };
  } catch (err) {
    return error(404, "Contact not found");
  }
}
