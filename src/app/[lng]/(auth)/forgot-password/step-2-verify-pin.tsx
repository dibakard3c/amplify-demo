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
import { OTP_MODES, OTP_VIEW_TYPE } from '@estia/constants/otp';
import { useTranx } from '@estia/hooks/useTranx';

export default function Step2VerifyPin({
  onMoveToPrevStep,
  onMoveToNextStep,
  email,
}: any) {
  const [sendForgotPassword] = useSendForgotPasswordOtpMutation();
  const [verify] = useVerifyForgotPasswordEmailMutation();

  const otpRef = useRef<OtpSecurityVerificationRef>(null);

  const { t } = useTranx();

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
        otpRef.current?.countFailedAttempt();
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
        title={t('common.security_verification')}
        message={t('common.security_verification_email_desc', {
          email: maskEmail(email),
        })}
        titleClassName='text-center pb-3'
        mode={OTP_MODES.EMAIL}
        viewType={OTP_VIEW_TYPE.AUTH}
        onResendCode={onResendOtp}
        onComplete={verifyOtp}
        className='mx-auto mt-4 max-w-[35%] xl:max-w-[400px]'
      />
    </div>
  );
}
