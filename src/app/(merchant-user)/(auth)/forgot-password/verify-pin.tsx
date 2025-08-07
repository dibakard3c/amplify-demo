import React, { useRef } from 'react';
import OtpSecurityVerification, {
  OtpSecurityVerificationRef,
} from '@estia/components/auth/otp-security-verification';
import { ChevronBack } from '@estia/assets/icons/chevron';
import { maskEmail } from '@estia/utils/general';
import {
  useSendForgotPasswordOtpMutation,
  useVerifyForgotPasswordEmailMutation,
} from '@estia/networking/endpoints/auth';

export default function VerifyPin({
  onMoveToPrevStep,
  onMoveToNextStep,
  email,
}: any) {
  const [sendForgotPassword] = useSendForgotPasswordOtpMutation();
  const [verify] = useVerifyForgotPasswordEmailMutation();

  const otpRef = useRef<OtpSecurityVerificationRef>(null);

  function onResendOtp() {
    sendForgotPassword(email)
      .unwrap()
      .then(() => {
        onMoveToNextStep();
      });
  }

  function verifyOtp(value: string | number) {
    verify({
      email: email,
      otp: value,
    })
      .unwrap()
      .then(() => {
        onMoveToNextStep();
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
        message={`Please enter 6-digit code we have sent to at ${maskEmail(email)}`}
        mode='email'
        onResendCode={onResendOtp}
        onComplete={verifyOtp}
        className='mx-auto mt-4 max-w-[35%] xl:max-w-[400px]'
      />
    </div>
  );
}
