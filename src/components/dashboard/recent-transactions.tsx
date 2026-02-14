import React from 'react';
import Image from 'next/image';
import { Images } from '@estia/assets';
import { useTranx } from '@estia/hooks/useTranx';

export default function RecentTransactions() {
  const { t } = useTranx();

  return (
    <div className='flex h-full w-full flex-col items-center justify-center py-6 sm:py-0'>
      <Image
        src={Images.emptyTransactions}
        className='mb-2 size-30'
        alt={t(
          'dashboard.home_page.recent_transactions.empty_transactions_alt'
        )}
      />
      <p className='text-neutral-1 mb-4 text-sm font-semibold'>
        {t('dashboard.home_page.recent_transactions.no_new_transactions')}
      </p>
    </div>
  );
}
