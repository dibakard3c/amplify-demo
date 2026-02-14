import React from 'react';
import { Merchant } from '@estia/typings/merchant';
import SmartImage from '@estia/components/smart-image';
import { cn } from '@estia/utils/utils';

interface MerchantItemProps {
  item: Merchant;
  className?: string;
}

export default function MerchantItem({ item, className }: MerchantItemProps) {
  return (
    <div className={cn('col-span-3 py-3', className)}>
      <div className='flex items-center'>
        <SmartImage
          sizeClassName='min-[140rem]:size-24'
          src={item?.merchantLogo}
          alt={`${item?.companyName} logo`}
        />
        <div className='ml-4'>
          <h2 className='text-neutral-3 leading-relaxed font-medium max-[140rem]:text-base sm:max-w-40 lg:max-w-48 min-[140rem]:max-w-96 min-[140rem]:text-2xl'>
            {item?.companyName}
          </h2>
        </div>
      </div>
    </div>
  );
}
