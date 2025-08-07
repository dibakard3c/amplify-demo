'use client';

import React from 'react';
import { profileMgtLinks } from '@estia/helpers/links';
import Link from 'next/link';
import { cn } from '@estia/lib/utils';
import { InfoIcon } from '@estia/assets';
import { usePathname } from 'next/navigation';

export function ProfileMgtLinks() {
  const pathname = usePathname();

  return (
    <div className='max-w-70'>
      <div className='ml-4'>
        {profileMgtLinks?.map((item, index) => (
          <Link key={index} href={item?.path}>
            <div
              className={cn(
                'my-2 py-4',
                index === profileMgtLinks?.length - 1 &&
                  'border-divider border-t py-5'
              )}
            >
              <p
                className={cn(
                  'text-neutral-1 flex items-center text-base font-bold',
                  pathname === item?.path ? 'text-neutral-1' : 'text-neutral-4'
                )}
              >
                <item.icon className='mr-3 size-6' />
                {item?.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {profileMgtLinks[0]?.path === pathname ? (
        <p className='mt-4 flex text-sm italic'>
          <InfoIcon className='mt-0.5 size-4' />
          <span className='ml-1 flex-1'>
            Disclaimer: The page is view-only and you cannot edit the data
            displayed here. Edit can be done only via KYB - Know Your Business
          </span>
        </p>
      ) : null}
    </div>
  );
}
