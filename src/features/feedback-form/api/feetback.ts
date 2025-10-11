import { api } from "@shared/api/base";
import type { FeedbackFormData, FeedbackModel } from "../model/types";

const FEEDBACK_PATH = "/api/feedback";

export async function sendFeedBack(
  fetchFn: typeof fetch,
  data: FeedbackFormData,
) {
  return await api<FeedbackModel>(fetchFn, FEEDBACK_PATH, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
