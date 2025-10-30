import { z } from "zod";

export const adminContactSchema = z.object({
  title: z.string().min(1, "Заголовок обязателен").max(50),
  value: z.string().min(1, "Значение обязательно"),
  href: z.string().nullable(),
  ordering: z.number().default(0),
  published: z.boolean().default(false),
});

export type AdminContactSchema = z.Infer<typeof adminContactSchema>;
