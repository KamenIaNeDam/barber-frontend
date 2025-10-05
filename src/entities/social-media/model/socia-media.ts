export enum MediaType {
  Telegram = "telegram",
  WhatsApp = "whatsapp",
  VK = "vk",
  Instagram = "instagram",
}

export interface ContactModel {
  id: number;
  url: string;
  type: MediaType;
}
