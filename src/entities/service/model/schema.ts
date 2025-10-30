import { z } from "zod";

export const adminServiceSchema = z.object({
  title: z.string(),
  price: z.number(),
  ordering: z.number().default(0),
  published: z.boolean().default(false),
});

export type AdminServiceSchema = z.Infer<typeof adminServiceSchema>;
