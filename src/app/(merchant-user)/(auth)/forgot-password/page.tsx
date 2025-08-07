'use client';

import React, { useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { get } from 'lodash';
import { cn } from '@estia/lib/utils';
import { ScrollArea } from '@estia/components/ui/scroll-area';
import {
  forgotPasswordResolver,
  passwordResolver,
} from '@estia/helpers/resolvers';
import FormBuilder from '@estia/components/auth/form-builder';
import MobileFormBuilder from '@estia/components/auth/mobile-form-builder';
import { ForgotPasswordForm } from '@estia/typings/login-form';
import SendPin from '@estia/app/(merchant-user)/(auth)/forgot-password/send-pin';
import NewPassword from '@estia/app/(merchant-user)/(auth)/forgot-password/new-password';
import VerifyPin from '@estia/app/(merchant-user)/(auth)/forgot-password/verify-pin';
import { PasswordForm } from '@estia/typings/registration-form';

export default function Page() {
  const [activeStep, setActiveStep] = useState(0);
  const sendOtpForm = useForm<ForgotPasswordForm>({
    resolver: forgotPasswordResolver,
    mode: 'onChange',
    defaultValues: {
      email:
        process.env.NODE_ENV === 'development'
          ? 'thad.test.merchant@yopmail.com'
          : '',
    },
    delayError: 500,
  });
  const changePasswordForm = useForm<PasswordForm>({
    resolver: passwordResolver,
    mode: 'onChange',
    delayError: 500,
  });

  const email = sendOtpForm.watch('email');

  const containerRef = useRef<HTMLDivElement>(null);

  const registrationSteps = useMemo(
    () => [
      {
        Component: SendPin,
        form: sendOtpForm,
      },
      {
        Component: VerifyPin,
        form: sendOtpForm,
      },
      {
        Component: NewPassword,
        form: changePasswordForm,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const CurrentStepItem = useMemo(
    () => get(registrationSteps, activeStep),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeStep]
  );

  const props = useMemo(
    () => ({
      CurrentStepItem,
      setActiveStep,
      activeStep,
      email,
    }),
    [CurrentStepItem, setActiveStep, activeStep, email]
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        'sm:landscape:bg-light-bg flex h-[calc(100%-2.5rem)] w-full items-center justify-center overflow-hidden p-4 pt-0 ' +
          'sm:mt-0 sm:h-dvh sm:p-8 lg:px-[5%] portrait:sm:h-[calc(100vh-6rem)] sm:portrait:bg-transparent'
      )}
    >
      <div className='auth-shadow flex w-full justify-between overflow-hidden rounded-2xl bg-white/70 sm:portrait:backdrop-blur'>
        {/* DESKTOP & TABLET */}
        <div className='relative hidden max-h-[calc(100dvh-5rem)] flex-1 bg-white/60 pb-8 sm:col-span-8 sm:block sm:pr-1 portrait:max-h-[calc(100vh-12rem)]'>
          <ScrollArea
            className='h-full bg-transparent'
            contentClassName={cn('sm:pl-1')}
          >
            <FormBuilder {...props} />
          </ScrollArea>
        </div>
        {/* MOBILE */}
        <div className='col-span-12 bg-white/40 backdrop-blur sm:hidden'>
          <MobileFormBuilder {...props} />
        </div>
      </div>
    </div>
  );
}
