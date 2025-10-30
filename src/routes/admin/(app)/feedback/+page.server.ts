import { getFeedbacks } from "@entities/feedback/api.js";
import { error, redirect } from "@sveltejs/kit";

export async function load({ fetch, cookies }) {
  const accessToken = cookies.get("access_token") || null;
  if (!accessToken) {
    throw redirect(302, "/admin/login");
  }

  try {
    const feedbacks = await getFeedbacks(fetch, accessToken, { limit: 25 });
    return {
      feedbacks,
    };
  } catch (err) {
    return error(404, "Feedbacks not found");
  }
}
