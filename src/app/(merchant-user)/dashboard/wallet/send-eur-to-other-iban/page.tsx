'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import AmountInput from '@estia/components/form/AmountInput';
import { Button } from '@estia/components/ui/button';
import { GradientCircle } from '@estia/assets';
import {
  compareIgnoreCase,
  formatCurrency,
  formatNumber,
  maskEmail,
} from '@estia/utils/general';
import OtpSecurityVerification, {
  OtpSecurityVerificationRef,
} from '@estia/components/auth/otp-security-verification';
import ProcessingLoader from '@estia/components/general/ProcessingLoader';
import { get, isEmpty } from 'lodash';
import ErrorView from '@estia/components/general/ErrorView';
import { ChevronDown } from 'lucide-react';
import TransferSuccess from '@estia/components/general/TransferSuccess';
import { useForm } from 'react-hook-form';
import { SendEurForm } from '@estia/typings/wallet-forms';
import { sendEurResolver } from '@estia/helpers/resolvers';
import { Form, FormControl, FormField } from '@estia/components/ui/form';
import {
  useCheckBalanceMutation,
  useFetchFiatWalletQuery,
  useListIbanQuery,
  useSendEuroToOtherIbanMutation,
} from '@estia/networking/endpoints/transaction';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@estia/components/ui/select';
import { cn } from '@estia/lib/utils';
import {
  useSendTwoFactorOtpMutation,
  useVerifyTwoFactorOtpMutation,
} from '@estia/networking/endpoints/auth';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { useAppSelector } from '@estia/store/store';
import { selectUser } from '@estia/store/selector';
import { useRouter } from 'next/navigation';
import { SCREENS } from '@estia/constants/screens';
import { BankIcon } from '@estia/assets/icons/wallet';
import { formatIBAN } from '@estia/utils/currency';
import { Toast } from '@estia/helpers/toast';
import DashboardSubNavCard from '@estia/components/layout/dashboard-sub-nav-card';

