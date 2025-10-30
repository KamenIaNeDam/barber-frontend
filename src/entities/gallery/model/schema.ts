import { z } from "zod";
export const adminGalleryCreateSchema = z.object({
  image_id: z.number().min(1, "Загрузите изображение"),
  ordering: z.number().default(0),
  published: z.boolean().default(false),
});

export type AdminGalleryCreateSchema = z.Infer<typeof adminGalleryCreateSchema>;

export const adminGalleryUpdateSchema = z.object({
  ordering: z.number().default(0),
  published: z.boolean().default(false),
});

export type AdminGalleryUpdateSchema = z.Infer<typeof adminGalleryUpdateSchema>;
