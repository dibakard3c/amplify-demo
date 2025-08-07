export interface LangAndCountryForm {
  language: string;
  country: {
    countryAbbreviation: string;
    countryName: string;
    mobileCode: string;
  };
  agreement: true;
}

export interface BusinessDetailsForm {
  business_name: string;
  merchant_category: string;
  business_logo: any;
  vat_identification_no: string;
  revenue_range: string;
  business_phone: {
    country_code: {
      countryAbbreviation: string;
      countryName: string;
      mobileCode: string;
    };
    number: string;
  };
  business_email: string;
  contact_firstname: string;
  contact_lastname: string;
  contact_email: string;
  contact_phone: {
    country_code: {
      countryAbbreviation: string;
      countryName: string;
      mobileCode: string;
    };
    number: string;
  };
}

export interface PasswordForm {
  password: string;
  confirm_password: string;
}

export interface RegistrationForm {
  className?: string;
  country: {
    countryAbbreviation: string;
    countryName: string;
    mobileCode: string;
  };
  password: string;
  businessDetails: BusinessDetailsForm;
  isPhoneValidated?: boolean;
  isEmailValidated?: boolean;
  setPhoneValidated: (value: boolean) => void;
  setEmailValidated: (value: boolean) => void;
  onMoveToNextStep: (step?: number) => void;
  // merchant user
  registerToken?: string;
}
