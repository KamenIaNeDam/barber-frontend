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
