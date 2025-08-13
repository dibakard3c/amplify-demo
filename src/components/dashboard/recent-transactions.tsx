import React from 'react';
import Image from 'next/image';
import { Images } from '@estia/assets';
export default function RecentTransactions() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center py-6 sm:py-0'>
      <Image
        src={Images.emptyTransactions}
        className='mb-2 size-30'
        alt='Empty Transactions'
      />
      <p className='text-neutral-1 mb-4 text-sm font-semibold'>
        No new transactions
      </p>
    </div>
  );
}
