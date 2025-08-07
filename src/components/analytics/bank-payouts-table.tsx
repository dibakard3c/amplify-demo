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
import { ChevronsUpDown } from 'lucide-react';

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
import { Input } from '@estia/components/ui/input';
import { SearchIcon } from '@estia/assets/icons/search';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'pos_id',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-neutral-4 font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          POS ID/Shop ID
          <ChevronsUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='text-neutral-2 pl-3 text-base font-semibold capitalize'>
        {row.getValue('pos_id')}
      </div>
    ),
  },
  {
    accessorKey: 'iban',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-neutral-4 font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          IBAN
          <ChevronsUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='text-neutral-2 pl-3 text-base font-semibold'>
        {row.getValue('iban')}
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
          Date
          <ChevronsUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='text-neutral-2 text-base font-semibold'>
        {row.getValue('date')}
      </div>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-neutral-4 font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <ChevronsUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='text-neutral-2 pl-3 text-base font-semibold'>
        {row.getValue('amount')}
      </div>
    ),
  },
];

interface BankPayoutsTableProps {
  perPage?: number;
}

const data: any[] = new Array(10).fill({
  pos_id: 'POS_001',
  iban: 'GR89 3704 0044 0532 0130 00',
  amount: formatCurrency(580),
  date: '16/6/2025 14:30',
});

export function BankPayoutsTable({ perPage }: BankPayoutsTableProps) {
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
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: perPage || 10, //custom default page size
      },
    },
  });

  return (
    <div className='mt-3 w-full'>
      <div className='mr-4 mb-3 flex justify-end'>
        <div className='flex items-center self-end'>
          <Input
            type='text'
            placeholder='Search transactions'
            className='border-primary-1 mb-1 h-11 min-w-[280px] border pr-10'
          />
          <SearchIcon className='-ml-9' />
        </div>
      </div>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
