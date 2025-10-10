import React from 'react';
import type { Metadata } from 'next';
import { generateMeta } from '@estia/helpers/meta';
import { ProfileMgtLinks } from '@estia/components/layout/profile-mgt-links';
import {
  MobileSubNav,
  SUB_NAV_TYPES,
} from '@estia/components/layout/mobile-sub-nav';
import { getTranx } from '@estia/helpers/translations';

export const metadata: Metadata = generateMeta('Profile');

export default async function Layout({ children }: any) {
  const { t } = await getTranx();

  return (
    <div>
      <MobileSubNav
        title={t('dashboard.profile_management.page_title')}
        type={SUB_NAV_TYPES.PROFILE}
        className='mt-8 block md:hidden'
      />
      <div className='bg-card-bg mt-6 rounded-2xl p-8 md:mt-10 min-[140rem]:px-16 min-[140rem]:py-14'>
        <div className='mb-8 hidden items-center justify-between md:block'>
          <h1 className='text-2xl font-bold md:text-3xl'>
            {t('dashboard.profile_management.page_title')}
          </h1>
        </div>
        <div className='flex w-full rounded-2xl text-sm'>
          <ProfileMgtLinks className='hidden md:block' />
          <div className='w-full flex-1 md:ml-[5%] md:min-h-[70vh]'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
