import { apiHandler, QUERY_TAGS } from '@estia/networking/api-handler';
import { API_ROUTES } from '../api-routes';
import { User } from '@estia/typings/user';
import { KycVerification } from '@estia/typings/kyc-verification';
import { LoginResponse } from '@estia/typings/api-response';

function invalidateOnSuccess<T>(success: T[] = []) {
  return (_: unknown, hasError: any) => {
    return hasError ? [] : success;
  };
}

export const authEndpoints = apiHandler.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, object>({
      query: (params) => ({
        url: API_ROUTES.LOGIN,
        method: 'POST',
        body: params,
      }),
    }),
    registerMerchant: builder.mutation<string, object>({
      query: (params) => ({
        url: API_ROUTES.REGISTER,
        method: 'POST',
        body: params,
      }),
    }),
    refreshToken: builder.mutation<LoginResponse, string>({
      query: (refreshToken) => ({
        url: API_ROUTES.REFRESH_TOKEN,
        method: 'POST',
        body: { refreshToken },
      }),
    }),
    // MERCHANT LOGO
    fetchMerchantUploadUrl: builder.mutation<{ url: string }, void>({
      query: () => ({
        url: API_ROUTES.MERCHANT_UPLOAD_URL,
        method: 'GET',
      }),
    }),
    saveMerchantLogo: builder.mutation<void, void>({
      query: () => ({
        url: API_ROUTES.MERCHANT_LOGO,
        method: 'PUT',
      }),
    }),
    uploadMerchantLogo: builder.mutation<
      void,
      { signedUrl: string; file: File }
    >({
      async queryFn({ signedUrl, file }: any) {
        try {
          const res = await fetch(signedUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': file.type,
            },
            body: file,
          });

          if (!res.ok) {
            return {
              error: { status: 'CUSTOM_ERROR', error: 'Logo Upload failed' },
            };
          }

          return { data: undefined };
        } catch (error: any) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }
      },
    }),
    // Account
    accountInfo: builder.mutation<User, void>({
      query: () => ({
        url: API_ROUTES.ACCOUNT_INFO,
        method: 'GET',
      }),
    }),
    refreshAccountInfo: builder.query<User, any>({
      query: () => ({
        url: API_ROUTES.ACCOUNT_INFO,
        method: 'GET',
      }),
      providesTags: [QUERY_TAGS.ACCOUNT_INFO],
    }),
    updateAccount: builder.mutation<User, object>({
      query: (params) => ({
        url: API_ROUTES.UPDATE_ACCOUNT_INFO,
        method: 'PATCH',
        body: params,
      }),
      invalidatesTags: invalidateOnSuccess([QUERY_TAGS.ACCOUNT_INFO]),
    }),
    startKycVerification: builder.mutation<KycVerification, void>({
      query: () => ({
        url: API_ROUTES.START_KYC,
        method: 'POST',
      }),
      //  invalidatesTags: [QUERY_TAGS.KYC_STATUS],
    }),
    loadKybVerification: builder.query<KycVerification, void>({
      query: () => ({
        url: API_ROUTES.START_KYC,
        method: 'POST',
      }),
      //  invalidatesTags: [QUERY_TAGS.KYC_STATUS],
    }),
    // VALIDATIONS
    checkEmail: builder.query<void, string>({
      query: (email) => ({
        url: API_ROUTES.CHECK_EMAIL,
        method: 'POST',
        body: email,
        params: {
          hideLoader: true,
          hideErrorMsg: true,
        },
      }),
    }),
    checkEmailAndValidate: builder.mutation<void, string>({
      query: (email) => ({
        url: API_ROUTES.CHECK_EMAIL,
        method: 'POST',
        body: email,
        params: {
          hideLoader: true,
          hideErrorMsg: true,
          initClearoutVerification: true,
        },
      }),
    }),
    validateEmail: builder.mutation<void, string>({
      query: (email) => ({
        url: API_ROUTES.VALIDATE_EMAIL,
        method: 'POST',
        body: { email },
        params: {
          //   hideLoader: true,
          hideErrorMsg: true,
        },
      }),
    }),
    validateMobile: builder.mutation<void, object>({
      query: (body) => ({
        url: API_ROUTES.VALIDATE_MOBILE,
        method: 'POST',
        body: body,
        params: {
          //   hideLoader: true,
          hideErrorMsg: true,
        },
      }),
    }),
    // CHANGE PASSWORD
    initChangePassword: builder.mutation<void, void>({
      query: () => ({
        url: API_ROUTES.INIT_CHANGE_PASSWORD,
        method: 'POST',
      }),
    }),
    verifyChangePasswordOtp: builder.mutation<void, object>({
      query: (data) => ({
        url: API_ROUTES.VERIFY_CHANGE_PASSWORD,
        method: 'POST',
        body: data,
      }),
    }),
    verifyChangePasswordMobileOtp: builder.mutation<void, object>({
      query: (data) => ({
        url: API_ROUTES.VERIFY_MOBILE_CHANGE_PASSWORD,
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation<User, object>({
      query: (data) => ({
        url: API_ROUTES.CHANGE_PASSWORD,
        method: 'POST',
        body: data,
      }),
    }),
    // CHANGE EMAIL
    initChangeEmail: builder.mutation<void, void>({
      query: () => ({
        url: API_ROUTES.INIT_CHANGE_EMAIL,
        method: 'POST',
      }),
    }),
    verifyChangeEmailOtp: builder.mutation<void, string>({
      query: (otpCode) => ({
        url: API_ROUTES.VERIFY_CHANGE_EMAIL_OTP,
        method: 'POST',
        body: { otp: otpCode },
      }),
    }),
    changeEmail: builder.mutation<User, string>({
      query: (email) => ({
        url: API_ROUTES.SEND_NEW_EMAIL_OTP,
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: invalidateOnSuccess([QUERY_TAGS.ACCOUNT_INFO]),
    }),
    // CHANGE MOBILE
    initChangeMobile: builder.mutation<void, void>({
      query: () => ({
        url: API_ROUTES.INIT_CHANGE_MOBILE,
        method: 'POST',
      }),
    }),
    verifyChangeMobileOtp: builder.mutation<void, string>({
      query: (otpCode) => ({
        url: API_ROUTES.VERIFY_CHANGE_MOBILE_OTP,
        method: 'POST',
        body: { otp: otpCode },
      }),
    }),
    changeMobile: builder.mutation<User, object>({
      query: (data) => ({
        url: API_ROUTES.VERIFY_CHANGE_MOBILE,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: invalidateOnSuccess([QUERY_TAGS.ACCOUNT_INFO]),
    }),
    // CHANGE PIN
    initChangePin: builder.mutation<void, void>({
      query: () => ({
        url: API_ROUTES.INIT_CHANGE_PIN,
        method: 'POST',
      }),
    }),
    verifyChangePinOtp: builder.mutation<void, string>({
      query: (otpCode) => ({
        url: API_ROUTES.VERIFY_CHANGE_PIN_OTP,
        method: 'POST',
        body: { otp: otpCode },
      }),
    }),
    // FORGOT PASSWORD
    sendForgotPasswordOtp: builder.mutation<User, string>({
      query: (email) => ({
        url: API_ROUTES.FORGOT_PASSWORD_EMAIL_VERIFICATION,
        method: 'POST',
        body: { email },
      }),
    }),
    verifyForgotPasswordEmail: builder.mutation<User, object>({
      query: (params) => ({
        url: API_ROUTES.VERIFY_FORGOT_PASSWORD,
        method: 'POST',
        body: params,
      }),
    }),
    changeForgotPassword: builder.mutation<User, object>({
      query: (params) => ({
        url: API_ROUTES.CHANGE_FORGOT_PASSWORD,
        method: 'POST',
        body: params,
      }),
    }),
    // OTP
    sendMobileOtp: builder.mutation<User, string | void>({
      query: (otpType) => ({
        url: API_ROUTES.RESEND_PHONE_VERIFICATION,
        method: 'POST',
        body: {
          otpType: otpType || 'MOBILE_REGISTRATION',
        },
      }),
    }),
    sendEmailOtp: builder.mutation<User, string | void>({
      query: (otpType) => ({
        url: API_ROUTES.RESEND_EMAIL_VERIFICATION,
        method: 'POST',
        body: {
          otpType: otpType || 'EMAIL_REGISTRATION',
        },
      }),
    }),
    sendTwoFactorOtp: builder.mutation<User, string>({
      query: (otpType) => ({
        url: API_ROUTES.SEND_TWO_FACTOR_VERIFICATION,
        method: 'POST',
        body: {
          otpType: otpType,
        },
      }),
    }),
    // VERIFY
    verifyMobile: builder.mutation<User, string>({
      query: (verificationCode) => ({
        url: API_ROUTES.VERIFY_PHONE,
        method: 'POST',
        body: {
          verificationCode,
        },
      }),
    }),
    verifyEmail: builder.mutation<User, string>({
      query: (verificationId) => ({
        url: API_ROUTES.VERIFY_EMAIL,
        method: 'POST',
        body: {
          verificationId,
        },
      }),
    }),
    verifyTwoFactorOtp: builder.mutation<User, object>({
      query: (payload) => ({
        url: API_ROUTES.VERIFY_TWO_FACTOR_VERIFICATION,
        method: 'POST',
        body: payload,
      }),
    }),
    verifyRecaptcha: builder.mutation<boolean, string>({
      query: (token) => ({
        url: API_ROUTES.VERIFY_RECAPTCHA,
        method: 'POST',
        body: { token },
      }),
    }),
    verifyMerchantUserMobile: builder.mutation<User, string>({
      query: (verificationCode) => ({
        url: API_ROUTES.MERCHANT_USER_VERIFY_MOBILE,
        method: 'POST',
        body: {
          verificationCode,
        },
      }),
    }),
    verifyMerchantUserEmail: builder.mutation<User, string>({
      query: (verificationId) => ({
        url: API_ROUTES.MERCHANT_USER_VERIFY_MAIL,
        method: 'POST',
        body: {
          verificationId,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMerchantMutation,
  useRefreshTokenMutation,
  // MERCHANT LOGO
  useFetchMerchantUploadUrlMutation,
  useSaveMerchantLogoMutation,
  useUploadMerchantLogoMutation,
  // Account
  useAccountInfoMutation,
  useRefreshAccountInfoQuery,
  useUpdateAccountMutation,
  // VALIDATIONS
  useCheckEmailQuery,
  useCheckEmailAndValidateMutation,
  useValidateEmailMutation,
  useValidateMobileMutation,
  // Change password
  useInitChangePasswordMutation,
  useVerifyChangePasswordOtpMutation,
  useVerifyChangePasswordMobileOtpMutation,
  useChangePasswordMutation,
  // Change email
  useInitChangeEmailMutation,
  useVerifyChangeEmailOtpMutation,
  useChangeEmailMutation,
  // Change mobile
  useInitChangeMobileMutation,
  useVerifyChangeMobileOtpMutation,
  useChangeMobileMutation,
  // Change pin
  useInitChangePinMutation,
  useVerifyChangePinOtpMutation,
  // Reset Password
  useSendForgotPasswordOtpMutation,
  useVerifyForgotPasswordEmailMutation,
  useChangeForgotPasswordMutation,
  // KYC
  useStartKycVerificationMutation,
  useLoadKybVerificationQuery,
  // OTP
  useSendMobileOtpMutation,
  useSendEmailOtpMutation,
  useSendTwoFactorOtpMutation,
  useVerifyMobileMutation,
  useVerifyEmailMutation,
  useVerifyTwoFactorOtpMutation,
  useVerifyRecaptchaMutation,
  useVerifyMerchantUserMobileMutation,
  useVerifyMerchantUserEmailMutation,
} = authEndpoints;
