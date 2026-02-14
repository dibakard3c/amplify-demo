'use client';

import React, { useRef, useState } from 'react';
import { Button } from '@estia/components/ui/button';
import OtpSecurityVerification, {
  OtpSecurityVerificationRef,
} from '@estia/components/auth/otp-security-verification';
import {
  useChangePasswordMutation,
  useInitChangePasswordMutation,
  useVerifyChangePasswordMobileOtpMutation,
  useVerifyChangePasswordOtpMutation,
} from '@estia/networking/endpoints/auth';
import { useForm } from 'react-hook-form';
import { passwordResolver } from '@estia/helpers/resolvers';
import { FormInputField } from '@estia/components/form/form-input';
import { Form, FormField } from '@estia/components/ui/form';
import { Icons } from '@estia/assets';
import Image from 'next/image';
import { SCREENS } from '@estia/constants/screens';
import { useRouter } from 'next/navigation';
import PasswordValidator from '@estia/components/form/password-validator';
import { PasswordForm } from '@estia/typings/registration-form';
import { useSelector } from 'react-redux';
import { selectUser } from '@estia/store/selector';
import { maskEmail, maskString } from '@estia/utils/general';
import DashboardSubNavCard from '@estia/components/layout/dashboard-sub-nav-card';
import { useTranx } from '@estia/hooks/useTranx';
import { OTP_MODES, OTP_VIEW_TYPE } from '@estia/constants/otp';

const CHANGE_STEPS = {
  EMAIL_OTP_VERIFICATION: 'email_otp_verification',
  MOBILE_OTP_VERIFICATION: 'mobile_otp_verification',
  CHANGE_PASSWORD: 'change_password',
  CHANGE_SUCCESS: 'change_success',
};

type ChangePasswordStep = (typeof CHANGE_STEPS)[keyof typeof CHANGE_STEPS];

