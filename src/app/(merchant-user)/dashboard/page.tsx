'use client';

import React, { useState } from 'react';
import { Button } from '@estia/components/ui/button';
import { SalesTransactions } from '@estia/components/dashboard/sales-transactions';
import { SalesChart } from '@estia/components/dashboard/sales-chart';
import RecentTransactions from '@estia/components/dashboard/recent-transactions';
import { cn } from '@estia/lib/utils';
import BalanceSummary from '@estia/components/dashboard/balance-summary';
import DashboardCard from '@estia/components/layout/dashboard-card';

export default function Page() {
  const [selectedPaymentType, setSelectedPaymentType] =
    useState('Paid with ESTIA');

  return (
    <DashboardCard title='Dashboard'>
      <div className='hidden items-center justify-end text-sm md:flex'>
        <p className='pr-4 text-base font-medium'>Payment Type:</p>
        <p
          onClick={() => {
            setSelectedPaymentType('Paid with ESTIA');
          }}
          className={cn(
            'text-neutral-4 cursor-pointer rounded-full px-4 py-2 text-base font-bold',
            selectedPaymentType === 'Paid with ESTIA' && 'bg-primary text-white'
          )}
        >
          Paid with ESTIA
        </p>
        <p
          onClick={() => {
            setSelectedPaymentType('Paid with EURO');
          }}
          className={cn(
            'text-neutral-4 cursor-pointer rounded-full px-4 py-2 text-base font-bold',
            selectedPaymentType === 'Paid with EURO' && 'bg-primary text-white'
          )}
        >
          Paid with EURO
        </p>
      </div>
      <div className='mt-4 flex flex-col flex-wrap justify-between md:flex-row'>
        <BalanceSummary />
        <div className='border-border dashboard-shadow mt-6 flex-1 rounded-xl bg-white p-4 md:mt-0 md:ml-[2.5%] md:flex-[0.4_0.4_0%] md:p-6 dark:border dark:border-gray-500 dark:bg-none'>
          <div className='flex items-center justify-between md:items-start'>
            <h2 className='text-neutral-2 text-xl md:text-2xl'>Transactions</h2>
            <Button className='tex-base'>See All</Button>
          </div>
          <RecentTransactions />
        </div>
      </div>
      <div className='dashboard-shadow mt-8 rounded-xl bg-white p-4 md:p-6'>
        <h2 className='text-lg md:text-2xl'>Sales Transactions</h2>
        <SalesTransactions />
      </div>
      <div className='dashboard-shadow relative mt-8 hidden rounded-xl p-4 md:p-6'>
        <h2 className='text-lg md:text-2xl'>Sales</h2>
        <SalesChart />
      </div>
    </DashboardCard>
  );
}
