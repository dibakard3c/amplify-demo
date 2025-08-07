import React from 'react';
import { Merchant } from '@estia/typings/merchant';
import SmartImage from '@estia/components/smart-image';
import { cn } from '@estia/lib/utils';

interface MerchantItemProps {
  item: Merchant;
  className?: string;
}

export default function MerchantItem({ item, className }: MerchantItemProps) {
  return (
    <div className={cn('col-span-3 py-3', className)}>
      <div className='flex items-center'>
        {item?.merchantLogo && item?.merchantLogo?.startsWith('http') ? (
          <SmartImage
            width={50}
            height={50}
            src={item?.merchantLogo}
            alt={`${item?.companyName} logo`}
          />
        ) : (
          <div className='bg-neutral-6 flex size-12 items-center justify-center rounded-[12px] pl-0.5'></div>
        )}
        <div className='ml-4'>
          <h2 className='text-neutral-3 text-base font-medium'>
            {item?.companyName}
          </h2>
        </div>
      </div>
    </div>
  );
}
