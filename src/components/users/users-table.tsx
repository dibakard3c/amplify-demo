'use client';

import * as React from 'react';
import {
  ColumnDef,
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
import { useListMerchantSubUsersQuery } from '@estia/networking/endpoints/user';
import { MerchantUser } from '@estia/typings/user';
import { lowerCase, startCase } from 'lodash';
import UserActions from '@estia/components/users/user-actions';
import { useAppSelector } from '@estia/store/store';
import { selectMerchantSubUsers } from '@estia/store/selector';

export const columns: ColumnDef<MerchantUser>[] = [
  {
    accessorKey: 'firstName',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-neutral-4 font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          First Name
          <ChevronsUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='pl-3 text-base font-semibold capitalize'>
        {row.getValue('firstName')}
      </div>
    ),
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-neutral-4 text-center font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Last Name
          <ChevronsUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='pl-3 text-base font-semibold'>
        {row.getValue('lastName')}
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-neutral-4 font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Company email
          <ChevronsUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='text-base font-semibold'>{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'mobileNumber',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-neutral-4 font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Mobile
          <ChevronsUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='text-base font-semibold'>
        ({row.original.mobileCountryCode}) {row.getValue('mobileNumber')}
      </div>
    ),
  },
  {
    accessorKey: 'supportRole',
    header: ({ column }) => {
      return (
        <div className='flex justify-center'>
          <Button
            variant='ghost'
            className='text-neutral-4 font-bold'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Role
            <ChevronsUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className='text-center text-base font-semibold'>
        {startCase(lowerCase(row.getValue('supportRole')))}
      </div>
    ),
  },
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <div className='flex justify-center'>
          <Button
            variant='ghost'
            className='text-neutral-4 font-bold'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Actions
            <ChevronsUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className='text-center text-base font-medium'>
          <UserActions user={row.original} />
        </div>
      );
    },
  },
];

export function UsersTable({ search, columnFilters, setColumnFilters }: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const merchantSubUsers = useAppSelector(selectMerchantSubUsers);

  const { isLoading } = useListMerchantSubUsersQuery();

  const table = useReactTable({
    data: merchantSubUsers || [],
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
      globalFilter: search,
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
                  {isLoading ? 'Loading...' : 'No results.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
