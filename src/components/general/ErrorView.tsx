import React, { PropsWithChildren } from 'react';
import { cn } from '@estia/lib/utils';
import { Button } from '@estia/components/ui/button';
import { ErrorIcon } from '@estia/assets/icons/error';

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
    <div
      className={cn(
        'mx-auto mt-24 flex max-w-[40%] flex-col items-center justify-center',
        className
      )}
    >
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
    </div>
  );
}
