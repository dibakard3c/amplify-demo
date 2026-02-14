'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getGroupedRowModel,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@estia/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@estia/components/ui/table';
import { get, isEmpty, startCase } from 'lodash';
import { useAppSelector } from '@estia/store/store';
import { selectTransactions } from '@estia/store/selector';
import { useMemo } from 'react';
import {
  compareIgnoreCase,
  formatCurrency,
  formatDate,
  formatHumanReadableDate,
  formatNumber,
} from '@estia/utils/general';
import {
  CashbackIcon,
  CopyIcon,
  Images,
  PaymentFailedIcon,
  PaymentIcon,
  TransactionArrow,
  WalletIcon,
} from '@estia/assets';
import { cn } from '@estia/utils/utils';
import Image from 'next/image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Toast } from '@estia/helpers/toast';
import { useTranx } from '@estia/hooks/useTranx';

export const CopiableCell = ({ value }: { value: string }) => {
  const { t } = useTranx();

  return (
    <CopyToClipboard
      text={value}
      onCopy={() => Toast.showSuccess({ message: t('common.clipboard_copy') })}
    >
      <div className='group flex cursor-pointer items-center text-center text-base font-semibold'>
        {value}
        <CopyIcon className='ml-1 size-5 opacity-0 group-hover:opacity-100' />
      </div>
    </CopyToClipboard>
  );
};

