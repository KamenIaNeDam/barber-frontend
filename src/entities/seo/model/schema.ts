import { z } from "zod";

export const adminSeoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  keywords: z.string().optional(),
});

export type AdminSeoSchema = z.Infer<typeof adminSeoSchema>;
