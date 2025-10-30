import { getContactByID } from "@entities/contact/api/admin-contact";
import { adminContactSchema } from "@entities/contact/model/schema.js";
import { error, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";

export async function load({ fetch, cookies, params }) {
  const accessToken = cookies.get("access_token") || null;
  if (!accessToken) {
    throw redirect(302, "/admin/login");
  }

  try {
    const contact = await getContactByID(fetch, accessToken, Number(params.id));
    return {
      contact,
      form: await superValidate(
        contact || {
          title: "",
          value: "",
          href: undefined,
          ordering: 0,
          published: false,
        },
        zod4(adminContactSchema),
      ),
    };
  } catch (err) {
    return error(404, "Contact not found");
  }
}
