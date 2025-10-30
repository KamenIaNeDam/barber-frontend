import { loginRequestSchema } from "@entities/auth/model";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";

export async function load({}) {
  return {
    form: await superValidate(zod4(loginRequestSchema)),
  };
}
