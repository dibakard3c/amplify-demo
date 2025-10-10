import React from 'react';
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
import { Button } from '@estia/components/ui/button';
import { useTranx } from '@estia/hooks/useTranx';

interface FriendlyItemProps {
  nameLabel: string;
  nameValue: string;
  infoLabel: string;
  infoValue: string;
  onDelete?: () => void;
}

export default function FriendlyItem({
  nameLabel,
  nameValue,
  infoLabel,
  infoValue,
  onDelete,
}: FriendlyItemProps) {
  const { t } = useTranx();

  return (
    <div className='mt-3 mb-6 flex w-full flex-wrap items-center md:items-start min-[140rem]:mb-10'>
      <div className='flex flex-col md:w-3/4 md:flex-row'>
        <div className='mr-4 md:mr-8 md:w-1/3'>
          <span className='text-sm font-bold'>{nameLabel}</span>
          <span className='text-neutral-4 mt-2 block text-base font-bold'>
            {nameValue}
          </span>
        </div>
        <div className='mt-4 mr-4 flex-1 md:mt-0 md:mr-8'>
          <span className='text-sm font-bold'>{infoLabel}</span>
          <span className='text-neutral-4 mt-2 block max-w-44 flex-1 truncate text-base font-bold md:max-w-72'>
            {infoValue}
          </span>
        </div>
      </div>
      <div className='flex flex-1 justify-end'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant='outline'
              className='border-primary-1 text-primary-1 m-0 h-12 border px-6 py-0 pb-0.5 text-base font-bold shadow-none hover:border-white min-[140rem]:w-36 min-[140rem]:py-8'
            >
              {t('common.delete')}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className='px-8 py-10'>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-neutral-2 px-4 text-center text-xl leading-relaxed font-semibold'>
                {t('dashboard.wallet.delete_friendly_wallet_desc', {
                  nameValue,
                })}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className='mt-3'>
              <div className='flex w-full flex-col'>
                <AlertDialogAction asChild className='mb-5 w-full py-7'>
                  <Button
                    size='lg'
                    className='text-lg'
                    onClick={() => {
                      if (onDelete) {
                        onDelete();
                      }
                    }}
                  >
                    {t('common.delete')}
                  </Button>
                </AlertDialogAction>
                <AlertDialogCancel className='border-primary mt-4 w-full py-7 text-lg min-[140rem]:h-22'>
                  {t('common.cancel')}
                </AlertDialogCancel>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
