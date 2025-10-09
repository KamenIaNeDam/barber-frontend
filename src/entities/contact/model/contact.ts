export enum ContactType {
  Telegram = "telegram",
  WhatsApp = "whatsapp",
  VK = "vk",
  Instagram = "instagram",
}

export interface ContactModel {
  id: number;
  title: string;
  value: string;
  href?: string;
}
