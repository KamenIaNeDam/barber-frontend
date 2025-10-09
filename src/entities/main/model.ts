import type { ContactModel } from "@entities/contact/model/contact";
import type { GalleryModel } from "@entities/gallery/model/gallery";
import type { LocationModel } from "@entities/location/model/location";
import type { Seo } from "@entities/seo/model/seo";
import type { ServiceModel } from "@entities/service/model/service";
import type { AdminSocialMediaModel } from "@entities/social-media/model/admin-social-media";
import type { SocialMediaModel } from "@entities/social-media/model/socia-media";

export interface MainPageModel {
  seo: Seo;
  location: LocationModel;
  services: ServiceModel[];
  contacts: ContactModel[];
  gallery: GalleryModel[];
  medias: SocialMediaModel[];
}