export default function Page() {
  const router = useRouter();
  const user = useSelector(selectUser);
  const [mode, setMode] = useState<ChangePasswordStep>('');

  const otpMobileRef = useRef<OtpSecurityVerificationRef>(null);
  const otpEmailRef = useRef<OtpSecurityVerificationRef>(null);

  const [initChangePassword] = useInitChangePasswordMutation();
  const [verifyChangePasswordOtp] = useVerifyChangePasswordOtpMutation();
  const [verifyChangePasswordMobileOtp] =
    useVerifyChangePasswordMobileOtpMutation();
  const [changePassword] = useChangePasswordMutation();

  const { t } = useTranx();

  const form = useForm<PasswordForm>({
    resolver: passwordResolver,
    mode: 'onChange',
    delayError: 500,
  });

  const password = form.watch('password');
  const confirmPassword = form.watch('confirm_password');

  const onSendMail = (callback?: () => void) => {
    initChangePassword()
      .unwrap()
      .then(() => {
        if (callback) {
          callback();
        }
      });
  };

  const onVerifyEmail = (otp: string) => {
    verifyChangePasswordOtp({
      otp: otp,
    })
      .unwrap()
      .then(() => {
        setMode(CHANGE_STEPS.MOBILE_OTP_VERIFICATION);
      })
      .catch(() => {
        otpEmailRef.current?.reset();
        otpEmailRef.current?.countFailedAttempt();
      });
  };

  const onVerifyMobile = (otp: string) => {
    verifyChangePasswordMobileOtp({
      otp: otp,
    })
      .unwrap()
      .then(() => {
        setMode(CHANGE_STEPS.CHANGE_PASSWORD);
      })
      .catch(() => {
        otpMobileRef.current?.reset();
        otpMobileRef.current?.countFailedAttempt();
      });
  };

  const onSendMailOtpSubmit = (formValues: any) => {
    changePassword({
      newPassword: formValues?.password,
    })
      .unwrap()
      .then(() => {
        setMode(CHANGE_STEPS.CHANGE_SUCCESS);
      });
  };

  if (mode === CHANGE_STEPS.CHANGE_SUCCESS) {
    return (
      <div className='mx-auto flex h-full flex-col items-center justify-center pb-24 md:max-w-[50%]'>
        <div className='relative size-24 lg:size-30'>
          <Image src={Icons.success} alt='' fill />
        </div>
        <p className='text-neutral-2 mt-6 text-center text-3xl font-bold'>
          {t(
            'dashboard.profile_management.change_password_page.success_message'
          )}
        </p>
        <Button
          onClick={() => {
            router.push(SCREENS.PROFILE);
          }}
          size='lg'
          className='mt-8 w-full'
        >
          {t(
            'dashboard.profile_management.change_password_page.success_message_action'
          )}
        </Button>
      </div>
    );
  }

  if (mode === CHANGE_STEPS.CHANGE_PASSWORD) {
    return (
      <DashboardSubNavCard className='mx-auto w-full pb-4 md:max-w-[60%]'>
        <p className='mt-4 mb-6 text-center text-3xl font-bold md:text-left'>
          {t('dashboard.profile_management.change_password_page.page_title')}
        </p>
        <Form {...form}>
          <p className='pr-8 text-base leading-loose'>
            {t(
              'dashboard.profile_management.change_password_page.validation_instructions'
            )}
          </p>
          <FormField
            control={form?.control}
            name='password'
            render={({ field }) => (
              <FormInputField
                disableCopyPaste
                type='password'
                label={t(
                  'dashboard.profile_management.change_password_page.password_label'
                )}
                placeholder={t(
                  'dashboard.profile_management.change_password_page.password_hint'
                )}
                value={field.value}
                onChange={field.onChange}
                className='mt-8 w-full md:max-w-[70%]'
                inputClassName='max-w-auto w-full'
              />
            )}
          />
          <FormField
            control={form?.control}
            name='confirm_password'
            render={({ field }) => (
              <FormInputField
                disableCopyPaste
                type='password'
                label={t(
                  'dashboard.profile_management.change_password_page.confirm_password_label'
                )}
                placeholder={t(
                  'dashboard.profile_management.change_password_page.password_hint'
                )}
                value={field.value}
                onChange={field.onChange}
                className='mt-4 mb-4 w-full md:max-w-[70%]'
                inputClassName='max-w-auto w-full'
              />
            )}
          />
          <PasswordValidator
            password={password}
            confirmPassword={confirmPassword}
          />
        </Form>
        <Button
          disabled={!form?.formState?.isValid}
          onClick={() => form.handleSubmit(onSendMailOtpSubmit)()}
          size='lg'
          className='mt-6 w-full'
        >
          {t('dashboard.profile_management.change_password_page.page_title')}
        </Button>
      </DashboardSubNavCard>
    );
  }

  if (mode === CHANGE_STEPS.MOBILE_OTP_VERIFICATION) {
    return (
      <OtpSecurityVerification
        ref={otpMobileRef}
        key={CHANGE_STEPS.MOBILE_OTP_VERIFICATION}
        titleClassName='text-center pb-3'
        title={t('common.security_verification')}
        message={t('common.security_verification_sms_desc', {
          mobile_phone: maskString(
            user?.primaryUserMobileCountryCode +
              '' +
              user?.primaryUserMobileNumber,
            3,
            3
          ),
        })}
        messageClassName='text-center pb-3'
        mode={OTP_MODES.SMS}
        viewType={OTP_VIEW_TYPE.PROFILE}
        onResendCode={() => onSendMail()}
        onComplete={onVerifyMobile}
        className='mx-auto mt-24 w-full md:max-w-[45%] xl:max-w-[400px]'
      />
    );
  }

  if (mode === CHANGE_STEPS.EMAIL_OTP_VERIFICATION) {
    return (
      <OtpSecurityVerification
        ref={otpEmailRef}
        key={CHANGE_STEPS.EMAIL_OTP_VERIFICATION}
        titleClassName='text-center pb-3'
        title={t('common.security_verification')}
        message={t('common.security_verification_email_desc', {
          email: maskEmail(user?.email),
        })}
        messageClassName='text-center pb-3'
        mode={OTP_MODES.EMAIL}
        viewType={OTP_VIEW_TYPE.PROFILE}
        onResendCode={() => onSendMail()}
        onComplete={onVerifyEmail}
        className='mx-auto mt-24 w-full md:max-w-[45%] xl:max-w-[400px]'
      />
    );
  }

  return (
    <DashboardSubNavCard
      title={t('dashboard.profile_management.change_password_page.page_title')}
      titleClassName='md:my-8'
    >
      <div>
        <p className='text-base leading-loose md:my-4'>
          {t(
            'dashboard.profile_management.change_password_page.instruction_title'
          )}
        </p>
        <ul className='mt-4 ml-6 list-disc text-base'>
          {t(
            'dashboard.profile_management.change_password_page.instruction_steps',
            {
              returnObjects: true,
            }
          )?.map((item: any, index: number) => (
            <li key={index} className='mb-2 text-base'>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Button
        size='lg'
        className='mt-12 h-14 w-full px-16 text-base md:text-lg min-[140rem]:max-w-[45rem]'
        onClick={() => {
          onSendMail(() => {
            setMode(CHANGE_STEPS.EMAIL_OTP_VERIFICATION);
          });
        }}
      >
        {t(
          'dashboard.profile_management.change_password_page.start_process_btn'
        )}
      </Button>
    </DashboardSubNavCard>
  );
}
