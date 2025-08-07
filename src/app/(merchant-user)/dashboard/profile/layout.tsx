import React from 'react';
import type { Metadata } from 'next';
import { generateMeta } from '@estia/helpers/meta';
import { ProfileMgtLinks } from '@estia/components/layout/profile-mgt-links';

export const metadata: Metadata = generateMeta('Profile');

export default function Layout({ children }: any) {
  return (
    <div className='bg-card-bg mt-10 rounded-2xl p-8'>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Profile Management</h1>
      </div>
      <div className='flex w-full rounded-2xl text-sm'>
        <ProfileMgtLinks />
        <div className='ml-[5%] min-h-[70vh] flex-1'>{children}</div>
      </div>
    </div>
  );
}
