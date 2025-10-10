'use client';

import React from 'react';
import { Button } from '@estia/components/ui/button';
import { SalesChart } from '@estia/components/dashboard/sales-chart';
import { AccountTransfersTable } from '@estia/components/analytics/account-transfers-table';
import { CustomerDemographicsTable } from '@estia/components/analytics/customer-demographics-table';
import Link from 'next/link';
import { SCREENS } from '@estia/constants/screens';
import DashboardCard from '@estia/components/layout/dashboard-card';
import { formatCurrency } from '@estia/utils/currency';
import { formatNumber } from '@estia/utils/general';
import { useTranx } from '@estia/hooks/useTranx';

export default function Page() {
  const { t } = useTranx();

  const summary = [
    {
      title: t('dashboard.analytics.main_page.sales_euro'),
      count: formatCurrency(4768, true),
    },
    {
      title: t('dashboard.analytics.main_page.sales_estia'),
      count: `Estia ${formatNumber(3250)}`,
    },
  ];

  return (
    <DashboardCard title={t('dashboard.analytics.main_page.page_title')}>
      <div className='mt-6 flex flex-col justify-between md:flex-row'>
        {summary?.map((item, index) => (
          <div
            key={index}
            className='dashboard-shadow relative mb-3 w-full rounded-xl p-6 md:mb-0 md:w-[49%]'
          >
            <h1 className='text-xl'>{item?.title}</h1>
            <h2 className='py-2 text-3xl font-semibold'>{item?.count}</h2>
          </div>
        ))}
      </div>
      <div className='dashboard-shadow relative mt-8 rounded-xl p-4 md:p-6'>
        <div className='mb-2 flex flex-row items-center justify-between md:items-start'>
          <h2 className='text-lg md:text-2xl'>
            {t('dashboard.analytics.main_page.sales_current_year')}
          </h2>
          <Button asChild size='md' className='h-10'>
            <Link href={SCREENS.SALES}>{t('common.see_all')}</Link>
          </Button>
        </div>
        <SalesChart showTimeline={false} />
      </div>
      <div className='dashboard-shadow relative mt-8 rounded-xl p-4 md:p-6'>
        <div className='mb-4 flex flex-row justify-between'>
          <h2 className='mr-2 text-lg md:text-2xl'>
            {t('dashboard.analytics.main_page.customer_demo_current_year')}
          </h2>
          <Button asChild size='md' className='h-10'>
            <Link href={SCREENS.DEMOGRAPHICS}>{t('common.see_all')}</Link>
          </Button>
        </div>
        <div className='flex'>
          <CustomerDemographicsTable />
          {/*<CustomerDemographicsGraph className='flex-1 md:ml-2 md:w-1/2' />*/}
        </div>
      </div>
      <div className='dashboard-shadow relative mt-8 rounded-xl p-4 md:p-6'>
        <div className='mb-2 flex flex-row items-center justify-between md:items-start'>
          <h2 className='text-lg md:text-2xl'>
            {t('dashboard.analytics.main_page.account_transfers')}
          </h2>
          <Button asChild size='md' className='h-10'>
            <Link href={SCREENS.TRANSFERS}>{t('common.see_all')}</Link>
          </Button>
        </div>
        <AccountTransfersTable perPage={5} />
      </div>
    </DashboardCard>
  );
}
