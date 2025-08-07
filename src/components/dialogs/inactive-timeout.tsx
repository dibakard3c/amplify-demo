import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
} from '@estia/components/ui/alert-dialog';
import { CloseIcon } from '@estia/assets/icons/close';
import Image from 'next/image';
import { Images } from '@estia/assets';
import { Button } from '@estia/components/ui/button';
import { useIdleTimer } from 'react-idle-timer';
import { logoutAction } from '@estia/store/slices/auth';
import { useAppDispatch } from '@estia/store/store';

const timeout = 300_000; // 5 minutes
const promptBeforeIdle = 60_000; // 1-minute warning

export default function InactiveTimeout() {
  const dispatch = useAppDispatch();

  const [remaining, setRemaining] = useState<number>(timeout);
  const [showIdlePrompt, setShowIdlePrompt] = useState<boolean>(false);

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle: () => {
      //logout
      if (process.env.NODE_ENV !== 'development') {
        dispatch(logoutAction());
      }
    },
    onActive: () => {
      setShowIdlePrompt(false);
    },
    onPrompt: () => {
      setShowIdlePrompt(true);
    },
    timeout,
    promptBeforeIdle,
    throttle: 500,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <AlertDialog open={showIdlePrompt}>
      <AlertDialogContent className='max-w-[450px] px-4 py-10 sm:rounded-3xl'>
        <div
          onClick={activate}
          className='absolute top-4 right-4 flex size-12 cursor-pointer items-center justify-center self-end'
        >
          <CloseIcon />
        </div>
        <div className='flex flex-col items-center pt-12'>
          <Image
            src={Images.timeout}
            alt='Inactive timeout icon'
            className='h-auto w-64'
          />
          <div className='mt-6 px-4 text-center'>
            <h1 className='text-neutral-2 text-xl leading-relaxed font-semibold'>
              Are you still there?
            </h1>
            <h2 className='text-neutral-2 mt-2 text-xl'>
              Your session will timeout due to inactivity in:
            </h2>
            <h3 className='text-neutral-2 my-6 text-6xl font-bold'>
              00:{String(remaining).padStart(2, '0')}
            </h3>
            <AlertDialogAction asChild className='mt-2 mb-5 w-full py-7'>
              <Button className='text-lg' onClick={activate}>
                Yes, I&#39;m still here
              </Button>
            </AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
