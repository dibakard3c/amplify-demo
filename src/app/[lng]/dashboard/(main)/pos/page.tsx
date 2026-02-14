'use client';

import React, { useState } from 'react';
import { Input } from '@estia/components/ui/input';
import { SearchIcon } from '@estia/assets/icons/search';
import UsersTabSwitcher from '@estia/components/users-and-pos/users-tab-switcher';
import { ColumnFiltersState } from '@tanstack/react-table';
import { AddPosDialog } from '@estia/components/dialogs/add-pos';
import { PosTable } from '@estia/components/users-and-pos/pos-table';
import DashboardCard from '@estia/components/layout/dashboard-card';
import { useTranx } from '@estia/hooks/useTranx';

export default function Page() {
  const { t } = useTranx();

  const [search, setSearch] = useState('');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  return (
    <DashboardCard title={t('dashboard.users_and_pos.pos_page.page_title')}>
      <div className='flex flex-row py-4 md:flex-col md:justify-between md:py-0'>
        <UsersTabSwitcher className='flex-1' />
        <div className='flex items-center justify-end text-sm md:my-4'>
          <AddPosDialog />
        </div>
      </div>
      <div className='mb-4 flex items-center justify-between min-[140rem]:mb-6'>
        <div className='flex w-full items-center md:w-auto'>
          <Input
            type='text'
            placeholder={t('dashboard.users_and_pos.pos_page.search_hint')}
            containerClassName='w-full'
            className='border-primary-1 mb-1 h-11 min-w-[280px] border pr-10 min-[140rem]:h-14 min-[140rem]:min-w-[600px]'
            value={search ?? ''}
            onChange={(event) => {
              setSearch(event?.target?.value || '');
            }}
          />
          <SearchIcon className='-ml-8 min-[140rem]:size-6' />
        </div>
      </div>
      <div className='dashboard-shadow rounded-xl bg-white p-6'>
        <h2 className='text-2xl'>
          {t('dashboard.users_and_pos.pos_page.table_title')}
        </h2>
        <PosTable
          search={search}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      </div>
    </DashboardCard>
  );
}
