import { getFeedbackByID } from "@entities/feedback/api";
import { adminFeedbackUpdateSchema } from "@entities/feedback/model/schema.js";
import { error, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";

export async function load({ fetch, cookies, params }) {
  const accessToken = cookies.get("access_token") || null;
  if (!accessToken) {
    throw redirect(302, "/admin/login");
  }

  try {
    const feedback = await getFeedbackByID(
      fetch,
      accessToken,
      Number(params.id),
    );
    return {
      feedback,
      form: await superValidate(feedback, zod4(adminFeedbackUpdateSchema)),
    };
  } catch (err) {
    return error(404, "Feedback not found");
  }
}
