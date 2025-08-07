export const API_ROUTES = {
  // USER
  REGISTER: '/user/business/register',
  LOGIN: '/user/login',
  REFRESH_TOKEN: '/user/token/refresh',
  MERCHANT_UPLOAD_URL: '/user/business/logo-upload-url',
  MERCHANT_LOGO: '/user/business/logo',
  // ACCOUNT
  ACCOUNT_INFO: '/user/info',
  UPDATE_ACCOUNT_INFO: '/user/consumer/update-profile',
  CHECK_EMAIL: '/user/check-email',
  VALIDATE_EMAIL: '/user/validate/email',
  VALIDATE_MOBILE: '/user/validate/mobile',
  // KYC
  START_KYC: '/kyc/start',
  // CHANGE PASSWORD
  INIT_CHANGE_PASSWORD: '/user/password-change/init',
  VERIFY_CHANGE_PASSWORD: '/user/password-change/verify-otp',
  VERIFY_MOBILE_CHANGE_PASSWORD: '/user/password-change/verify-sms-otp',
  CHANGE_PASSWORD: '/user/password-change/verify',
  // CHANGE EMAIL
  INIT_CHANGE_EMAIL: '/user/change-email/init',
  VERIFY_CHANGE_EMAIL_OTP: '/user/change-email/verify-otp',
  SEND_NEW_EMAIL_OTP: '/user/change-email/verify',
  // CHANGE MOBILE
  INIT_CHANGE_MOBILE:
    process.env.NODE_ENV === 'development'
      ? '/dev-user/change-mobile/init'
      : '/user/change-mobile/init',
  VERIFY_CHANGE_MOBILE_OTP: '/user/change-mobile/verify-otp',
  VERIFY_CHANGE_MOBILE:
    process.env.NODE_ENV === 'development'
      ? '/dev-user/verify-mobile'
      : '/user/change-mobile/verify',
  // CHANGE PIN
  INIT_CHANGE_PIN: '/user/change-pin/init',
  VERIFY_CHANGE_PIN_OTP: '/user/change-pin/verify-otp',
  // FORGOT PASSWORD
  FORGOT_PASSWORD_EMAIL_VERIFICATION: '/user/anonymous/password-change/init',
  VERIFY_FORGOT_PASSWORD: '/user/anonymous/password-change/verify-otp',
  CHANGE_FORGOT_PASSWORD: '/user/anonymous/password-change/verify',
  // OTP
  RESEND_EMAIL_VERIFICATION: '/user/resend-otp-via-email',
  RESEND_PHONE_VERIFICATION: '/user/resend-otp-via-sms',
  SEND_TWO_FACTOR_VERIFICATION: '/user/two-step-verification/init',
  // VERIFY
  VERIFY_EMAIL: '/user/verify-email',
  VERIFY_PHONE:
    process.env.NODE_ENV === 'development'
      ? '/dev-user/verify-mobile'
      : '/user/verify-mobile',
  VERIFY_TWO_FACTOR_VERIFICATION: '/user/two-step-verification/verify',
  // EXTRAS
  COUNTRY_CODES: '/countries/mobile-codes',
  // PAYMENT
  PAY_NOW: '/pay-now/init',
  LIST_MERCHANTS: '/user/merchants',
  LIST_MERCHANTS_BY_CATEGORY: '/user/merchants/all',
  GET_MERCHANT_BY_ID: '/user/merchant/info',
  // WALLET
  BALANCE_SUMMARY: '/dashboard/wallet',
  FIAT_WALLET: '/wallet/iban-info',
  DEFI_WALLET: '/defi/wallet',
  LIST_TRANSACTIONS: '/wallet/get-transactions',
  BUY_EST: '/buy-tokens',
  SELL_EST: '/sell-tokens',
  SEND_EUROS: '/send-euros',
  SEND_EST_TO_WALLET: '/send-tokens',
  SEND_EURO_TO_IBAN: '/send-euros',
  SPENDING_TRENDS: '/wallet/get-spending-trends',
  ESTIMATE_FEE: '/wallet/estimate-fee',
  // IBAN
  CREATE_IBAN: '/wallet/iban',
  LIST_IBAN: '/wallet/iban-list',
  DELETE_IBAN: '/wallet/iban',
  // NOTIFICATIONS
  LIST_NOTIFICATIONS: '/notification/',
  PENDING_NOTIFICATIONS_STATUS: '/notification/pending',
  READ_NOTIFICATION: '/notification/read',
  READ_ALL_NOTIFICATION: '/notification/read-all',
  // SUPPORT
  TICKET_FORM: process.env.NEXT_PUBLIC_FRESH_DESK_TICKET_DOMAIN + '/v2/tickets',
  // RECAPTCHA
  VERIFY_RECAPTCHA: '/recaptcha/verify-recaptcha',
  // MERCHANT SUPPORT USER
  LIST_MERCHANT_USERS: '/merchant-user/users',
  CREATE_MERCHANT_USER: '/merchant-user/create',
  REGISTER_MERCHANT_USER: '/merchant-user/register',
  RESEND_MERCHANT_USER_REG_EMAIL: '/merchant-user/resend-registration-email',
  MERCHANT_USER_REGISTER: '/merchant-user/register',
  MERCHANT_USER_VERIFY_MOBILE: '/merchant-user/verify-mobile',
  MERCHANT_USER_VERIFY_MAIL: '/merchant-user/verify-email',
  RESEND_MERCHANT_USER_OTP_SMS: '/merchant-user/resend-otp-via-sms',
  RESEND_MERCHANT_USER_OTP_EMAIL: '/merchant-user/resend-otp-via-email',
  DELETE_MERCHANT_USER: '/merchant-user',
  MERCHANT_USER_ACCOUNT_INFO: '/merchant-user/user-info',
  // POS USER
  LIST_POS_USERS: '/merchant-pos/list',
  CREATE_POS_USER: '/merchant-pos',
  DELETE_POS_USER: '/merchant-pos',
};
