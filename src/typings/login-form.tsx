export interface LoginForm {
  email: string;
  password: string;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface SendOtpForm {
  type: string;
}

export interface VerifyOtpForm {
  code: string;
}

export interface SendForgotPasswordForm {
  code: string;
}

export interface VerifyForgotPasswordForm {
  code: string;
}

export interface NewPasswordForm {
  code: string;
}

export interface ProfileForm {
  currency: string;
  language: string;
  theme: boolean;
}

export interface ChangeEmailForm {
  email: string;
}

export interface ChangeMobileForm {
  mobile_phone: {
    country_code: {
      countryAbbreviation: string;
      countryName: string;
      mobileCode: string;
    };
    number: string;
  };
}
