export enum ContactType {
  Telegram = "telegram",
  WhatsApp = "whatsapp",
  VK = "vk",
  Instagram = "instagram",
}

export interface ContactModel {
  id: number;
  url: string;
  type: ContactType;
}

export const contacts: ContactModel[] = [
  {
    id: 1,
    url: "#",
    type: ContactType.VK,
  },
  {
    id: 2,
    url: "#",
    type: ContactType.Telegram,
  },
  {
    id: 3,
    url: "#",
    type: ContactType.Instagram,
  },
  {
    id: 4,
    url: "#",
    type: ContactType.WhatsApp,
  },
];
