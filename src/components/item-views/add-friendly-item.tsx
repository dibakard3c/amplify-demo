import React from 'react';
import { Button } from '@estia/components/ui/button';
import { Input } from '@estia/components/ui/input';
import { useTranx } from '@estia/hooks/useTranx';

interface AddFriendlyItemProps {
  nameLabel: string;
  nameRef: any;
  infoLabel: string;
  infoRef: any;
  onAdd: () => void;
}

export default function AddFriendlyItem({
  nameLabel,
  nameRef,
  infoLabel,
  infoRef,
  onAdd,
}: AddFriendlyItemProps) {
  const { t } = useTranx();

  return (
    <div className='my-3 flex w-full items-center md:items-end'>
      <div className='flex flex-col md:w-3/4 md:flex-row'>
        <div className='mr-4 md:mr-8 md:w-1/3'>
          <span className='text-sm font-bold'>{nameLabel}</span>
          <Input
            ref={nameRef}
            className='placeholder:text-neutral-4 h-11 text-base font-bold min-[140rem]:h-14'
          />
        </div>
        <div className='mt-4 mr-4 flex-1 md:mt-0 md:mr-8'>
          <span className='text-sm font-bold'>{infoLabel}</span>
          <Input
            ref={infoRef}
            className='placeholder:text-neutral-4 h-11 text-base font-bold min-[140rem]:h-14'
          />
        </div>
      </div>
      <div className='flex flex-1 justify-end'>
        <Button
          size='lg'
          onClick={() => {
            onAdd();
          }}
          className='m-0 h-12 w-28 border px-8 py-0 pb-0.5 text-base font-bold shadow-none min-[140rem]:h-18 min-[140rem]:w-36'
        >
          {t('common.add')}
        </Button>
      </div>
    </div>
  );
}
