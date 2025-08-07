'use client';

import React, { useState } from 'react';
import { Button } from '@estia/components/ui/button';
import { SalesChart } from '@estia/components/dashboard/sales-chart';
import { get, isEmpty } from 'lodash';
import Image from 'next/image';
import { Images } from '@estia/assets';
import TransactionGroup from '@estia/components/item-views/transaction-group';
import { useAppSelector } from '@estia/store/store';
import { selectTransactions } from '@estia/store/selector';
import { useFetchTransactionsQuery } from '@estia/networking/endpoints/transaction';

export default function Page() {
  const [page, setPage] = useState(0);

  const transactions = useAppSelector(selectTransactions);

  const { isLoading } = useFetchTransactionsQuery(
    { page, size: 10, hideLoader: page === 0 },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <div className='bg-neutral-8 mt-8 rounded-2xl p-8'>
      <h1 className='mb-4 text-3xl font-bold'>Sales (Current Year)</h1>
      <h2 className='mb-4 text-4xl font-bold'>4.768,00 EUR</h2>
      <div className='dashboard-shadow relative mt-8 rounded-xl p-6'>
        <div className='mb-2 flex flex-row justify-between'>
          <h2 className='text-2xl'>Sales (Current Year)</h2>
        </div>
        <SalesChart showTimeline />
      </div>
      <div className='dashboard-shadow relative mt-8 rounded-xl p-6'>
        {!isLoading && isEmpty(transactions?.groupedList) ? (
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
        ) : isLoading ? (
          <p className='py-12 text-center text-base font-medium'>Loading...</p>
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
          <div className='mt-10 mb-4 flex w-full items-center justify-center'>
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
    </div>
  );
}
