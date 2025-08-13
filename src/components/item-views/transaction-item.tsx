import React, { useMemo } from 'react';
import {
  CashbackIcon,
  PaymentFailedIcon,
  PaymentIcon,
  TransactionArrow,
  WalletIcon,
} from '@estia/assets';
import { cn } from '@estia/lib/utils';
import {
  compareIgnoreCase,
  formatCurrency,
  formatHumanReadableDate,
  formatNumber,
} from '@estia/utils/general';
import { startCase } from 'lodash';
import { Transaction } from '@estia/typings/transaction';

interface TransactionItemProps {
  item: Transaction;
}

export default function TransactionItem({ item }: TransactionItemProps) {
  const amount = useMemo(() => {
    if (compareIgnoreCase(item?.walletTransactionType, 'SELL_ESTIA_TOKEN')) {
      return formatCurrency(item?.eurAmountReceived);
    } else if (
      compareIgnoreCase(item?.walletTransactionType, 'BUY_ESTIA_TOKEN')
    ) {
      return `EST ${formatNumber(item?.estiaAmountReceived)}`;
    } else if (compareIgnoreCase(item?.walletTransactionType, 'CASH_BACK')) {
      return `+ EST ${formatNumber(item?.estiaAmountReceived)}`;
    } else if (
      compareIgnoreCase(item?.walletTransactionType, 'PAY_NOW', 'SEND_EURO')
    ) {
      if (compareIgnoreCase(item?.estiaTransactionResponseType, 'RECEIVED')) {
        return `+ ${formatCurrency(item?.eurAmountReceived)}`;
      } else {
        return `- ${formatCurrency(item?.eurAmountSend)}`;
      }
    } else if (compareIgnoreCase(item?.walletTransactionType, 'SEND_TOKENS')) {
      if (compareIgnoreCase(item?.estiaTransactionResponseType, 'RECEIVED')) {
        return `+ EST ${formatNumber(item?.estiaAmountReceived)}`;
      } else {
        return `- EST ${formatNumber(item?.estiaAmountSend)}`;
      }
    }
  }, [item]);

  return (
    <div className='flex items-center justify-between py-3'>
      <div className='flex w-full items-center justify-evenly'>
        <div className='flex w-[25%] min-w-60 items-center'>
          <div className='bg-primary-2 mr-4 flex size-14 items-center justify-center rounded-[12px] pl-0.5'>
            {compareIgnoreCase(item?.walletTransactionState, 'failed') ? (
              <div className='flex-row items-center'>
                <PaymentFailedIcon className='size-7' />
              </div>
            ) : item?.walletTransactionType === 'BUY_ESTIA_TOKEN' ? (
              <div className='flex flex-row items-center'>
                <p className='text-xs font-medium text-white'>€</p>
                <TransactionArrow className='mx-0.5 size-2' />
                <p className='text-xs font-medium text-white'>EST</p>
              </div>
            ) : item?.walletTransactionType === 'SELL_ESTIA_TOKEN' ? (
              <div className='flex flex-row items-center'>
                <p className='text-xs font-medium text-white'>EST</p>
                <TransactionArrow className='mx-0.5 size-2' />
                <p className='text-xs font-medium text-white'>€</p>
              </div>
            ) : item?.walletTransactionType === 'PAY_NOW' ? (
              <div className='flex-row items-center'>
                <PaymentIcon className='size-7' />
              </div>
            ) : item?.walletTransactionType === 'CASH_BACK' ? (
              <div className='flex-row items-center'>
                <CashbackIcon className='size-7' />
              </div>
            ) : item?.walletTransactionType === 'SEND_TOKENS' ? (
              <div className='flex flex-row items-center'>
                <p className='text-xs font-medium text-white'>EST</p>
                <TransactionArrow className='mx-0.5 size-2' />
                <WalletIcon className='size-3' />
              </div>
            ) : item?.walletTransactionType === 'RECEIVED_TOKENS' ? (
              <div className='flex flex-row items-center'>
                <WalletIcon className='size-3' />
                <TransactionArrow className='mx-0.5 size-2' />
                <p className='text-xs font-medium text-white'>EST</p>
              </div>
            ) : item?.walletTransactionType === 'SEND_EURO' ? (
              <div className='flex-row items-center'>
                <div className='flex flex-row items-center'>
                  <p className='text-[0.6rem] font-medium text-white'>EST</p>
                  <TransactionArrow className='mx-0.5 size-2' />
                  <p className='text-[0.6rem] font-medium text-white'>IBAN</p>
                </div>
              </div>
            ) : null}
          </div>
          <h2 className='text-neutral-3 text-lg font-medium'>
            {compareIgnoreCase(
              item?.walletTransactionType,
              'SEND_TOKENS',
              'SEND_EURO'
            )
              ? startCase(
                  compareIgnoreCase(
                    item?.estiaTransactionResponseType,
                    'RECEIVED'
                  )
                    ? item?.walletTransactionType
                        ?.toLowerCase()
                        ?.replace('send', 'received')
                    : item?.walletTransactionType?.toLowerCase()
                )
              : (compareIgnoreCase(
                  item?.estiaTransactionResponseType,
                  'RECEIVED'
                )
                  ? item?.receivedBy
                  : 'Sender Name') ||
                startCase(
                  compareIgnoreCase(
                    item?.estiaTransactionResponseType,
                    'RECEIVED'
                  )
                    ? item?.walletTransactionType
                        ?.toLowerCase()
                        ?.replace('send', 'received')
                    : item?.walletTransactionType?.toLowerCase()
                )}
          </h2>
        </div>
        <div className='w-1/6 min-w-44'>
          <h2 className='text-neutral-4 text-sm font-medium'>Date</h2>
          <h3 className='text-neutral-3 mt-0.5 text-lg font-medium'>
            {formatHumanReadableDate(item?.createdAt)}
          </h3>
        </div>
        <div className='w-1/5 min-w-56'>
          <h2 className='text-neutral-4 text-sm font-medium'>
            Transaction no.
          </h2>
          <h3 className='text-neutral-3 mt-0.5 text-lg font-medium'>
            {item?.estiaTransactionId}
          </h3>
        </div>
        {/*<div className='w-1/6'>*/}
        {/*  <h2 className='text-neutral-4 text-sm font-medium'>Network</h2>*/}
        {/*  <h3 className='text-neutral-3 mt-0.5 text-lg font-medium'>Polygon</h3>*/}
        {/*</div>*/}
        <div className='w-1/6 min-w-12'>
          <h2 className='text-neutral-4 text-sm font-medium'>Status</h2>
          <h3
            className={cn(
              'text-primary-4 mt-0.5 text-lg font-medium',
              compareIgnoreCase(item?.walletTransactionState, 'failed') &&
                'text-danger'
            )}
          >
            {startCase(item?.walletTransactionState?.toLowerCase())}
          </h3>
        </div>
        <div className='w-[10%] min-w-44 text-right'>
          <h2 className='text-neutral-3 text-sm font-medium'>Amount</h2>
          <h3
            className={cn(
              'text-primary-1 mt-0.5 text-lg font-semibold',
              'dark:text-white/80',
              compareIgnoreCase(item?.walletTransactionType, 'cash_back') &&
                'text-success dark:text-success'
            )}
          >
            {amount}
          </h3>
        </div>
      </div>
    </div>
  );
}
