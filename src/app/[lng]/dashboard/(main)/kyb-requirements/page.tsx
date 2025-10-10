'use client';

import React, { useState } from 'react';
import DashboardCard from '@estia/components/layout/dashboard-card';
import { Button } from '@estia/components/ui/button';
import { Input } from '@estia/components/ui/input';
import { isEmpty } from 'lodash';
import { SearchIcon } from '@estia/assets/icons/search';
import { CloseIcon } from '@estia/assets/icons/close';
import { KybRequirementsTable } from '@estia/components/kyb/kyb-requirements-table';
import { KycRequirementsModal } from '@estia/components/dialogs/kyc-requirements-modal';
import Marquee from 'react-fast-marquee';
import { useTranx } from '@estia/hooks/useTranx';

export default function Page() {
  const { t } = useTranx();

  const [searchValue, setSearchValue] = useState('');

  return (
    <DashboardCard title={t('dashboard.kyb.requirements_page.page_title')}>
      <div className='bg-primary-5 mt-6 flex items-center justify-between rounded-full py-2 pr-2'>
        <Marquee delay={10}>
          <p className='line-clamp-1 pl-4 text-base font-semibold text-white'>
            {t('dashboard.kyb.requirements_page.kyc_reminder')}
          </p>
        </Marquee>
        <div>
          <KycRequirementsModal />
        </div>
      </div>
      <div className='my-3 flex flex-col justify-between md:flex-row md:items-center'>
        <div className='flex items-center'>
          <Input
            type='text'
            placeholder={t('dashboard.kyb.requirements_page.search_hint')}
            containerClassName='w-full'
            className='border-primary-1 mb-1 h-11 min-w-[350px] border md:pr-10'
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          {isEmpty(searchValue) ? (
            <SearchIcon className='-ml-7.5' />
          ) : (
            <CloseIcon
              onClick={() => {
                setSearchValue('');
              }}
              className='-ml-9 cursor-pointer'
            />
          )}
        </div>
      </div>
      <div className='dashboard-shadow relative mt-6 rounded-xl p-6'>
        <KybRequirementsTable searchQuery={searchValue} />
        <div className='mt-10 mb-4 flex flex-col items-center justify-center pl-4'>
          <Button
            variant='outline'
            size='md'
            className='font-bold'
            onClick={() => {}}
          >
            {t('common.load_more')}
          </Button>
          <Button
            size='md'
            className='button-shadow mt-4 font-bold'
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          >
            {t('common.back_to_top')}
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
}
