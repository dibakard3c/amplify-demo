'use client';

import React, { useRef, useState } from 'react';
import AmountInput from '@estia/components/form/AmountInput';
import { Button } from '@estia/components/ui/button';
import OtpSecurityVerification, {
  OtpSecurityVerificationRef,
} from '@estia/components/auth/otp-security-verification';
import ProcessingLoader from '@estia/components/general/ProcessingLoader';
import ConversionSuccess from '@estia/components/general/ConversionSuccess';
import ErrorView from '@estia/components/general/ErrorView';
import { FormSelectField } from '@estia/components/form/form-select';
import { useForm } from 'react-hook-form';
import { sendEstResolver } from '@estia/helpers/resolvers';
import { Form, FormField } from '@estia/components/ui/form';
import {
  useSendTwoFactorOtpMutation,
  useVerifyTwoFactorOtpMutation,
} from '@estia/networking/endpoints/auth';
import {
  useCheckBalanceMutation,
  useSendEstToWalletMutation,
} from '@estia/networking/endpoints/transaction';
import { maskEmail } from '@estia/utils/general';
import { useAppSelector } from '@estia/store/store';
import { selectUser } from '@estia/store/selector';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { SendEstForm } from '@estia/typings/wallet-forms';
import { FormInputField } from '@estia/components/form/form-input';
import { isEmpty } from 'lodash';
import { Toast } from '@estia/helpers/toast';
import DashboardSubNavCard from '@estia/components/layout/dashboard-sub-nav-card';
import { CONVERSION_MODES, PaymentModes } from '@estia/constants/wallet';
import { useTranx } from '@estia/hooks/useTranx';
import { OTP_MODES, OTP_VIEW_TYPE } from '@estia/constants/otp';

export default function Page() {
  const user = useAppSelector(selectUser);
  const sendEstForm = useForm<SendEstForm>({
    resolver: sendEstResolver,
    mode: `onChange`,
    defaultValues: {
      amount: 0,
      address: '',
      friendly_wallet_name: '',
    },
    delayError: 500,
  });

  const amount = sendEstForm.watch(`amount`);
  const address = sendEstForm.watch(`address`);

  const otpRef = useRef<OtpSecurityVerificationRef>(null);

  const [mode, setMode] = useState<PaymentModes>('');

  //verification
  const [sendOtp] = useSendTwoFactorOtpMutation();
  const [verifyOtp] = useVerifyTwoFactorOtpMutation();
  const [sendToken, { isLoading, status: transferStatus, error }] =
    useSendEstToWalletMutation();
  const [checkBalance] = useCheckBalanceMutation();

  const { t } = useTranx();

  function convert() {
    sendToken({
      amount: amount,
      receiverAddress: address,
      hideLoader: true,
      hideErrorMsg: true,
    });
  }

  function sendTwoFactorEmail() {
    if (amount <= 0) {
      Toast.showError({
        message: t('common.empty_amount_validation'),
      });
      return;
    }
    checkBalance()
      .unwrap()
      .then((balanceInfo) => {
        if (amount > (balanceInfo?.estiaAmount || 0)) {
          Toast.showError({
            message: t('common.insufficient_balance_validation'),
          });
        } else {
          sendOtp('TWO_STEP_VERIFICATION_EMAIL')
            .unwrap()
            .then(() => {
              setMode(CONVERSION_MODES.OTP);
            });
        }
      });
  }

  function verifyTwoFactorEmail(otpCode: string) {
    verifyOtp({
      otpType: 'TWO_STEP_VERIFICATION_EMAIL',
      otp: otpCode,
    })
      .unwrap()
      .then(() => {
        setMode(CONVERSION_MODES.PROCESSING);
        convert();
      })
      .catch(() => {
        otpRef.current?.reset();
        otpRef.current?.countFailedAttempt();
      });
  }

  if (transferStatus === QueryStatus.rejected) {
    return (
      <ErrorView
        errorMsg={(error as any)?.data?.detail}
        onProceed={() => {
          window.location.reload();
        }}
      />
    );
  }

  if (transferStatus === QueryStatus.fulfilled) {
    return (
      <ConversionSuccess
        isFromEst
        isTransfer
        amount={amount}
        walletAddress={address}
        infoText={t('dashboard.wallet.send_est_page.wallet_transfer_desc')}
        onProceed={() => {
          window.location.reload();
        }}
      />
    );
  }

  if (isLoading) {
    return (
      <ProcessingLoader
        className='mx-auto w-full md:mt-24 md:max-w-[45%]'
        title={t('dashboard.wallet.conversion')}
        subtitle={t('dashboard.wallet.conversion_subtitle')}
        message={t('dashboard.wallet.conversion_msg')}
      />
    );
  }

  if (mode === CONVERSION_MODES.OTP) {
    return (
      <OtpSecurityVerification
        ref={otpRef}
        title={t('common.security_verification')}
        message={t('common.security_verification_email_desc', {
          email: maskEmail(user?.email),
        })}
        titleClassName={`text-center pb-3`}
        messageClassName={`text-center pb-3`}
        mode={OTP_MODES.EMAIL}
        viewType={OTP_VIEW_TYPE.WALLET}
        onResendCode={sendTwoFactorEmail}
        onComplete={verifyTwoFactorEmail}
      />
    );
  }

  return (
    <Form {...sendEstForm}>
      <DashboardSubNavCard
        title={t('dashboard.wallet.send_est_page.page_title')}
        titleClassName='text-xl'
      >
        <FormField
          control={sendEstForm?.control}
          name='amount'
          render={({ field }) => (
            <AmountInput
              isFromEst
              showDetails={false}
              rate={1.99}
              onChangeValue={field.onChange}
            />
          )}
        />
        <h1 className='text-primary-1 mt-8 mb-4 text-lg font-bold min-[140rem]:mb-10'>
          {t('dashboard.wallet.send_est_page.send_to')}
        </h1>
        <FormField
          control={sendEstForm?.control}
          name='address'
          render={({ field, formState }) => (
            <FormInputField
              value={field?.value}
              onChange={field.onChange}
              placeholder={t(
                'dashboard.wallet.send_est_page.form_labels.address_hint'
              )}
              className='text-neutral-1 placeholder:text-neutral-4 w-full text-2xl'
              inputClassName='w-full max-w-full min-[140rem]:p-6 min-[140rem]:py-10'
              aria-invalid={!isEmpty(formState?.errors?.address)}
            />
          )}
        />
        <FormField
          control={sendEstForm?.control}
          name='friendly_wallet_name'
          render={({ field }) => (
            <FormSelectField
              label={t(
                'dashboard.wallet.send_est_page.form_labels.wallet_hint'
              )}
              value={field?.value}
              onChange={field.onChange}
              placeholder={t(
                'dashboard.wallet.send_est_page.form_labels.wallet_hint'
              )}
              items={undefined}
              className='mt-6 w-full'
              inputClassName='w-full max-w-full min-[140rem]:p-6 min-[140rem]:py-10'
            />
          )}
        />
        <Button
          size='lg'
          disabled={!sendEstForm?.formState?.isValid}
          className='mt-10 w-full px-16 text-lg font-bold'
          onClick={() => {
            sendTwoFactorEmail();
          }}
        >
          {t('common.continue')}
        </Button>
      </DashboardSubNavCard>
    </Form>
  );
}
