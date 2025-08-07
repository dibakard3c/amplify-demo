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
import { CopyIcon } from '@estia/assets';
import { useListPosUsersQuery } from '@estia/networking/endpoints/user';
import PosActions from '@estia/components/users/pos-actions';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Toast } from '@estia/helpers/toast';
import { lowerCase, startCase } from 'lodash';
import { useAppSelector } from '@estia/store/store';
import {
  selectMerchantPosUsers,
  selectMerchantSubUsers,
} from '@estia/store/selector';

const CopiableCell = ({ value }: { value: string }) => {
  return (
    <CopyToClipboard
      text={value}
      onCopy={() =>
        Toast.showSuccess({ message: 'Copied to clipboard successfully' })
      }
    >
      <div className='group flex cursor-pointer items-center pl-4 text-center text-base font-semibold'>
        {value}
        <CopyIcon className='ml-1 hidden size-5 group-hover:block' />
      </div>
    </CopyToClipboard>
  );
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-neutral-4 text-center font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          NAME
          <ChevronsUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='pl-3 text-base font-semibold'>{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'macId',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-neutral-4 font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          POS MacID
          <ChevronsUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='pl-3 text-base font-semibold capitalize'>
        {row.getValue('macId')}
      </div>
    ),
  },
  {
    accessorKey: 'model',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-neutral-4 font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          POS Model
          <ChevronsUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='pl-3 text-base font-semibold'>
        {startCase(lowerCase(row.getValue('model')))}
      </div>
    ),
  },
  {
    accessorKey: 'loginToken',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-neutral-4 font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Login Token
          <ChevronsUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <CopiableCell value={row.getValue('loginToken')} />,
  },
  {
    accessorKey: 'registerToken',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-neutral-4 font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Auth Token
          <ChevronsUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <CopiableCell value={row.getValue('registerToken')} />,
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
          <PosActions user={row.original} />
        </div>
      );
    },
  },
];

export function PosTable({ search, columnFilters, setColumnFilters }: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const merchantPosUsers = useAppSelector(selectMerchantPosUsers);

  const { isLoading } = useListPosUsersQuery();

  const table = useReactTable({
    data: merchantPosUsers || [],
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
