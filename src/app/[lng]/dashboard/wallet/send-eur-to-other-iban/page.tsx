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
  useListFiatFriendlyWalletQuery,
  useSendEuroToOtherIbanMutation,
} from '@estia/networking/endpoints/transaction';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@estia/components/ui/select';
import { cn } from '@estia/utils/utils';
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
import { CONVERSION_MODES, PaymentModes } from '@estia/constants/wallet';
import { KYC_STATUS } from '@estia/constants/kyc-status';
import { useTranx } from '@estia/hooks/useTranx';
import { OTP_MODES, OTP_VIEW_TYPE } from '@estia/constants/otp';

export default function Page() {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const [mode, setMode] = useState<PaymentModes>('');

  const otpRef = useRef<OtpSecurityVerificationRef>(null);

  const { data: myIbanDetails } = useFetchFiatWalletQuery(undefined, {
    skip: !compareIgnoreCase(user?.kycStatus, KYC_STATUS.COMPLETED),
  });

  const { data: externalIbans, isLoading } = useListFiatFriendlyWalletQuery();
  const [sendEuro, { data: paymentData, error, status: transStatus }] =
    useSendEuroToOtherIbanMutation();

  //verification
  const [sendOtp] = useSendTwoFactorOtpMutation();
  const [verifyOtp] = useVerifyTwoFactorOtpMutation();
  const [checkBalance] = useCheckBalanceMutation();

  const { t } = useTranx();

  const sendEuroToOtherIbanForm = useForm<SendEurForm>({
    resolver: sendEurResolver,
    mode: `onChange`,
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
      sendEuroToOtherIbanForm.setValue('iban', firstIban as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        sendEuros();
      })
      .catch(() => {
        otpRef.current?.reset();
        otpRef.current?.countFailedAttempt();
      });
  }

  function initiatePayment() {
    if (amount <= 0) {
      Toast.showError({
        message: t('common.empty_amount_validation'),
      });
      return;
    }
    checkBalance()
      .unwrap()
      .then((balanceInfo) => {
        if (amount > (balanceInfo?.ibanAmount || 0)) {
          Toast.showError({
            message: t('common.insufficient_balance_validation'),
          });
        } else {
          setMode(CONVERSION_MODES.OTP);
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

  if (mode === CONVERSION_MODES.SUCCESS) {
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
        className='mx-auto -mt-4 h-full md:-mt-12 md:max-w-[45%]'
        subtitle={t('dashboard.wallet.transfer_subtitle')}
        message={t('dashboard.wallet.conversion_msg')}
        onProceed={() => {
          setMode(CONVERSION_MODES.SUCCESS);
        }}
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
        titleClassName='text-center pb-3'
        messageClassName='text-center pb-3'
        mode={OTP_MODES.EMAIL}
        viewType={OTP_VIEW_TYPE.WALLET}
        onResendCode={sendTwoFactorEmail}
        onComplete={verifyTwoFactorEmail}
      />
    );
  }

  if (isLoading) {
    return (
      <div className='mx-auto flex h-full min-h-44 max-w-[45%] flex-col items-center justify-center'>
        <h3 className='text-center text-lg font-semibold lg:text-xl'>
          {t('common.loading')}
        </h3>
      </div>
    );
  }

  if (!isLoading && isEmpty(externalIbans)) {
    return (
      <ErrorView
        title={t('dashboard.wallet.send_eur_page.no_iban_title')}
        errorMsg={t('dashboard.wallet.send_eur_page.no_iban_msg')}
        btnTitle={t('dashboard.wallet.send_eur_page.no_iban_btn')}
        onProceed={() => {
          router.push(SCREENS.EXTERNAL_IBAN_MANAGEMENT);
        }}
      />
    );
  }

  return (
    <Form {...sendEuroToOtherIbanForm}>
      <DashboardSubNavCard
        title={t('dashboard.wallet.send_eur_page.page_title')}
      >
        <FormField
          control={sendEuroToOtherIbanForm?.control}
          name='amount'
          render={({ field }) => (
            <AmountInput
              readonly={!isEmpty(mode)}
              showDetails={false}
              infoText={t('dashboard.wallet.send_eur_page.iban_debit_desc')}
              onChangeValue={field.onChange}
            />
          )}
        />
        <h5 className='text-primary-1 mt-6 mb-2 text-lg font-bold max-lg:mb-12 min-[140rem]:my-12'>
          {t('dashboard.wallet.send_eur_page.iban_transfer_desc')}
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
                    'ring-none focus:ring-none w-auto border-none shadow-none outline-none data-[size=default]:h-auto max-[140rem]:max-w-96'
                  )}
                >
                  <div className='mt-5 flex items-center'>
                    <GradientCircle className='mt-2 min-[140rem]:size-20'>
                      <BankIcon className='size-full min-[140rem]:size-10' />
                    </GradientCircle>
                    <div className='ml-2 min-[140rem]:px-2'>
                      <h1 className='text-neutral-2 text-lg font-bold'>
                        {field?.value?.name}
                      </h1>
                      <p className='text-neutral-2 mt-1 text-lg font-medium min-[140rem]:mt-3'>
                        {formatIBAN(field?.value?.iban)}
                      </p>
                    </div>
                    <ChevronDown className='ml-4 min-[140rem]:size-12' />
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
                    <p className='ml-1 text-base font-bold'>{item?.alias}</p>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <Button
          disabled={!sendEuroToOtherIbanForm?.formState?.isValid}
          size='lg'
          className='mt-12 w-full px-16 text-lg'
          onClick={() => {
            if (isEmpty(mode)) {
              initiatePayment();
            } else {
              sendTwoFactorEmail();
            }
          }}
        >
          {isEmpty(mode) ? t('common.continue') : t('common.transfer')}
        </Button>
        {!isEmpty(mode) ? (
          <Button
            variant='outline'
            className='border-primary mt-6 h-14 w-full px-16 text-lg'
            onClick={() => {
              setMode('');
            }}
          >
            {t('common.cancel')}
          </Button>
        ) : null}
      </DashboardSubNavCard>
    </Form>
  );
}
