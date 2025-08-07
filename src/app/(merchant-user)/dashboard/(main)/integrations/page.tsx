'use client';

import React from 'react';
import { Input } from '@estia/components/ui/input';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Toast } from '@estia/helpers/toast';
import { CopyIcon } from '@estia/assets';

export default function Page() {
  return (
    <div className='bg-card-bg mt-8 min-h-[80vh] rounded-2xl p-8'>
      <h1 className='text-3xl font-bold'>Integrations</h1>
      <h2 className='text-neutral-1 mt-3 mb-6 text-base font-medium'>
        Learn more about Estia Payment plug-ins available for various e-commerce
        platforms
      </h2>
      <div className='dashboard-shadow flex w-full flex-col justify-end rounded-2xl p-6 pb-8 text-sm'>
        <h3 className='text-2xl'>Plugin Tokens</h3>
        <div className='relative'>
          <Input
            label='Secret 1'
            value='IxMjM0NTY3ODkwIiwicGVybWlzc2l'
            onChange={() => {}}
            containerClassName='mt-6'
            className='text-neutral-4 border-neutral-4 border-2 py-6 pl-4 font-bold'
          />
          <div className='absolute right-4 bottom-4 z-10 cursor-pointer'>
            <CopyToClipboard
              text='IxMjM0NTY3ODkwIiwicGVybWlzc2l'
              onCopy={() =>
                Toast.showSuccess({
                  message: 'Copied to clipboard successfully',
                })
              }
            >
              <CopyIcon className='ml-1 size-5' />
            </CopyToClipboard>
          </div>
        </div>
        <div className='relative'>
          <Input
            label='Secret 2'
            value='1XgerwrwetghyttwerteteRf2Wdlzctl'
            onChange={() => {}}
            containerClassName='mt-6'
            className='text-neutral-4 border-neutral-4 border-2 py-6 pl-4 font-bold'
          />
          <div className='absolute right-4 bottom-4 z-10 cursor-pointer'>
            <CopyToClipboard
              text='IxMjM0NTY3ODkwIiwicGVybWlzc2l'
              onCopy={() =>
                Toast.showSuccess({
                  message: 'Copied to clipboard successfully',
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
