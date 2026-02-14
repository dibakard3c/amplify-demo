import React, { useEffect } from 'react';
import { Button } from '@estia/components/ui/button';
import Image from 'next/image';
import { Images } from '@estia/assets';
import Link from 'next/link';
import { SCREENS } from '@estia/constants/screens';
import { CloseIcon } from '@estia/assets/icons/close';
import { useTranx } from '@estia/hooks/useTranx';

export default function KycModal() {
  const { t } = useTranx();

  useEffect(() => {
    // eslint-disable-next-line i18next/no-literal-string
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-black/30'>
      <div className='relative flex w-[90%] max-w-[567px] flex-col items-center justify-center rounded-2xl bg-white px-8 pt-28 pb-10 sm:w-[30%] sm:min-w-[380px] min-[140rem]:max-w-[40rem]'>
        <div className='size-48'>
          <Image src={Images.kyc} alt={t('dialogs.kyb.icon_alt')} />
        </div>
        <Link
          href={SCREENS.PROFILE}
          className='absolute top-3 right-5 flex size-10 items-center justify-center sm:top-5'
        >
          <CloseIcon />
        </Link>
        <h1 className='text-neutral-2 mt-8 mb-2 text-center text-base leading-relaxed font-medium'>
          {t('dialogs.kyb.kyb_desc')}
        </h1>
        <Button
          asChild
          size='lg'
          className='max-w-auto mt-4 h-14 w-full text-base font-bold'
        >
          <Link href={SCREENS.KYB}>{t('dialogs.kyb.complete_kyb_btn')}</Link>
        </Button>
        <Button
          asChild
          variant='outline'
          size='lg'
          className='max-w-auto mt-4 h-14 w-full text-base font-bold'
        >
          <Link href={SCREENS.KYB_REQUIREMENTS}>
            {t('dialogs.kyb.view_kyb_btn')}
          </Link>
        </Button>
      </div>
    </div>
  );
}
