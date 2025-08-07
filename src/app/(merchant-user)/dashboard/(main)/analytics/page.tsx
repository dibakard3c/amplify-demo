'use client';

import React from 'react';
import { Button } from '@estia/components/ui/button';
import { SalesChart } from '@estia/components/dashboard/sales-chart';
import { BankPayoutsTable } from '@estia/components/analytics/bank-payouts-table';
import { CustomerDemographicsTable } from '@estia/components/analytics/customer-demographics-table';
import { CustomerDemographicsGraph } from '@estia/components/analytics/customer-demographics-graph';
import Link from 'next/link';
import { SCREENS } from '@estia/constants/screens';

export default function Page() {
  return (
    <div className='bg-neutral-8 mt-8 rounded-2xl p-8'>
      <h1 className='mb-4 text-3xl font-bold'>Sales Analytics</h1>
      <h2 className='mb-4 text-4xl font-bold'>4.768,00 EUR</h2>
      <div className='dashboard-shadow relative mt-8 rounded-xl p-6'>
        <div className='mb-2 flex flex-row justify-between'>
          <h2 className='text-2xl'>Sales (Current Year)</h2>
          <Button asChild size='md' className='h-10'>
            <Link href={SCREENS.SALES}>See All</Link>
          </Button>
        </div>
        <SalesChart showTimeline={false} />
      </div>
      <div className='dashboard-shadow relative mt-8 rounded-xl p-6'>
        <div className='mb-4 flex flex-row justify-between'>
          <h2 className='text-2xl'>Customer Demographics (Current Year)</h2>
          <Button asChild size='md' className='h-10'>
            <Link href={SCREENS.DEMOGRAPHICS}>See All</Link>
          </Button>
        </div>
        <div className='flex'>
          <CustomerDemographicsTable className='mr-8 w-1/2' />
          <CustomerDemographicsGraph className='ml-2 w-1/2 flex-1' />
        </div>
      </div>
      <div className='dashboard-shadow relative mt-8 rounded-xl p-6'>
        <div className='mb-2 flex flex-row justify-between'>
          <h2 className='text-2xl'>Bank Payouts</h2>
          <Button asChild size='md' className='h-10'>
            <Link href={SCREENS.PAYOUTS}>See All</Link>
          </Button>
        </div>
        <BankPayoutsTable perPage={5} />
      </div>
    </div>
  );
}
