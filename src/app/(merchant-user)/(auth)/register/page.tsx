'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { get, isEmpty } from 'lodash';
import { cn } from '@estia/lib/utils';
import { ScrollArea } from '@estia/components/ui/scroll-area';
import RegisterMenu from '@estia/components/auth/register-menu';
import {
  businessDetailsResolver,
  langAndCountryResolver,
  passwordResolver,
} from '@estia/helpers/resolvers';
import {
  BusinessDetailsForm,
  LangAndCountryForm,
  PasswordForm,
} from '@estia/typings/registration-form';
import FormBuilder from '@estia/components/auth/form-builder';
import MobileFormBuilder from '@estia/components/auth/mobile-form-builder';
import LanguageAndCurrency from '@estia/app/(merchant-user)/(auth)/register/language-and-currency';
import BusinessDetails from '@estia/app/(merchant-user)/(auth)/register/business-details';
import CreatePassword from '@estia/app/(merchant-user)/(auth)/register/create-password';
import MobileVerification from '@estia/app/(merchant-user)/(auth)/register/mobile-verification';
import EmailVerification from '@estia/app/(merchant-user)/(auth)/register/email-verification';
import ReviewBusinessDetails from '@estia/app/(merchant-user)/(auth)/register/review-business-details';
import { phoneCountryCodeDefault } from '@estia/helpers/defaults';

export default function Page() {
  const [activeStep, setActiveStep] = useState(0);
  const langAndCountryForm = useForm<LangAndCountryForm>({
    resolver: langAndCountryResolver,
    mode: 'onChange',
    delayError: 500,
  });
  const businessDetailsForm = useForm<BusinessDetailsForm>({
    resolver: businessDetailsResolver,
    mode: 'onChange',
    defaultValues: {
      business_name: '',
      merchant_category: '',
      vat_identification_no: '',
      revenue_range: '',
      business_phone: phoneCountryCodeDefault,
      business_email: '',
      contact_firstname: '',
      contact_lastname: '',
      contact_email: '',
      contact_phone: phoneCountryCodeDefault,
    },
    delayError: 500,
  });
  const passwordForm = useForm<PasswordForm>({
    resolver: passwordResolver,
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirm_password: '',
    },
    delayError: 500,
  });

  const country = langAndCountryForm.watch('country');
  const password = passwordForm.watch('password');
  const businessDetails = businessDetailsForm.watch();

  const [isPhoneValidated, setPhoneValidated] = useState(false);
  const [isEmailValidated, setEmailValidated] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const registrationSteps = useMemo(
    () => [
      {
        menuName: 'Language & currency',
        title: 'Select your country, language & currency',
        Component: LanguageAndCurrency,
        form: langAndCountryForm,
      },
      {
        menuName: 'Business Details',
        title: 'Enter your business details',
        Component: BusinessDetails,
        form: businessDetailsForm,
      },
      {
        menuName: 'Create Password',
        title: 'Create your password',
        Component: CreatePassword,
        form: passwordForm,
      },
      {
        menuName: 'Review Business Details',
        Component: ReviewBusinessDetails,
      },
      {
        menuName: 'Mobile validation',
        Component: MobileVerification,
      },
      {
        menuName: 'E-mail validation',
        Component: EmailVerification,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const isCompleted = useCallback(
    (screen: string) => {
      return (
        {
          'Language & currency':
            activeStep >= 1 && langAndCountryForm.formState.isValid,
          'Business Details': businessDetailsForm.formState.isValid,
          'Create Password': passwordForm.formState.isValid,
          'Review Business Details': activeStep > 3,
          'Mobile validation': isPhoneValidated,
          'E-mail validation': isEmailValidated,
        }[screen] || false
      );
    },
    [
      langAndCountryForm.formState.isValid,
      businessDetailsForm.formState.isValid,
      passwordForm.formState.isValid,
      isPhoneValidated,
      isEmailValidated,
      activeStep,
    ]
  );

  const CurrentStepItem = useMemo(
    () => get(registrationSteps, activeStep),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeStep]
  );

  const showScrollIndicator = useMemo(
    () =>
      CurrentStepItem.title === 'Enter your business details'
        ? 'always'
        : 'auto',
    [CurrentStepItem.title]
  );

  const props = useMemo(
    () => ({
      CurrentStepItem,
      country,
      businessDetails,
      isPhoneValidated,
      isEmailValidated,
      setPhoneValidated,
      setEmailValidated,
      setActiveStep,
      activeStep,
      containerRef,
      password,
    }),
    [
      CurrentStepItem,
      activeStep,
      businessDetails,
      country,
      isEmailValidated,
      isPhoneValidated,
      password,
    ]
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
        <div className='hidden items-center justify-center bg-white/60 px-[2.5%] py-10 sm:block'>
          <RegisterMenu
            steps={registrationSteps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            isCompleted={isCompleted}
          />
        </div>
        {/* DESKTOP & TABLET */}
        <div className='relative hidden max-h-[calc(100dvh-5rem)] flex-1 bg-white/60 pt-10 pl-[5%] sm:col-span-8 sm:block sm:pr-1 portrait:max-h-[calc(100vh-12rem)]'>
          {/* DESKTOP HEADER */}
          {!isEmpty(CurrentStepItem?.title) ? (
            <div className='absolute top-0 z-10 flex min-h-20 w-full items-center justify-center bg-transparent pt-12 pb-6 pl-3 sm:justify-start sm:bg-white/70 sm:backdrop-blur portrait:hidden'>
              <h1 className='text-2xl font-bold 2xl:text-3xl'>
                {CurrentStepItem?.title}
              </h1>
            </div>
          ) : null}
          <ScrollArea
            type={showScrollIndicator}
            className='h-full bg-transparent'
            contentClassName={cn('sm:pl-1')}
          >
            {/* TABLET HEADER */}
            {!isEmpty(CurrentStepItem?.title) ? (
              <div className='z-10 mt-2 -mb-16 hidden w-full items-center justify-center pl-2 sm:justify-start portrait:block'>
                <h1 className='text-2xl font-bold 2xl:text-3xl'>
                  {CurrentStepItem?.title}
                </h1>
              </div>
            ) : null}
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
