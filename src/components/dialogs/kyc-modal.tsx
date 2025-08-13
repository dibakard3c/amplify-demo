import React, { useEffect } from 'react';
import { Button } from '@estia/components/ui/button';
import Image from 'next/image';
import { Images } from '@estia/assets';
import Link from 'next/link';
import { SCREENS } from '@estia/constants/screens';
import { CloseIcon } from '@estia/assets/icons/close';

export default function KycModal() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/30'>
      <div className='relative flex w-[90%] max-w-[420px] flex-col items-center justify-center rounded-2xl bg-white px-8 pt-28 pb-10 sm:w-[25%] sm:min-w-[380px]'>
        <div className='size-48'>
          <Image src={Images.kyc} alt='KYC Banner' />
        </div>
        <Link
          href={SCREENS.PROFILE}
          className='absolute top-3 right-5 flex size-10 items-center justify-center sm:top-5'
        >
          <CloseIcon />
        </Link>
        <h1 className='text-neutral-2 mt-8 mb-2 text-center text-base leading-relaxed font-medium'>
          You need first to complete the KYB process. Your KYB information is
          always available on your Profile Manager page.
        </h1>
        <Button
          asChild
          className='max-w-auto mt-4 h-14 w-full text-base font-bold'
          onClick={() => {}}
        >
          <Link href={SCREENS.KYB}>Complete the KYB process</Link>
        </Button>
      </div>
    </div>
  );
}
