'use client';

import React, { useMemo } from 'react';
import { walletLinks } from '@estia/helpers/links';
import Link from 'next/link';
import { cn } from '@estia/utils/utils';
import { usePathname } from 'next/navigation';
import { useFetchDefiWalletQuery } from '@estia/networking/endpoints/transaction';
import { useSelector } from 'react-redux';
import { selectUser } from '@estia/store/selector';
import { compareIgnoreCase } from '@estia/utils/general';
import KycModal from '@estia/components/dialogs/kyc-modal';
import { MobileSubNav } from '@estia/components/layout/mobile-sub-nav';
import { useTranx } from '@estia/hooks/useTranx';

export default function WalletLayout({ children }: any) {
  const pathname = usePathname();
  const user = useSelector(selectUser);

  const currentPath = useMemo(
    () => pathname?.replace(/^\/[a-z]{2}(?:-[A-Z]{2})?\//, '/'),
    [pathname]
  );

  const { t } = useTranx();

  useFetchDefiWalletQuery(undefined, {
    skip: !compareIgnoreCase(user?.kycStatus, 'COMPLETED'),
  });

  return (
    <div>
      <MobileSubNav
        title={t('dashboard.wallet.page_title')}
        type='wallet'
        className='mt-8 block md:hidden'
      />
      <div className='bg-neutral-8 mt-8 rounded-2xl p-6 md:mt-10 md:p-8 min-[140rem]:px-16 min-[140rem]:py-14'>
        <div className='mb-8 hidden items-center justify-between sm:flex'>
          <h1 className='text-3xl font-bold'>
            {t('dashboard.wallet.page_title')}
          </h1>
        </div>
        <div className='flex w-full rounded-2xl text-sm min-[140rem]:pt-8'>
          <div className='hidden max-w-[15rem] min-w-[15rem] sm:block min-md:max-w-70 min-[140rem]:max-w-[25rem]'>
            {walletLinks?.map((item, index) => (
              <Link key={index} href={item?.path}>
                <div
                  className={cn(
                    'py-3',
                    index !== walletLinks?.length - 1 &&
                      'border-divider border-b'
                  )}
                >
                  <p
                    className={cn(
                      'text-neutral-1 text-base font-bold',
                      currentPath === item?.path
                        ? 'text-neutral-1'
                        : 'text-neutral-4'
                    )}
                  >
                    {t(item?.key as any)}
                  </p>
                  <p className='text-neutral-4 mt-1 text-xs leading-relaxed font-semibold'>
                    {t(item?.subtitle_key as any)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className='flex-1 lg:min-h-[70vh]'>
            {!compareIgnoreCase(user?.kycStatus, 'COMPLETED', '') &&
            process.env.NODE_ENV !== 'development'
              ? null
              : children}
          </div>
        </div>
        {!compareIgnoreCase(user?.kycStatus, 'COMPLETED') &&
        process.env.NODE_ENV !== 'development' ? (
          <KycModal />
        ) : null}
      </div>
    </div>
  );
}
