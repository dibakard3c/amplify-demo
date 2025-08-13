'use client';

import React, { useMemo, useRef, useState } from 'react';
import AmountInput from '@estia/components/form/AmountInput';
import { Button } from '@estia/components/ui/button';
import { GradientCircle } from '@estia/assets';
import WalletIcon from '@estia/assets/icons/wallet';
import {
  compareIgnoreCase,
  formatCurrency,
  maskEmail,
} from '@estia/utils/general';
import OtpSecurityVerification, {
  OtpSecurityVerificationRef,
} from '@estia/components/auth/otp-security-verification';
import ProcessingLoader from '@estia/components/general/ProcessingLoader';
import { isEmpty } from 'lodash';
import ConversionSuccess from '@estia/components/general/ConversionSuccess';
import ErrorView from '@estia/components/general/ErrorView';
import {
  useCheckBalanceMutation,
  useFetchDefiWalletQuery,
  useFetchEstimateMutation,
  useFetchIbanInfoQuery,
  useSellESTMutation,
} from '@estia/networking/endpoints/transaction';
import {
  formatIBAN,
  formatNumbers,
  parseLocalizedNumber,
} from '@estia/utils/currency';
import { useAppSelector } from '@estia/store/store';
import { selectUser } from '@estia/store/selector';
import {
  useSendTwoFactorOtpMutation,
  useVerifyTwoFactorOtpMutation,
} from '@estia/networking/endpoints/auth';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { useRouter } from 'next/navigation';
import { SCREENS } from '@estia/constants/screens';
import { useCountDownTimer } from '@estia/hooks/useCountDownTimer';
import { Toast } from '@estia/helpers/toast';
import DashboardSubNavCard from '@estia/components/layout/dashboard-sub-nav-card';

