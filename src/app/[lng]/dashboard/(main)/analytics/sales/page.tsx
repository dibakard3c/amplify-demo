'use client';

import React, { useState } from 'react';
import { SalesChart } from '@estia/components/dashboard/sales-chart';
import { isEmpty } from 'lodash';
import DashboardCard from '@estia/components/layout/dashboard-card';
import { formatCurrency } from '@estia/utils/currency';
import { formatNumber } from '@estia/utils/general';
import { Input } from '@estia/components/ui/input';
import { SearchIcon } from '@estia/assets/icons/search';
import { CloseIcon } from '@estia/assets/icons/close';
import { DatePickerWithRange } from '@estia/components/transactions/DatePickerWithRange';
import { SalesTable } from '@estia/components/analytics/sales-table';
import { Button } from '@estia/components/ui/button';
import { useTranx } from '@estia/hooks/useTranx';

export default function Page() {
  const { t } = useTranx();

  // const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [dateValue, setDateValue] = useState<any>({
    from: undefined,
    to: undefined,
  });

  const summary = [
    {
      title: t('dashboard.analytics.sales_page.sales_euro'),
      count: formatCurrency(4768, true),
    },
    {
      title: t('dashboard.analytics.sales_page.sales_estia'),
      count: `Estia ${formatNumber(3250)}`,
    },
  ];

  return (
    <DashboardCard title={t('dashboard.analytics.sales_page.page_title')}>
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
      <div className='dashboard-shadow relative mt-4 rounded-xl p-6 md:mt-8'>
        <div className='flex flex-row justify-between md:mb-2'>
          <h2 className='text-lg md:text-2xl'>
            {t('dashboard.analytics.sales_page.chart_title')}
          </h2>
        </div>
        <SalesChart showTimeline />
      </div>
      <div className='dashboard-shadow relative mt-8 rounded-xl p-6'>
        <div className='my-3 flex flex-col justify-between md:flex-row md:items-center'>
          <div className='flex items-center'>
            <Input
              type='text'
              placeholder={t('dashboard.analytics.sales_page.search_sales')}
              containerClassName='w-full'
              className='border-primary-1 mb-1 h-11 min-w-[280px] border md:pr-10'
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            {isEmpty(searchValue) ? (
              <SearchIcon className='-ml-7.5' />
            ) : (
              <CloseIcon
                onClick={() => {
                  setSearchValue('');
                }}
                className='-ml-9 cursor-pointer'
              />
            )}
          </div>
          <div className='mt-4 flex items-center md:mt-0'>
            <h2 className='mr-6 flex-1 text-lg font-bold md:ml-8'>
              {t('common.filter')}
            </h2>
            <DatePickerWithRange date={dateValue} setDate={setDateValue} />
          </div>
        </div>
        <SalesTable />
        <div className='mt-10 mb-4 flex w-full flex-col items-center justify-center'>
          <Button
            variant='outline'
            size='md'
            className='font-bold'
            onClick={() => {
              // setPage((currPage) => currPage + 1);
            }}
          >
            {t('common.load_more')}
          </Button>
          <Button
            size='md'
            className='button-shadow mt-4 font-bold'
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          >
            {t('common.back_to_top')}
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
}
