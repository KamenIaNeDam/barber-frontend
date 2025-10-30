import type { ContactModel } from "@entities/contact/model/types";
import type { GalleryModel } from "@entities/gallery/model/types";
import type { LocationModel } from "@entities/location/model/types";
import type { Seo } from "@entities/seo/model/types";
import type { ServiceModel } from "@entities/service/model/types";

import type { SocialMediaModel } from "@entities/social-media/model/types";

export interface MainPageModel {
  seo: Seo;
  location: LocationModel;
  services: ServiceModel[];
  contacts: ContactModel[];
  gallery: GalleryModel[];
  medias: SocialMediaModel[];
}
