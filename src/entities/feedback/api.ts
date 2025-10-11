import { api } from "@shared/api/base";
import type {
  AdminFeedbackCreateModel,
  AdminFeedbackModel,
  AdminFeedbackUpdateModel,
} from "./model";

const FEEDBACK_ADMIN_API = "/admin/feedback";

export interface AdminFeedbacksQueryParams {
  id?: number;
  published?: boolean;

  limit?: number;
  offset?: number;
}

export async function getFeedbacks(
  fetchFn: typeof fetch,
  token: string,
  params: AdminFeedbacksQueryParams,
) {
  // @ts-ignore
  const searchParams = new URLSearchParams({ ...params });
  return await api<AdminFeedbackModel[]>(
    fetchFn,
    `${FEEDBACK_ADMIN_API}?${searchParams}`,
    {},
    token,
  );
}

export async function createFeedback(
  fetchFn: typeof fetch,
  token: string,
  payload: AdminFeedbackCreateModel,
) {
  return await api<AdminFeedbackModel>(
    fetchFn,
    FEEDBACK_ADMIN_API,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    token,
  );
}

export async function updateFeedback(
  fetchFn: typeof fetch,
  token: string,
  id: number,
  payload: AdminFeedbackUpdateModel,
) {
  return await api<AdminFeedbackModel>(
    fetchFn,
    `${FEEDBACK_ADMIN_API}/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
    token,
  );
}

export async function getFeedbackByID(
  fetchFn: typeof fetch,
  token: string,
  id: number,
) {
  return await api<AdminFeedbackModel>(
    fetchFn,
    `${FEEDBACK_ADMIN_API}/${id}`,
    {},
    token,
  );
}

export async function deleteFeedback(
  fetchFn: typeof fetch,
  token: string,
  id: number,
) {
  return await api<null>(
    fetchFn,
    `${FEEDBACK_ADMIN_API}/${id}`,
    { method: "DELETE" },
    token,
  );
}
