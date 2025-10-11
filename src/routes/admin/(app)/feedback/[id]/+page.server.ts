import { getFeedbackByID } from "@entities/feedback/api.js";
import { error, redirect } from "@sveltejs/kit";

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
    };
  } catch (err) {
    return error(404, "Feedback not found");
  }
}
