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

export function TermsAndPrivacyDialog() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className='text-primary cursor-pointer font-bold underline'>
          Terms of Use and Privacy Policy
        </span>
      </SheetTrigger>
      <SheetContent
        side='bottom'
        className='left-1/2 max-w-[500px] -translate-x-1/2 self-end'
      >
        <SheetHeader>
          <SheetTitle className='text-2xl font-bold'>Terms of Use</SheetTitle>
          <SheetDescription className='mt-2 text-base font-bold'>
            Privacy Policy
          </SheetDescription>
        </SheetHeader>
        <div className=''>
          <p className='my-4 text-base leading-relaxed'>
            We value your privacy and are committed to protecting your personal
            information. Our policy agreement explains how we collect, use, and
            safeguard your data. You can take a moment to review the details, as
            your continued use of our services indicates your acceptance of
            these terms.
          </p>
          <a
            target='_blank'
            className='text-primary text-base font-bold underline'
            href='https://estiapayments.io/estia-payments-s-m-p-c-privacy-policy/'
          >
            Learn more
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
