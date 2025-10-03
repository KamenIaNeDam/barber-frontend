import { api } from "@shared/api/base";
import type { User } from "../model/user";


const USER_API_PATH = "/admin/user"

export async function getUser(fetchFn: typeof fetch, token: string) {
  return await api<User>(fetchFn, `${USER_API_PATH}/me`, {}, token);
}
