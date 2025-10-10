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
import { cn } from '@estia/utils/utils';
import { formatNumber } from '@estia/utils/general';
import { DownTrend, UpTrend } from '@estia/assets';
import { useTranx } from '@estia/hooks/useTranx';

const data: any[] = [
  {
    age_group: '18-25',
    amount: 135230,
    percentage: '+21,3%',
    // eslint-disable-next-line i18next/no-literal-string
    trend: 'up',
  },
  {
    age_group: '26-35',
    amount: 39172,
    percentage: '+8,3%',
    // eslint-disable-next-line i18next/no-literal-string
    trend: 'up',
  },
  {
    age_group: '36-45',
    amount: 15230,
    percentage: '-7,3%',
    // eslint-disable-next-line i18next/no-literal-string
    trend: 'down',
  },
  {
    age_group: '46-55',
    amount: 5230,
    percentage: '-3,3%',
    // eslint-disable-next-line i18next/no-literal-string
    trend: 'down',
  },
  {
    age_group: '56-65',
    amount: 5030,
    percentage: '+2,3%',
    // eslint-disable-next-line i18next/no-literal-string
    trend: 'up',
  },
  {
    age_group: '66+',
    amount: 500,
    percentage: '+0,7%',
    // eslint-disable-next-line i18next/no-literal-string
    trend: 'up',
  },
];

export function CustomerDemographicsDetailedTable({ className }: any) {
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
      accessorKey: 'age_group',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            className='text-neutral-4 font-bold'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t(
              'dashboard.analytics.demographics_page.demographics_detailed_table_labels.age_group'
            )}
            <ChevronsUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className='text-neutral-2 pl-6 text-base font-semibold capitalize'>
          {row.getValue('age_group')}
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
              className='text-neutral-4 font-bold'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {t(
                'dashboard.analytics.demographics_page.demographics_detailed_table_labels.count'
              )}
              <ChevronsUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className='text-neutral-2 pr-4 text-right text-base font-semibold'>
          {formatNumber(row.getValue('amount'), 'el-GR', false)}
        </div>
      ),
    },
    {
      accessorKey: 'percentage',
      header: ({ column }) => {
        return (
          <div className='flex justify-end'>
            <Button
              variant='ghost'
              className='text-neutral-4 px-3 font-bold'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {t(
                'dashboard.analytics.demographics_page.demographics_detailed_table_labels.percentage'
              )}
              <ChevronsUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className='text-neutral-2 px-3 text-right text-base font-semibold'>
          {row.getValue('percentage')}
        </div>
      ),
    },
    {
      accessorKey: 'trend',
      header: ({ column }) => {
        return (
          <div className='flex justify-end'>
            <Button
              variant='ghost'
              className='text-neutral-4 px-3 font-bold'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {t(
                'dashboard.analytics.demographics_page.demographics_detailed_table_labels.trend'
              )}
              <ChevronsUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className='flex justify-end pr-8'>
          {row.getValue('trend') == 'up' ? <UpTrend /> : <DownTrend />}
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
    },
  });

  return (
    <div className={cn('w-full', className)}>
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
