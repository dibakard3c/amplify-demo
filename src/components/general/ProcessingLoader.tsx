'use client';

import React, { PropsWithChildren, useEffect } from 'react';
import Lottie from 'lottie-react';
import { Anims } from '@estia/assets';
import { cn } from '@estia/utils/utils';

interface ProcessingLoaderProps extends PropsWithChildren {
  className?: string;
  onProceed?: () => void;
  title?: string;
  subtitle?: string;
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
    <div
      className={cn(
        'flex flex-col items-center justify-center py-8',
        className
      )}
    >
      {title ? (
        <h1 className='font-bold max-[140rem]:text-xl md:text-2xl min-[140rem]:text-5xl'>
          {title}
        </h1>
      ) : null}
      <div className='relative mt-6 size-42 self-center overflow-hidden min-[140rem]:size-60'>
        <Lottie
          animationData={Anims.loader}
          loop={true}
          className='h-full w-full'
        />
      </div>
      {subtitle ? (
        <h2 className='text-lg font-bold md:text-xl'>{subtitle}</h2>
      ) : null}
      <p className='test-base mt-2 font-bold md:text-base min-[140rem]:mt-4 min-[140rem]:text-2xl'>
        {message}
      </p>
    </div>
  );
}
