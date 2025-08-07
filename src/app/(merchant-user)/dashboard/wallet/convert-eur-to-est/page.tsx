'use client';

import React, { useMemo, useRef, useState } from 'react';
import AmountInput from '@estia/components/form/AmountInput';
import { Button } from '@estia/components/ui/button';
import { GradientCircle } from '@estia/assets';
import WalletIcon from '@estia/assets/icons/wallet';
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
import { isEmpty } from 'lodash';
import ConversionSuccess from '@estia/components/general/ConversionSuccess';
import ErrorView from '@estia/components/general/ErrorView';
import {
  useBuyESTMutation,
  useCheckBalanceMutation,
  useFetchDefiWalletQuery,
  useFetchEstimateMutation,
  useFetchIbanInfoQuery,
} from '@estia/networking/endpoints/transaction';
import { formatIBAN } from '@estia/utils/currency';
import { useAppSelector } from '@estia/store/store';
import { selectDashboardSummary, selectUser } from '@estia/store/selector';
import {
  useSendTwoFactorOtpMutation,
  useVerifyTwoFactorOtpMutation,
} from '@estia/networking/endpoints/auth';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { useRouter } from 'next/navigation';
import { SCREENS } from '@estia/constants/screens';
import { useCountDownTimer } from '@estia/hooks/useCountDownTimer';
import { Toast } from '@estia/helpers/toast';
import { useSelector } from 'react-redux';

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
    buyTokens,
    { data: paymentData, error, isLoading, status: conversionStatus },
  ] = useBuyESTMutation();
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
    return defiInfo?.rate || 0;
  }, [defiInfo?.rate]);

  const fees = useMemo(() => {
    const data = (paymentData || feesData) as any;
    return compareIgnoreCase(data?.feeCurrency, 'EST', 'ESTIA')
      ? `EST ${formatNumber(data?.feeAmount || 0)}`
      : formatCurrency(data?.feeAmount || 0);
  }, [feesData, paymentData]);

  const totalCost = useMemo(() => {
    let _fee: number;
    if (compareIgnoreCase(feesData?.feeCurrency, 'EST', 'ESTIA')) {
      _fee = +(feesData?.feeAmount || 0) / paymentRate;
    } else {
      _fee = +(feesData?.feeAmount || 0);
    }
    return formatCurrency(_fee + +amount);
  }, [amount, feesData?.feeAmount, paymentRate, feesData?.feeCurrency]);

  function generateFee() {
    if (isEmpty(mode)) {
      checkBalance()
        .unwrap()
        .then((balanceInfo) => {
          if (amount > (balanceInfo?.ibanAmount || 0)) {
            Toast.showError({
              message:
                'Insufficient balance. Please enter a valid amount to proceed.',
            });
          } else {
            fetchEstimate({
              amount: amount,
              feeType: 'BUY_TOKENS',
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
    buyTokens({
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
        amount={amount}
        amountConversion={amount * paymentRate}
        fees={fees}
        received={amount * paymentRate}
        transRef={paymentData?.estiaTxId}
        infoText='You will be notified once the EST have been successfully added to your wallet.'
        onProceed={() => {
          window.location.reload();
        }}
      />
    );
  }

  if (isLoading) {
    return (
      <ProcessingLoader
        className='mx-auto -mt-12 h-full max-w-[45%]'
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
    <div className='mx-auto flex max-w-[45%] flex-col items-center justify-center'>
      <h1 className='mb-12 text-3xl font-bold'>Convert EUR to EST</h1>
      <AmountInput
        readonly={!isEmpty(mode)}
        infoText='EUR will be debited from this IBAN'
        rate={paymentRate || rate}
        onChangeValue={setAmount}
      />
      <div className='mt-5 flex'>
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
            <p className='text-neutral-2 text-base font-medium'>{fees}</p>
          </div>
          <div className='mt-3 flex w-full justify-between'>
            <p className='text-neutral-2 text-base font-bold'>Total cost fee</p>
            <p className='text-neutral-2 text-base font-medium'>{totalCost}</p>
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
    </div>
  );
}
