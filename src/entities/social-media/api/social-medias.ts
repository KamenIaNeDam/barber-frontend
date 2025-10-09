import { api } from "@shared/api/base";
import type { SocialMediaModel } from "../model/socia-media";

const SOCIAL_MEDIA_API_PATH = "/api/social-media";

export async function getSocialMedias(fetchFn: typeof fetch) {
  return await api<SocialMediaModel[]>(fetchFn, `${SOCIAL_MEDIA_API_PATH}`);
}
