import { getMainPage } from "@entities/main/api.js";
import { feedbackSchema } from "@features/feedback-form/model/schema.js";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";

export async function load({ fetch }) {
  const mainPage = await getMainPage(fetch);

  return {
    mainPage,
    feedbackForm: await superValidate(zod4(feedbackSchema)),
  };
}
