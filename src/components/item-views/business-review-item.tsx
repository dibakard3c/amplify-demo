import React from 'react';
import Image from 'next/image';
import { cn } from '@estia/utils/utils';
import { useTranx } from '@estia/hooks/useTranx';

export function BusinessReviewItem({ title, value, image, className }: any) {
  const { t } = useTranx();

  return (
    <div className={cn('mb-4 sm:max-w-[30rem] min-[140rem]:mb-6', className)}>
      <p className='text-neutral-4 font-bold max-[140rem]:text-sm min-[140rem]:text-xl'>
        {title}
      </p>
      {image ? (
        <div className='relative mt-2 ml-4 size-24 rounded border min-[140rem]:mt-4'>
          {typeof image === 'string' ? (
            <Image fill src={image} alt={t('common.merchant_logo_alt')} />
          ) : (
            <Image
              src={URL.createObjectURL(image)}
              alt={t('common.merchant_logo_alt')}
              fill
              onLoad={() => {
                URL.revokeObjectURL(image);
              }}
            />
          )}
        </div>
      ) : (
        <p className='text-neutral-1 mt-1 font-bold max-[140rem]:text-base min-[140rem]:mt-2 min-[140rem]:text-2xl'>
          {value || 'N/A'}
        </p>
      )}
    </div>
  );
}
