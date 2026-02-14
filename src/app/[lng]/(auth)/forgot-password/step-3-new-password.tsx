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
import { useTranx } from '@estia/hooks/useTranx';

export default function Step3NewPassword({ email }: any) {
  const form = useFormContext<PasswordForm>();

  const password = form?.watch('password');
  const confirmPassword = form?.watch('confirm_password');

  const [successView, setSuccessView] = useState(false);

  const [verify] = useChangeForgotPasswordMutation();

  const { t } = useTranx();

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
          {t('auth.forgot_password_page.new_password_success_msg')}
        </p>
        <Button asChild size='lg' className='mt-8 w-full'>
          <Link href={SCREENS.LOGIN}>
            {t('auth.forgot_password_page.back_to_sign_in')}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-[450px] self-center px-4'>
      <h1 className='mb-4 text-center text-3xl font-bold'>
        {t('auth.forgot_password_page.new_password_title')}
      </h1>
      <p className='pr-12 text-center text-base leading-loose'>
        {t('auth.forgot_password_page.instructions')}
      </p>
      <FormField
        control={form?.control}
        name='password'
        render={({ field }) => (
          <FormInputField
            disableCopyPaste
            type='password'
            label={t('auth.forgot_password_page.password_label')}
            placeholder={t('auth.forgot_password_page.password_hint')}
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
            label={t('auth.forgot_password_page.confirm_password_label')}
            placeholder={t('auth.forgot_password_page.password_hint')}
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
        {t('auth.forgot_password_page.create_password_btn')}
      </Button>
    </div>
  );
}
