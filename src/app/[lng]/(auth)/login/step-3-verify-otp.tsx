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
import { maskEmail, maskString } from '@estia/utils/general';
import { useAppDispatch } from '@estia/store/store';
import { setUserLoggedIn } from '@estia/store/slices/auth';
import { OTP_MODES, OTP_VIEW_TYPE } from '@estia/constants/otp';
import { useTranx } from '@estia/hooks/useTranx';

export default function Step3VerifyOtp({ onMoveToPrevStep }: any) {
  const dispatch = useAppDispatch();
  const loginPayload = useSelector(loginPayloadSelector);

  const otpRef = useRef<OtpSecurityVerificationRef>(null);

  //verification
  const [sendOtp] = useSendTwoFactorOtpMutation();
  const [verifyOtp] = useVerifyTwoFactorOtpMutation();

  const { t } = useTranx();

  function onResendOtp() {
    sendOtp(
      loginPayload?.otpMode === 'sms'
        ? 'TWO_STEP_VERIFICATION_MOBILE'
        : 'TWO_STEP_VERIFICATION_EMAIL'
    ).then(() => {
      Toast.showSuccess({ message: t('alerts.resend_otp_success_msg') });
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
          message: t('alerts.logged_in_success_msg'),
        });
        dispatch(setUserLoggedIn());
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
        titleClassName='text-center pb-3'
        message={
          loginPayload?.otpMode === 'sms'
            ? t('common.security_verification_sms_desc', {
                mobile_phone: maskString(
                  loginPayload?.countryCode + '' + loginPayload?.mobileNumber,
                  3,
                  3
                ),
              })
            : t('common.security_verification_email_desc', {
                email: maskEmail(loginPayload?.email),
              })
        }
        mode={loginPayload?.otpMode === 'sms' ? OTP_MODES.SMS : OTP_MODES.EMAIL}
        onResendCode={() => {
          onResendOtp();
        }}
        onComplete={(otp) => {
          onVerifyOtp(otp);
        }}
        className='mx-auto mt-8 w-full sm:mt-4 sm:max-w-[50%] xl:max-w-[400px]'
        viewType={OTP_VIEW_TYPE.AUTH}
      />
    </div>
  );
}
