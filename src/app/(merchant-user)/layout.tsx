'use client';

import React, { PropsWithChildren, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@estia/store/store';
import {
  selectAccessToken,
  selectIsUserLoggedIn,
  selectSpinningLoader,
} from '@estia/store/selector';
import { Anims } from '@estia/assets';

import dynamic from 'next/dynamic';
import { toggleLoader } from '@estia/store/slices/general';
import { isEmpty } from 'lodash';
import { SCREENS } from '@estia/constants/screens';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Layout({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const segments = useSelectedLayoutSegments();

  const showSpinningLoader = useAppSelector(selectSpinningLoader);
  const router = useRouter();
  const accessToken = useAppSelector(selectAccessToken);
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [first, second, third] = segments;

  useEffect(() => {
    if (
      isEmpty(accessToken) &&
      first !== 'auth' &&
      !isUserLoggedIn &&
      typeof window !== 'undefined'
    ) {
      router.replace(SCREENS.LOGIN);
    } else if (
      first !== 'dashboard' &&
      isUserLoggedIn &&
      third !== 'sub-user'
    ) {
      router.replace(SCREENS.DASHBOARD);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, first, isUserLoggedIn]);

  useEffect(() => {
    dispatch(toggleLoader(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {children}
      {showSpinningLoader && typeof window !== 'undefined' ? (
        <div className='loader-layout fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='relative size-48 self-center overflow-hidden'>
            <Lottie
              animationData={Anims.loader}
              loop={true}
              className='h-full w-full'
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
