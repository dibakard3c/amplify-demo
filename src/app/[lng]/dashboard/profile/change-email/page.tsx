'use client';

import React, { useRef, useState } from 'react';
import { Button } from '@estia/components/ui/button';
import OtpSecurityVerification, {
  OtpSecurityVerificationRef,
} from '@estia/components/auth/otp-security-verification';
import {
  useChangeEmailMutation,
  useCheckEmailAndValidateMutation,
  useInitChangeEmailMutation,
  useSendEmailOtpMutation,
  useVerifyChangeEmailOtpMutation,
  useVerifyEmailMutation,
} from '@estia/networking/endpoints/auth';
import { useForm } from 'react-hook-form';
import { ChangeEmailForm } from '@estia/typings/login-form';
import { changeEmailResolver } from '@estia/helpers/resolvers';
import { FormInputField } from '@estia/components/form/form-input';
import { Form, FormField } from '@estia/components/ui/form';
import { Icons } from '@estia/assets';
import Image from 'next/image';
import { SCREENS } from '@estia/constants/screens';
import { useRouter } from 'next/navigation';
import { maskEmail } from '@estia/utils/general';
import { useSelector } from 'react-redux';
import { selectUser } from '@estia/store/selector';
import { Toast } from '@estia/helpers/toast';
import DashboardSubNavCard from '@estia/components/layout/dashboard-sub-nav-card';
import { useTranx } from '@estia/hooks/useTranx';
import { OTP_MODES, OTP_VIEW_TYPE } from '@estia/constants/otp';

const CHANGE_EMAIL_STEPS = {
  OLD_MAIL_VERIFICATION: 'old_mail_verification',
  CHANGE_MAIL: 'change_mail',
  NEW_MAIL_VERIFICATION: 'new_mail_verification',
  CHANGE_SUCCESS: 'change_success',
};

type ChangeEmailStep =
  (typeof CHANGE_EMAIL_STEPS)[keyof typeof CHANGE_EMAIL_STEPS];

