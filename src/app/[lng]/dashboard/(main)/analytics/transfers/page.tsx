'use client';

import React, { useState } from 'react';
import { AccountTransfersTable } from '@estia/components/analytics/account-transfers-table';
import DashboardCard from '@estia/components/layout/dashboard-card';
import { Button } from '@estia/components/ui/button';
import { Input } from '@estia/components/ui/input';
import { isEmpty } from 'lodash';
import { SearchIcon } from '@estia/assets/icons/search';
import { CloseIcon } from '@estia/assets/icons/close';
import { DatePickerWithRange } from '@estia/components/transactions/DatePickerWithRange';
import { useTranx } from '@estia/hooks/useTranx';

export default function Page() {
  const { t } = useTranx();

  const [searchValue, setSearchValue] = useState('');
  const [dateValue, setDateValue] = useState<any>({
    from: undefined,
    to: undefined,
  });

  return (
    <DashboardCard title={t('dashboard.analytics.transfer_page.page_title')}>
      <div className='dashboard-shadow relative mt-6 rounded-xl p-6'>
        <div className='mb-2 flex flex-row justify-between'>
          <h2 className='text-lg md:text-2xl'>
            {t('dashboard.analytics.transfer_page.table_title')}
          </h2>
        </div>
        <div className='my-3 flex flex-col justify-between md:flex-row md:items-center'>
          <div className='flex items-center'>
            <Input
              type='text'
              placeholder={t('dashboard.analytics.transfer_page.search_hint')}
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
        <AccountTransfersTable perPage={200} />
        <div className='mt-10 mb-4 flex flex-col items-center justify-center pl-4'>
          <Button
            variant='outline'
            size='md'
            className='font-bold'
            onClick={() => {}}
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
