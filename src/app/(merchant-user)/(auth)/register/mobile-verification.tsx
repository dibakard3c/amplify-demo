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
  useSendEmailOtpMutation,
  useSendMobileOtpMutation,
  useVerifyMobileMutation,
} from '@estia/networking/endpoints/auth';
import { maskPhoneNo } from '@estia/utils/general';

export default function MobileVerification({
  onMoveToNextStep,
  isPhoneValidated,
  setPhoneValidated,
  className,
  businessDetails,
}: RegistrationForm) {
  const otpRef = useRef<OtpSecurityVerificationRef>(null);

  const [resendMobileOtp] = useSendMobileOtpMutation();
  const [verifyMobileOtp] = useVerifyMobileMutation();
  const [resendEmailOtp] = useSendEmailOtpMutation();

  function onVerifyOtp(code: string) {
    verifyMobileOtp(code)
      .unwrap()
      .then(() => {
        setPhoneValidated(true);
      })
      .catch(() => {
        otpRef.current?.reset();
      });
  }

  if (isPhoneValidated) {
    return (
      <div className={cn('mt-4 ml-[20%] max-w-[50%] pr-[5%]', className)}>
        <div className='flex max-w-96 flex-col items-center justify-center'>
          <Image src={Icons.success} alt='' width={120} height={120} />
          <h1 className='mt-8 text-center text-3xl font-bold'>Success</h1>
          <p className='mt-4 mb-8 text-center text-base'>
            Your mobile number has been validated
          </p>
          <Button
            onClick={() => {
              resendEmailOtp()
                .unwrap()
                .then(() => {
                  onMoveToNextStep();
                });
            }}
            size='lg'
            className='w-full px-8'
          >
            Continue to email verification
          </Button>
        </div>
      </div>
    );
  }

  return (
    <OtpSecurityVerification
      ref={otpRef}
      key='mobile'
      title='Security Verification'
      message={`Enter the security code we sent to your mobile number (${businessDetails?.contact_phone?.country_code?.mobileCode} ${maskPhoneNo(businessDetails?.contact_phone?.number)}).`}
      mode='sms'
      onResendCode={resendMobileOtp}
      onComplete={onVerifyOtp}
      className='mx-auto mt-8 max-w-[45%] pr-[5%] sm:max-w-[70%] xl:max-w-[400px]'
    />
  );
}
