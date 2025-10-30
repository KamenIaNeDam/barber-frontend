import { z } from "zod";

export const adminFeedbackUpdateSchema = z.object({
  fio: z.string(),
  contact: z.string(),
  text: z.string(),
  created_at: z.string(),
  processed: z.boolean().optional(),
  admin_text: z.string().optional(),
});

export type AdminFeedbackUpdateSchema = z.Infer<
  typeof adminFeedbackUpdateSchema
>;
