'use client';

import React, { useState } from 'react';
import { Input } from '@estia/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@estia/components/ui/dropdown-menu';
import { Button } from '@estia/components/ui/button';
import { cn } from '@estia/utils/utils';
import { isEmpty, isUndefined } from 'lodash';
import { ChevronDown } from '@estia/assets/icons/chevron';
import { DatePickerWithRange } from '@estia/components/transactions/DatePickerWithRange';
import { SearchIcon } from '@estia/assets/icons/search';
import { useFetchTransactionsQuery } from '@estia/networking/endpoints/transaction';
import { useDebounce } from '@estia/hooks/useDebounce';
import { CloseIcon } from '@estia/assets/icons/close';
import DashboardCard from '@estia/components/layout/dashboard-card';
import { TransactionsTable } from '@estia/components/transactions/transactions-table';
import ProcessingLoader from '@estia/components/general/ProcessingLoader';
import { useTranx } from '@estia/hooks/useTranx';
import { compareIgnoreCase } from '@estia/utils/general';

export default function Page() {
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [dateValue, setDateValue] = useState<any>({
    from: undefined,
    to: undefined,
  });
  const [selectedType, setSelectedType] = useState('');

  const debouncedSearchValue = useDebounce(searchValue, 1300);

  const { t } = useTranx();

  const activityOptions = [
    { title: t('dashboard.transactions.type_filter.all'), value: '' },
    {
      title: t('dashboard.transactions.type_filter.transactions'),
      value: 'TRANSACTIONS',
    },
    {
      title: t('dashboard.transactions.type_filter.payments'),
      value: 'SHOPPING_PAYMENTS',
    },
  ];

  const { isLoading } = useFetchTransactionsQuery(
    Object.assign(
      {
        page,
        size: 10,
        hideLoader: page === 0,
      },
      !isEmpty(debouncedSearchValue) && { search: debouncedSearchValue },
      !isEmpty(selectedType) && { type: selectedType },
      !isUndefined(dateValue?.from) &&
        !isUndefined(dateValue?.to) && {
          startDate: dateValue?.from,
          endDate: dateValue?.to,
        }
    ),
    { refetchOnMountOrArgChange: true }
  );

  return (
    <DashboardCard title={t('dashboard.transactions.page_title')}>
      <div className='mt-3 mb-5 flex flex-col justify-between md:flex-row md:items-center'>
        <div className='flex items-center'>
          <Input
            type='text'
            placeholder={t('dashboard.transactions.search_hint')}
            containerClassName='w-full'
            className='border-primary-1 mb-1 h-11 min-w-[280px] border md:pr-10 min-[140rem]:h-14 min-[140rem]:min-w-[600px]'
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          {isEmpty(searchValue) ? (
            <SearchIcon className='-ml-8 min-[140rem]:size-6' />
          ) : (
            <CloseIcon
              onClick={() => {
                setSearchValue('');
              }}
              className='-ml-8 cursor-pointer min-[140rem]:size-6'
            />
          )}
        </div>
        <div className='mt-4 flex items-center md:mt-0'>
          <h2 className='mr-6 flex-1 text-lg font-bold md:ml-8'>
            {t('common.filter')}
          </h2>
          <DropdownMenu>
            <Button
              asChild
              variant={isEmpty(selectedType) ? 'outline' : 'default'}
              className='border-primary-1 h-11 hover:border-white min-[140rem]:h-14'
            >
              <DropdownMenuTrigger>
                <div className='flex items-center pl-2'>
                  <span className='text-base font-bold'>
                    {activityOptions?.find((item) =>
                      compareIgnoreCase(item?.value, selectedType)
                    )?.title || t('dashboard.transactions.type')}
                  </span>
                  <ChevronDown className='ml-1 size-6' />
                </div>
              </DropdownMenuTrigger>
            </Button>
            <DropdownMenuContent className='mt-2 w-72 rounded-2xl p-3 py-2.5'>
              {activityOptions?.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className={cn(
                    'group flex w-full cursor-pointer flex-row justify-between rounded px-2.5 py-4',
                    activityOptions?.length - 1 !== index && 'border-b'
                  )}
                  onClick={() => {
                    setSelectedType(item?.value);
                  }}
                >
                  <p className='text-base font-bold'>{item?.title}</p>
                  <div className='border-primary-1 flex h-5 w-5 items-center justify-center rounded-full border group-hover:border-white'>
                    {item?.value === selectedType && (
                      <div className='bg-primary-1 h-2 w-2 rounded-full group-hover:bg-white'></div>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DatePickerWithRange date={dateValue} setDate={setDateValue} />
        </div>
      </div>
      {isLoading ? (
        <ProcessingLoader
          className='mb-24 lg:mt-24'
          message={t('common.loading_please_wait')}
        />
      ) : (
        <TransactionsTable isLoading={isLoading} setPage={setPage} />
      )}
    </DashboardCard>
  );
}
