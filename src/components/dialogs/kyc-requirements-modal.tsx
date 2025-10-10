import React, { useState } from 'react';
import { Button } from '@estia/components/ui/button';
import Image from 'next/image';
import { ArrowRight, Images } from '@estia/assets';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@estia/components/ui/dialog';
import { ScrollArea } from '@estia/components/ui/scroll-area';
import { useTranx } from '@estia/hooks/useTranx';

export function KycRequirementsModal() {
  const [isVisible, setVisible] = useState(false);

  const { t } = useTranx();

  return (
    <Dialog open={isVisible} onOpenChange={setVisible}>
      <DialogTrigger asChild>
        {/*<Button className={cn('ml-6', className)}>Change LOGO</Button>*/}
        <Button
          variant='ghost'
          className='h-auto py-0 pr-0 pl-3 text-base font-bold text-white'
        >
          {t('dialogs.kyb_requirements.learn_more')}
          <div className='bg-neutral-9 flex size-10 items-center justify-center rounded-full'>
            <ArrowRight />
          </div>
        </Button>
      </DialogTrigger>
      <ScrollArea type='always'>
        <DialogContent className='flex max-h-[85vh] w-[90%] max-w-[400px] flex-col items-center overflow-y-scroll rounded-2xl px-8 sm:max-w-[480px] md:max-h-[95vh] 2xl:max-w-[500px]'>
          <DialogHeader>
            <div className='size-48 self-center'>
              <Image src={Images.kyc} alt={t('dialogs.kyb.icon_alt')} />
            </div>
            <h1 className='text-neutral-2 mt-8 mb-2 text-center text-2xl leading-relaxed font-bold'>
              {t('dialogs.kyb_requirements.what_need_to_know')}
            </h1>
          </DialogHeader>
          <ul className='list-disc pl-4 text-lg'>
            <li className='text-base leading-relaxed font-semibold'>
              {t('dialogs.kyb_requirements.what_need_to_know_desc')}
            </li>
            <li className='text-base leading-relaxed font-semibold'>
              {t('dialogs.kyb_requirements.required_doc_title')}
              <ul className='ml-4 list-disc'>
                <li className='text-base leading-relaxed font-semibold'>
                  {t('dialogs.kyb_requirements.required_doc_valid')}
                </li>
                <li className='text-base leading-relaxed font-semibold'>
                  {t('dialogs.kyb_requirements.required_doc_format')}
                </li>
                <li className='text-base leading-relaxed font-semibold'>
                  {t('dialogs.kyb_requirements.required_doc_lang')}
                </li>
                <li className='text-base leading-relaxed font-semibold'>
                  {t('dialogs.kyb_requirements.required_doc_notarization')}
                </li>
              </ul>
            </li>
            <li className='text-base leading-relaxed font-semibold'>
              {t('dialogs.kyb_requirements.additional_doc')}
            </li>
            <li className='text-base leading-relaxed font-semibold'>
              {t('dialogs.kyb_requirements.additional_doc_info')}
            </li>
          </ul>
          <DialogFooter className='w-full'>
            <DialogClose className='w-full'>
              <Button
                size='lg'
                className='mt-4 h-14 w-full text-base font-bold'
              >
                {t('dialogs.kyb_requirements.ok')}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </ScrollArea>
    </Dialog>
  );
}
