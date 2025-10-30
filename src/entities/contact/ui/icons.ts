import TelegramIcon from "@shared/ui/icons/TelegramIcon.svelte";
import WhatsAppIcon from "@shared/ui/icons/WhatsAppIcon.svelte";
import VkIcon from "@shared/ui/icons/VKIcon.svelte";
import InstagramIcon from "@shared/ui/icons/InstagramIcon.svelte";
import { MediaType } from "@entities/social-media/model/types";

export const contactIcons: Record<MediaType, typeof TelegramIcon> = {
  [MediaType.Telegram]: TelegramIcon,
  [MediaType.WhatsApp]: WhatsAppIcon,
  [MediaType.VK]: VkIcon,
  [MediaType.Instagram]: InstagramIcon,
};
