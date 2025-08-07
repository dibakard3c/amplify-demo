'use client';

import React, { useRef, useState } from 'react';
import { Button } from '@estia/components/ui/button';
import { AddIcon } from '@estia/assets';
import { Input } from '@estia/components/ui/input';
import { isEmpty } from 'lodash';

export default function Page() {
  const [ibans, setIbans] = useState([
    {
      name: 'Alpha IBAN',
      address: '0x1RGT7154748V1CE5176479CDGB574AE244B939B5',
    },
  ]);
  const [addNewWallet, setAddNewWallet] = useState(false);

  const friendlyNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const onAdd = () => {
    if (
      !isEmpty(friendlyNameRef?.current?.value) &&
      !isEmpty(addressRef?.current?.value)
    ) {
      setIbans([
        ...ibans,
        {
          name: friendlyNameRef?.current?.value || '',
          address: addressRef?.current?.value || '',
        },
      ]);
      if (friendlyNameRef.current && addressRef.current) {
        friendlyNameRef.current.value = '';
        addressRef.current.value = '';
      }
    }
  };

  return (
    <div className='ml-[10%] flex w-auto flex-col items-center justify-center pr-[2.5%]'>
      <h1 className='mb-6 text-3xl font-bold'>
        External Wallets friendly names
      </h1>
      {ibans?.map((item, index) => (
        <div key={index} className='mt-3 mb-6 flex w-full items-center'>
          <div className='mr-8 w-[28%]'>
            <span className='text-sm font-bold'>FRIENDLY NAME</span>
            <span className='text-neutral-4 mt-4 block text-base font-bold'>
              {item?.name}
            </span>
          </div>
          <div className='w-[47%]'>
            <span className='text-sm font-bold'>WALLET ADDRESS</span>
            <span className='text-neutral-4 mt-4 block text-base font-bold'>
              {item?.address}
            </span>
          </div>
          <div className='flex flex-1 justify-end'>
            <Button
              onClick={() => {
                setIbans((prev) => {
                  return prev?.filter((_item) => _item?.name !== item?.name);
                });
              }}
              variant='outline'
              className='border-primary-1 text-primary-1 m-0 h-12 w-28 border px-6 py-0 pb-0.5 text-base font-bold shadow-none hover:border-white'
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
      {(addNewWallet || isEmpty(ibans)) && (
        <div className='mt-3 flex w-full items-end'>
          <div className='mr-8 w-[28%]'>
            <span className='text-sm font-bold'>FRIENDLY NAME</span>
            <Input
              ref={friendlyNameRef}
              className='text-neutral-4 h-11 text-base font-bold'
            />
          </div>
          <div className='w-[47%]'>
            <span className='text-sm font-bold'>WALLET ADDRESS</span>
            <Input
              ref={addressRef}
              className='text-neutral-4 h-11 text-base font-bold'
            />
          </div>
          <div className='flex flex-1 justify-end'>
            <Button
              onClick={() => {
                onAdd();
              }}
              className='m-0 h-12 w-28 border px-8 py-0 pb-0.5 text-base font-bold shadow-none'
            >
              Add
            </Button>
          </div>
        </div>
      )}
      <div className='mt-10 flex w-full items-center justify-center'>
        <Button
          size='xl'
          onClick={() => {
            setAddNewWallet(true);
          }}
          className='m-0 mr-12 h-12 w-auto px-10 py-4 text-base font-bold'
        >
          <AddIcon className='size-6' />
          Add New External Wallet
        </Button>
        <Button
          size='xl'
          variant='outline'
          className='border-primary-1 m-0 mr-12 h-12 w-auto px-10 py-4 text-base font-bold hover:border-white'
        >
          Back to Wallet
        </Button>
      </div>
    </div>
  );
}
