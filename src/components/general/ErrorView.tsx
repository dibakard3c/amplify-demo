import React, { PropsWithChildren } from 'react';
import { cn } from '@estia/lib/utils';
import { Button } from '@estia/components/ui/button';
import { ErrorIcon } from '@estia/assets/icons/error';
import DashboardSubNavCard from '@estia/components/layout/dashboard-sub-nav-card';

interface ErrorViewProps extends PropsWithChildren {
  className?: string;
  onProceed?: () => void;
  title?: string;
  btnTitle?: string;
  errorMsg?: string;
}

export default function ErrorView({
  className,
  onProceed,
  title = 'Transaction failed',
  btnTitle = 'Back to wallet',
  errorMsg,
}: ErrorViewProps) {
  return (
    <DashboardSubNavCard className={cn('mt-24', className)}>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <ErrorIcon className='relative my-8 size-28' />
      <h2 className='px-4 text-center text-base leading-relaxed font-bold'>
        {errorMsg}
      </h2>
      {onProceed ? (
        <Button
          onClick={() => {
            onProceed();
          }}
          size='lg'
          className='mt-8 mb-16 w-full'
        >
          {btnTitle}
        </Button>
      ) : null}
    </DashboardSubNavCard>
  );
}
