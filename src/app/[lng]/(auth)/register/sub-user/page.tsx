'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { get, isEmpty } from 'lodash';
import { cn } from '@estia/utils/utils';
import { ScrollArea } from '@estia/components/ui/scroll-area';
import RegisterMenu from '@estia/components/auth/register-menu';
import { passwordResolver } from '@estia/helpers/resolvers';
import { PasswordForm } from '@estia/typings/registration-form';
import FormBuilder from '@estia/components/auth/form-builder';
import MobileFormBuilder from '@estia/components/auth/mobile-form-builder';
import Step1AddPassword from '@estia/app/[lng]/(auth)/register/sub-user/step-1-add-password';
import Step2ReviewUserDetails from '@estia/app/[lng]/(auth)/register/sub-user/step-2-review-user-details';
import SubUserMobileVerification from '@estia/app/[lng]/(auth)/register/sub-user/step-3-mobile-verification';
import SubUserEmailVerification from '@estia/app/[lng]/(auth)/register/sub-user/step-4-email-verification';
import { useTranx } from '@estia/hooks/useTranx';

export default function Page() {
  const [activeStep, setActiveStep] = useState(0);
  const passwordForm = useForm<PasswordForm>({
    resolver: passwordResolver,
    mode: 'onChange',
    delayError: 500,
  });

  const password = passwordForm.watch('password');

  const [isPhoneValidated, setPhoneValidated] = useState(false);
  const [isEmailValidated, setEmailValidated] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const { t } = useTranx();

  const registrationSteps = useMemo(
    () => [
      {
        key: 'create_password',
        menuName: t('auth.register_page.menu_labels.create_password'),
        title: t('auth.register_page.menu_labels.create_password_title'),
        Component: Step1AddPassword,
        form: passwordForm,
      },
      {
        key: 'review_business_details',
        menuName: t('auth.register_page.menu_labels.review_business_details'),
        Component: Step2ReviewUserDetails,
      },
      {
        key: 'mobile_validation',
        menuName: t('auth.register_page.menu_labels.mobile_validation'),
        Component: SubUserMobileVerification,
      },
      {
        key: 'email_validation',
        menuName: t('auth.register_page.menu_labels.email_validation'),
        Component: SubUserEmailVerification,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const isCompleted = useCallback(
    (screen: string) => {
      return (
        {
          create_password: passwordForm.formState.isValid,
          review_business_details: activeStep > 1,
          mobile_validation: isPhoneValidated,
          email_validation: isEmailValidated,
        }[screen] || false
      );
    },
    [
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
            type='auto'
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
            <FormBuilder
              {...{
                CurrentStepItem,
                isPhoneValidated,
                isEmailValidated,
                setPhoneValidated,
                setEmailValidated,
                setActiveStep,
                activeStep,
                password,
              }}
            />
          </ScrollArea>
        </div>
        {/* MOBILE */}
        <div className='col-span-12 bg-white/40 backdrop-blur sm:hidden'>
          <MobileFormBuilder
            {...{
              CurrentStepItem,
              isPhoneValidated,
              isEmailValidated,
              setPhoneValidated,
              setEmailValidated,
              setActiveStep,
              activeStep,
              containerRef,
              password,
            }}
          />
        </div>
      </div>
    </div>
  );
}
