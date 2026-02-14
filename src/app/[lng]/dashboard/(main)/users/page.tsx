'use client';

import React, { useMemo, useState } from 'react';
import { Button } from '@estia/components/ui/button';
import { cn } from '@estia/utils/utils';
import { Input } from '@estia/components/ui/input';
import { SearchIcon } from '@estia/assets/icons/search';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@estia/components/ui/dropdown-menu';
import { ChevronDown } from '@estia/assets/icons/chevron';
import { UsersTable } from '@estia/components/users-and-pos/users-table';
import { AddUserDialog } from '@estia/components/dialogs/add-user';
import UsersTabSwitcher from '@estia/components/users-and-pos/users-tab-switcher';
import { ColumnFiltersState } from '@tanstack/react-table';
import DashboardCard from '@estia/components/layout/dashboard-card';
import { useTranx } from '@estia/hooks/useTranx';

export default function Page() {
  const { t } = useTranx();

  const [search, setSearch] = useState('');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const roles = useMemo(() => {
    return [
      {
        title: t('dashboard.users_and_pos.users_page.default_role'),
        value: 'All Users',
      },
      {
        title: t('dashboard.users_and_pos.users_page.manager_role'),
        value: 'Manager',
      },
      {
        title: t('dashboard.users_and_pos.users_page.staff_role'),
        value: 'Staff',
      },
      {
        title: t('dashboard.users_and_pos.users_page.viewer_role'),
        value: 'Viewer',
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedRole = useMemo(() => {
    const role = columnFilters.find((f) => f.id === '_supportRole');

    const selectedRole = roles.find((item) => item.value === role?.value);

    return selectedRole?.title;
  }, [columnFilters, roles]);

  return (
    <DashboardCard title={t('dashboard.users_and_pos.users_page.page_title')}>
      <div className='flex flex-row justify-between py-4 md:flex-col md:py-0'>
        <UsersTabSwitcher className='flex-1' />
        <div className='flex items-center justify-end text-sm md:my-4'>
          <AddUserDialog />
        </div>
      </div>
      <div className='mb-4 flex items-center justify-between min-[140rem]:mb-6'>
        <div className='flex w-full items-center md:w-auto'>
          <Input
            type='text'
            placeholder={t('dashboard.users_and_pos.users_page.search_hint')}
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
      <div className='dashboard-shadow rounded-xl bg-white p-4 md:p-6'>
        <div className='flex items-center justify-between md:items-start'>
          <h2 className='text-xl md:text-2xl'>
            {t('dashboard.users_and_pos.users_page.table_title')}
          </h2>
          <DropdownMenu>
            <Button
              asChild
              variant='outline'
              className='border-primary-1 h-11 min-w-28 hover:border-white md:min-w-36'
            >
              <DropdownMenuTrigger>
                <div className='flex items-center pl-2'>
                  <span className='text-sm font-bold md:text-base'>
                    {selectedRole ||
                      t('dashboard.users_and_pos.users_page.default_role')}
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
                    if (item?.value === 'All Users') {
                      setColumnFilters((prev) => [
                        ...prev.filter((f) => f.id !== '_supportRole'),
                      ]);
                    } else {
                      setColumnFilters((prev) => [
                        ...prev.filter((f) => f.id !== '_supportRole'),
                        ...(item?.value
                          ? [{ id: '_supportRole', value: item?.value }]
                          : []),
                      ]);
                    }
                  }}
                >
                  <p className='text-base font-bold'>{item?.title}</p>
                  <div className='border-primary-1 flex h-5 w-5 items-center justify-center rounded-full border group-hover:border-white'>
                    {item?.value ===
                      (columnFilters.find((f) => f.id === '_supportRole')
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
    </DashboardCard>
  );
}
