import React, { useRef } from 'react';
import { RegistrationForm } from '@estia/typings/registration-form';
import { Button } from '@estia/components/ui/button';
import Image from 'next/image';
import { Icons } from '@estia/assets';
import { cn } from '@estia/utils/utils';
import OtpSecurityVerification, {
  OtpSecurityVerificationRef,
} from '@estia/components/auth/otp-security-verification';
import {
  useSendEmailOtpMutation,
  useSendMobileOtpMutation,
  useVerifyMobileMutation,
} from '@estia/networking/endpoints/auth';
import { maskString } from '@estia/utils/general';
import { useTranx } from '@estia/hooks/useTranx';
import { OTP_MODES, OTP_VIEW_TYPE } from '@estia/constants/otp';

export default function Step5MobileVerification({
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

  const { t } = useTranx();

  function onVerifyOtp(code: string) {
    verifyMobileOtp(code)
      .unwrap()
      .then(() => {
        setPhoneValidated(true);
      })
      .catch(() => {
        otpRef.current?.reset();
        otpRef.current?.countFailedAttempt();
      });
  }

  if (isPhoneValidated) {
    return (
      <div className={cn('mx-auto mt-4 max-w-md', className)}>
        <div className='flex flex-col items-center justify-center'>
          <Image src={Icons.success} alt='' width={120} height={120} />
          <h1 className='mt-8 text-center text-3xl font-bold'>
            {t('auth.register_page.mobile_verification_step.step_success')}
          </h1>
          <p className='mt-4 mb-8 text-center text-base'>
            {t('auth.register_page.mobile_verification_step.step_success_desc')}
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
            {t(
              'auth.register_page.mobile_verification_step.continue_to_email_verification'
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <OtpSecurityVerification
      ref={otpRef}
      key='mobile'
      title={t('common.security_verification')}
      message={t('common.security_verification_sms_desc', {
        mobile_phone: maskString(
          `${businessDetails?.contact_phone?.country_code?.mobileCode}${businessDetails?.contact_phone?.number}`,
          3,
          3
        ),
      })}
      mode={OTP_MODES.SMS}
      viewType={OTP_VIEW_TYPE.AUTH}
      onResendCode={resendMobileOtp}
      onComplete={onVerifyOtp}
      className='mx-auto py-12 max-md:w-full max-md:max-w-full max-md:px-12 md:pt-0'
    />
  );
}
