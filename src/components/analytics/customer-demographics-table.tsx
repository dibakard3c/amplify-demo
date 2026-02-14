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
import { formatCurrency } from '@estia/utils/general';
import { useTranx } from '@estia/hooks/useTranx';
import { demographicsTable } from '@estia/helpers/dummy';

export function CustomerDemographicsTable({ className }: any) {
  const { t } = useTranx();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'city',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            className='text-neutral-4 font-bold'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('dashboard.analytics.main_page.demographics_table_labels.city')}
            <ChevronsUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className='text-neutral-2 pl-3 text-base font-semibold capitalize'>
          {row.getValue('city')}
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
              className='text-neutral-4 px-3 font-bold'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {t(
                'dashboard.analytics.main_page.demographics_table_labels.total_sales'
              )}
              <ChevronsUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className='text-neutral-2 px-3 text-right text-base font-semibold'>
          {formatCurrency(row.getValue('amount'))}
        </div>
      ),
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: demographicsTable,
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