export function TransactionsTable({ setPage }: any) {
  const transactions = useAppSelector(selectTransactions);

  const { t } = useTranx();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'desc',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            className='text-neutral-3 font-bold'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('dashboard.transactions.table_labels.description')}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className='flex min-w-60 items-center pl-2'>
            <div className='bg-primary-2 flex size-16 items-center justify-center rounded-[12px] pl-0.5'>
              {compareIgnoreCase(item?.walletTransactionState, 'failed') ? (
                <div className='flex-row items-center'>
                  <PaymentFailedIcon className='size-8' />
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
                  <PaymentIcon className='size-8' />
                </div>
              ) : item?.walletTransactionType === 'CASH_BACK' ? (
                <div className='flex-row items-center'>
                  <CashbackIcon className='size-8' />
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
            <h2 className='text-neutral-3 flex-1 pl-4 text-base font-medium text-wrap'>
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
                    : // eslint-disable-next-line i18next/no-literal-string
                      'Sender Name - Todo') ||
                  startCase(
                    compareIgnoreCase(
                      item?.estiaTransactionResponseType,
                      'RECEIVED'
                    )
                      ? item?.walletTransactionType
                          ?.toLowerCase()
                          ?.replace('send', 'received')
                      : item?.walletTransactionType?.toLowerCase()
                  )}{' '}
            </h2>
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return (
          <div className='flex justify-end'>
            <Button
              variant='ghost'
              className='text-neutral-3 font-bold'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {t('dashboard.transactions.table_labels.date_and_time')}
              <ArrowUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className='text-right text-base font-semibold capitalize'>
          {formatDate(row.getValue('createdAt'), 'dd/MM/yyyy HH:mm')}
        </div>
      ),
    },
    {
      accessorKey: 'estiaTransactionId',
      header: ({ column }) => {
        return (
          <div className='flex justify-end'>
            <Button
              variant='ghost'
              className='text-neutral-3 font-bold'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {t('dashboard.transactions.table_labels.transaction_no')}
              <ArrowUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className='text-neutral-3 flex justify-end pr-6 text-right text-base font-semibold text-wrap'>
          #
          <CopiableCell
            value={`${get(row.getValue('estiaTransactionId')?.toString()?.split('-'), 0)}`}
          />
        </div>
      ),
    },
    {
      accessorKey: 'posId',
      header: ({ column }) => {
        return (
          <div className='flex justify-end'>
            <Button
              variant='ghost'
              className='text-neutral-3 font-bold'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {t('dashboard.transactions.table_labels.pos_id')}
              <ArrowUpDown />
            </Button>
          </div>
        );
      },
      cell: ({}) => (
        <div className='text-primary-3 pr-3 text-right text-base font-semibold capitalize'>
          <h3>-</h3>
        </div>
      ),
    },
    {
      id: 'status',
      header: ({ column }) => {
        return (
          <div className='flex justify-end'>
            <Button
              variant='ghost'
              className='text-neutral-3 font-bold'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {t('dashboard.transactions.table_labels.status')}
              <ArrowUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className='pr-2 text-right text-base font-semibold capitalize'>
          <h3
            className={cn(
              'text-primary-4',
              compareIgnoreCase(
                row.original.walletTransactionState,
                'failed'
              ) && 'text-danger'
            )}
          >
            {startCase(row.original.walletTransactionState?.toLowerCase())}
          </h3>
        </div>
      ),
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => {
        return (
          <div className='flex justify-end'>
            <Button
              variant='ghost'
              className='text-neutral-3 font-bold'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {t('dashboard.transactions.table_labels.amount')}
              <ArrowUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        function processAmount() {
          if (
            compareIgnoreCase(
              row?.original?.walletTransactionType,
              'SELL_ESTIA_TOKEN'
            )
          ) {
            return formatCurrency(row?.original?.eurAmountReceived);
          } else if (
            compareIgnoreCase(
              row?.original?.walletTransactionType,
              'BUY_ESTIA_TOKEN'
            )
          ) {
            return `EST ${formatNumber(row?.original?.estiaAmountReceived)}`;
          } else if (
            compareIgnoreCase(row?.original?.walletTransactionType, 'CASH_BACK')
          ) {
            return `+ EST ${formatNumber(row?.original?.estiaAmountReceived)}`;
          } else if (
            compareIgnoreCase(
              row?.original?.walletTransactionType,
              'PAY_NOW',
              'SEND_EURO'
            )
          ) {
            if (
              compareIgnoreCase(
                row?.original?.estiaTransactionResponseType,
                'RECEIVED'
              )
            ) {
              return `+ ${formatCurrency(row?.original?.eurAmountReceived)}`;
            } else {
              return `- ${formatCurrency(row?.original?.eurAmountSend)}`;
            }
          } else if (
            compareIgnoreCase(
              row?.original?.walletTransactionType,
              'SEND_TOKENS'
            )
          ) {
            if (
              compareIgnoreCase(
                row?.original?.estiaTransactionResponseType,
                'RECEIVED'
              )
            ) {
              return `+ EST ${formatNumber(row?.original?.estiaAmountReceived)}`;
            } else {
              return `- EST ${formatNumber(row?.original?.estiaAmountSend)}`;
            }
          }
        }

        return (
          <div className='text-neutral-3 mr-4 text-right text-base font-semibold capitalize'>
            {processAmount()}
          </div>
        );
      },
    },
  ];

  const data = useMemo(
    () =>
      Object.keys(transactions?.groupedList)
        .map((key) => [
          {
            date: key,
            isHeader: true,
          },
          ...get(transactions?.groupedList, key),
        ])
        .flat(),
    [transactions?.groupedList]
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    manualPagination: true,
  });

  return (
    <div className='mt-6 w-full'>
      <div className='rounded-md'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length
              ? table.getRowModel().rows.map((row) =>
                  row.original.isHeader ? (
                    <TableRow
                      disableHover={true}
                      disableBgSeparator={true}
                      key={row.id}
                      className='bg-none'
                    >
                      <TableCell>
                        <p className='pt-2 pl-3 text-base font-semibold capitalize'>
                          {formatHumanReadableDate(row.original.date, false)}
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow
                      key={row.id}
                      disableBgSeparator={true}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  )
                )
              : null}
          </TableBody>
        </Table>
        {isEmpty(transactions?.groupedList) ? (
          <div className='my-32 flex flex-col items-center justify-center'>
            <Image
              src={Images.emptyTransactions}
              className='my-8 size-30'
              alt={t('dashboard.transactions.empty_transactions')}
            />
            <p className='text-neutral-1 mb-4 text-base font-semibold'>
              {t('dashboard.transactions.no_transactions_found')}
            </p>
          </div>
        ) : null}
        {!isEmpty(transactions?.groupedList) ? (
          <div className='mt-2 flex flex-col items-center'>
            {transactions?.hasMore ? (
              <Button
                variant='outline'
                size='md'
                className='max-w-max'
                onClick={() => {
                  setPage((currPage: number) => currPage + 1);
                }}
              >
                {t('common.load_more')}
              </Button>
            ) : null}
            <Button
              size='md'
              className='button-shadow mt-4 max-w-max'
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
        ) : null}
      </div>
    </div>
  );
}