export default function Page() {
  const router = useRouter();
  const user = useSelector(selectUser);
  const [mode, setMode] = useState<ChangeEmailStep>('');

  const otpOldRef = useRef<OtpSecurityVerificationRef>(null);
  const otpNewRef = useRef<OtpSecurityVerificationRef>(null);

  const [initChangeEmail] = useInitChangeEmailMutation();
  const [verifyChangeEmailOtp] = useVerifyChangeEmailOtpMutation();
  const [changeEmail] = useChangeEmailMutation();
  const [verifyEmail] = useVerifyEmailMutation();
  const [checkEmail] = useCheckEmailAndValidateMutation();
  const [resendEmailOtp] = useSendEmailOtpMutation();

  const { t } = useTranx();

  const changeEmailForm = useForm<ChangeEmailForm>({
    resolver: changeEmailResolver,
    mode: 'onChange',
    delayError: 500,
  });

  const onSendMail = () => {
    initChangeEmail()
      .unwrap()
      .then(() => {
        setMode(CHANGE_EMAIL_STEPS.OLD_MAIL_VERIFICATION);
      });
  };

  const onVerifyEmail = (otp: string) => {
    verifyChangeEmailOtp(otp)
      .unwrap()
      .then(() => {
        setMode(CHANGE_EMAIL_STEPS.CHANGE_MAIL);
      })
      .catch(() => {
        otpOldRef.current?.reset();
        otpOldRef.current?.countFailedAttempt();
      });
  };

  const onVerifyNewEmail = (otp: string) => {
    verifyEmail(otp)
      .unwrap()
      .then(() => {
        setMode(CHANGE_EMAIL_STEPS.CHANGE_SUCCESS);
      })
      .catch(() => {
        otpNewRef.current?.reset();
        otpNewRef.current?.countFailedAttempt();
      });
  };

  const onSendMailOtpSubmit = (formValues: any) => {
    if (formValues?.email === user?.email) {
      Toast.showError({
        message: t(
          'dashboard.profile_management.change_email_page.error_message'
        ),
      });
      return;
    }
    checkEmail(formValues?.email)
      .unwrap()
      .then(() => {
        changeEmail(formValues?.email)
          .unwrap()
          .then(() => {
            setMode(CHANGE_EMAIL_STEPS.NEW_MAIL_VERIFICATION);
          });
      })
      .catch((reason) => {
        changeEmailForm.setError('email', {
          message: reason?.data?.detail,
        });
      });
  };

  if (mode === CHANGE_EMAIL_STEPS.CHANGE_SUCCESS) {
    return (
      <div className='mx-auto flex h-full flex-col items-center justify-center py-12 md:max-w-[50%] md:pt-0 md:pb-24'>
        <div className='relative size-24 lg:size-30'>
          <Image src={Icons.success} alt='' fill />
        </div>
        <p className='text-neutral-2 mt-6 text-center text-3xl font-bold'>
          {t('dashboard.profile_management.change_email_page.success_message')}
        </p>
        <Button
          onClick={() => {
            router.push(SCREENS.PROFILE);
          }}
          size='lg'
          className='mt-8 w-full'
        >
          {t(
            'dashboard.profile_management.change_email_page.success_message_action'
          )}
        </Button>
      </div>
    );
  }

  if (mode === CHANGE_EMAIL_STEPS.NEW_MAIL_VERIFICATION) {
    return (
      <OtpSecurityVerification
        ref={otpNewRef}
        titleClassName='text-center pb-3'
        title={t('common.security_verification')}
        message={t('common.security_verification_email_desc', {
          email: maskEmail(changeEmailForm?.getValues('email')),
        })}
        messageClassName='text-center pb-3'
        mode={OTP_MODES.EMAIL}
        viewType={OTP_VIEW_TYPE.PROFILE}
        onResendCode={() => {
          resendEmailOtp('EMAIL_ADDRESS_CHANGE');
        }}
        onComplete={onVerifyNewEmail}
        className='mx-auto w-full md:mt-24 md:max-w-[45%] xl:max-w-[400px]'
      />
    );
  }

  if (mode === CHANGE_EMAIL_STEPS.CHANGE_MAIL) {
    return (
      <DashboardSubNavCard
        title={t('dashboard.profile_management.change_email_page.page_title')}
        titleClassName='md:my-8'
      >
        <div>
          <p className='my-4 text-base leading-loose'>
            {t('dashboard.profile_management.change_email_page.otp_desc')}
          </p>
        </div>
        <Form {...changeEmailForm}>
          <FormField
            control={changeEmailForm.control}
            name='email'
            render={({ field }) => (
              <FormInputField
                label={t(
                  'dashboard.profile_management.change_email_page.email_label'
                )}
                value={field.value}
                onChange={field.onChange}
                placeholder={t(
                  'dashboard.profile_management.change_email_page.email_hint'
                )}
                className='max-w-auto mt-4 w-full'
                inputClassName='max-w-auto'
              />
            )}
          />
        </Form>
        <Button
          className='mt-12 h-14 w-full px-16 text-lg'
          onClick={() => {
            changeEmailForm.handleSubmit(onSendMailOtpSubmit)();
          }}
        >
          {t('dashboard.profile_management.change_email_page.page_title')}
        </Button>
      </DashboardSubNavCard>
    );
  }

  if (mode === CHANGE_EMAIL_STEPS.OLD_MAIL_VERIFICATION) {
    return (
      <OtpSecurityVerification
        ref={otpOldRef}
        title={t('common.security_verification')}
        message={t('common.security_verification_email_desc', {
          email: maskEmail(user?.email),
        })}
        titleClassName='text-center pb-3'
        messageClassName='text-center pb-3'
        mode={OTP_MODES.EMAIL}
        viewType={OTP_VIEW_TYPE.PROFILE}
        onResendCode={onSendMail}
        onComplete={onVerifyEmail}
        className='mx-auto w-full md:mt-24 md:max-w-[45%] xl:max-w-[400px]'
      />
    );
  }

  return (
    <DashboardSubNavCard
      title={t('dashboard.profile_management.change_email_page.page_title')}
      titleClassName='md:my-8 text-xl'
    >
      <div>
        <p className='text-base leading-loose md:my-4'>
          {t(
            'dashboard.profile_management.change_email_page.instruction_title'
          )}
        </p>
        <ul className='mt-4 ml-6 list-disc text-base'>
          {t(
            'dashboard.profile_management.change_email_page.instruction_steps',
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
          onSendMail();
        }}
      >
        {t('dashboard.profile_management.change_email_page.start_process_btn')}
      </Button>
    </DashboardSubNavCard>
  );
}
