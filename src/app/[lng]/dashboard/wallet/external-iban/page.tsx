'use client';

import React, { useRef, useState } from 'react';
import { Button } from '@estia/components/ui/button';
import { AddIcon } from '@estia/assets';
import { isEmpty } from 'lodash';
import {
  useCreateFiatFriendlyWalletMutation,
  useDeleteFiatFriendlyWalletMutation,
  useListFiatFriendlyWalletQuery,
} from '@estia/networking/endpoints/transaction';
import { cn } from '@estia/utils/utils';
import { Toast } from '@estia/helpers/toast';
import FriendlyItem from '@estia/components/item-views/friendly-item';
import AddFriendlyItem from '@estia/components/item-views/add-friendly-item';
import { useTranx } from '@estia/hooks/useTranx';

export default function Page() {
  const [addNewIban, setAddNewIban] = useState(false);

  const friendlyNameRef = useRef<HTMLInputElement>(null);
  const ibanRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useListFiatFriendlyWalletQuery();
  const [createWalletMutation] = useCreateFiatFriendlyWalletMutation();
  const [deleteWalletMutation] = useDeleteFiatFriendlyWalletMutation();

  const { t } = useTranx();

  function onAdd() {
    const friendlyName = friendlyNameRef?.current?.value?.trim();
    const iban = ibanRef?.current?.value?.trim();

    if (friendlyName && iban) {
      createWalletMutation({
        iban,
        alias: friendlyName,
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
            message: t(
              'dashboard.wallet.external_iban_page.add_iban_success_msg'
            ),
          });
        });
    }
  }

  function onDelete(id: string) {
    deleteWalletMutation(id)
      .unwrap()
      .then(() => {
        Toast.showSuccess({
          message: t(
            'dashboard.wallet.external_iban_page.delete_iban_success_msg'
          ),
        });
      });
  }

  return (
    <div className={cn('lg:mx-[7%]', !addNewIban && isEmpty(data) && 'h-full')}>
      <h1 className='mb-6 text-xl font-bold max-lg:mb-12 md:text-3xl min-[140rem]:mb-12'>
        {t('dashboard.wallet.external_iban_page.page_title')}
      </h1>
      <div className='flex-1'>
        {(data || [])?.map((item, index) => (
          <FriendlyItem
            key={index}
            nameLabel={t(
              'dashboard.wallet.external_iban_page.form_labels.name_label'
            )}
            nameValue={item?.alias}
            infoLabel={t(
              'dashboard.wallet.external_iban_page.form_labels.value_label'
            )}
            infoValue={item?.iban}
            onDelete={() => {
              onDelete(item?.id);
            }}
          />
        ))}
      </div>
      {addNewIban && (
        <AddFriendlyItem
          nameLabel={t(
            'dashboard.wallet.external_iban_page.form_labels.name_label'
          )}
          infoLabel={t(
            'dashboard.wallet.external_iban_page.form_labels.value_label'
          )}
          nameRef={friendlyNameRef}
          infoRef={ibanRef}
          onAdd={onAdd}
        />
      )}
      {!addNewIban && isEmpty(data) && !isLoading ? (
        <div className='pb-6 sm:py-24'>
          <h3 className='text-center text-base font-semibold md:text-xl'>
            {t('dashboard.wallet.external_iban_page.empty_iban_msg')}
          </h3>
        </div>
      ) : isLoading ? (
        <div className='-mt-10 pb-6'>
          <h3 className='text-center text-xl font-semibold'>
            {t('common.loading')}
          </h3>
        </div>
      ) : null}
      <div className='mt-10 flex w-full flex-col items-center justify-center md:flex-row min-[140rem]:mt-20'>
        <Button
          size='xl'
          onClick={() => {
            setAddNewIban(true);
          }}
          className='m-0 h-12 w-full px-8 py-4 text-sm font-bold md:mr-12 md:w-auto lg:text-base min-[140rem]:text-xl'
        >
          <AddIcon className='size-6 min-[140rem]:size-10' />
          {t('dashboard.wallet.external_iban_page.add_new_iban')}
        </Button>
        <Button
          size='xl'
          variant='outline'
          className='border-primary-1 m-0 mt-4 h-12 w-full px-10 py-4 font-bold hover:border-white max-[140rem]:text-sm md:mt-0 md:mr-12 md:w-auto lg:text-base min-[140rem]:text-3xl'
        >
          {t('common.go_back_to_wallet')}
        </Button>
      </div>
    </div>
  );
}
