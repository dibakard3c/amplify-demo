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
import { kycRequirements } from '@estia/helpers/kyc-requirements';
import { useTranx } from '@estia/hooks/useTranx';

interface KybRequirementsTableProps {
  searchQuery?: string;
}

export function KybRequirementsTable({
  searchQuery,
}: KybRequirementsTableProps) {
  const { t } = useTranx();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'entityType',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            className='text-neutral-4 font-bold'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('dashboard.kyb.requirements_page.kyb_table_labels.entity_type')}
            <ChevronsUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className='text-neutral-2 pl-3 text-base font-semibold capitalize'>
          {row.getValue('entityType')}
        </div>
      ),
    },
    {
      accessorKey: 'code',
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
              {t('dashboard.kyb.requirements_page.kyb_table_labels.code')}
              <ChevronsUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className='text-neutral-2 pr-8 text-right text-base font-semibold'>
          {row.getValue('code')}
        </div>
      ),
    },
    {
      accessorKey: 'requiredDocuments',
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
                'dashboard.kyb.requirements_page.kyb_table_labels.required_docs'
              )}
              <ChevronsUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className='text-neutral-2 flex justify-end pr-4 text-right text-base font-semibold'>
          <p className='bg-primary-6 rounded p-2 font-bold text-white uppercase'>
            {t('dashboard.kyb.requirements_page.document', {
              count: row.getValue('requiredDocuments'),
            })}
          </p>
        </div>
      ),
    },
    {
      accessorKey: 'lastUpdated',
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
                'dashboard.kyb.requirements_page.kyb_table_labels.last_updated'
              )}

              <ChevronsUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className='text-neutral-2 pr-4 text-right text-base font-semibold'>
          {row.getValue('lastUpdated')}
        </div>
      ),
    },
    {
      accessorKey: 'actions',
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
              {t('dashboard.kyb.requirements_page.kyb_table_labels.actions')}
              <ChevronsUpDown />
            </Button>
          </div>
        );
      },
      cell: ({}) => (
        <div className='text-neutral-2 text-right text-base font-semibold'>
          <Button onClick={() => {}}>
            {t('dashboard.kyb.requirements_page.download')}
          </Button>
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
    data: kycRequirements,
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
      globalFilter: searchQuery,
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: 10, //custom default page size
      },
    },
  });

  return (
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className='h-24 text-center'>
              {t('common.no_results_found')}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
