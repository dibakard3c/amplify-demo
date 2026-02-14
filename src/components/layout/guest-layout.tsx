'use client';

import React, { PropsWithChildren } from 'react';
import GuestNavbar from '@estia/components/layout/guest-navbar';

export default function GuestLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full min-h-dvh w-full bg-[url('/dashboard-bg.svg')] bg-cover bg-fixed bg-no-repeat dark:bg-none">
      {/* Desktop Header */}
      <GuestNavbar />
      <div className='resp-container mx-auto pb-24 min-[140rem]:pt-5'>
        {children}
      </div>
    </div>
  );
}
