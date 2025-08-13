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
      });
  };

  const onSendMailOtpSubmit = (formValues: any) => {
    if (formValues?.email === user?.email) {
      Toast.showError({
        message:
          'You can’t use your current email. Please enter a different one.',
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
      <div className='mx-auto flex h-full flex-col items-center justify-center pb-24 md:max-w-[50%]'>
        <div className='relative size-24 lg:size-30'>
          <Image src={Icons.success} alt='' fill />
        </div>
        <p className='text-neutral-2 mt-6 text-center text-3xl font-bold'>
          Your email address has changed
        </p>
        <Button
          onClick={() => {
            router.push(SCREENS.PROFILE);
          }}
          size='lg'
          className='mt-8 w-full'
        >
          Back to Profile
        </Button>
      </div>
    );
  }

  if (mode === CHANGE_EMAIL_STEPS.NEW_MAIL_VERIFICATION) {
    return (
      <OtpSecurityVerification
        ref={otpNewRef}
        resendMode
        title='Security Verification'
        titleClassName='text-center pb-3'
        message={`Please enter 6-digit code we have sent to at ${maskEmail(changeEmailForm?.getValues('email'))}`}
        messageClassName='text-center pb-3'
        mode='email'
        onResendCode={() => {
          resendEmailOtp('EMAIL_ADDRESS_CHANGE');
        }}
        onComplete={onVerifyNewEmail}
        className='mx-auto mt-24 w-full md:max-w-[45%] xl:max-w-[400px]'
        actionText='Send me again'
      />
    );
  }

  if (mode === CHANGE_EMAIL_STEPS.CHANGE_MAIL) {
    return (
      <DashboardSubNavCard title='Change email address' titleClassName='my-8'>
        <div>
          <p className='my-4 text-base leading-loose'>
            We will text a verification code to your new email address to
            confirm it.
          </p>
        </div>
        <Form {...changeEmailForm}>
          <FormField
            control={changeEmailForm.control}
            name='email'
            render={({ field }) => (
              <FormInputField
                label='EMAIL'
                value={field.value}
                onChange={field.onChange}
                placeholder='Your email'
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
          Change email address
        </Button>
      </DashboardSubNavCard>
    );
  }

  if (mode === CHANGE_EMAIL_STEPS.OLD_MAIL_VERIFICATION) {
    return (
      <OtpSecurityVerification
        ref={otpOldRef}
        resendMode
        title='Security Verification'
        titleClassName='text-center pb-3'
        message={`Please enter 6-digit code we have sent to at ${maskEmail(user?.email)}`}
        messageClassName='text-center pb-3'
        mode='email'
        onResendCode={onSendMail}
        onComplete={onVerifyEmail}
        className='mx-auto mt-24 w-full md:max-w-[45%] xl:max-w-[400px]'
        actionText='Send me again'
      />
    );
  }

  return (
    <DashboardSubNavCard
      title='Change email address'
      titleClassName='my-8 text-xl'
    >
      <div>
        <p className='my-4 text-base leading-loose'>
          To change your email, you will follow these steps:
        </p>
        <ul className='mt-4 ml-6 list-disc text-base'>
          <li className='text-base'>
            Enter the verification code sent to your current email.
          </li>
          <li className='my-4 text-base'>Enter your new email address.</li>
          <li className='text-base'>
            Enter the verification code sent to your new email.
          </li>
        </ul>
      </div>
      <Button
        className='mt-12 h-14 w-full px-16 text-base md:text-lg'
        onClick={() => {
          onSendMail();
        }}
      >
        Proceed to change email address
      </Button>
    </DashboardSubNavCard>
  );
}
