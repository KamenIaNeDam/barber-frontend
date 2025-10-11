export interface FeedbackFormData {
  fio: string;
  contact: string;
  text: string;
  captcha: string;
}

export interface FeedbackModel {
  id: number;
  fio: string;
  contact: string;
  text: string;
  captcha: string;
  created_at: string;
}
