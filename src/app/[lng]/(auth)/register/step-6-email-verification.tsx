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
  useAccountInfoMutation,
  useSendEmailOtpMutation,
  useVerifyEmailMutation,
} from '@estia/networking/endpoints/auth';
import { Toast } from '@estia/helpers/toast';
import { setUserLoggedIn } from '@estia/store/slices/auth';
import { useAppDispatch } from '@estia/store/store';
import { maskEmail } from '@estia/utils/general';
import { useTranx } from '@estia/hooks/useTranx';
import { OTP_MODES, OTP_VIEW_TYPE } from '@estia/constants/otp';

export default function Step6EmailVerification({
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

  const { t } = useTranx();

  function onVerifyOtp(code: string) {
    verifyEmailOtp(code)
      .unwrap()
      .then(() => {
        setEmailValidated(true);
      })
      .catch(() => {
        otpRef.current?.reset();
        otpRef.current?.countFailedAttempt();
      });
  }

  function onLoadUserDetails() {
    loadAccountInfo()
      .unwrap()
      .then(() => {
        Toast.showSuccess({
          message: t('alerts.complete_reg_success'),
        });
        dispatch(setUserLoggedIn());
      });
  }

  if (isEmailValidated) {
    return (
      <div className={cn('mx-auto mt-4 max-w-md', className)}>
        <div className='flex flex-col items-center justify-center'>
          <Image src={Icons.success} alt='' width={90} height={90} />
          <h1 className='mt-8 text-center text-3xl font-bold'>
            {t('auth.register_page.email_verification_step.step_success')}
          </h1>
          <p className='mt-4 mb-8 text-center text-base'>
            {t('auth.register_page.email_verification_step.step_success_desc')}
          </p>
          <Button
            onClick={() => {
              onLoadUserDetails();
            }}
            size='lg'
            className='w-full'
          >
            {t(
              'auth.register_page.email_verification_step.continue_to_dashboard'
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <OtpSecurityVerification
      ref={otpRef}
      key='email'
      title={t('common.security_verification')}
      message={t('common.security_verification_email_desc', {
        email: maskEmail(businessDetails?.contact_email),
      })}
      mode={OTP_MODES.EMAIL}
      viewType={OTP_VIEW_TYPE.AUTH}
      onResendCode={resendEmailOtp}
      onComplete={onVerifyOtp}
      className='mx-auto py-12 max-md:w-full max-md:max-w-full max-md:px-12 md:pt-0 md:pb-24'
    />
  );
}
