'use client';

import React, { useState } from 'react';
import { Input } from '@estia/components/ui/input';
import { SearchIcon } from '@estia/assets/icons/search';
import UsersTabSwitcher from '@estia/components/users/users-tab-switcher';
import { ColumnFiltersState } from '@tanstack/react-table';
import { AddPosDialog } from '@estia/components/dialogs/add-pos';
import { PosTable } from '@estia/components/users/pos-table';

export default function Page() {
  const [search, setSearch] = useState('');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  return (
    <div className='bg-neutral-8 mt-8 rounded-2xl p-8'>
      <h1 className='mb-4 text-3xl font-bold'>POS Management</h1>
      <UsersTabSwitcher />
      <div className='my-4 flex items-center justify-between'>
        <div className='flex items-center'>
          <Input
            type='text'
            placeholder='Search POS'
            className='border-primary-1 mb-1 h-11 min-w-[280px] border pr-10'
            value={search ?? ''}
            onChange={(event) => {
              setSearch(event?.target?.value || '');
            }}
          />
          <SearchIcon className='-ml-9' />
        </div>
        <div className='flex items-center'>
          <AddPosDialog />
        </div>
      </div>
      <div className='dashboard-shadow rounded-xl bg-white p-6'>
        <h2 className='text-2xl'>POS</h2>
        <PosTable
          search={search}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      </div>
    </div>
  );
}
