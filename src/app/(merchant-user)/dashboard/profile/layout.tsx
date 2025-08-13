import React from 'react';
import type { Metadata } from 'next';
import { generateMeta } from '@estia/helpers/meta';
import { ProfileMgtLinks } from '@estia/components/layout/profile-mgt-links';

export const metadata: Metadata = generateMeta('Profile');

export default function Layout({ children }: any) {
  return (
    <div className='bg-card-bg mt-10 rounded-2xl p-8'>
      <div className='mb-8 hidden items-center justify-between md:block'>
        <h1 className='text-2xl font-bold md:text-3xl'>Profile Management</h1>
      </div>
      <div className='flex w-full rounded-2xl text-sm'>
        <ProfileMgtLinks className='hidden md:block' />
        <div className='min-h-[65vh] w-full flex-1 md:ml-[5%] md:min-h-[70vh]'>
          {children}
        </div>
      </div>
    </div>
  );
}
