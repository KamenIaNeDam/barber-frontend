import { ContactType } from "../model/contact";

import TelegramIcon from "@shared/ui/icons/TelegramIcon.svelte";
import WhatsAppIcon from "@shared/ui/icons/WhatsAppIcon.svelte";
import VkIcon from "@shared/ui/icons/VKIcon.svelte";
import InstagramIcon from "@shared/ui/icons/InstagramIcon.svelte";

export const contactIcons: Record<ContactType, typeof TelegramIcon> = {
  [ContactType.Telegram]: TelegramIcon,
  [ContactType.WhatsApp]: WhatsAppIcon,
  [ContactType.VK]: VkIcon,
  [ContactType.Instagram]: InstagramIcon,
};
