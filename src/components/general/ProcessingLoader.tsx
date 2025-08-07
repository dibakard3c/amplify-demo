'use client';

import React, { PropsWithChildren, useEffect } from 'react';
import Lottie from 'lottie-react';
import { Anims } from '@estia/assets';
import { cn } from '@estia/lib/utils';

interface ProcessingLoaderProps extends PropsWithChildren {
  className: string;
  onProceed?: () => void;
  title?: string;
  subtitle: string;
  message: string;
}

export default function ProcessingLoader({
  className,
  onProceed,
  title,
  subtitle,
  message,
}: ProcessingLoaderProps) {
  useEffect(() => {
    setTimeout(() => {
      if (onProceed) {
        onProceed();
      }
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      {title ? <h1 className='text-2xl font-bold'>{title}</h1> : null}
      <div className='relative size-42 self-center overflow-hidden'>
        <Lottie
          animationData={Anims.loader}
          loop={true}
          className='h-full w-full'
        />
      </div>
      <h2 className='text-xl font-bold'>{subtitle}</h2>
      <p className='mt-2 text-lg font-bold'>{message}</p>
    </div>
  );
}
