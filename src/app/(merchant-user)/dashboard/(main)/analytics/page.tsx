'use client';

import React from 'react';
import { Button } from '@estia/components/ui/button';
import { SalesChart } from '@estia/components/dashboard/sales-chart';
import { BankPayoutsTable } from '@estia/components/analytics/bank-payouts-table';
import { CustomerDemographicsTable } from '@estia/components/analytics/customer-demographics-table';
import { CustomerDemographicsGraph } from '@estia/components/analytics/customer-demographics-graph';
import Link from 'next/link';
import { SCREENS } from '@estia/constants/screens';
import DashboardCard from '@estia/components/layout/dashboard-card';

export default function Page() {
  return (
    <DashboardCard title='Sales Analytics'>
      <h2 className='mb-4 text-2xl font-bold md:text-4xl'>4.768,00 EUR</h2>
      <div className='dashboard-shadow relative mt-4 rounded-xl p-4 md:mt-8 md:p-6'>
        <div className='mb-2 flex flex-row items-center justify-between md:items-start'>
          <h2 className='text-lg md:text-2xl'>Sales (Current Year)</h2>
          <Button asChild size='md' className='h-10'>
            <Link href={SCREENS.SALES}>See All</Link>
          </Button>
        </div>
        <SalesChart showTimeline={false} />
      </div>
      <div className='dashboard-shadow relative mt-8 rounded-xl p-4 md:p-6'>
        <div className='mb-4 flex flex-row justify-between'>
          <h2 className='mr-2 text-lg md:text-2xl'>
            Customer <br className='md:hidden' />
            Demographics <br className='md:hidden' />
            (Current Year)
          </h2>
          <Button asChild size='md' className='h-10'>
            <Link href={SCREENS.DEMOGRAPHICS}>See All</Link>
          </Button>
        </div>
        <div className='flex'>
          <CustomerDemographicsTable className='md:mr-8 md:w-1/2' />
          <CustomerDemographicsGraph className='flex-1 md:ml-2 md:w-1/2' />
        </div>
      </div>
      <div className='dashboard-shadow relative mt-8 rounded-xl p-4 md:p-6'>
        <div className='mb-2 flex flex-row items-center justify-between md:items-start'>
          <h2 className='text-lg md:text-2xl'>Bank Payouts</h2>
          <Button asChild size='md' className='h-10'>
            <Link href={SCREENS.PAYOUTS}>See All</Link>
          </Button>
        </div>
        <BankPayoutsTable perPage={5} />
      </div>
    </DashboardCard>
  );
}
