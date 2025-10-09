import type { SocialMediaModel } from "@entities/social-media/model/socia-media";
import { writable } from "svelte/store";

export const socialMediasStore = writable<SocialMediaModel[]>([]);
