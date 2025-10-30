import { z } from "zod";
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export const loginRequestSchema = z.object({
  email: z.email("Неверная почта"),
  password: z.string().min(6, "Пароль должен быть больше 6 символов"),
});

export type LoginRequestSchema = z.Infer<typeof loginRequestSchema>;
