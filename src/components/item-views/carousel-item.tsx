import React, { JSX } from 'react';
import { Button } from '@estia/components/ui/button';
import { useRouter } from 'next/navigation';
import { SCREENS } from '@estia/constants/screens';
import { Icons } from '@estia/assets';
import Image from 'next/image';
import { STORAGE_KEYS } from '@estia/constants/storage-keys';
import { cn } from '@estia/utils/utils';
import { Trans } from 'react-i18next';
import { useTranx } from '@estia/hooks/useTranx';

interface WelcomeCarouselItemProps {
  isLastItem: boolean;
  item: {
    title: JSX.Element | string;
    description: JSX.Element | string;
  };
  moveToNext: () => void;
  className?: string;
}

export function WelcomeCarouselItem({
  item,
  moveToNext,
  className,
  isLastItem,
}: WelcomeCarouselItemProps) {
  const router = useRouter();
  const { t } = useTranx();

  return (
    <div
      className={cn(
        // 'flex aspect-[1.22] w-[80%] flex-col items-center justify-center rounded-[20px] bg-white max-lg:w-[55%] max-sm:max-w-[358px] sm:p-8 md:aspect-[2.52] lg:w-[50%] xl:w-[45%] 2xl:w-[35%]',
        className
      )}
    >
      <div className='px-4 sm:px-14'>
        <h1 className='text-primary text-center text-2xl font-bold'>
          <Trans
            i18nKey={item?.title as any}
            components={{ bold: <span className='font-bold' />, lb: <br /> }}
          />
        </h1>
        <h2 className='my-4 text-center text-[0.8rem] leading-relaxed md:text-base'>
          <Trans
            i18nKey={item?.description as any}
            components={{ bold: <span className='font-bold' />, lb: <br /> }}
            tOptions={{ app_name: 'Estia' }}
          />
        </h2>
      </div>
      <Button
        size='lg'
        variant='secondary'
        className='text-md h-[56px] w-full max-w-[90%] rounded-4xl font-bold sm:max-w-[80%]'
        onClick={() => {
          if (isLastItem) {
            localStorage.setItem(STORAGE_KEYS.SHOW_WELCOME, 'true');
            router.push(SCREENS.LOGIN);
          } else {
            moveToNext();
          }
        }}
      >
        {t(
          isLastItem
            ? 'auth.welcome_page.get_started'
            : 'auth.welcome_page.next'
        )}
        <Image
          src={Icons.arrowRight}
          alt={t('auth.welcome_page.arrow_btn_alt')}
        />
      </Button>
    </div>
  );
}
