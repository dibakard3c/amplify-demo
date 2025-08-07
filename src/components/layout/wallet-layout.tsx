'use client';

import React, { useMemo } from 'react';
import { walletLinks } from '@estia/helpers/links';
import Link from 'next/link';
import { cn } from '@estia/lib/utils';
import { usePathname } from 'next/navigation';
import { useFetchDefiWalletQuery } from '@estia/networking/endpoints/transaction';
import { useSelector } from 'react-redux';
import { selectUser } from '@estia/store/selector';
import { compareIgnoreCase } from '@estia/utils/general';
import KycModal from '@estia/components/dialogs/kyc-modal';

export default function WalletLayout({ children }: any) {
  const pathname = usePathname();
  const user = useSelector(selectUser);

  const currentPageTitle = useMemo(
    () => walletLinks?.find((item) => item?.path === pathname)?.title,
    [pathname]
  );

  useFetchDefiWalletQuery(undefined, {
    skip: !compareIgnoreCase(user?.kycStatus, 'COMPLETED'),
  });

  return (
    <div className='bg-neutral-8 mt-10 rounded-2xl p-8'>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Wallet</h1>
      </div>
      <div className='flex w-full rounded-2xl text-sm'>
        <div className='max-w-70'>
          {walletLinks?.map((item, index) => (
            <Link key={index} href={item?.path}>
              <div
                className={cn(
                  'py-3',
                  index !== walletLinks?.length - 1 && 'border-divider border-b'
                )}
              >
                <p
                  className={cn(
                    'text-neutral-1 text-base font-bold',
                    pathname === item?.path
                      ? 'text-neutral-1'
                      : 'text-neutral-4'
                  )}
                >
                  {item?.title}
                </p>
                <p className='text-neutral-4 mt-1 text-xs leading-relaxed font-semibold'>
                  {item?.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className='min-h-[70vh] flex-1'>
          {!compareIgnoreCase(user?.kycStatus, 'COMPLETED') ? null : children}
        </div>
      </div>
      {!compareIgnoreCase(user?.kycStatus, 'COMPLETED') ? <KycModal /> : null}
    </div>
  );
}
