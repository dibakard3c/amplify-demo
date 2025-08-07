'use client';

import React, { useMemo, useState } from 'react';
import { Button } from '@estia/components/ui/button';
import { cn } from '@estia/lib/utils';
import { Input } from '@estia/components/ui/input';
import { SearchIcon } from '@estia/assets/icons/search';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@estia/components/ui/dropdown-menu';
import { ChevronDown } from '@estia/assets/icons/chevron';
import { UsersTable } from '@estia/components/users/users-table';
import { AddUserDialog } from '@estia/components/dialogs/add-user';
import UsersTabSwitcher from '@estia/components/users/users-tab-switcher';
import { ColumnFiltersState } from '@tanstack/react-table';

export default function Page() {
  const [search, setSearch] = useState('');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const roles = ['All Users', 'Manager', 'Staff', 'Viewer'];

  const selectedRole = useMemo(
    () =>
      (columnFilters.find((f) => f.id === 'supportRole')?.value ??
        '') as string,
    [columnFilters]
  );

  return (
    <div className='bg-neutral-8 mt-8 rounded-2xl p-8'>
      <h1 className='mb-4 text-3xl font-bold'>User Management</h1>
      <UsersTabSwitcher />
      <div className='my-4 flex items-center justify-end text-sm'>
        <AddUserDialog />
      </div>
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center'>
          <Input
            type='text'
            placeholder='Search user'
            className='border-primary-1 mb-1 h-11 min-w-[280px] border pr-10'
            value={search ?? ''}
            onChange={(event) => {
              setSearch(event?.target?.value || '');
            }}
          />
          <SearchIcon className='-ml-9' />
        </div>
      </div>
      <div className='dashboard-shadow rounded-xl bg-white p-6'>
        <div className='flex justify-between'>
          <h2 className='text-2xl'>Users</h2>
          <DropdownMenu>
            <Button
              asChild
              variant='outline'
              className='border-primary-1 h-11 w-36 hover:border-white'
            >
              <DropdownMenuTrigger>
                <div className='flex items-center pl-2'>
                  <span className='text-base font-bold'>
                    {selectedRole || 'All Users'}
                  </span>
                  <ChevronDown className='ml-1 size-6' />
                </div>
              </DropdownMenuTrigger>
            </Button>
            <DropdownMenuContent className='mt-2 w-72 rounded-2xl p-3 py-2.5'>
              {roles?.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className={cn(
                    'group flex w-full cursor-pointer flex-row justify-between rounded px-2.5 py-4',
                    roles?.length - 1 !== index && 'border-b'
                  )}
                  onClick={() => {
                    if (item === 'All Users') {
                      setColumnFilters((prev) => [
                        ...prev.filter((f) => f.id !== 'supportRole'),
                      ]);
                    } else {
                      setColumnFilters((prev) => [
                        ...prev.filter((f) => f.id !== 'supportRole'),
                        ...(item ? [{ id: 'supportRole', value: item }] : []),
                      ]);
                    }
                  }}
                >
                  <p className='text-base font-bold'>{item}</p>
                  <div className='border-primary-1 flex h-5 w-5 items-center justify-center rounded-full border group-hover:border-white'>
                    {item ===
                      (columnFilters.find((f) => f.id === 'supportRole')
                        ?.value ?? '') && (
                      <div className='bg-primary-1 h-2 w-2 rounded-full group-hover:bg-white'></div>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <UsersTable
          search={search}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      </div>
    </div>
  );
}
