'use client';

import React, { useMemo } from 'react';
import { profileMgtLinks } from '@estia/helpers/links';
import Link from 'next/link';
import { cn } from '@estia/utils/utils';
import { InfoIcon } from '@estia/assets';
import { usePathname } from 'next/navigation';
import { useTranx } from '@estia/hooks/useTranx';

export function ProfileMgtLinks({ className }: any) {
  const pathname = usePathname();
  const { t } = useTranx();

  const currentPath = useMemo(
    () => pathname?.replace(/^\/[a-z]{2}(?:-[A-Z]{2})?\//, '/'),
    [pathname]
  );

  return (
    <div
      className={cn(
        'max-w-[15rem] min-w-[15rem] min-lg:max-w-70 min-[140rem]:max-w-[25rem]',
        className
      )}
    >
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
                  currentPath === item?.path
                    ? 'text-neutral-1'
                    : 'text-neutral-4'
                )}
              >
                <item.icon className='mr-3 size-6 min-[140rem]:size-10' />
                {t(item?.key as any)}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {profileMgtLinks[0]?.path === currentPath ? (
        <p className='mt-4 flex text-sm italic'>
          <InfoIcon className='mt-0.5 size-4 min-[140rem]:mt-1 min-[140rem]:size-8' />
          <span className='ml-1 flex-1 min-[140rem]:text-2xl min-[140rem]:leading-relaxed'>
            {t(`dashboard.profile_management.my_profile_page.disclaimer`)}
          </span>
        </p>
      ) : null}
    </div>
  );
}
