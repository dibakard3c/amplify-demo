import React, { PropsWithChildren } from 'react';
import { CopyIcon, Icons } from '@estia/assets';
import { cn } from '@estia/utils/utils';
import Image from 'next/image';
import { formatCurrency, formatNumber } from '@estia/utils/general';
import { Button } from '@estia/components/ui/button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Toast } from '@estia/helpers/toast';
import { get } from 'lodash';
import { useTranx } from '@estia/hooks/useTranx';

interface ConversionSuccessProps extends PropsWithChildren {
  className?: string;
  infoText?: string;
  onProceed: () => void;
  isFromEst?: boolean;
  isTransfer?: boolean;
  walletAddress?: string;
  amount?: number;
  amountConversion?: number;
  fees?: string;
  received?: number;
  transRef?: string;
}

export default function ConversionSuccess({
  className,
  onProceed,
  isFromEst,
  infoText,
  isTransfer,
  walletAddress,
  amount,
  amountConversion,
  fees,
  received,
  transRef,
}: ConversionSuccessProps) {
  const { t } = useTranx();

  return (
    <div
      className={cn(
        'mx-auto flex w-full flex-col items-center justify-center sm:max-w-[40%]',
        className
      )}
    >
      <h1 className='text-xl font-bold md:text-2xl'>
        {t('dashboard.wallet.conversion_success_title')}
      </h1>
      <div className='relative my-8 size-28 min-[140rem]:my-12 min-[140rem]:size-44'>
        <Image src={Icons.success} alt='' fill />
      </div>
      {!isTransfer || false ? (
        <>
          <h2 className='text-lg font-bold'>
            {t('dashboard.wallet.you_will_convert')}
          </h2>
          {isFromEst ? (
            <>
              <h3 className='my-4 text-4xl font-medium min-[140rem]:my-6 min-[140rem]:text-5xl'>
                EST {formatNumber(amount)}{' '}
              </h3>
              <h4 className='text-xl font-medium min-[140rem]:text-2xl'>
                {formatCurrency(amountConversion)}
              </h4>
            </>
          ) : (
            <>
              <h3 className='my-4 text-4xl font-medium min-[140rem]:my-6 min-[140rem]:text-5xl'>
                {formatCurrency(amount)}
              </h3>
              <h4 className='text-xl font-medium min-[140rem]:text-2xl'>
                EST {formatNumber(amountConversion)}
              </h4>
            </>
          )}
          <div className='mt-8 w-full rounded-2xl bg-white p-2 md:p-4 lg:px-5 min-[140rem]:px-6'>
            <h5 className='pt-2 pb-3 font-bold max-[14rem]:text-base min-[140rem]:mb-4 min-[140rem]:py-4 min-[140rem]:text-3xl'>
              {t('dashboard.wallet.transaction_details')}
            </h5>
            <div className='flex justify-between pb-3 min-[140rem]:pb-6'>
              <p className='text-base font-medium md:text-lg'>
                {t('dashboard.wallet.you_will_convert')}
              </p>
              <p className='text-base font-bold md:text-lg'>
                {isFromEst
                  ? `EST ${formatNumber(amount)}`
                  : formatCurrency(amount)}
              </p>
            </div>
            <div className='flex justify-between pb-3 min-[140rem]:pb-6'>
              <p className='text-base font-medium md:text-lg'>
                {t('dashboard.wallet.fees')}
              </p>
              <p className='text-base md:text-lg'>{fees}</p>
            </div>
            <div className='flex justify-between pb-3 min-[140rem]:pb-6'>
              <p className='text-base font-medium md:text-lg'>
                {t('dashboard.wallet.you_will_receive')}
              </p>
              <p className='text-base font-bold md:text-lg'>
                {!isFromEst
                  ? `EST ${formatNumber(received)}`
                  : formatCurrency(received)}
              </p>
            </div>
            <div className='flex flex-wrap justify-between'>
              <p className='pb-1 text-base font-medium md:text-lg'>
                {t('dashboard.wallet.transaction_no')}
              </p>
              <CopyToClipboard
                text={transRef}
                onCopy={() =>
                  Toast.showSuccess({
                    message: t('common.clipboard_copy'),
                  })
                }
              >
                <div className='group flex cursor-pointer items-center text-center text-base font-semibold'>
                  <CopyIcon className='mr-2 ml-1 size-5' />
                  <p className='pb-1 text-base md:text-lg'>
                    #{get(transRef?.split('-'), 0) || 'N/A'}
                  </p>
                </div>
              </CopyToClipboard>
            </div>
          </div>
          <p className='text-primary-1 mt-8 px-8 text-center leading-relaxed max-[140rem]:text-sm md:text-base min-[140rem]:mt-18 min-[140rem]:text-2xl'>
            {infoText}
          </p>
        </>
      ) : (
        <>
          <h2 className='text-base font-bold md:text-lg'>
            {t('dashboard.wallet.you_will_send')}
          </h2>
          <p className='mt-4 text-4xl font-bold'>EST {formatNumber(amount)}</p>
          <p className='mt-5 text-base font-medium md:text-lg'>
            {t('common.to')}
          </p>
          <p className='mt-4 flex-1 px-8 text-center text-base font-bold break-all md:text-lg'>
            {walletAddress}
          </p>
          <p className='text-primary-1 mt-8 px-8 text-center leading-relaxed max-[140rem]:text-sm md:text-base min-[140rem]:mt-18 min-[140rem]:text-2xl'>
            {infoText}
          </p>
        </>
      )}
      <Button
        onClick={() => {
          onProceed();
        }}
        size='lg'
        className='mt-8 w-full lg:mb-16'
      >
        {t('dashboard.wallet.goto_wallet')}
      </Button>
    </div>
  );
}
