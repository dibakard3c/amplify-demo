'use client';

import React, { PropsWithChildren } from 'react';
import Image from 'next/image';
import { Images } from '@estia/assets';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
    >
      <div className='grid h-dvh w-full grid-cols-12'>
        <div className='gradient-bg fixed right-0 bottom-0 left-0 col-span-12 h-full flex-col items-center justify-center sm:relative sm:col-span-4 sm:overflow-hidden portrait:fixed portrait:col-span-12 portrait:flex'>
          <div className='relative m-6 hidden aspect-[210/96] h-18 self-start sm:block xl:h-22 2xl:h-24 portrait:hidden'>
            <Image src={Images.estiaLogo} alt='icons' fill />
          </div>
          <div className='relative mt-32 aspect-[0.6] py-[100px] sm:mt-10 sm:block portrait:hidden'>
            <Image src={Images.coverPhoto2} alt='icons' fill />
          </div>
          <div className='relative mt-32 hidden aspect-[0.72] py-[100px] sm:mt-10 portrait:block portrait:h-[80%]'>
            <Image src={Images.coverPhoto2Large} alt='icons' fill />
          </div>
          {/*<div className='relative mt-10 hidden aspect-[646/896] 2xl:block'>*/}
          {/*  <Image src={Images.coverPhoto2Large} alt='icons' fill />*/}
          {/*</div>*/}
        </div>
        <div className='col-span-12 pb-10 sm:col-span-8 sm:pb-0 portrait:absolute portrait:right-0 portrait:left-0 portrait:col-span-12'>
          <div className='relative mx-6 mt-6 mb-6 aspect-[210/96] h-18 self-start sm:hidden sm:h-20 portrait:block'>
            <Image src={Images.estiaLogo} alt='icons' fill />
          </div>
          {children}
        </div>
      </div>
    </GoogleReCaptchaProvider>
  );
}
