import { z } from "zod";

export const feedbackSchema = z.object({
  fio: z.string().min(1, "Введите ФИО"),
  contact: z.string().min(1, "Введите контак"),
  text: z.string().min(1, "Введите текст"),
  captcha: z.string().min(1, "Пройдите проверку"),
  assigned: z.boolean().refine((val) => val === true, {
    message: "Примите соглашение",
  }),
});

export type FeedbackSchema = z.Infer<typeof feedbackSchema>;
