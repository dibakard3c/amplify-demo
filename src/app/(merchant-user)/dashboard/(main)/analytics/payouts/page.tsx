'use client';

import React from 'react';
import { BankPayoutsTable } from '@estia/components/analytics/bank-payouts-table';
import DashboardCard from '@estia/components/layout/dashboard-card';

export default function Page() {
  return (
    <DashboardCard title='Sales Analytics'>
      <h2 className='mb-4 text-2xl font-bold md:text-4xl'>4.768,00 EUR</h2>
      <div className='dashboard-shadow relative mt-8 rounded-xl p-6'>
        <div className='mb-2 flex flex-row justify-between'>
          <h2 className='text-lg md:text-2xl'>Bank Payouts</h2>
        </div>
        <BankPayoutsTable perPage={200} />
      </div>
    </DashboardCard>
  );
}
