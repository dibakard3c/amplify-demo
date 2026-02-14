'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@estia/components/ui/sheet';
import React from 'react';
import { useTranx } from '@estia/hooks/useTranx';

export function TermsAndPrivacyDialog() {
  const { t } = useTranx();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className='text-primary cursor-pointer font-bold underline'>
          {t('dialogs.terms.terms_btn')}
        </span>
      </SheetTrigger>
      <SheetContent
        side='bottom'
        className='left-1/2 max-w-[500px] -translate-x-1/2 self-end'
      >
        <SheetHeader>
          <SheetTitle className='text-2xl font-bold'>
            {t('dialogs.terms.title')}
          </SheetTitle>
          <SheetDescription className='mt-2 text-base font-bold'>
            {t('dialogs.terms.desc')}
          </SheetDescription>
        </SheetHeader>
        <div className=''>
          <p className='my-4 text-base leading-relaxed'>
            {t('dialogs.terms.info')}
          </p>
          <a
            target='_blank'
            className='text-primary text-base font-bold underline'
            href='https://estiapayments.io/estia-payments-s-m-p-c-privacy-policy/'
          >
            {t('dialogs.terms.learn_more')}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
