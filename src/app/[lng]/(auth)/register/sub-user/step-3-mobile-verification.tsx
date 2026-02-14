import React, { useRef } from 'react';
import { RegistrationForm } from '@estia/typings/registration-form';
import { Button } from '@estia/components/ui/button';
import Image from 'next/image';
import { Icons } from '@estia/assets';
import { cn } from '@estia/utils/utils';
import OtpSecurityVerification, {
  OtpSecurityVerificationRef,
} from '@estia/components/auth/otp-security-verification';
import { useVerifyMerchantUserMobileMutation } from '@estia/networking/endpoints/auth';
import { useSelector } from 'react-redux';
import { selectMerchantUser } from '@estia/store/selector';
import { maskString } from '@estia/utils/general';
import { useTranx } from '@estia/hooks/useTranx';
import { OTP_MODES, OTP_VIEW_TYPE } from '@estia/constants/otp';

export default function SubUserMobileVerification({
  onMoveToNextStep,
  isPhoneValidated,
  setPhoneValidated,
  className,
}: RegistrationForm) {
  const merchantInfo = useSelector(selectMerchantUser);

  const otpRef = useRef<OtpSecurityVerificationRef>(null);

  //const [resendMobileOtp] = useSendMobileOtpMutation();
  const [verifyMobileOtp] = useVerifyMerchantUserMobileMutation();

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
      <div className={cn('mt-4 ml-[20%] max-w-[50%] pr-[5%]', className)}>
        <div className='flex max-w-96 flex-col items-center justify-center'>
          <Image src={Icons.success} alt='' width={120} height={120} />
          <h1 className='mt-8 text-center text-3xl font-bold'>
            {t(
              'auth.register_sub_user_page.mobile_verification_step.step_success'
            )}
          </h1>
          <p className='mt-4 mb-8 text-center text-base'>
            {t(
              'auth.register_sub_user_page.mobile_verification_step.step_success_desc'
            )}
          </p>
          <Button
            onClick={() => onMoveToNextStep()}
            size='lg'
            className='w-full px-8'
          >
            {t(
              'auth.register_sub_user_page.mobile_verification_step.continue_to_email_verification'
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
      message={t('common.security_verification_sms_desc', {
        mobile_phone: maskString(
          `${merchantInfo?.mobileCountryCode}${merchantInfo?.mobileNumber}`,
          3,
          3
        ),
      })}
      mode={OTP_MODES.SMS}
      viewType={OTP_VIEW_TYPE.AUTH}
      //  onResendCode={resendMobileOtp}
      onComplete={onVerifyOtp}
      className='mx-auto mt-8 max-w-[45%] pr-[5%] pb-24 sm:max-w-[70%] xl:max-w-[400px]'
    />
  );
}
