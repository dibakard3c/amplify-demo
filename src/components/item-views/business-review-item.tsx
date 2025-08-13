import React from 'react';
import Image from 'next/image';
import { cn } from '@estia/lib/utils';

export function BusinessReviewItem({ title, value, image, className }: any) {
  return (
    <div className={cn('mb-4 sm:max-w-[30rem]', className)}>
      <p className='text-neutral-4 text-sm font-bold'>{title}</p>
      {image ? (
        <div className='relative mt-2 ml-4 size-24 rounded border'>
          {typeof image === 'string' ? (
            <img src={image} alt='Merchant logo' className='h-full w-full' />
          ) : (
            <Image
              src={URL.createObjectURL(image)}
              alt={``}
              fill
              onLoad={() => {
                URL.revokeObjectURL(image);
              }}
            />
          )}
        </div>
      ) : (
        <p className='text-neutral-1 mt-1 text-base font-bold'>
          {value || 'N/A'}
        </p>
      )}
    </div>
  );
}
