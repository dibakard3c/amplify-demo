'use client';

import Image from 'next/image';
import { Images } from '@estia/assets';
import React, { useEffect } from 'react';
import { WelcomeCarouselItem } from '@estia/components/item-views/carousel-item';
import useEmblaCarousel from 'embla-carousel-react';
import WelcomeCarouselIndicator from '@estia/components/item-views/carousel-indicator';
import { useTranx } from '@estia/hooks/useTranx';

function DesktopView({ emblaRef, count, current, api, welcomeItems }: any) {
  const { t } = useTranx();

  return (
    <div className='gradient-bg flex min-h-dvh flex-col items-center justify-between overflow-hidden py-4 sm:h-dvh lg:py-8'>
      <div className='relative mt-4 ml-4 aspect-[210/96] h-20 self-center sm:ml-6 sm:h-20 lg:self-start xl:h-24'>
        <Image src={Images.estiaLogo} alt={t('common.estia_logo_alt')} fill />
      </div>
      <div className='flex w-full flex-1 items-center justify-center py-8 sm:max-w-[90%] sm:px-4 md:py-0'>
        <div className='relative hidden aspect-[2.66] h-full md:block'>
          <Image
            src={Images.coverPhoto1}
            alt={t('common.estia_welcome_left_alt')}
            fill
          />
        </div>
        <div className='relative aspect-[1.043] h-full w-full md:hidden'>
          <Image
            src={Images.coverMobile}
            alt={t('common.estia_welcome_right_alt')}
            fill
          />
        </div>
      </div>
      <WelcomeCarouselIndicator totalCount={count} current={current} />
      <div ref={emblaRef} className='embla'>
        <div className='embla__container flex'>
          {welcomeItems?.map((item: any, index: number) => (
            <div
              key={index}
              className='embla__slide flex w-full justify-center p-3'
            >
              <div className='flex w-[95%] justify-center'>
                <WelcomeCarouselItem
                  key={index}
                  isLastItem={count - 1 === current}
                  item={item}
                  moveToNext={() => {
                    api?.scrollNext();
                  }}
                  className='flex aspect-[1.22] w-[80%] flex-col items-center justify-center rounded-[20px] bg-white max-lg:w-[55%] max-sm:max-w-[358px] sm:p-8 md:aspect-[2.52] lg:w-[50%] xl:w-[45%] 2xl:w-[35%]'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileView({ emblaRef, count, current, api, welcomeItems }: any) {
  const { t } = useTranx();

  return (
    <div className='gradient-bg flex min-h-dvh flex-col items-center justify-between overflow-hidden py-4 lg:py-8'>
      <div className='relative mt-4 ml-4 aspect-[210/96] h-20 self-center'>
        <Image
          src={Images.estiaLogo}
          alt={t('common.estia_welcome_left_alt')}
          fill
        />
      </div>
      <div className='relative aspect-[1.043] w-full'>
        <Image
          fill
          src={Images.coverMobile}
          alt={t('common.estia_welcome_right_alt')}
        />
      </div>
      <WelcomeCarouselIndicator totalCount={count} current={current} />
      <div ref={emblaRef} className='embla'>
        <div className='embla__container flex'>
          {welcomeItems?.map((item: any, index: number) => (
            <div
              key={index}
              className='embla__slide flex w-full justify-center p-3'
            >
              <WelcomeCarouselItem
                key={index}
                isLastItem={count === current}
                item={item}
                moveToNext={() => {
                  api?.scrollNext();
                }}
                className='w-[calc(100vw-2.5rem)] rounded-2xl bg-white py-12 text-center'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Welcome() {
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [emblaRef, api] = useEmblaCarousel();

  const welcomeItems = [
    {
      title: 'auth.welcome_page.slide_1_title',
      description: 'auth.welcome_page.slide_1_desc',
    },
    {
      title: 'auth.welcome_page.slide_2_title',
      description: 'auth.welcome_page.slide_2_desc',
    },
    {
      title: 'auth.welcome_page.slide_3_title',
      description: 'auth.welcome_page.slide_3_desc',
    },
    {
      title: 'auth.welcome_page.slide_4_title',
      description: 'auth.welcome_page.slide_4_desc',
    },
    {
      title: 'auth.welcome_page.slide_5_title',
      description: 'auth.welcome_page.slide_5_desc',
    },
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <div className='block min-[750px]:hidden'>
        <MobileView
          emblaRef={emblaRef}
          current={current}
          count={count}
          api={api}
          welcomeItems={welcomeItems}
        />
      </div>
      <div className='hidden min-[750px]:block'>
        <DesktopView
          emblaRef={emblaRef}
          current={current}
          count={count}
          api={api}
          welcomeItems={welcomeItems}
        />
      </div>
    </>
  );
}