export default function Page() {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const [mode, setMode] = useState<
    | 'initiated'
    | 'confirmed'
    | 'otp'
    | 'processing'
    | 'success'
    | 'error'
    | string
  >('');

  const otpRef = useRef<OtpSecurityVerificationRef>(null);

  const { data: myIbanDetails } = useFetchFiatWalletQuery(undefined, {
    skip: !compareIgnoreCase(user?.kycStatus, 'completed'),
  });

  const { data: externalIbans, isLoading } = useListIbanQuery();
  const [sendEuro, { data: paymentData, error, status: transStatus }] =
    useSendEuroToOtherIbanMutation();

  //verification
  const [sendOtp] = useSendTwoFactorOtpMutation();
  const [verifyOtp] = useVerifyTwoFactorOtpMutation();
  const [checkBalance] = useCheckBalanceMutation();

  const sendEuroToOtherIbanForm = useForm<SendEurForm>({
    resolver: sendEurResolver,
    mode: 'onChange',
    delayError: 500,
  });

  const amount = sendEuroToOtherIbanForm.watch('amount');
  const selectedIban = sendEuroToOtherIbanForm.watch('iban');

  const fees = useMemo(
    () =>
      compareIgnoreCase(paymentData?.feeCurrency, 'EST', 'ESTIA')
        ? `EST ${formatNumber(paymentData?.feeAmount || 0)}`
        : formatCurrency(paymentData?.feeAmount || 0),
    [paymentData]
  );

  useEffect(() => {
    const firstIban = get(externalIbans, 0);
    if (firstIban) {
      sendEuroToOtherIbanForm.setValue('iban', firstIban);
    }
  }, [externalIbans]);

  function sendEuros() {
    sendEuro({
      amount: amount,
      bankBeneficiaryId: selectedIban?.bankBeneficiaryId,
      hideLoader: true,
      hideErrorMsg: true,
    });
  }

  function sendTwoFactorEmail() {
    sendOtp('TWO_STEP_VERIFICATION_EMAIL')
      .unwrap()
      .then(() => {
        setMode('otp');
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
        sendEuros();
      })
      .catch(() => {
        otpRef.current?.reset();
      });
  }

  function initiatePayment() {
    checkBalance()
      .unwrap()
      .then((balanceInfo) => {
        if (amount > (balanceInfo?.ibanAmount || 0)) {
          Toast.showError({
            message:
              'Insufficient balance. Please enter a valid amount to proceed.',
          });
        } else {
          setMode('initiated');
        }
      });
  }

  if (transStatus === QueryStatus.rejected) {
    return (
      <ErrorView
        errorMsg={(error as any)?.data?.detail}
        onProceed={() => {
          window.location.reload();
        }}
      />
    );
  }

  if (mode === 'success') {
    return (
      <TransferSuccess
        amount={amount}
        fees={fees}
        received={amount}
        fromIban={{
          name: myIbanDetails?.bankAccountHolderName || '',
          iban: myIbanDetails?.iban || '',
        }}
        toIban={selectedIban}
        transRef={paymentData?.estiaTxId}
        onProceed={() => {
          window.location.reload();
        }}
      />
    );
  }

  if (mode === 'processing') {
    return (
      <ProcessingLoader
        className='mx-auto -mt-12 h-full max-w-[45%]'
        subtitle='Initiating transfer'
        message='Please don’t leave this screen'
        onProceed={() => {
          setMode('success');
        }}
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

  if (isLoading) {
    return (
      <div className='mx-auto flex h-full max-w-[45%] flex-col items-center justify-center'>
        <h3 className='text-center text-xl font-semibold'>Loading...</h3>
      </div>
    );
  }

  if (!isLoading && isEmpty(externalIbans)) {
    return (
      <ErrorView
        title='No External IBAN Available'
        errorMsg={'You have not created any external IBAN on your account'}
        btnTitle='Create External IBAN'
        onProceed={() => {
          router.push(SCREENS.EXTERNAL_IBAN_MANAGEMENT);
        }}
      />
    );
  }

  return (
    <Form {...sendEuroToOtherIbanForm}>
      <DashboardSubNavCard title='Send EUR to other IBAN'>
        <FormField
          control={sendEuroToOtherIbanForm?.control}
          name='amount'
          render={({ field }) => (
            <AmountInput
              readonly={!isEmpty(mode)}
              showDetails={false}
              infoText='EUR will be debited from this IBAN'
              onChangeValue={field.onChange}
            />
          )}
        />
        <h5 className='text-primary-1 mt-6 mb-2 text-lg font-bold max-lg:mb-12'>
          EUR will be transferred to this IBAN
        </h5>
        <FormField
          control={sendEuroToOtherIbanForm?.control}
          name='iban'
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(JSON.parse(value));
              }}
            >
              <FormControl>
                <SelectTrigger
                  showIcon={false}
                  className={cn(
                    'ring-none focus:ring-none w-auto max-w-96 border-none shadow-none outline-none data-[size=default]:h-auto'
                  )}
                >
                  <div className='mt-5 flex items-center'>
                    <GradientCircle>
                      <BankIcon className='size-full' />
                    </GradientCircle>
                    <div className='ml-2'>
                      <h1 className='text-neutral-2 text-lg font-bold'>
                        {field?.value?.name}
                      </h1>
                      <p className='text-neutral-2 mt-1 text-lg font-medium'>
                        {formatIBAN(field?.value?.iban)}
                      </p>
                    </div>
                    <ChevronDown className='ml-4' />
                  </div>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {externalIbans?.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={JSON.stringify(item)}
                    className='py-3'
                  >
                    <p className='ml-1 text-base font-bold'>{item?.name}</p>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <Button
          disabled={!sendEuroToOtherIbanForm?.formState?.isValid}
          className='mt-12 h-14 w-full px-16 text-lg'
          onClick={() => {
            if (isEmpty(mode)) {
              initiatePayment();
            } else {
              sendTwoFactorEmail();
            }
          }}
        >
          {isEmpty(mode) ? 'Continue' : 'Transfer'}
        </Button>
        {!isEmpty(mode) ? (
          <Button
            variant='outline'
            className='border-primary mt-6 h-14 w-full px-16 text-lg'
            onClick={() => {
              setMode('');
            }}
          >
            Cancel
          </Button>
        ) : null}
      </DashboardSubNavCard>
    </Form>
  );
}
