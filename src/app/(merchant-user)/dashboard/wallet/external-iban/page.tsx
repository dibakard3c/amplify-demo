'use client';

import React, { useRef, useState } from 'react';
import { Button } from '@estia/components/ui/button';
import { AddIcon } from '@estia/assets';
import { Input } from '@estia/components/ui/input';
import { isEmpty } from 'lodash';
import {
  useCreateIbanMutation,
  useDeleteIbanMutation,
  useListIbanQuery,
} from '@estia/networking/endpoints/transaction';
import { cn } from '@estia/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@estia/components/ui/alert-dialog';
import { Toast } from '@estia/helpers/toast';

export default function Page() {
  const [addNewIban, setAddNewIban] = useState(false);

  const friendlyNameRef = useRef<HTMLInputElement>(null);
  const ibanRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useListIbanQuery();
  const [createIbanMutation] = useCreateIbanMutation();
  const [deleteIbanMutation] = useDeleteIbanMutation();

  function onAdd() {
    const friendlyName = friendlyNameRef?.current?.value?.trim();
    const iban = ibanRef?.current?.value?.trim();

    if (friendlyName && iban) {
      createIbanMutation({
        iban,
        name: friendlyName,
      })
        .unwrap()
        .then(() => {
          setAddNewIban(false);
          if (friendlyNameRef.current) {
            friendlyNameRef.current.value = '';
          }
          if (ibanRef.current) {
            ibanRef.current.value = '';
          }
          Toast.showSuccess({
            message: 'External IBAN added successfully',
          });
        });
    }
  }

  function onDelete(id?: string) {
    deleteIbanMutation(id!)
      .unwrap()
      .then(() => {
        Toast.showSuccess({
          message: 'External IBAN deleted successfully',
        });
      });
  }

  return (
    <div
      className={cn(
        'mx-[10%] flex w-auto flex-col items-center justify-center',
        !addNewIban && isEmpty(data) && 'h-full'
      )}
    >
      <h1 className='mb-6 text-3xl font-bold'>External IBAN friendly names</h1>
      {data?.map((item, index) => (
        <div key={index} className='mt-3 mb-6 flex w-full items-center'>
          <div className='mr-8 w-[32%]'>
            <span className='text-sm font-bold'>FRIENDLY NAME</span>
            <span className='text-neutral-4 mt-4 block text-base font-bold'>
              {item?.name}
            </span>
          </div>
          <div className='w-[40%]'>
            <span className='text-sm font-bold'>IBAN NUMBER</span>
            <span className='text-neutral-4 mt-4 block text-base font-bold'>
              {item?.iban}
            </span>
          </div>
          <div className='flex flex-1 justify-end'>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant='outline'
                  className='border-primary-1 text-primary-1 m-0 h-12 w-28 border px-6 py-0 pb-0.5 text-base font-bold shadow-none hover:border-white'
                >
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className='px-8 py-10'>
                <AlertDialogHeader>
                  <AlertDialogTitle className='text-neutral-2 px-4 text-center text-xl leading-relaxed font-semibold'>
                    Are you sure you want to delete “{item?.name}” external
                    IBAN?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className='mt-3'>
                  <div className='flex w-full flex-col'>
                    <AlertDialogAction asChild className='mb-5 w-full py-7'>
                      <Button
                        className='text-lg'
                        onClick={() => {
                          onDelete(item?.id);
                        }}
                      >
                        Delete
                      </Button>
                    </AlertDialogAction>
                    <AlertDialogCancel className='border-primary mt-4 w-full py-7 text-lg'>
                      Cancel
                    </AlertDialogCancel>
                  </div>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
      {addNewIban && (
        <div className='my-3 flex w-full items-end'>
          <div className='mr-8 w-[32%]'>
            <span className='text-sm font-bold'>FRIENDLY NAME</span>
            <Input
              ref={friendlyNameRef}
              className='placeholder:text-neutral-4 h-11 text-base font-bold'
            />
          </div>
          <div className='w-[40%]'>
            <span className='text-sm font-bold'>IBAN NUMBER</span>
            <Input
              ref={ibanRef}
              className='placeholder:text-neutral-4 h-11 text-base font-bold'
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
      <div>
        {!addNewIban && isEmpty(data) && !isLoading ? (
          <div className='pb-6'>
            <h3 className='text-center text-xl font-semibold'>
              No external IBANs have been saved yet.
            </h3>
          </div>
        ) : isLoading ? (
          <div className='-mt-10 pb-6'>
            <h3 className='text-center text-xl font-semibold'>Loading...</h3>
          </div>
        ) : null}
        <div className='mt-10 flex w-full items-center justify-center'>
          <Button
            size='xl'
            onClick={() => {
              setAddNewIban(true);
            }}
            className='m-0 mr-12 h-12 w-auto px-10 py-4 text-base font-bold'
          >
            <AddIcon className='size-6' />
            Add New IBAN
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
    </div>
  );
}
