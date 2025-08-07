import React, { useRef } from 'react';
import OtpSecurityVerification, {
  OtpSecurityVerificationRef,
} from '@estia/components/auth/otp-security-verification';
import { ChevronBack } from '@estia/assets/icons/chevron';
import {
  useSendTwoFactorOtpMutation,
  useVerifyTwoFactorOtpMutation,
} from '@estia/networking/endpoints/auth';
import { useSelector } from 'react-redux';
import { loginPayloadSelector } from '@estia/store/selector';
import { Toast } from '@estia/helpers/toast';
import { maskEmail, maskPhoneNo } from '@estia/utils/general';
import { useAppDispatch } from '@estia/store/store';
import { setUserLoggedIn } from '@estia/store/slices/auth';

export default function VerifyOtp({ onMoveToPrevStep }: any) {
  const dispatch = useAppDispatch();
  const loginPayload = useSelector(loginPayloadSelector);

  const otpRef = useRef<OtpSecurityVerificationRef>(null);

  //verification
  const [sendOtp] = useSendTwoFactorOtpMutation();
  const [verifyOtp] = useVerifyTwoFactorOtpMutation();

  function onResendOtp() {
    sendOtp(
      loginPayload?.otpMode === 'sms'
        ? 'TWO_STEP_VERIFICATION_MOBILE'
        : 'TWO_STEP_VERIFICATION_EMAIL'
    ).then(() => {
      Toast.showSuccess({ message: 'OTP resent successfully' });
    });
  }

  function onVerifyOtp(otpCode: string) {
    verifyOtp({
      otpType:
        loginPayload?.otpMode === 'sms'
          ? 'TWO_STEP_VERIFICATION_MOBILE'
          : 'TWO_STEP_VERIFICATION_EMAIL',
      otp: otpCode,
    })
      .unwrap()
      .then(() => {
        Toast.showSuccess({
          message: `Welcome back, You have logged in successfully.`,
        });
        dispatch(setUserLoggedIn());
      })
      .catch(() => {
        otpRef.current?.reset();
      });
  }

  return (
    <div className='mx-auto self-center px-4 pl-2'>
      <div
        className='absolute top-5 left-5 flex max-w-max items-center justify-center rounded-full'
        onClick={() => onMoveToPrevStep()}
      >
        <ChevronBack className='size-11' />
      </div>
      <OtpSecurityVerification
        ref={otpRef}
        title='Security Verification'
        titleClassName='text-center pb-3'
        message={
          loginPayload?.otpMode === 'sms'
            ? `Enter the security code we sent to your mobile number ${loginPayload?.countryCode} ${maskPhoneNo(loginPayload?.mobileNumber)}`
            : `Please enter 6-digit code we have sent to at ${maskEmail(loginPayload?.email)}`
        }
        mode={loginPayload?.otpMode === 'sms' ? 'sms' : 'email'}
        onResendCode={() => {
          onResendOtp();
        }}
        onComplete={(otp) => {
          onVerifyOtp(otp);
        }}
        className='mx-auto mt-8 w-full sm:mt-4 sm:max-w-[50%] xl:max-w-[400px]'
      />
    </div>
  );
}
