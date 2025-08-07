import React, { useRef } from 'react';
import { RegistrationForm } from '@estia/typings/registration-form';
import { Button } from '@estia/components/ui/button';
import Image from 'next/image';
import { Icons } from '@estia/assets';
import { cn } from '@estia/lib/utils';
import OtpSecurityVerification, {
  OtpSecurityVerificationRef,
} from '@estia/components/auth/otp-security-verification';
import {
  useAccountInfoMutation,
  useSendEmailOtpMutation,
  useVerifyEmailMutation,
} from '@estia/networking/endpoints/auth';
import { Toast } from '@estia/helpers/toast';
import { setUserLoggedIn } from '@estia/store/slices/auth';
import { useAppDispatch } from '@estia/store/store';
import { maskEmail } from '@estia/utils/general';

export default function EmailVerification({
  setEmailValidated,
  isEmailValidated,
  businessDetails,
  className,
}: RegistrationForm) {
  const dispatch = useAppDispatch();

  const otpRef = useRef<OtpSecurityVerificationRef>(null);

  const [resendEmailOtp] = useSendEmailOtpMutation();
  const [verifyEmailOtp] = useVerifyEmailMutation();
  const [loadAccountInfo] = useAccountInfoMutation();

  function onVerifyOtp(code: string) {
    verifyEmailOtp(code)
      .unwrap()
      .then(() => {
        setEmailValidated(true);
      })
      .catch(() => {
        otpRef.current?.reset();
      });
  }

  function onLoadUserDetails() {
    loadAccountInfo()
      .unwrap()
      .then(() => {
        Toast.showSuccess({
          message: `Welcome! You have successfully completed registration.`,
        });
        dispatch(setUserLoggedIn());
      });
  }

  if (isEmailValidated) {
    return (
      <div className={cn('mt-4 ml-[20%] max-w-[50%] pr-[5%]', className)}>
        <div className='flex max-w-96 flex-col items-center justify-center'>
          <Image src={Icons.success} alt='' width={90} height={90} />
          <h1 className='mt-8 text-center text-3xl font-bold'>Success</h1>
          <p className='mt-4 mb-8 text-center text-base'>
            Your email has been validated
          </p>
          <Button
            onClick={() => {
              onLoadUserDetails();
            }}
            size='lg'
            className='w-full'
          >
            Continue to your dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <OtpSecurityVerification
      ref={otpRef}
      key='email'
      title='Security Verification'
      message={`Enter the security code we sent to your email ${maskEmail(businessDetails?.contact_email)}.`}
      mode='email'
      onResendCode={resendEmailOtp}
      onComplete={onVerifyOtp}
      className='mx-auto mt-8 max-w-[45%] pr-[5%] pb-24 sm:max-w-[70%] xl:max-w-[400px]'
    />
  );
}
