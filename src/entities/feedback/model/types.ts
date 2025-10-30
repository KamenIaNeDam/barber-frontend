export interface AdminFeedbackModel {
  id: number;
  fio: string;
  contact: string;
  text: string;
  created_at: string;
  processed: boolean;
  admin_text?: string;
}

export interface AdminFeedbackCreateModel {
  fio: string;
  contact: string;
  text: string;
  processed: boolean;
  admin_text?: string;
}

export interface AdminFeedbackUpdateModel {
  processed?: boolean;
  admin_text?: string;
}
