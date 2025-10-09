import type { MediaType } from "./socia-media";

export interface AdminSocialMediaModel {
  id: number;
  url: string;
  type: MediaType;

  ordering: number;
  published: boolean;
}

export interface AdminSocialMediaCreateModel {
  url: string;
  type: MediaType;
  ordering: number;
  published: boolean;
}
