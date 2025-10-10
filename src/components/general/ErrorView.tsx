import React, { PropsWithChildren } from 'react';
import { cn } from '@estia/utils/utils';
import { Button } from '@estia/components/ui/button';
import { ErrorIcon } from '@estia/assets/icons/error';
import DashboardSubNavCard from '@estia/components/layout/dashboard-sub-nav-card';
import { useTranx } from '@estia/hooks/useTranx';

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
  title,
  btnTitle,
  errorMsg,
}: ErrorViewProps) {
  const { t } = useTranx();

  return (
    <DashboardSubNavCard className={cn('py-12 md:mt-24', className)}>
      <h1 className='text-xl font-bold md:text-2xl'>
        {title || t('common.transaction_failed')}
      </h1>
      <ErrorIcon className='relative my-8 size-28 min-[140rem]:size-44' />
      <h2 className='px-4 text-center text-sm leading-relaxed font-bold md:text-base'>
        {errorMsg || t('common.go_back_to_wallet')}
      </h2>
      {onProceed ? (
        <Button
          onClick={() => {
            onProceed();
          }}
          size='lg'
          className='mt-8 w-full lg:mb-16 min-[140rem]:max-w-[45rem]'
        >
          {btnTitle}
        </Button>
      ) : null}
    </DashboardSubNavCard>
  );
}
