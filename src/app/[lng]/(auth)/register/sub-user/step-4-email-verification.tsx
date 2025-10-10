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
  useVerifyMerchantUserEmailMutation,
} from '@estia/networking/endpoints/auth';
import { Toast } from '@estia/helpers/toast';
import { SCREENS } from '@estia/constants/screens';
import { useRouter } from 'next/navigation';
import { maskEmail } from '@estia/utils/general';
import { useSelector } from 'react-redux';
import { selectMerchantUser } from '@estia/store/selector';
import { useTranx } from '@estia/hooks/useTranx';
import { OTP_MODES, OTP_VIEW_TYPE } from '@estia/constants/otp';

export default function SubUserEmailVerification({
  setEmailValidated,
  isEmailValidated,
  className,
}: RegistrationForm) {
  const merchantInfo = useSelector(selectMerchantUser);

  const router = useRouter();
  const { t } = useTranx();

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
        otpRef.current?.countFailedAttempt();
      });
  }

  function onLoadUserDetails() {
    loadAccountInfo()
      .unwrap()
      .then((res) => {
        Toast.showSuccess({
          message: t('alerts.complete_sub_reg_success', {
            first_name: res?.primaryUserFirstName,
          }),
        });
        router.push(SCREENS.DASHBOARD);
      });
  }

  if (isEmailValidated) {
    return (
      <div className={cn('mt-4 ml-[20%] max-w-[50%] pr-[5%]', className)}>
        <div className='flex max-w-96 flex-col items-center justify-center'>
          <Image src={Icons.success} alt='' width={90} height={90} />
          <h1 className='mt-8 text-center text-3xl font-bold'>
            {t(
              'auth.register_sub_user_page.email_verification_step.step_success'
            )}
          </h1>
          <p className='mt-4 mb-8 text-center text-base'>
            {t(
              'auth.register_sub_user_page.email_verification_step.step_success_desc'
            )}
          </p>
          <Button
            onClick={() => {
              onLoadUserDetails();
            }}
            size='lg'
            className='w-full'
          >
            {t(
              'auth.register_sub_user_page.email_verification_step.continue_to_dashboard'
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <OtpSecurityVerification
      ref={otpRef}
      title={t('common.security_verification')}
      message={t('common.security_verification_email_desc', {
        email: maskEmail(merchantInfo?.email),
      })}
      mode={OTP_MODES.EMAIL}
      viewType={OTP_VIEW_TYPE.AUTH}
      //  onResendCode={resendEmailOtp}
      onComplete={onVerifyOtp}
      className='mx-auto mt-8 max-w-[45%] pr-[5%] pb-24 sm:max-w-[70%] xl:max-w-[400px]'
    />
  );
}
