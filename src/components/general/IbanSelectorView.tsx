import React from 'react';
import { GradientCircle } from '@estia/assets';
import WalletIcon from '@estia/assets/icons/wallet';
import { formatIBAN } from '@estia/utils/currency';

interface IbanSelectorViewProps {
  title: string;
  iban: string;
  subText: string;
}

export default function IbanSelectorView({
  title,
  iban,
  subText,
}: IbanSelectorViewProps) {
  return (
    <div>
      <div className='mt-5 flex items-center'>
        {subText && (
          <h1 className='text-primary-1 min-w-20 text-lg font-bold'>
            {subText}
          </h1>
        )}
        <GradientCircle className='mt-2'>
          <WalletIcon className='size-full' />
        </GradientCircle>
        <div className='ml-4'>
          <h1 className='text-neutral-2 text-lg font-bold'>{title}</h1>
          <p className='text-neutral-2 mt-1 text-lg font-medium'>
            {formatIBAN(iban)}
          </p>
        </div>
      </div>
    </div>
  );
}
