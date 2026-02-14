'use client';

import React from 'react';
import { profileMgtLinks, walletLinks } from '@estia/helpers/links';
import Link from 'next/link';
import { cn } from '@estia/utils/utils';
import { usePathname } from 'next/navigation';

interface MobileSubNavProps {
  className?: string;
  title: string;
  type: 'profile' | 'wallet';
}

export const SUB_NAV_TYPES = {
  PROFILE: 'profile',
  WALLET: 'wallet',
} as const;

export function MobileSubNav({ className, title, type }: MobileSubNavProps) {
  const pathname = usePathname();

  return (
    <div className={cn('bg-card-bg overflow-hidden rounded-2xl', className)}>
      <h1 className='p-4 text-xl font-bold'>{title}</h1>
      <div className=''>
        {(type === 'profile' ? profileMgtLinks : walletLinks)?.map(
          (item: any, index: number) => (
            <Link key={index} href={item?.path}>
              <div
                className={cn(
                  'border-l-card-bg border-t-divider border-l-3 py-3 pl-3',
                  index === profileMgtLinks?.length - 1 &&
                    type === 'profile' &&
                    'border-t py-4',
                  pathname === item?.path ? 'border-l-primary' : ''
                )}
              >
                <p
                  className={cn(
                    'text-neutral-1 flex items-center text-sm font-bold',
                    pathname === item?.path
                      ? 'text-neutral-1'
                      : 'text-neutral-4'
                  )}
                >
                  {item.icon ? <item.icon className='mr-3 size-6' /> : null}
                  {item?.title}
                </p>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
