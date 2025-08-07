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
  useVerifyMerchantUserEmailMutation,
} from '@estia/networking/endpoints/auth';
import { Toast } from '@estia/helpers/toast';
import { SCREENS } from '@estia/constants/screens';
import { useRouter } from 'next/navigation';
import { maskEmail } from '@estia/utils/general';
import { useSelector } from 'react-redux';
import { selectMerchantUser } from '@estia/store/selector';

export default function SubUserEmailVerification({
  setEmailValidated,
  isEmailValidated,
  className,
}: RegistrationForm) {
  const merchantInfo = useSelector(selectMerchantUser);

  const router = useRouter();

  const otpRef = useRef<OtpSecurityVerificationRef>(null);

  const [verifyEmailOtp] = useVerifyMerchantUserEmailMutation();
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
      .then((res) => {
        Toast.showSuccess({
          message: `Welcome, ${res?.primaryUserFirstName}! You have successfully completed registration.`,
        });
        router.push(SCREENS.DASHBOARD);
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
      actionMode
      ref={otpRef}
      title='Security Verification'
      message={`Enter the security code we sent to your email ${maskEmail(merchantInfo?.email)}.`}
      mode='email'
      //  onResendCode={resendEmailOtp}
      onComplete={onVerifyOtp}
      className='mx-auto mt-8 max-w-[45%] pr-[5%] pb-24 sm:max-w-[70%] xl:max-w-[400px]'
    />
  );
}
