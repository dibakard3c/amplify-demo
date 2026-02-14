/* eslint-disable i18next/no-literal-string */
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CONSTANTS } from '@estia/constants';
import { tranx } from '@estia/translations/i18next';

export const langAndCountryResolver = yupResolver(
  yup.object().shape({
    language: yup
      .string()
      .required(tranx('validations.register.language_required')),
    country: yup.object({
      countryAbbreviation: yup
        .string()
        .required(tranx('validations.register.country_required')),
      countryName: yup
        .string()
        .required(tranx('validations.register.country_required')),
      mobileCode: yup
        .string()
        .required(tranx('validations.register.country_required')),
    }),
    agreement: yup
      .boolean()
      .isTrue()
      .required(tranx('validations.register.agreement_required')),
  })
);

export const businessDetailsResolver = yupResolver(
  yup.object().shape({
    business_name: yup
      .string()
      .matches(
        /^[A-Za-z\s]+$/,
        tranx('validations.register.business_name_alpha')
      )
      .min(2, tranx('validations.register.business_name_min'))
      .max(40, tranx('validations.register.business_name_max'))
      .required(tranx('validations.register.business_name_required')),
    business_logo: yup
      .mixed()
      .test(
        'fileSize',
        tranx('validations.register.business_logo_size'),
        (value: any) => {
          if (!value || value.length === 0) return true; // required check
          const file = value[0] ?? value;
          return file.size <= CONSTANTS.MERCHANT_BUSINESS_LOGO_SIZE;
        }
      )
      .test(
        'fileType',
        tranx('validations.register.business_logo_type'),
        (value: any) => {
          if (!value || value.length === 0) return true;
          const file = value[0] ?? value;
          return CONSTANTS.MERCHANT_BUSINESS_LOGO_REGEX.test(file.type);
        }
      )
      .required(tranx('validations.register.business_logo_required')),
    merchant_category: yup
      .string()
      .required(tranx('validations.register.merchant_category_required')),
    vat_identification_no: yup
      .string()
      .min(2, tranx('validations.register.vat_min'))
      .max(40, tranx('validations.register.vat_max'))
      .required(tranx('validations.register.vat_required')),
    revenue_range: yup
      .string()
      .required(tranx('validations.register.revenue_range_required')),
    business_phone: yup.object({
      country_code: yup.object({
        countryAbbreviation: yup
          .string()
          .required(
            tranx('validations.register.business_phone_country_code_required')
          ),
        countryName: yup
          .string()
          .required(
            tranx('validations.register.business_phone_country_code_required')
          ),
        mobileCode: yup
          .string()
          .required(
            tranx('validations.register.business_phone_country_code_required')
          ),
      }),
      number: yup
        .string()
        .required(tranx('validations.register.business_phone_required')),
    }),
    business_email: yup
      .string()
      .email(tranx('validations.register.business_email_invalid'))
      .required(tranx('validations.register.business_email_required'))
      .matches(
        /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
        tranx('validations.register.business_email_invalid')
      ),
    contact_firstname: yup
      .string()
      .min(2, tranx('validations.register.contact_firstname_min'))
      .max(40, tranx('validations.register.contact_firstname_max'))
      .required(tranx('validations.register.contact_firstname_required')),
    contact_lastname: yup
      .string()
      .min(2, tranx('validations.register.contact_lastname_min'))
      .max(40, tranx('validations.register.contact_lastname_max'))
      .required(tranx('validations.register.contact_lastname_required')),
    contact_email: yup
      .string()
      .email(tranx('validations.register.contact_email_invalid'))
      .required(tranx('validations.register.contact_email_required'))
      .matches(
        /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
        tranx('validations.register.contact_email_invalid')
      ),
    contact_phone: yup.object({
      country_code: yup.object({
        countryAbbreviation: yup
          .string()
          .required(
            tranx('validations.register.contact_phone_country_code_required')
          ),
        countryName: yup
          .string()
          .required(
            tranx('validations.register.contact_phone_country_code_required')
          ),
        mobileCode: yup
          .string()
          .required(
            tranx('validations.register.contact_phone_country_code_required')
          ),
      }),
      number: yup
        .string()
        .required(tranx('validations.register.contact_phone_required')),
    }),
  })
);

export const passwordResolver = yupResolver(
  yup.object().shape({
    password: yup
      .string()
      .required(tranx('validations.password.password_required'))
      .min(8, tranx('validations.password.password_min'))
      .max(32, tranx('validations.password.password_max'))
      .matches(/[a-z]/, tranx('validations.password.password_lowercase'))
      .matches(/[A-Z]/, tranx('validations.password.password_uppercase'))
      .matches(/\d/, tranx('validations.password.password_number'))
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        tranx('validations.password.password_special')
      ),

    confirm_password: yup
      .string()
      .required(tranx('validations.password.confirm_password_required'))
      .oneOf(
        [yup.ref('password')],
        tranx('validations.password.confirm_password_match')
      ),
  })
);

export const loginResolver = yupResolver(
  yup.object().shape({
    email: yup
      .string()
      .email(tranx('validations.login.email_valid'))
      .required(tranx('validations.login.email_required'))
      .matches(
        /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
        tranx('validations.login.email_valid')
      ),
    password: yup
      .string()
      .required(tranx('validations.login.password_required')),
  })
);

