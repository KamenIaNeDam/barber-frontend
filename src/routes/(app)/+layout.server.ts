import { getContacts } from "@entities/contact/api/contacts.js";
import { getSocialMedias } from "@entities/social-media/api/social-medias.js";

export async function load({ fetch }) {
  const socialMedias = await getSocialMedias(fetch);

  const contacts = await getContacts(fetch);

  return {
    contacts,
    socialMedias,
  };
}
