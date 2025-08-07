import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CONSTANTS } from '@estia/constants';

export const langAndCountryResolver = yupResolver(
  yup.object().shape({
    language: yup.string().required('Language is required'),
    country: yup.object({
      countryAbbreviation: yup.string().required('Country is required'),
      countryName: yup.string().required('Country is required'),
      mobileCode: yup.string().required('Country is required'),
    }),
    agreement: yup.boolean().isTrue().required('Agreement is required'),
  })
);

export const businessDetailsResolver = yupResolver(
  yup.object().shape({
    business_name: yup
      .string()
      .matches(/^[A-Za-z\s]+$/, 'Only alphabetic characters are allowed')
      .min(2, 'Must be at least 2 characters')
      .max(40, 'Cannot exceed 150 characters')
      .required('Business name is required'),
    business_logo: yup
      .mixed()
      .test('fileSize', 'Image is too large (max 2MB)', (value: any) => {
        if (!value || value.length === 0) return false; // required check
        const file = value[0] ?? value;
        return file.size <= CONSTANTS.MERCHANT_BUSINESS_LOGO_SIZE;
      })
      .test('fileType', 'Only image files are allowed', (value: any) => {
        if (!value || value.length === 0) return false;
        const file = value[0] ?? value;
        return CONSTANTS.MERCHANT_BUSINESS_LOGO_REGEX.test(file.type);
      })
      .required('Business logo image is required'),
    merchant_category: yup.string().required('Merchant category is required'),
    vat_identification_no: yup
      .string()
      .min(2, 'Must be at least 2 characters')
      .max(40, 'Cannot exceed 40 characters')
      .required('VAT Identification number is required'),
    revenue_range: yup.string().required('Revenue range is required'),
    business_phone: yup.object({
      country_code: yup.object({
        countryAbbreviation: yup.string().required('Country code is required'),
        countryName: yup.string().required('Country code is required'),
        mobileCode: yup.string().required('Country code is required'),
      }),
      number: yup.string().required('Business phone is required'),
    }),
    business_email: yup
      .string()
      .email('Please enter a valid email')
      .required('Business Email is required')
      .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email'),
    contact_firstname: yup
      .string()
      .min(2, 'Must be at least 2 characters')
      .max(40, 'Cannot exceed 40 characters')
      .required('Contact first name is required'),
    contact_lastname: yup
      .string()
      .min(2, 'Must be at least 2 characters')
      .max(40, 'Cannot exceed 40 characters')
      .required('Contact last name is required'),
    contact_email: yup
      .string()
      .email('Please enter a valid email')
      .required('Contact Email is required')
      .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email'),
    contact_phone: yup.object({
      country_code: yup.object({
        countryAbbreviation: yup.string().required('Country code is required'),
        countryName: yup.string().required('Country code is required'),
        mobileCode: yup.string().required('Country code is required'),
      }),
      number: yup.string().required('Contact phone is required'),
    }),
  })
);

export const passwordResolver = yupResolver(
  yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .max(32, 'Password must be at most 32 characters long')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character'
      ),
    confirm_password: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Password does not match'),
  })
);

export const loginResolver = yupResolver(
  yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required')
      .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email'),
    password: yup.string().required('Password is required'),
  })
);

export const forgotPasswordResolver = yupResolver(
  yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required')
      .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email'),
  })
);

export const sendOtpResolver = yupResolver(
  yup.object().shape({
    type: yup.string().required('otp type is required'),
  })
);

export const verifyOtpResolver = yupResolver(
  yup.object().shape({
    code: yup.string().required('otp code is required'),
  })
);

export const supportTicketResolver = yupResolver(
  yup.object().shape({
    subject: yup.string().required('subject is required'),
    description: yup.string().required('description is required'),
    issue_type: yup.string().required('issue type is required'),
  })
);

export const feedbackTicketResolver = yupResolver(
  yup.object().shape({
    overall_satisfaction: yup
      .number()
      .min(1, 'Please rate your overall satisfaction.')
      .required('Overall satisfaction is required.'),
    ease_of_use: yup
      .number()
      .min(1, 'Please rate the ease of use.')
      .required('Ease of use is required.'),
    design_and_aesthetics: yup
      .number()
      .min(1, 'Please rate the design and aesthetics.')
      .required('Design and aesthetics rating is required.'),
    performance_and_speed: yup
      .number()
      .min(1, 'Please rate the performance and speed.')
      .required('Performance and speed rating is required.'),
    feature_satisfaction: yup
      .number()
      .min(1, 'Please rate your satisfaction with the features.')
      .required('Feature satisfaction is required.'),
    security_and_privacy: yup
      .number()
      .min(1, 'Please rate the security and privacy.')
      .required('Security and privacy rating is required.'),
    reliability: yup
      .number()
      .min(1, 'Please rate the reliability.')
      .required('Reliability rating is required.'),
    support_experience: yup
      .number()
      .min(1, 'Please rate your support experience.')
      .required('Support experience rating is required.'),
  })
);

export const profileResolver = yupResolver(
  yup.object().shape({
    currency: yup.string().required(),
    language: yup.string().required(),
    theme: yup.boolean().required(),
  })
);

export const changeEmailResolver = yupResolver(
  yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required')
      .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email'),
  })
);

export const changeMobileResolver = yupResolver(
  yup.object().shape({
    mobile_phone: yup.object({
      country_code: yup.object({
        countryAbbreviation: yup.string().required('Country code is required'),
        countryName: yup.string().required('Country code is required'),
        mobileCode: yup.string().required('Country code is required'),
      }),
      number: yup.string().required('Contact phone is required'),
    }),
  })
);

export const createMerchantUserResolver = yupResolver(
  yup.object().shape({
    firstname: yup
      .string()
      .min(2, 'Must be at least 2 characters')
      .max(40, 'Cannot exceed 40 characters')
      .required('Contact first name is required'),
    lastname: yup
      .string()
      .min(2, 'Must be at least 2 characters')
      .max(40, 'Cannot exceed 40 characters')
      .required('Contact last name is required'),
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Contact Email is required')
      .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email'),
    phone: yup.object({
      country_code: yup.object({
        countryAbbreviation: yup.string().required('Country code is required'),
        countryName: yup.string().required('Country code is required'),
        mobileCode: yup.string().required('Country code is required'),
      }),
      number: yup.string().required('Contact phone is required'),
    }),
    role: yup.string().required('Role is required'),
  })
);

export const createPosUserResolver = yupResolver(
  yup.object().shape({
    name: yup.string().required('Name is required'),
    pos_mac_id: yup.string().required('POS Mac ID is required'),
    pos_model: yup.string().required('POS model is required'),
    login_token: yup.string().required('Login token is required'),
    register_token: yup.string().required('Register token is required'),
  })
);

export const sendEstResolver = yupResolver(
  yup.object().shape({
    amount: yup.number().min(1).required('Amount is required'),
    address: yup
      .string()
      .required('Wallet Address is required')
      .matches(
        /^0x[a-fA-F0-9]{40}$/,
        'Please enter a valid ERC-20 Wallet Address'
      ),
    // friendly_wallet_name: yup.string(),
  })
);

export const sendEurResolver = yupResolver(
  yup.object().shape({
    amount: yup.number().min(1).required('Amount is required'),
    iban: yup
      .object({
        id: yup.string(),
        iban: yup.string().required(),
        bic: yup.string(),
        name: yup.string().required(),
        position: yup.number(),
        beneficiaryId: yup.string(),
        bankBeneficiaryId: yup.string(),
      })
      .required('Bank Beneficiary is required'),
  })
);
