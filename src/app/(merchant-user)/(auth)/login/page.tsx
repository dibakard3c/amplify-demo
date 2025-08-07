'use client';

import React, { useMemo, useRef, useState } from 'react';

import { useForm } from 'react-hook-form';
import { get } from 'lodash';
import { cn } from '@estia/lib/utils';
import { ScrollArea } from '@estia/components/ui/scroll-area';
import {
  loginResolver,
  sendOtpResolver,
  verifyOtpResolver,
} from '@estia/helpers/resolvers';
import FormBuilder from '@estia/components/auth/form-builder';
import MobileFormBuilder from '@estia/components/auth/mobile-form-builder';
import {
  LoginForm,
  SendOtpForm,
  VerifyOtpForm,
} from '@estia/typings/login-form';
import EmailAndPassword from '@estia/app/(merchant-user)/(auth)/login/email-and-password';
import SendOtp from '@estia/app/(merchant-user)/(auth)/login/send-otp';
import VerifyOtp from '@estia/app/(merchant-user)/(auth)/login/verify-otp';

const loginDefaults = {
  email: 'thad.test.merchant@yopmail.com',
  password: 'Password123!',
};

export default function LoginPage() {
  const [activeStep, setActiveStep] = useState(0);
  const loginForm = useForm<LoginForm>({
    resolver: loginResolver,
    mode: 'onChange',
    defaultValues:
      process.env.NODE_ENV === 'development' ? loginDefaults : undefined,
    delayError: 500,
  });
  const sendOtpForm = useForm<SendOtpForm>({
    resolver: sendOtpResolver,
    mode: 'onChange',
    delayError: 500,
  });
  const verifyOtpForm = useForm<VerifyOtpForm>({
    resolver: verifyOtpResolver,
    mode: 'onChange',
    delayError: 500,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const registrationSteps = useMemo(
    () => [
      {
        Component: EmailAndPassword,
        form: loginForm,
      },
      {
        Component: SendOtp,
        form: sendOtpForm,
      },
      {
        Component: VerifyOtp,
        form: verifyOtpForm,
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

  return (
    <div
      ref={containerRef}
      className={cn(
        'sm:landscape:bg-light-bg flex h-[calc(100%-2.5rem)] w-full items-center justify-center overflow-hidden p-4 pt-0 ' +
          'sm:mt-0 sm:h-dvh sm:p-8 lg:px-[5%] portrait:sm:h-[calc(100vh-6rem)] sm:portrait:bg-transparent'
      )}
    >
      <div className='auth-shadow flex min-h-[500px] w-full justify-between overflow-hidden rounded-2xl bg-white/70 sm:portrait:backdrop-blur'>
        {/* DESKTOP & TABLET */}
        <ScrollArea
          className='hidden h-full w-full py-20 sm:block'
          contentClassName={cn('sm:pl-1')}
        >
          <FormBuilder
            applyDefaultStyles={false}
            {...{
              CurrentStepItem,
              setActiveStep,
              activeStep,
            }}
          />
        </ScrollArea>
        {/* MOBILE */}
        <div className='w-full bg-white/40 py-12 backdrop-blur sm:hidden'>
          <MobileFormBuilder
            {...{
              CurrentStepItem,
              setActiveStep,
              activeStep,
              containerRef,
            }}
          />
        </div>
      </div>
    </div>
  );
}
