'use client';

import React from 'react';
import { Input } from '@estia/components/ui/input';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Toast } from '@estia/helpers/toast';
import { CopyIcon } from '@estia/assets';
import { useTranx } from '@estia/hooks/useTranx';

export default function Page() {
  const { t } = useTranx();

  const secretKeys = {
    key_1: 'IxMjM0NTY3ODkwIiwicGVybWlzc2l',
    key_2: '1XgerwrwetghyttwerteteRf2Wdlzctl',
  };

  return (
    <div className='bg-card-bg mt-8 min-h-[80vh] rounded-2xl p-8'>
      <h1 className='text-xl font-bold md:text-3xl'>
        {t('dashboard.integrations_page.page_title')}
      </h1>
      <h2 className='text-neutral-1 mt-3 mb-6 text-sm font-medium md:text-base'>
        {t('dashboard.integrations_page.page_desc')}
      </h2>
      <div className='dashboard-shadow flex w-full flex-col justify-end rounded-2xl p-6 pb-8 text-sm'>
        <h3 className='text-lg md:text-2xl'>
          {t('dashboard.integrations_page.plugin_tokens')}
        </h3>
        <div className='relative'>
          <Input
            label={t('dashboard.integrations_page.secret_1')}
            value={secretKeys.key_1}
            onChange={() => {}}
            containerClassName='mt-6'
            className='text-neutral-4 border-neutral-4 border-2 py-6 pl-4 font-bold'
          />
          <div className='absolute right-4 bottom-4 z-10 cursor-pointer bg-white'>
            <CopyToClipboard
              text={secretKeys.key_1}
              onCopy={() =>
                Toast.showSuccess({
                  message: t('common.clipboard_copy'),
                })
              }
            >
              <CopyIcon className='ml-1 size-5' />
            </CopyToClipboard>
          </div>
        </div>
        <div className='relative'>
          <Input
            label={t('dashboard.integrations_page.secret_2')}
            value={secretKeys.key_2}
            onChange={() => {}}
            containerClassName='mt-6'
            className='text-neutral-4 border-neutral-4 border-2 py-6 pl-4 font-bold'
          />
          <div className='absolute right-4 bottom-4 z-10 cursor-pointer bg-white'>
            <CopyToClipboard
              text={secretKeys.key_2}
              onCopy={() =>
                Toast.showSuccess({
                  message: t('common.clipboard_copy'),
                })
              }
            >
              <CopyIcon className='ml-1 size-5' />
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
}
