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

export default function Page() {
  const user = useAppSelector(selectUser);
  const sendEstForm = useForm<SendEstForm>({
    resolver: sendEstResolver,
    mode: 'onChange',
    defaultValues: {
      amount: 0,
      address: '',
      friendly_wallet_name: '',
    },
    delayError: 500,
  });

  const amount = sendEstForm.watch('amount');
  const address = sendEstForm.watch('address');

  const otpRef = useRef<OtpSecurityVerificationRef>(null);

  const [mode, setMode] = useState<
    | 'initiated'
    | 'confirmed'
    | 'otp'
    | 'processing'
    | 'success'
    | 'error'
    | string
  >('');

  //verification
  const [sendOtp] = useSendTwoFactorOtpMutation();
  const [verifyOtp] = useVerifyTwoFactorOtpMutation();
  const [sendToken, { isLoading, status: transferStatus, error }] =
    useSendEstToWalletMutation();
  const [checkBalance] = useCheckBalanceMutation();

  function convert() {
    sendToken({
      amount: amount,
      receiverAddress: address,
      hideLoader: true,
      hideErrorMsg: true,
    });
  }

  function sendTwoFactorEmail() {
    checkBalance()
      .unwrap()
      .then((balanceInfo) => {
        if (amount > (balanceInfo?.estiaAmount || 0)) {
          Toast.showError({
            message:
              'Insufficient balance. Please enter a valid amount to proceed.',
          });
        } else {
          sendOtp('TWO_STEP_VERIFICATION_EMAIL')
            .unwrap()
            .then(() => {
              setMode('otp');
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
        setMode('processing');
        convert();
      })
      .catch(() => {
        otpRef.current?.reset();
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
        infoText='You will be notified once the EST have been successfully send to the wallet'
        onProceed={() => {
          window.location.reload();
        }}
      />
    );
  }

  if (isLoading) {
    return (
      <ProcessingLoader
        className='mx-auto mt-24 max-w-[45%]'
        title='Conversion'
        subtitle='Initiating conversion'
        message='Please don’t leave this screen'
      />
    );
  }

  if (mode === 'otp') {
    return (
      <OtpSecurityVerification
        ref={otpRef}
        title='Security Verification'
        titleClassName='text-center pb-3'
        message={`Please enter 6-digit code we have sent to at ${maskEmail(user?.email)}`}
        messageClassName='text-center pb-3'
        mode='email'
        onResendCode={sendTwoFactorEmail}
        onComplete={verifyTwoFactorEmail}
        className='mx-auto mt-24 max-w-[45%] xl:max-w-[400px]'
        actionText='Send me again'
      />
    );
  }

  return (
    <Form {...sendEstForm}>
      <div className='mx-auto mt-24 flex max-w-[45%] flex-col items-center justify-center'>
        <h1 className='mb-6 text-3xl font-bold'>Send EST to other Wallets</h1>
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
        <h1 className='text-primary-1 mt-8 mb-4 text-lg font-bold'>Send to</h1>
        <FormField
          control={sendEstForm?.control}
          name='address'
          render={({ field, formState }) => (
            <FormInputField
              value={field?.value}
              onChange={field.onChange}
              placeholder='Enter recipient address'
              className='text-neutral-1 placeholder:text-neutral-4 w-full text-2xl'
              inputClassName='w-full max-w-full'
              aria-invalid={!isEmpty(formState?.errors?.address)}
            />
          )}
        />
        <FormField
          control={sendEstForm?.control}
          name='friendly_wallet_name'
          render={({ field }) => (
            <FormSelectField
              label='WALLET FRIENDLY NAME'
              value={field?.value}
              onChange={field.onChange}
              placeholder='Your wallet friendly name'
              items={undefined}
              className='mt-6 w-full'
              inputClassName='max-w-auto'
            />
          )}
        />
        <Button
          disabled={!sendEstForm?.formState?.isValid}
          className='mt-10 h-14 w-full px-16 text-lg font-bold'
          onClick={() => {
            sendTwoFactorEmail();
          }}
        >
          Continue
        </Button>
      </div>
    </Form>
  );
}
