import React, { useState } from 'react';
import { PasswordForm } from '@estia/typings/registration-form';
import { useFormContext } from 'react-hook-form';
import { FormField } from '@estia/components/ui/form';
import { FormInputField } from '@estia/components/form/form-input';
import PasswordValidator from '@estia/components/form/password-validator';
import { Button } from '@estia/components/ui/button';
import { SCREENS } from '@estia/constants/screens';
import Link from 'next/link';
import { useChangeForgotPasswordMutation } from '@estia/networking/endpoints/auth';
import Image from 'next/image';
import { Icons } from '@estia/assets';

export default function NewPassword({ email }: any) {
  const form = useFormContext<PasswordForm>();

  const password = form?.watch('password');
  const confirmPassword = form?.watch('confirm_password');

  const [successView, setSuccessView] = useState(false);

  const [verify] = useChangeForgotPasswordMutation();

  const onSubmit = (data: any) => {
    verify({
      email: email,
      newPassword: data?.password,
      noAuth: true,
    })
      .unwrap()
      .then(() => {
        setSuccessView(true);
      });
  };

  if (successView) {
    return (
      <div className='mx-auto max-w-[450px] self-center px-4 py-12'>
        <div className='relative mx-auto size-24 lg:size-30'>
          <Image src={Icons.success} alt='' fill />
        </div>
        <p className='text-neutral-2 mt-6 text-center text-3xl font-bold'>
          Your password has changed.
        </p>
        <Button asChild size='lg' className='mt-8 w-full'>
          <Link href={SCREENS.LOGIN}>Back to Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-[450px] self-center px-4'>
      <h1 className='mb-4 text-center text-3xl font-bold'>New password</h1>
      <p className='pr-12 text-center text-base leading-loose'>
        Your password must be at least 8 characters long, and comply with the
        following security requirements.
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
            className='mt-8'
            inputClassName='max-w-full'
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
            className='mt-4 mb-4'
            inputClassName='max-w-full'
          />
        )}
      />
      <PasswordValidator
        password={password}
        confirmPassword={confirmPassword}
      />
      <Button
        disabled={!form?.formState?.isValid}
        size='lg'
        className='mt-6 w-full'
        onClick={(event) => {
          event.preventDefault();
          form.handleSubmit(onSubmit)();
        }}
      >
        Create password
      </Button>
    </div>
  );
}
