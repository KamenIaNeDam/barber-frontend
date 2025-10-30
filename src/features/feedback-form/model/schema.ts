import { z } from "zod";

export const feedbackSchema = z.object({
  fio: z.string().min(1, "Введите ФИО"),
  contact: z.string().min(1, "Введите контак"),
  text: z.string().min(1, "Введите текст"),
  captcha: z.string().min(1, "Пройдите проверку"),
});

export type FeedbackSchema = z.Infer<typeof feedbackSchema>;
