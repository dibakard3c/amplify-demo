export interface SupportForm {
  full_name?: string;
  email?: string;
  subject: string;
  description: string;
  issue_type: string;
  attachment?: string;
}

export interface FeedbackForm {
  overall_satisfaction: number;
  ease_of_use: number;
  design_and_aesthetics: number;
  performance_and_speed: number;
  feature_satisfaction: number;
  security_and_privacy: number;
  reliability: number;
  support_experience: number;
}
