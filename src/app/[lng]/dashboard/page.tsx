'use client';

import React, { useState } from 'react';
import { Button } from '@estia/components/ui/button';
import { SalesChart } from '@estia/components/dashboard/sales-chart';
import RecentTransactions from '@estia/components/dashboard/recent-transactions';
import { cn } from '@estia/utils/utils';
import BalanceSummary from '@estia/components/dashboard/balance-summary';
import DashboardCard from '@estia/components/layout/dashboard-card';
import Link from 'next/link';
import { SCREENS } from '@estia/constants/screens';
import { SalesTable } from '@estia/components/analytics/sales-table';
import { useTranx } from '@estia/hooks/useTranx';

export default function Page() {
  const { t } = useTranx();

  const [selectedPaymentType, setSelectedPaymentType] = useState('estia');

  return (
    <DashboardCard title={t('dashboard.home_page.page_title')}>
      <div className='hidden items-center justify-end text-sm md:flex'>
        <p className='pr-4 text-base font-medium'>
          {t('dashboard.home_page.payment_type')}:
        </p>
        <p
          onClick={() => {
            setSelectedPaymentType('estia');
          }}
          className={cn(
            'text-neutral-4 cursor-pointer rounded-full px-4 py-2 text-base font-bold min-[140rem]:px-6 min-[140rem]:py-4',
            selectedPaymentType === 'estia' && 'bg-primary text-white'
          )}
        >
          {t('dashboard.home_page.paid_with_method', {
            method: 'Estia',
          })}
        </p>
        <p
          onClick={() => {
            setSelectedPaymentType('euro');
          }}
          className={cn(
            'text-neutral-4 cursor-pointer rounded-full px-4 py-2 text-base font-bold min-[140rem]:px-6 min-[140rem]:py-4',
            selectedPaymentType === 'euro' && 'bg-primary text-white'
          )}
        >
          {t('dashboard.home_page.paid_with_method', {
            method: t('common.euro'),
          })}
        </p>
      </div>
      <div className='mt-4 flex flex-col flex-wrap justify-between md:flex-row'>
        <BalanceSummary />
        <div className='border-border dashboard-shadow mt-6 flex-1 rounded-xl bg-white p-4 md:mt-0 md:ml-[2.5%] md:flex-[0.4_0.4_0%] md:p-6 dark:border dark:border-gray-500 dark:bg-none'>
          <div className='flex items-center justify-between md:items-start'>
            <h2 className='text-neutral-2 text-lg md:text-2xl'>
              {t('dashboard.home_page.transactions')}
            </h2>
            <Button className='tex-base'>{t('common.see_all')}</Button>
          </div>
          <RecentTransactions />
        </div>
      </div>
      <div className='dashboard-shadow mt-8 rounded-xl bg-white p-4 md:p-6'>
        <h2 className='text-lg md:text-2xl'>
          {t('dashboard.home_page.sales_analytics')}
        </h2>
        <SalesTable />
      </div>
      <div className='dashboard-shadow relative mt-8 hidden rounded-xl p-4 md:p-6'>
        <h2 className='text-lg md:text-2xl'>
          {t('dashboard.home_page.sales')}
        </h2>
        <SalesChart />
      </div>
      <div className='dashboard-shadow relative mt-4 rounded-xl p-4 md:mt-8 md:p-6'>
        <div className='mb-2 flex flex-row items-center justify-between md:items-start'>
          <h2 className='text-lg md:text-2xl'>
            {t('dashboard.home_page.sales')}
          </h2>
          <Button asChild size='md' className='h-10'>
            <Link href={SCREENS.SALES}>{t('common.see_all')}</Link>
          </Button>
        </div>
        <SalesChart showTimeline={true} />
      </div>
    </DashboardCard>
  );
}
