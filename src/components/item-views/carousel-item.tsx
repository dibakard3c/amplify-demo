import React, { JSX, useMemo } from 'react';
import { Button } from '@estia/components/ui/button';
import { useRouter } from 'next/navigation';
import { SCREENS } from '@estia/constants/screens';
import { Icons } from '@estia/assets';
import Image from 'next/image';

interface WelcomeCarouselItemProps {
  totalCount: number;
  current: number;
  item: {
    title: JSX.Element | string;
    description: JSX.Element | string;
  };
  moveToNext: () => void;
}

export function WelcomeCarouselItem({
  totalCount,
  current,
  item,
  moveToNext,
}: WelcomeCarouselItemProps) {
  const router = useRouter();

  const isLastItem = useMemo(
    () => current === totalCount,
    [current, totalCount]
  );

  return (
    <div className='flex aspect-[1.22] w-[80%] flex-col items-center justify-center rounded-[20px] bg-white max-lg:w-[55%] max-sm:max-w-[358px] sm:p-8 md:aspect-[2.52] lg:w-[50%] xl:w-[45%] 2xl:w-[35%]'>
      <div className='px-4 sm:px-14'>
        <h1 className='text-primary text-center text-2xl font-bold'>
          {item?.title}
        </h1>
        <h2 className='my-4 text-center text-[0.8rem] leading-relaxed md:text-base'>
          {item?.description}
        </h2>
      </div>
      <Button
        size='lg'
        variant='secondary'
        className='text-md h-[56px] w-full max-w-[90%] rounded-4xl font-bold sm:max-w-[80%]'
        onClick={() => {
          if (isLastItem) {
            localStorage.setItem('is_first_launch', 'true');
            router.push(SCREENS.REGISTER);
          } else {
            moveToNext();
          }
        }}
      >
        {isLastItem ? 'Get Started' : 'Next'}
        <Image src={Icons.arrowRight} alt='arrow right' />
      </Button>
    </div>
  );
}
