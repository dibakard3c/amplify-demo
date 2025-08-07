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
import { Transaction } from '@estia/typings/transaction';
import { formatCurrency } from '@estia/utils/general';
import { cn } from '@estia/lib/utils';
import { startCase } from 'lodash';

const data: Transaction[] = [
  {
    shop_id: 'POS_001',
    date: '2025-01-15 14:30',
    trans_id: 'TRX_123456',
    amount: 580,
    status: 'failed',
  },
  {
    shop_id: 'POS_002',
    date: '2025-01-14 10:40',
    trans_id: 'TRX_654635',
    amount: 130,
    status: 'success',
  },
  {
    shop_id: 'POS_003',
    date: '2025-01-13 20:10',
    trans_id: 'TRX_986734',
    amount: 580,
    status: 'cancelled',
  },
  {
    shop_id: 'POS_004',
    date: '2025-01-12 11:20',
    trans_id: 'TRX_34567',
    amount: 130,
    status: 'success',
  },
  {
    shop_id: 'POS_005',
    date: '2025-01-11 16:40',
    trans_id: 'TRX_123456',
    amount: 580,
    status: 'success',
  },
];

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'shop_id',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-neutral-4 font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          POS ID/Shop ID
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='pl-3 text-base font-semibold capitalize'>
        {row.getValue('shop_id')}
      </div>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-neutral-4 font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date Time
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='text-base font-semibold'>{row.getValue('date')}</div>
    ),
  },
  {
    accessorKey: 'trans_id',
    header: ({ column }) => {
      return (
        <div className='flex justify-center'>
          <Button
            variant='ghost'
            className='text-neutral-4 font-bold'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Transaction ID
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className='text-center text-base font-bold'>
        {row.getValue('trans_id')}
      </div>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <div className='flex justify-center'>
          <Button
            variant='ghost'
            className='text-neutral-4 font-bold'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Amount
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className='text-center text-base font-medium'>
          {formatCurrency(row.getValue('amount'))}
        </div>
      );
    },
  },
  {
    id: 'status',
    header: ({ column }) => {
      return (
        <div className='flex justify-center'>
          <Button
            variant='ghost'
            className='text-neutral-4 font-bold'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Status
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <div className='text-center'>
          <Button
            variant='default'
            className={cn(
              'h-11 min-w-28 text-center font-bold',
              transaction?.status === 'failed' && 'bg-danger',
              transaction?.status === 'success' && 'bg-primary-4',
              transaction?.status === 'cancelled' && 'bg-neutral-4'
            )}
          >
            {startCase(transaction?.status)}
          </Button>
        </div>
      );
    },
  },
];

export function SalesTransactions() {
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
    },
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/*<div className='flex items-center justify-end space-x-2 py-4'>*/}
      {/*  <div className='text-muted-foreground flex-1 text-sm'>*/}
      {/*    {table.getFilteredSelectedRowModel().rows.length} of{' '}*/}
      {/*    {table.getFilteredRowModel().rows.length} row(s) selected.*/}
      {/*  </div>*/}
      {/*  <div className='space-x-2'>*/}
      {/*    <Button*/}
      {/*      variant='outline'*/}
      {/*      size='sm'*/}
      {/*      onClick={() => table.previousPage()}*/}
      {/*      disabled={!table.getCanPreviousPage()}*/}
      {/*    >*/}
      {/*      Previous*/}
      {/*    </Button>*/}
      {/*    <Button*/}
      {/*      variant='outline'*/}
      {/*      size='sm'*/}
      {/*      onClick={() => table.nextPage()}*/}
      {/*      disabled={!table.getCanNextPage()}*/}
      {/*    >*/}
      {/*      Next*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}
