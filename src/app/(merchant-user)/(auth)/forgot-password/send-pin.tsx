import React from 'react';
import { FormInputField } from '@estia/components/form/form-input';
import { FormField } from '@estia/components/ui/form';
import { Button } from '@estia/components/ui/button';
import { RegistrationForm } from '@estia/typings/registration-form';
import { useFormContext } from 'react-hook-form';
import { LoginForm } from '@estia/typings/login-form';
import {
  useSendForgotPasswordOtpMutation,
  useValidateEmailMutation,
} from '@estia/networking/endpoints/auth';
import { ChevronBack } from '@estia/assets/icons/chevron';
import Link from 'next/link';
import { SCREENS } from '@estia/constants/screens';
import { isEmpty } from 'lodash';

export default function SendPin({ onMoveToNextStep }: RegistrationForm) {
  const form = useFormContext<LoginForm>();

  const [validateEmail] = useValidateEmailMutation();
  const [sendForgotPassword] = useSendForgotPasswordOtpMutation();

  function onSubmit(formValues: any) {
    validateEmail(formValues?.email)
      .unwrap()
      .then(() => {
        sendForgotPassword(formValues?.email)
          .unwrap()
          .then(() => {
            onMoveToNextStep();
          });
      })
      .catch((reason) => {
        form.setError('email', {
          message: reason?.data?.detail,
        });
      });
  }

  return (
    <div className='mx-auto max-w-[450px] self-center px-4 py-12'>
      <Link
        className='absolute top-5 left-5 flex max-w-max items-center justify-center rounded-full'
        href={SCREENS.LOGIN}
      >
        <ChevronBack className='size-11' />
      </Link>
      <h1 className='mb-4 text-center text-3xl font-bold'>
        Forgot your password?
      </h1>
      <p className='mt-8 mb-12 text-center text-base'>
        Enter your email address to reset it.{' '}
      </p>
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
            aria-invalid={!isEmpty(form?.formState?.errors?.email)}
          />
        )}
      />
      <Button
        disabled={!form?.formState?.isValid}
        onClick={(event) => {
          event.preventDefault();
          form.handleSubmit(onSubmit)();
        }}
        size='lg'
        className='mt-12 w-full text-lg'
      >
        Send verification PIN
      </Button>
    </div>
  );
}
