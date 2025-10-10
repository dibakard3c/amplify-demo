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
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronsUpDown } from 'lucide-react';

import { Button } from '@estia/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@estia/components/ui/table';
import { formatCurrency } from '@estia/utils/general';
import { CopiableCell } from '@estia/components/transactions/transactions-table';
import { get } from 'lodash';
import { useTranx } from '@estia/hooks/useTranx';

interface BankPayoutsTableProps {
  perPage?: number;
}

const data: any[] = new Array(10).fill({
  // eslint-disable-next-line i18next/no-literal-string
  iban_friendly_name: 'John Doe', // eslint-disable-next-line i18next/no-literal-string
  recipient_iban: 'GR89 3704 0044 0532 0130 00', // eslint-disable-next-line i18next/no-literal-string
  date_and_time: '2025-08-08 10:23:15', // eslint-disable-next-line i18next/no-literal-string
  transaction_number: 'TRX100122',
  amount: formatCurrency(580),
  fee: formatCurrency(580),
  credited: formatCurrency(580),
});

export function AccountTransfersTable({ perPage }: BankPayoutsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { t } = useTranx();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'iban_friendly_name',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            className='text-neutral-4 font-bold'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t(
              'dashboard.analytics.transfer_page.table_labels.iban_friendly_name'
            )}
            <ChevronsUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className='text-neutral-2 pl-3 text-base font-semibold capitalize'>
          {row.getValue('iban_friendly_name')}
        </div>
      ),
    },
    {
      accessorKey: 'recipient_iban',
      header: ({ column }) => {
        return (
          <div className='w-full text-right'>
            <Button
              variant='ghost'
              className='text-neutral-4 text-right font-bold'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {t(
                'dashboard.analytics.transfer_page.table_labels.recipient_iban'
              )}
              <ChevronsUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className='text-neutral-2 pr-4 text-right text-base font-semibold'>
          {row.getValue('recipient_iban')}
        </div>
      ),
    },
    {
      accessorKey: 'date_and_time',
      header: ({ column }) => {
        return (
          <div className='w-full text-right'>
            <Button
              variant='ghost'
              className='text-neutral-4 text-right font-bold'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {t(
                'dashboard.analytics.transfer_page.table_labels.date_and_time'
              )}
              <ChevronsUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className='text-neutral-2 pr-1 text-base font-semibold'>
          {row.getValue('date_and_time')}
        </div>
      ),
    },
    {
      accessorKey: 'transaction_number',
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
              {t(
                'dashboard.analytics.transfer_page.table_labels.transaction_no'
              )}
              <ArrowUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className='text-neutral-3 flex justify-end pr-6 text-right text-base font-semibold text-wrap'>
          <CopiableCell
            value={`${get(row.getValue('transaction_number')?.toString()?.split('-'), 0)}`}
          />
        </div>
      ),
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => {
        return (
          <div className='w-full text-right'>
            <Button
              variant='ghost'
              className='text-neutral-4 text-right font-bold'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {t('dashboard.analytics.transfer_page.table_labels.amount')}
              <ChevronsUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className='text-neutral-2 pr-4 text-right text-base font-semibold'>
          {row.getValue('amount')}
        </div>
      ),
    },
    {
      accessorKey: 'fee',
      header: ({ column }) => {
        return (
          <div className='w-full text-right'>
            <Button
              variant='ghost'
              className='text-neutral-4 text-right font-bold'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {t('dashboard.analytics.transfer_page.table_labels.transfer_fee')}
              <ChevronsUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className='text-neutral-2 pr-4 text-right text-base font-semibold'>
          {row.getValue('fee')}
        </div>
      ),
    },
    {
      accessorKey: 'credited',
      header: ({ column }) => {
        return (
          <div className='w-full text-right'>
            <Button
              variant='ghost'
              className='text-neutral-4 text-right font-bold'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {t(
                'dashboard.analytics.transfer_page.table_labels.amount_credited'
              )}
              <ChevronsUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className='text-neutral-2 pr-4 text-right text-base font-semibold'>
          {row.getValue('credited')}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: perPage || 10, //custom default page size
      },
    },
  });

  return (
    <div className='mt-3 w-full'>
      {/*<div className='mb-3 flex justify-end sm:mr-4'>*/}
      {/*  <div className='flex w-full items-center sm:w-auto sm:self-end'>*/}
      {/*    <Input*/}
      {/*      type='text'*/}
      {/*      placeholder='Search transactions'*/}
      {/*      containerClassName='w-full'*/}
      {/*      className='border-primary-1 mb-1 h-11 w-full border pr-10 sm:min-w-[280px]'*/}
      {/*    />*/}
      {/*    <SearchIcon className='-ml-9' />*/}
      {/*  </div>*/}
      {/*</div>*/}
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='py-5'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  {t('common.no_results_found')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
