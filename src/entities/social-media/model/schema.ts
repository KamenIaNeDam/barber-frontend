import { z } from "zod";
import { MediaType } from "./types";

export const adminSocialMediaSchema = z.object({
  url: z.string(),
  type: z.enum(MediaType),
  ordering: z.number().default(0),
  published: z.boolean().default(false),
});

export type AdminSocialMediaSchema = z.Infer<typeof adminSocialMediaSchema>;
