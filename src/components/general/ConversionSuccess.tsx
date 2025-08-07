import React, { PropsWithChildren } from 'react';
import { Icons } from '@estia/assets';
import { cn } from '@estia/lib/utils';
import Image from 'next/image';
import { formatCurrency, formatNumber } from '@estia/utils/general';
import { Button } from '@estia/components/ui/button';

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
  return (
    <div
      className={cn(
        'mx-auto flex max-w-[40%] flex-col items-center justify-center',
        className
      )}
    >
      <h1 className='text-2xl font-bold'>Confirmation of transaction</h1>
      <div className='relative my-8 size-28'>
        <Image src={Icons.success} alt='' fill />
      </div>
      {!isTransfer ? (
        <>
          <h2 className='text-lg font-bold'>You will convert</h2>
          {isFromEst ? (
            <>
              <h3 className='my-4 text-4xl font-medium'>
                EST {formatNumber(amount)}{' '}
              </h3>
              <h4 className='text-xl font-medium'>
                {formatCurrency(amountConversion)}
              </h4>
            </>
          ) : (
            <>
              <h3 className='my-4 text-4xl font-medium'>
                {formatCurrency(amount)}
              </h3>
              <h4 className='text-xl font-medium'>
                EST {formatNumber(amountConversion)}
              </h4>
            </>
          )}
          <div className='mt-8 w-full rounded-2xl bg-white p-4 px-5'>
            <h5 className='pt-2 pb-3 text-base font-bold'>
              Transaction details
            </h5>
            <div className='flex justify-between pb-3'>
              <p className='text-lg font-medium'>You will convert</p>
              <p className='text-lg font-bold'>
                {isFromEst
                  ? `EST ${formatNumber(amount)}`
                  : formatCurrency(amount)}
              </p>
            </div>
            <div className='flex justify-between pb-3'>
              <p className='text-lg font-medium'>Fees</p>
              <p className='text-lg'>{fees}</p>
            </div>
            <div className='flex justify-between pb-3'>
              <p className='text-lg font-medium'>You will receive</p>
              <p className='text-lg font-bold'>
                {!isFromEst
                  ? `EST ${formatNumber(received)}`
                  : formatCurrency(received)}
              </p>
            </div>
            <div className='flex flex-wrap justify-between'>
              <p className='pb-1 text-lg font-medium'>Transaction number</p>
              <p className='pb-1 text-lg'>{transRef}</p>
            </div>
          </div>
          <p className='text-primary-1 mt-8 px-8 text-center text-base leading-relaxed'>
            {infoText}
          </p>
        </>
      ) : (
        <>
          <h2 className='text-lg font-bold'>You will send</h2>
          <p className='mt-4 text-4xl font-bold'>EST {formatNumber(amount)}</p>
          <p className='mt-5 text-lg font-medium'>to</p>
          <p className='mt-4 flex-1 px-8 text-center text-lg font-bold break-all'>
            {walletAddress}
          </p>
          <p className='text-primary-1 mt-8 px-8 text-center text-base leading-relaxed'>
            {infoText}
          </p>
        </>
      )}
      <Button
        onClick={() => {
          onProceed();
        }}
        size='lg'
        className='mt-8 mb-16 w-full'
      >
        Go to wallet
      </Button>
    </div>
  );
}
