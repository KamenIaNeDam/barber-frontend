import type { SocialMediaModel } from "@entities/social-media/model/types";
import { writable } from "svelte/store";

export const socialMediasStore = writable<SocialMediaModel[]>([]);
