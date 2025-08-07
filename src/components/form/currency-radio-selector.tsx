import React from 'react';
import RoundGradient from '@estia/components/round-gradient';
import { cn } from '@estia/lib/utils';

interface CurrencyRadioSelectorProps {
  className?: string;
  disabled?: boolean;
  title: string;
  subTitle: string;
}

export default function CurrencyRadioSelector({
  className,
  disabled,
  title,
  subTitle,
}: CurrencyRadioSelectorProps) {
  return (
    <div className={className}>
      <div
        className={cn(
          'flex items-center justify-between',
          disabled && 'opacity-50'
        )}
      >
        <div className='flex items-center'>
          <RoundGradient className='size-10 sm:size-12' />
          <div className='ml-4 flex flex-col'>
            <p className='text-sm font-bold'>{title}</p>
            <p className='text-primary mt-1 text-sm'>{subTitle}</p>
          </div>
        </div>
        <div className='border-primary flex h-5 w-5 items-center justify-center rounded-full border'>
          {!disabled && <div className='bg-primary h-2 w-2 rounded-full'></div>}
        </div>
      </div>
      {disabled && (
        <p className='text-neutral-4 mt-3 text-sm font-medium'>Coming soon!</p>
      )}
    </div>
  );
}
