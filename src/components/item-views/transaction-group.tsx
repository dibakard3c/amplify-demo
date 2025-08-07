import React from 'react';
import { formatHumanReadableDate } from '@estia/utils/general';
import TransactionItem from '@estia/components/item-views/transaction-item';
import { Transaction } from '@estia/typings/transaction';

export default function TransactionGroup({ title, transactions }: any) {
  return (
    <div className='block w-full'>
      <h1 className='text-neutral-2 text-base font-medium'>
        {formatHumanReadableDate(title, false)}
      </h1>
      <div className='my-4 mb-2'>
        {transactions?.map((item: Transaction, index: string) => (
          <TransactionItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
