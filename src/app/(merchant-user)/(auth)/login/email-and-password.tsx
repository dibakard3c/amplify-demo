import React from 'react';
import { FormInputField } from '@estia/components/form/form-input';
import { FormField } from '@estia/components/ui/form';
import { Button } from '@estia/components/ui/button';
import { RegistrationForm } from '@estia/typings/registration-form';
import { useFormContext } from 'react-hook-form';
import { LoginForm } from '@estia/typings/login-form';
import Link from 'next/link';
import { SCREENS } from '@estia/constants/screens';
import {
  useLoginMutation,
  useVerifyRecaptchaMutation,
} from '@estia/networking/endpoints/auth';
import { useAppDispatch } from '@estia/store/store';
import { setLoginPayload } from '@estia/store/slices/auth';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Toast } from '@estia/helpers/toast';

export default function EmailAndPassword({
  onMoveToNextStep,
}: RegistrationForm) {
  const form = useFormContext<LoginForm>();
  const dispatch = useAppDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [verifyRecaptcha] = useVerifyRecaptchaMutation();

  async function onVerifyRecaptcha(onProceed: () => void) {
    if (process.env.NODE_ENV === 'development') {
      onProceed();
    }

    if (!executeRecaptcha) {
      Toast.showError({
        message:
          'reCAPTCHA validation failed. Please refresh this page and try again.',
      });
      return;
    }

    const reCaptchaToken = await executeRecaptcha('register');

    verifyRecaptcha(reCaptchaToken)
      .unwrap()
      .then((res) => {
        if (res) {
          onProceed();
        } else {
          Toast.showError({
            message:
              'reCAPTCHA validation failed. Please refresh this page and try again.',
          });
        }
      })
      .catch(() => {
        Toast.showError({
          message:
            'reCAPTCHA validation failed. Please refresh this page and try again.',
        });
      });
  }

  const [login] = useLoginMutation();

  function onSubmit(values: LoginForm) {
    onVerifyRecaptcha(() => {
      login({
        ...values,
        noAuth: true,
      })
        .unwrap()
        .then(() => {
          dispatch(
            setLoginPayload({
              email: form.getValues('email'),
            })
          );
          onMoveToNextStep();
        });
    });
  }

  return (
    <div className='mx-auto w-full self-center px-4 pl-2 sm:w-[44%] sm:max-w-[32rem]'>
      <h1 className='mt-3 mb-6 text-center text-3xl font-bold'>Sign In</h1>
      <FormField
        control={form?.control}
        name='email'
        render={({ field }) => (
          <FormInputField
            label='EMAIL'
            value={field?.value}
            onChange={field.onChange}
            placeholder='Email address'
            className='mt-4'
            inputClassName='w-full max-w-auto'
          />
        )}
      />
      <FormField
        control={form?.control}
        name='password'
        render={({ field }) => (
          <FormInputField
            type='password'
            label='PASSWORD'
            value={field?.value}
            onChange={field.onChange}
            placeholder='Password'
            className='mt-6'
            inputClassName='w-full max-w-auto'
          />
        )}
      />
      <Link href='/forgot-password'>
        <p className='text-primary-1 max-w-max py-3 pr-2 text-sm font-bold'>
          Forgot password ?
        </p>
      </Link>
      <Button
        disabled={!form?.formState?.isValid}
        onClick={(event) => {
          event.preventDefault();
          form.handleSubmit(onSubmit)();
        }}
        size='lg'
        className='my-6 w-full text-lg'
      >
        Sign in
      </Button>
      <Link href={SCREENS.REGISTER}>
        <p className='text-primary-1 max-w-max py-3 pr-2 text-sm font-bold'>
          Don’t have an account? Create one{' '}
          <span className='underline'>here</span>.
        </p>
      </Link>
    </div>
  );
}
