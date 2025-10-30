import { adminContactSchema } from "@entities/contact/model/schema.js";
import { redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";

export async function load({ fetch, cookies }) {
  const accessToken = cookies.get("access_token") || null;
  if (!accessToken) {
    throw redirect(302, "/admin/login");
  }
  // const contacts = await getContacts(fetch, accessToken, { limit: 2 });

  return {
    form: await superValidate(zod4(adminContactSchema)),
  };
}
