export const CONVERSION_MODES = {
  INITIATED: 'initiated',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  OTP: 'otp',
  SUCCESS: 'success',
  ERROR: 'error',
};

export type PaymentModes =
  (typeof CONVERSION_MODES)[keyof typeof CONVERSION_MODES];
