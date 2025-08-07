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
      <div className='mx-auto flex h-full max-w-[50%] flex-col items-center justify-center pb-24'>
        <div className='relative size-24 lg:size-30'>
          <Image src={Icons.success} alt='' fill />
        </div>
        <p className='text-neutral-2 mt-6 text-center text-3xl font-bold'>
          Your password has changed.
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

  if (mode === CHANGE_STEPS.CHANGE_PASSWORD) {
    return (
      <div className='mx-auto max-w-[60%] pb-4'>
        <p className='mt-4 mb-6 text-3xl font-bold'>Change password</p>
        <Form {...form}>
          <p className='pr-12 text-base leading-loose'>
            Your password must be at least 8 characters long, and include at
            least 3 of three following:
            <br />- An uppercase letter
            <br />- A lowercase letter
            <br />- A number
            <br />
            -A symbol
          </p>
          <FormField
            control={form?.control}
            name='password'
            render={({ field }) => (
              <FormInputField
                disableCopyPaste
                type='password'
                label='ENTER YOUR PASSWORD'
                placeholder='Your password'
                value={field.value}
                onChange={field.onChange}
                className='mt-8 max-w-[70%]'
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
                label='CONFIRM YOUR PASSWORD'
                placeholder='Your password'
                value={field.value}
                onChange={field.onChange}
                className='mt-4 mb-4 max-w-[70%]'
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
          Change password
        </Button>
      </div>
    );
  }

  if (mode === CHANGE_STEPS.MOBILE_OTP_VERIFICATION) {
    return (
      <OtpSecurityVerification
        ref={otpMobileRef}
        key={CHANGE_STEPS.MOBILE_OTP_VERIFICATION}
        title='Security Verification'
        titleClassName='text-center pb-3'
        message={`Please enter 6-digit code we have sent to at ${maskString(user?.primaryUserMobileCountryCode + '' + user?.primaryUserMobileNumber, 3, 3)}`}
        messageClassName='text-center pb-3'
        mode='sms'
        onResendCode={() => onSendMail()}
        onComplete={onVerifyMobile}
        className='mx-auto mt-24 max-w-[45%] xl:max-w-[400px]'
      />
    );
  }

  if (mode === CHANGE_STEPS.EMAIL_OTP_VERIFICATION) {
    return (
      <OtpSecurityVerification
        ref={otpEmailRef}
        key={CHANGE_STEPS.EMAIL_OTP_VERIFICATION}
        title='Security Verification'
        titleClassName='text-center pb-3'
        message={`Please enter 6-digit code we have sent to at ${maskEmail(user?.email)}`}
        messageClassName='text-center pb-3'
        mode='email'
        onResendCode={() => onSendMail()}
        onComplete={onVerifyEmail}
        className='mx-auto mt-24 max-w-[45%] xl:max-w-[400px]'
        actionText='Send me again'
      />
    );
  }

  return (
    <div className='mx-auto flex max-w-[50%] flex-col items-center justify-center pt-12'>
      <p className='my-8 text-3xl font-bold'>Change password</p>
      <div>
        <p className='my-4 text-base leading-loose'>
          To change your password, you will follow these steps:
        </p>
        <ul className='mt-4 ml-6 list-disc text-base'>
          <li className='text-base'>
            Enter the verification code sent to your email.
          </li>
          <li className='my-4 text-base'>
            Enter the verification code sent to your mobile
          </li>
          <li className='text-base'>Change password.</li>
        </ul>
      </div>
      <Button
        className='mt-12 h-14 w-full px-16 text-lg'
        onClick={() => {
          onSendMail(() => {
            setMode(CHANGE_STEPS.EMAIL_OTP_VERIFICATION);
          });
        }}
      >
        Proceed to change password
      </Button>
    </div>
  );
}
