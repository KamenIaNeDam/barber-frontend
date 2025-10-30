export enum MediaType {
  Telegram = "telegram",
  WhatsApp = "whatsapp",
  VK = "vk",
  Instagram = "instagram",
}

export interface SocialMediaModel {
  id: number;
  url: string;
  type: MediaType;
}

export interface AdminSocialMediaModel {
  id: number;
  url: string;
  type: MediaType;

  ordering: number;
  published: boolean;
}

export interface AdminSocialMediaCreateModel {
  url: string;
  type: MediaType;
  ordering: number;
  published: boolean;
}
