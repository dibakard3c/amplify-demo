export interface User {
  id: string;
  email: string;
  cognitoUserId: string;
  currency: string;
  userGroup: string;
  kycStatus: 'NOT_STARTED' | 'COMPLETED' | string;
  companyName: string;
  registrationCountry: string;
  registrationNumber: string;
  addressLine: string;
  addressCity: string;
  addressPostalCode: string;
  addressCountry: string;
  entityType: string;
  merchantLogo: string;
  primaryUserFirstName: string;
  primaryUserLastName: string;
  primaryUserMobileCountryCode: string;
  primaryUserMobileNumber: string;
  emailVerified: boolean;
  mobileVerified: boolean;
  walletCreated: boolean;
  defiWalletCreated: boolean;
}

export interface MerchantUser {
  id: string;
  email: string;
  companyName: string;
  firstName: string;
  lastName: string;
  mobileCountryCode: string;
  mobileNumber: string;
  supportRole: string;
  registrationEmailSent: boolean;
  mobileVerified: boolean;
  emailVerified: boolean;
}

export interface PosUser {
  id: string;
  name: string;
  macId: string;
  model: string;
  loginToken: string;
  parentUserId: string;
  createdAt: string;
}

export interface RegisterPayload {
  language?: string;
  currency?: string;
  firstName?: string;
  lastName?: string;
  mobileCountryCode?: string;
  mobileNumber?: string;
  email?: string;
  completedRegistration?: boolean;
  completedSmsVerification?: boolean;
  completedEmailVerification?: boolean;
  lastScreen?: string;
  password?: string;
}

export interface ForgotPasswordPayload {
  email?: string;
  confirmationCode?: string;
}

export interface TokenPayload {
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
}