export default function Page() {
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const [amount, setAmount] = useState(0);
  const [paymentRate, setPaymentRate] = useState(0);
  const [mode, setMode] = useState<'initiated' | 'confirmed' | 'otp' | string>(
    ''
  );

  const otpRef = useRef<OtpSecurityVerificationRef>(null);

  const { data: ibanInfo, isLoading: isIbanLoading } = useFetchIbanInfoQuery(
    undefined,
    {
      skip: !compareIgnoreCase(user?.kycStatus, 'COMPLETED'),
    }
  );
  const { data: defiInfo } = useFetchDefiWalletQuery(undefined, {
    skip: !compareIgnoreCase(user?.kycStatus, 'COMPLETED'),
  });
  const [
    sellTokens,
    { data: paymentData, error, isLoading, status: conversionStatus },
  ] = useSellESTMutation();
  const [fetchEstimate, { data: feesData }] = useFetchEstimateMutation();
  const [checkBalance] = useCheckBalanceMutation();

  //verification
  const [sendOtp] = useSendTwoFactorOtpMutation();
  const [verifyOtp] = useVerifyTwoFactorOtpMutation();

  const { minutes, seconds, resetTimer } = useCountDownTimer(
    compareIgnoreCase(user?.kycStatus, 'completed') &&
      process.env.NODE_ENV !== 'development',
    40,
    () => {
      if (
        !isLoading &&
        conversionStatus !== QueryStatus.rejected &&
        conversionStatus !== QueryStatus.fulfilled &&
        process.env.NODE_ENV !== 'development'
      ) {
        router.replace(SCREENS.DASHBOARD);
      } else {
        resetTimer();
      }
    }
  );

  const rate = useMemo(() => {
    return paymentRate || defiInfo?.rate || 0;
  }, [defiInfo?.rate, paymentRate]);

  const feesInEst = useMemo(() => {
    let _fee: number;
    const data = (paymentData || feesData) as any;
    if (compareIgnoreCase(data?.feeCurrency, 'EST', 'ESTIA')) {
      _fee = +(data?.feeAmount || 0) / rate;
    } else {
      _fee = +(data?.feeAmount || 0);
    }
    return _fee / rate;
  }, [paymentData, feesData, rate]);

  const totalCostInEuro = useMemo(() => {
    let _fee: number;
    const data = (paymentData || feesData) as any;
    if (compareIgnoreCase(data?.feeCurrency, 'EST', 'ESTIA')) {
      _fee = +(data?.feeAmount || 0) / rate;
    } else {
      _fee = +(data?.feeAmount || 0);
    }
    const euroConversion = +(parseLocalizedNumber(amount) || 0) / rate;
    return _fee + +euroConversion;
  }, [paymentData, feesData, amount, rate]);

  function generateFee() {
    if (isEmpty(mode)) {
      checkBalance()
        .unwrap()
        .then((balanceInfo) => {
          if (amount > (balanceInfo?.estiaAmount || 0)) {
            Toast.showError({
              message:
                'Insufficient balance. Please enter a valid amount to proceed.',
            });
          } else {
            fetchEstimate({
              amount: amount,
              feeType: 'SELL_TOKENS',
            })
              .unwrap()
              .then(() => {
                setMode('initiated');
              });
          }
        });
    } else {
      setMode('otp');
    }
  }

  function convert() {
    sellTokens({
      amount: amount,
      hideLoader: true,
      hideErrorMsg: true,
    })
      .unwrap()
      .then(() => {
        setPaymentRate(+(defiInfo?.rate || 0));
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
        convert();
      })
      .catch(() => {
        otpRef.current?.reset();
      });
  }

  if (isIbanLoading) {
    return (
      <div className='mx-auto flex h-full max-w-[45%] flex-col items-center justify-center'>
        <h3 className='text-center text-xl font-semibold'>Loading...</h3>
      </div>
    );
  }

  if (conversionStatus === QueryStatus.rejected) {
    return (
      <ErrorView
        errorMsg={(error as any)?.data?.detail}
        onProceed={() => {
          window.location.reload();
        }}
      />
    );
  }

  if (conversionStatus === QueryStatus.fulfilled) {
    return (
      <ConversionSuccess
        isFromEst
        infoText='You will be notified once the EUR have been successfully added to your IBAN.'
        amount={amount}
        amountConversion={amount / rate}
        fees={`EST ${formatNumbers(feesInEst)}`}
        received={amount / rate}
        transRef={paymentData?.estiaTxId}
        onProceed={() => {
          window.location.reload();
        }}
      />
    );
  }

  if (isLoading) {
    return (
      <ProcessingLoader
        className='mx-auto -mt-12 h-full w-full md:max-w-[45%]'
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
        className='mx-auto mt-24 w-full md:max-w-[45%] xl:max-w-[400px]'
        actionText='Send me again'
      />
    );
  }

  return (
    <DashboardSubNavCard title='Convert EST to EUR'>
      <AmountInput
        isFromEst
        readonly={!isEmpty(mode)}
        infoText='EUR will be sent to this IBAN'
        rate={rate}
        onChangeValue={setAmount}
      />
      <div className='mt-5 flex max-lg:mb-12'>
        <GradientCircle className='mt-2'>
          <WalletIcon className='size-full' />
        </GradientCircle>
        <div className='ml-4'>
          <h1 className='text-neutral-2 text-lg font-bold'>My Estia IBAN</h1>
          <p className='text-neutral-2 mt-1 text-lg font-medium'>
            {formatIBAN(ibanInfo?.iban)}
          </p>
        </div>
      </div>
      {mode === 'initiated' && (
        <div className='mt-6 w-2/3'>
          <div className='flex w-full justify-between'>
            <p className='text-neutral-2 text-base font-bold'>Payment fee</p>
            <p className='text-neutral-2 text-base font-medium'>
              EST {formatNumbers(feesInEst)}
            </p>
          </div>
          <div className='mt-3 flex w-full justify-between'>
            <p className='text-neutral-2 text-base font-bold'>Total cost fee</p>
            <p className='text-neutral-2 text-base font-medium'>
              EST {formatNumbers(rate * totalCostInEuro)} (
              {formatCurrency(totalCostInEuro)})
            </p>
          </div>
        </div>
      )}
      <p className='text-neutral-2 mt-12 text-base font-medium'>
        Complete conversion in {minutes}:{seconds}
      </p>
      <Button
        className='mt-4 h-14 w-full px-16 text-lg'
        onClick={() => {
          if (isEmpty(mode)) {
            generateFee();
          } else {
            sendTwoFactorEmail();
          }
        }}
      >
        {isEmpty(mode) ? 'Continue' : 'Convert'}
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
  );
}
