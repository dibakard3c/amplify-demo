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
import { get } from 'lodash';
import { CopiableCell } from '@estia/components/transactions/transactions-table';
import { useTranx } from '@estia/hooks/useTranx';

interface SalesTableProps {
  perPage?: number;
  dataset?: any[];
}

const data: any[] = new Array(5).fill({
  pos_id: 'POS_001',
  transaction_number: '#325535',
  // eslint-disable-next-line i18next/no-literal-string
  date_and_time: 'Today, 10:32 AM',
  // eslint-disable-next-line i18next/no-literal-string
  status: 'Pending',
  amount: formatCurrency(580),
});

export function SalesTable({ perPage, dataset = data }: SalesTableProps) {
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
      accessorKey: 'pos_id',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            className='text-neutral-4 font-bold'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('dashboard.analytics.sales_page.sales_table.pos_id')}
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
              {t('dashboard.analytics.sales_page.sales_table.transaction_no')}
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
              {t('dashboard.analytics.sales_page.sales_table.date_and_time')}
              <ChevronsUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className='text-neutral-2 pr-1 text-right text-base font-semibold'>
          {row.getValue('date_and_time')}
        </div>
      ),
    },
    // {
    //   accessorKey: 'status',
    //   header: ({ column }) => {
    //     return (
    //       <div className='w-full text-right'>
    //         <Button
    //           variant='ghost'
    //           className='text-neutral-4 text-right font-bold'
    //           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //         >
    //           Status
    //           <ChevronsUpDown />
    //         </Button>
    //       </div>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div className='text-primary-3 pr-4 text-right text-base font-semibold'>
    //       {row.getValue('status')}
    //     </div>
    //   ),
    // },
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
              {t('dashboard.analytics.sales_page.sales_table.amount')}
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
  ];

  const table = useReactTable({
    data: dataset,
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
            <TableRow disableBgSeparator disableHover className='w-full'>
              <TableCell rowSpan={1} className='py-5 pl-5 font-semibold'>
                {t('common.today')}
              </TableCell>
            </TableRow>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  disableBgSeparator
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
