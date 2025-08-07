'use client';

import React from 'react';
import { BankPayoutsTable } from '@estia/components/analytics/bank-payouts-table';

export default function Page() {
  return (
    <div className='bg-neutral-8 mt-8 rounded-2xl p-8'>
      <h1 className='mb-4 text-3xl font-bold'>Sales Analytics</h1>
      <h2 className='mb-4 text-4xl font-bold'>4.768,00 EUR</h2>
      <div className='dashboard-shadow relative mt-8 rounded-xl p-6'>
        <div className='mb-2 flex flex-row justify-between'>
          <h2 className='text-2xl'>Bank Payouts</h2>
        </div>
        <BankPayoutsTable perPage={200} />
      </div>
    </div>
  );
}
