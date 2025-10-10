'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { get, isEmpty } from 'lodash';
import { cn } from '@estia/utils/utils';
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
import Step1LanguageAndCurrency from '@estia/app/[lng]/(auth)/register/step-1-language-and-currency';
import Step2BusinessDetails from '@estia/app/[lng]/(auth)/register/step-2-business-details';
import Step3CreatePassword from '@estia/app/[lng]/(auth)/register/step-3-create-password';
import Step5MobileVerification from '@estia/app/[lng]/(auth)/register/step-5-mobile-verification';
import Step6EmailVerification from '@estia/app/[lng]/(auth)/register/step-6-email-verification';
import Step4ReviewBusinessDetails from '@estia/app/[lng]/(auth)/register/step-4-review-business-details';
import { phoneCountryCodeDefault } from '@estia/helpers/defaults';
import { useTranx } from '@estia/hooks/useTranx';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
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

  const { t } = useTranx();

  const registrationSteps = useMemo(
    () => [
      {
        key: 'language_and_currency',
        menuName: 'auth.register_page.menu_labels.language_and_currency',
        title: 'auth.register_page.menu_labels.language_and_currency_title',
        Component: Step1LanguageAndCurrency,
        form: langAndCountryForm,
      },
      {
        key: 'business_details',
        menuName: 'auth.register_page.menu_labels.business_details',
        title: 'auth.register_page.menu_labels.business_details_title',
        Component: Step2BusinessDetails,
        form: businessDetailsForm,
      },
      {
        key: 'create_password',
        menuName: 'auth.register_page.menu_labels.create_password',
        title: 'auth.register_page.menu_labels.create_password_title',
        Component: Step3CreatePassword,
        form: passwordForm,
      },
      {
        key: 'review_business_details',
        menuName: 'auth.register_page.menu_labels.review_business_details',
        Component: Step4ReviewBusinessDetails,
      },
      {
        key: 'mobile_validation',
        menuName: 'auth.register_page.menu_labels.mobile_validation',
        Component: Step5MobileVerification,
      },
      {
        key: 'email_validation',
        menuName: 'auth.register_page.menu_labels.email_validation',
        Component: Step6EmailVerification,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params?.lang]
  );

  const isCompleted = useCallback(
    (screen: string) => {
      return (
        {
          language_and_currency:
            activeStep >= 1 && langAndCountryForm.formState.isValid,
          business_details: businessDetailsForm.formState.isValid,
          create_password: passwordForm.formState.isValid,
          review_business_details: activeStep > 3,
          mobile_validation: isPhoneValidated,
          email_validation: isEmailValidated,
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
    [activeStep, params?.lang]
  );

  const showScrollIndicator = useMemo(
    () => (CurrentStepItem.key === 'business_details' ? 'always' : 'auto'),
    [CurrentStepItem.key]
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
            <div className='absolute top-0 z-10 flex min-h-20 w-full max-w-[80%] items-center justify-center bg-transparent pt-12 pb-6 pl-3 sm:justify-start sm:bg-white/70 sm:backdrop-blur portrait:hidden'>
              <h1 className='text-2xl font-bold 2xl:text-3xl'>
                {t(CurrentStepItem?.title as any)}
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
                  {t(CurrentStepItem?.title as any)}
                </h1>
              </div>
            ) : null}
            <FormBuilder {...props} />
          </ScrollArea>
        </div>
        {/* MOBILE  bg-white/40*/}
        <div className='col-span-12 w-full backdrop-blur sm:hidden'>
          <MobileFormBuilder {...props} />
        </div>
      </div>
    </div>
  );
}
