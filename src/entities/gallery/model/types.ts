import type { ImageModel } from "@entities/image/model";

export interface GalleryModel {
  id: number;
  image: ImageModel;
}

export interface AdminGalleryModel {
  id: number;
  image: ImageModel;

  ordering: number;
  published: boolean;
}

export interface AdminGalleryCreateModel {
  image_id: number;

  ordering: number;
  published: boolean;
}

export interface AdminGalleryUpdateModel {
  ordering?: number;
  published?: boolean;
}

export interface AdminGalleryFilterModel {
  id?: number;
  published?: boolean;
}
