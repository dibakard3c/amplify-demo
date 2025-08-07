'use client';

import Image from 'next/image';
import { Images } from '@estia/assets';
import React, { useEffect } from 'react';
import { WelcomeCarouselItem } from '@estia/components/item-views/carousel-item';
import useEmblaCarousel from 'embla-carousel-react';
import WelcomeCarouselIndicator from '@estia/components/item-views/carousel-indicator';

export default function Welcome() {
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [emblaRef, api] = useEmblaCarousel();

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

  const items = [
    {
      title: (
        <>
          Spend Smart,
          <br className='sm:hidden' /> Earn More,
        </>
      ),
      description: (
        <>
          Enjoy Instant up to <span className='font-bold'>10% Cashback</span>{' '}
          with Estia!
        </>
      ),
    },
    {
      title: 'Instant IBAN account',
      description: (
        <>
          Open your IBAN account <span className='font-bold'>instantly</span>{' '}
          with Estia payments!
        </>
      ),
    },
    {
      title: 'Unlock Your Financial Freedom',
      description: <>Discover the power of Estia token!</>,
    },
    {
      title: 'Seamless Transactions, Limitless Possibilities',
      description: 'Experience the Estia payment gateway!',
    },
    {
      title: 'Know Your Earnings',
      description: (
        <p>
          Empowering you with <span className='font-bold'>smart analytics</span>{' '}
          through the Estia App!
        </p>
      ),
    },
  ];

  return (
    <div className='gradient-bg flex min-h-dvh flex-col items-center justify-between overflow-hidden py-4 sm:h-dvh lg:py-8'>
      <div className='relative ml-4 aspect-[210/96] h-16 self-start sm:ml-6 sm:h-20 xl:h-24'>
        <Image src={Images.estiaLogo} alt='icons' fill />
      </div>
      <div className='flex w-full flex-1 items-center justify-center py-8 sm:max-w-[90%] sm:px-4 md:py-0'>
        <div className='relative hidden aspect-[2.66] h-full md:block'>
          <Image src={Images.coverPhoto1} alt='icons' fill />
        </div>
        <div className='relative aspect-[1.043] h-full w-full md:hidden'>
          <Image src={Images.coverMobile} alt='icons' fill />
        </div>
      </div>
      <WelcomeCarouselIndicator totalCount={count} current={current} />
      <div ref={emblaRef} className='embla'>
        <div className='embla__container flex'>
          {items?.map((item, index) => (
            <div
              key={index}
              className='embla__slide flex w-full justify-center p-3'
            >
              <WelcomeCarouselItem
                key={index}
                totalCount={count}
                current={current}
                item={item}
                moveToNext={() => {
                  api?.scrollNext();
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
