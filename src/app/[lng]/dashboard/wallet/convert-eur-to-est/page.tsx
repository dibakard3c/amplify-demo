'use client';

import React, { useMemo, useRef, useState } from 'react';
import AmountInput from '@estia/components/form/AmountInput';
import { Button } from '@estia/components/ui/button';
import { Anims, GradientCircle } from '@estia/assets';
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
import Lottie from 'lottie-react';
import { KYC_STATUS } from '@estia/constants/kyc-status';
import { useTranx } from '@estia/hooks/useTranx';
import { CONVERSION_MODES, PaymentModes } from '@estia/constants/wallet';
import { OTP_MODES, OTP_VIEW_TYPE } from '@estia/constants/otp';

export default function Page() {
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const [amount, setAmount] = useState(0);
  const [paymentRate, setPaymentRate] = useState(0);
  const [mode, setMode] = useState<PaymentModes>('');

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

  const { t } = useTranx();

  const { minutes, seconds, resetTimer } = useCountDownTimer(
    compareIgnoreCase(user?.kycStatus, KYC_STATUS.COMPLETED) &&
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
    if (amount <= 0) {
      Toast.showError({
        message: t('common.empty_amount_validation'),
      });
      return;
    }
    if (isEmpty(mode)) {
      checkBalance()
        .unwrap()
        .then((balanceInfo) => {
          if (amount > (balanceInfo?.ibanAmount || 0)) {
            Toast.showError({
              message: t('common.insufficient_balance_validation'),
            });
          } else {
            fetchEstimate({
              amount: amount,
              feeType: 'BUY_TOKENS',
            })
              .unwrap()
              .then(() => {
                setMode(CONVERSION_MODES.INITIATED);
              });
          }
        });
    } else {
      setMode(CONVERSION_MODES.OTP);
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
        setMode(CONVERSION_MODES.OTP);
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

  if (isIbanLoading) {
    return (
      <div className='mx-auto flex h-full min-h-44 max-w-[45%] flex-col items-center justify-center'>
        <div className='relative size-40 self-center overflow-hidden min-[140rem]:mb-24 min-[140rem]:size-60'>
          <Lottie
            animationData={Anims.loader}
            loop={true}
            className='h-full w-full'
          />
        </div>
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
        infoText={t(
          'dashboard.wallet.convert_eur_to_est_page.wallet_credit_desc'
        )}
        onProceed={() => {
          window.location.reload();
        }}
      />
    );
  }

  if (isLoading) {
    return (
      <DashboardSubNavCard
        title={t('dashboard.wallet.convert_eur_to_est_page.page_title')}
        titleClassName='mb-0'
      >
        <ProcessingLoader
          title={t('dashboard.wallet.conversion')}
          subtitle={t('dashboard.wallet.conversion_subtitle')}
          message={t('dashboard.wallet.conversion_msg')}
        />
      </DashboardSubNavCard>
    );
  }

  if (mode === CONVERSION_MODES.OTP) {
    return (
      <DashboardSubNavCard
        title={t('dashboard.wallet.convert_eur_to_est_page.page_title')}
        titleClassName='mb-0'
      >
        <OtpSecurityVerification
          ref={otpRef}
          title={t('common.security_verification')}
          message={t('common.security_verification_email_desc', {
            email: maskEmail(user?.email),
          })}
          titleClassName='text-center pb-3'
          messageClassName='text-center pb-3'
          mode={OTP_MODES.EMAIL}
          viewType={OTP_VIEW_TYPE.WALLET}
          onResendCode={sendTwoFactorEmail}
          onComplete={verifyTwoFactorEmail}
        />
      </DashboardSubNavCard>
    );
  }

  return (
    <DashboardSubNavCard
      title={t('dashboard.wallet.convert_eur_to_est_page.page_title')}
    >
      <AmountInput
        readonly={!isEmpty(mode)}
        infoText={t('dashboard.wallet.convert_eur_to_est_page.iban_debit')}
        rate={paymentRate || rate}
        onChangeValue={setAmount}
      />
      <div className='mt-5 flex max-lg:mb-12'>
        <GradientCircle className='mt-2 min-[140rem]:size-20'>
          <WalletIcon className='size-full min-[140rem]:size-10' />
        </GradientCircle>
        <div className='ml-4'>
          <h1 className='text-neutral-2 text-lg font-bold'>
            {t('dashboard.wallet.my_estia_iban')}
          </h1>
          <p className='text-neutral-2 mt-1 text-base font-medium md:text-lg min-[140rem]:mt-2'>
            {formatIBAN(ibanInfo?.iban)}
          </p>
        </div>
      </div>
      {mode === 'initiated' && (
        <div className='mt-6 w-2/3'>
          <div className='flex w-full justify-between'>
            <p className='text-neutral-2 text-base font-bold'>
              {t('dashboard.wallet.payment_fee')}
            </p>
            <p className='text-neutral-2 text-base font-medium'>{fees}</p>
          </div>
          <div className='mt-3 flex w-full justify-between'>
            <p className='text-neutral-2 text-base font-bold'>
              {t('dashboard.wallet.total_cost')}
            </p>
            <p className='text-neutral-2 text-base font-medium'>{totalCost}</p>
          </div>
        </div>
      )}
      <p className='text-neutral-2 mt-12 text-base font-medium min-[140rem]:mt-16 min-[140rem]:mb-4'>
        {t('dashboard.wallet.conversion_timer', {
          minutes,
          seconds,
        })}
      </p>
      <Button
        className='mt-4 h-14 w-full px-16 text-lg min-[140rem]:h-22 min-[140rem]:max-w-[45rem]'
        onClick={() => {
          if (isEmpty(mode)) {
            generateFee();
          } else {
            sendTwoFactorEmail();
          }
        }}
      >
        {isEmpty(mode) ? t('common.continue') : t('common.convert')}
      </Button>
      {!isEmpty(mode) ? (
        <Button
          variant={`outline`}
          className='border-primary mt-6 h-14 w-full px-16 text-lg'
          onClick={() => {
            setMode('');
          }}
        >
          {t('common.cancel')}
        </Button>
      ) : null}
    </DashboardSubNavCard>
  );
}
