import React from 'react';
import { cn } from '@estia/utils/utils';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@estia/assets';
import { Button } from '@estia/components/ui/button';
import { useTranx } from '@estia/hooks/useTranx';
import { SCREENS } from '@estia/constants/screens';

export default function GuestNavbar() {
  const { t } = useTranx();

  return (
    <header
      className={cn(
        'bg-nav-bg dark:bg-neutral-8 h-[90px] w-full md:block min-[140rem]:h-[150px]'
      )}
    >
      <div className='resp-container m-auto flex h-full items-center justify-between'>
        {/* LOGO */}
        <div className='border-divider flex h-full items-center'>
          <Link
            href='/dashboard'
            className='relative aspect-[3] h-[60%] w-auto cursor-pointer max-xl:h-[50%]'
          >
            <Image
              src={Icons.estiaLogo2}
              alt={t('common.estia_logo_alt')}
              fill
            />
          </Link>
        </div>
        <div>
          <Button asChild size='md' className='mr-3'>
            <Link href={SCREENS.REGISTER}>{t('common.signup')}</Link>
          </Button>
          <Button asChild variant='outline' size='md'>
            <Link href={SCREENS.LOGIN}>{t('common.login')}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
