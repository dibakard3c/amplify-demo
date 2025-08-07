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

export default function CreatePassword({ onMoveToNextStep }: RegistrationForm) {
  const form = useFormContext<PasswordForm>();
  const password = form?.watch('password');
  const confirmPassword = form?.watch('confirm_password');

  return (
    <div className='max-w-96 pb-6 pl-3'>
      <p className='pr-8 text-base leading-loose'>
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
          />
        )}
      />
      <PasswordValidator
        password={password}
        confirmPassword={confirmPassword}
      />
      <Button
        disabled={!form?.formState?.isValid}
        onClick={() => onMoveToNextStep()}
        size='lg'
        className='mt-6 w-full'
      >
        Continue
      </Button>
    </div>
  );
}
