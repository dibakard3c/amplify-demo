'use client';

import React from 'react';
import { FormInputField } from '@estia/components/form/form-input';
import { FormField } from '@estia/components/ui/form';
import { Button } from '@estia/components/ui/button';
import PasswordValidator from '@estia/components/form/password-validator';
import {
  PasswordForm,
  RegistrationForm,
} from '@estia/typings/registration-form';
import { useFormContext } from 'react-hook-form';
import { useRegisterMerchantUserMutation } from '@estia/networking/endpoints/user';
import { useSearchParams } from 'next/navigation';
import { useTranx } from '@estia/hooks/useTranx';

export default function Step1AddPassword({
  onMoveToNextStep,
}: RegistrationForm) {
  const form = useFormContext<PasswordForm>();
  const password = form?.watch('password');
  const confirmPassword = form?.watch('confirm_password');

  const [register] = useRegisterMerchantUserMutation();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { t } = useTranx();

  function onSubmit(formValues: PasswordForm) {
    register({
      password: formValues?.password,
      token: encodeURIComponent(token || ''),
    })
      .unwrap()
      .then(() => {
        onMoveToNextStep();
      });
  }

  return (
    <div className='max-w-96 pb-6'>
      <p className='pr-8 text-base leading-loose'>
        {t('auth.register_sub_user_page.validation_instructions')}
      </p>
      <FormField
        control={form?.control}
        name='password'
        render={({ field }) => (
          <FormInputField
            disableCopyPaste
            type='password'
            label={t('auth.register_sub_user_page.password_label')}
            placeholder={t('auth.register_sub_user_page.password_hint')}
            value={field.value}
            onChange={field.onChange}
            className='mt-8'
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
            label={t('auth.register_sub_user_page.confirm_password_label')}
            placeholder={t('auth.register_sub_user_page.password_hint')}
            value={field.value}
            onChange={field.onChange}
            className='mt-4 mb-4'
          />
        )}
      />
      <PasswordValidator
        password={password}
        confirmPassword={confirmPassword}
      />
      <Button
        disabled={!form?.formState?.isValid}
        onClick={(event) => {
          event.preventDefault();
          form.handleSubmit(onSubmit)();
        }}
        size='lg'
        className='mt-6 w-full'
      >
        {t('common.continue')}
      </Button>
    </div>
  );
}
