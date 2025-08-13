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
import { cn } from '@estia/lib/utils';
import { get, isEmpty, isUndefined, lowerCase, startCase } from 'lodash';
import { ChevronDown } from '@estia/assets/icons/chevron';
import { DatePickerWithRange } from '@estia/components/transactions/DatePickerWithRange';
import { Images } from '@estia/assets';
import { SearchIcon } from '@estia/assets/icons/search';
import { useFetchTransactionsQuery } from '@estia/networking/endpoints/transaction';
import { useDebounce } from '@estia/hooks/useDebounce';
import { useAppSelector } from '@estia/store/store';
import { selectTransactions } from '@estia/store/selector';
import TransactionGroup from '@estia/components/item-views/transaction-group';
import Image from 'next/image';
import { CloseIcon } from '@estia/assets/icons/close';
import DashboardCard from '@estia/components/layout/dashboard-card';

const activityOptions = [
  { title: 'All Activity Type', value: '' },
  { title: 'Transactions', value: 'TRANSACTIONS' },
  { title: 'Shopping Payments', value: 'SHOPPING_PAYMENTS' },
];

export default function Page() {
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [dateValue, setDateValue] = useState<any>({
    from: undefined,
    to: undefined,
  });
  const [selectedType, setSelectedType] = useState('');

  const transactions = useAppSelector(selectTransactions);
  const debouncedSearchValue = useDebounce(searchValue, 1300);

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
    <DashboardCard title='Transactions'>
      <div className='mt-3 mb-5 flex flex-col justify-between md:flex-row md:items-center'>
        <div className='flex items-center'>
          <Input
            type='text'
            placeholder='Search'
            containerClassName='w-full'
            className='border-primary-1 mb-1 h-11 min-w-[280px] border md:pr-10'
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          {isEmpty(searchValue) ? (
            <SearchIcon className='-ml-9' />
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
          <h2 className='mr-6 flex-1 text-lg font-bold md:ml-8'>Filter</h2>
          <DropdownMenu>
            <Button
              asChild
              variant={isEmpty(selectedType) ? 'outline' : 'default'}
              className='border-primary-1 h-11 hover:border-white'
            >
              <DropdownMenuTrigger>
                <div className='flex items-center pl-2'>
                  <span className='text-lg font-bold'>
                    {startCase(lowerCase(selectedType)) || 'Type'}
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
      <div className='dashboard-shadow flex w-full flex-col items-center justify-end rounded-2xl p-6 text-sm'>
        {isEmpty(transactions?.groupedList) && !isLoading ? (
          <div className='my-32 flex flex-col items-center justify-center'>
            <Image
              src={Images.emptyTransactions}
              className='mt-8 mb-4 size-30'
              alt='Empty Transactions'
            />
            <p className='text-neutral-1 mb-4 text-base font-semibold'>
              No transactions found
            </p>
          </div>
        ) : isLoading && isEmpty(transactions?.groupedList) ? (
          <p className='py-12 text-base font-medium'>Loading...</p>
        ) : (
          Object.keys(transactions?.groupedList)?.map((key) => (
            <TransactionGroup
              key={key}
              title={key}
              transactions={get(transactions?.groupedList, key)}
            />
          ))
        )}
        {!isEmpty(transactions?.groupedList) && !isLoading ? (
          <div className='mt-10 mb-4'>
            <Button
              size='md'
              className='button-shadow'
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
            >
              Back to top
            </Button>
            {transactions?.hasMore ? (
              <Button
                variant='outline'
                size='md'
                className='ml-4'
                onClick={() => {
                  setPage((currPage) => currPage + 1);
                }}
              >
                Load more
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </DashboardCard>
  );
}