export const forgotPasswordResolver = yupResolver(
  yup.object().shape({
    email: yup
      .string()
      .email(tranx('validations.forgot_password.email_valid'))
      .required(tranx('validations.forgot_password.email_required'))
      .matches(
        /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
        tranx('validations.forgot_password.email_valid')
      ),
  })
);

export const sendOtpResolver = yupResolver(
  yup.object().shape({
    type: yup.string().required(tranx('validations.otp_type_required')),
  })
);

export const verifyOtpResolver = yupResolver(
  yup.object().shape({
    code: yup.string().required(tranx('validations.otp_code_required')),
  })
);

export const supportTicketResolver = yupResolver(
  yup.object().shape({
    subject: yup
      .string()
      .required(tranx('validations.ticket.subject_required')),
    description: yup
      .string()
      .required(tranx('validations.ticket.description_required')),
    issue_type: yup
      .string()
      .required(tranx('validations.ticket.issue_type_required')),
  })
);

export const feedbackTicketResolver = yupResolver(
  yup.object().shape({
    overall_satisfaction: yup
      .number()
      .min(1, tranx('validations.feedback.overall_satisfaction_min'))
      .required(tranx('validations.feedback.overall_satisfaction_required')),
    ease_of_use: yup
      .number()
      .min(1, tranx('validations.feedback.ease_of_use_min'))
      .required(tranx('validations.feedback.ease_of_use_required')),
    design_and_aesthetics: yup
      .number()
      .min(1, tranx('validations.feedback.design_and_aesthetics_min'))
      .required(tranx('validations.feedback.design_and_aesthetics_required')),
    performance_and_speed: yup
      .number()
      .min(1, tranx('validations.feedback.performance_and_speed_min'))
      .required(tranx('validations.feedback.performance_and_speed_required')),
    feature_satisfaction: yup
      .number()
      .min(1, tranx('validations.feedback.feature_satisfaction_min'))
      .required(tranx('validations.feedback.feature_satisfaction_required')),
    security_and_privacy: yup
      .number()
      .min(1, tranx('validations.feedback.security_and_privacy_min'))
      .required(tranx('validations.feedback.security_and_privacy_required')),
    reliability: yup
      .number()
      .min(1, tranx('validations.feedback.reliability_min'))
      .required(tranx('validations.feedback.reliability_required')),
    support_experience: yup
      .number()
      .min(1, tranx('validations.feedback.support_experience_min'))
      .required(tranx('validations.feedback.support_experience_required')),
  })
);

export const profileResolver = yupResolver(
  yup.object().shape({
    business_logo: yup
      .mixed()
      .test(
        'fileSize',
        tranx('validations.register.business_logo_size'),
        (value: any) => {
          if (!value || value.length === 0) return true;
          const file = value[0] ?? value;
          return file.size <= CONSTANTS.MERCHANT_BUSINESS_LOGO_SIZE;
        }
      )
      .test(
        'fileType',
        tranx('validations.register.business_logo_type'),
        (value: any) => {
          if (!value || value.length === 0) return true;
          const file = value[0] ?? value;
          return CONSTANTS.MERCHANT_BUSINESS_LOGO_REGEX.test(file.type);
        }
      )
      .nullable()
      .optional(),
    currency: yup.string().optional(),
    language: yup.string().optional(),
    theme: yup.boolean().optional(),
  })
);

export const changeEmailResolver = yupResolver(
  yup.object().shape({
    email: yup
      .string()
      .email(tranx('validations.change_email.email_valid'))
      .required(tranx('validations.change_email.email_required'))
      .matches(
        /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
        tranx('validations.change_email.email_valid')
      ),
  })
);

export const createMerchantUserResolver = yupResolver(
  yup.object().shape({
    firstname: yup
      .string()
      .min(2, tranx('validations.create_user.name_min'))
      .max(40, tranx('validations.create_user.name_max'))
      .required(tranx('validations.create_user.firstname_required')),
    lastname: yup
      .string()
      .min(2, tranx('validations.create_user.name_min'))
      .max(40, tranx('validations.create_user.name_max'))
      .required(tranx('validations.create_user.lastname_required')),
    email: yup
      .string()
      .email(tranx('validations.create_user.email_invalid'))
      .required(tranx('validations.create_user.email_required'))
      .matches(
        /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
        tranx('validations.create_user.email_invalid')
      ),
    phone: yup.object({
      country_code: yup.object({
        countryAbbreviation: yup
          .string()
          .required(
            tranx('validations.create_user.phone_country_code_required')
          ),
        countryName: yup
          .string()
          .required(
            tranx('validations.create_user.phone_country_code_required')
          ),
        mobileCode: yup
          .string()
          .required(
            tranx('validations.create_user.phone_country_code_required')
          ),
      }),
      number: yup
        .string()
        .required(tranx('validations.create_user.phone_number_required')),
    }),
    role: yup.string().required(tranx('validations.create_user.role_required')),
  })
);

export const createPosUserResolver = yupResolver(
  yup.object().shape({
    name: yup.string().required(tranx('validations.create_pos.name_required')),
    pos_mac_id: yup
      .string()
      .required(tranx('validations.create_pos.pos_mac_id_required')),
    pos_model: yup
      .string()
      .required(tranx('validations.create_pos.pos_model_required')),
    login_token: yup
      .string()
      .required(tranx('validations.create_pos.login_token_required')),
    register_token: yup
      .string()
      .required(tranx('validations.create_pos.register_token_required')),
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

export const uploadLogoResolver = yupResolver(
  yup.object().shape({
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
  })
);
