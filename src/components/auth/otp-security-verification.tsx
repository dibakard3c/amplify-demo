import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { cn } from '@estia/lib/utils';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@estia/components/ui/input-otp';
import { Button } from '@estia/components/ui/button';
import { useCountDownTimer } from '@estia/hooks/useCountDownTimer';

interface OtpSecurityVerificationProps {
  mode: 'email' | 'sms';
  message: string; // email or phone number
  onResendCode?: () => void;
  onComplete: (otp: string) => void;
  titleClassName?: string;
  messageClassName?: string;
  className?: string;
  title: string;
  actionMode?: boolean;
  resendMode?: boolean;
  actionText?: string;
  action?: () => void;
}

export interface OtpSecurityVerificationRef {
  reset: () => void;
}

const OtpSecurityVerification = forwardRef<
  OtpSecurityVerificationRef,
  OtpSecurityVerificationProps
>(
  (
    {
      mode,
      titleClassName,
      className,
      title,
      message,
      messageClassName,
      onResendCode,
      onComplete,
      actionMode,
      resendMode,
      actionText,
      action,
    },
    ref
  ) => {
    const [otpValue, setOtpValue] = useState('');
    const { minutes, seconds, resetTimer } = useCountDownTimer(
      true,
      30,
      () => {}
    );

    useImperativeHandle(ref, () => ({
      reset: () => {
        setOtpValue('');
      },
    }));

    return (
      <div className={cn(className)}>
        <h1
          className={cn('mb-3 text-2xl font-bold sm:text-3xl', titleClassName)}
        >
          {title}
        </h1>
        <p
          className={cn(
            'text-neutral-4 mb-8 text-base/7.5 font-medium',
            messageClassName
          )}
        >
          {message}
          {mode === 'email' && (
            <>
              <br />
              <span className='text-base/7.5 font-medium'>
                Please make sure to check your Spam folder, if you don’t receive
                it in your Inbox.
              </span>
            </>
          )}
        </p>
        <InputOTP
          value={otpValue}
          onChange={setOtpValue}
          maxLength={6}
          onComplete={onComplete}
        >
          <InputOTPGroup className='flex w-full'>
            <InputOTPSlot
              index={0}
              className='flex-1 rounded-lg border border-black/50 py-8 text-2xl font-bold shadow-none'
            />
            <InputOTPSlot
              index={1}
              className='flex-1 rounded-lg border border-black/50 py-8 text-2xl font-bold shadow-none'
            />
            <InputOTPSlot
              index={2}
              className='flex-1 rounded-lg border border-black/50 py-8 text-2xl font-bold shadow-none'
            />
            <InputOTPSlot
              index={3}
              className='flex-1 rounded-lg border border-black/50 py-8 text-2xl font-bold shadow-none'
            />
            <InputOTPSlot
              index={4}
              className='flex-1 rounded-lg border border-black/50 py-8 text-2xl font-bold shadow-none'
            />
            <InputOTPSlot
              index={5}
              className='flex-1 rounded-lg border border-black/50 py-8 text-2xl font-bold shadow-none'
            />
          </InputOTPGroup>
        </InputOTP>
        {resendMode ? (
          <>
            {seconds !== '00' ? (
              <p className='mt-6 text-base font-bold'>
                Resend {mode === 'sms' ? 'SMS' : 'email'} in {minutes}:{seconds}
              </p>
            ) : (
              <div className='mt-6'></div>
            )}
            <Button
              onClick={() => {
                resetTimer();
                if (!!onResendCode) {
                  onResendCode();
                }
              }}
              size='lg'
              className='mt-6 w-full'
              disabled={seconds !== '00'}
            >
              Send me again
            </Button>
          </>
        ) : !actionMode ? (
          <>
            <p className='mt-8 text-base font-bold'>I didn’t receive a code</p>
            <Button
              onClick={() => {
                resetTimer();
                if (!!onResendCode) {
                  onResendCode();
                }
              }}
              size='lg'
              className='mt-6 w-full'
              disabled={seconds !== '00'}
            >
              Send me again
            </Button>
            {seconds !== '00' ? (
              <p className='mt-6 text-base font-bold'>
                Resend {mode === 'sms' ? 'SMS' : 'email'} in {minutes}:{seconds}
              </p>
            ) : null}
          </>
        ) : (
          <>
            {!!onResendCode && seconds !== '00' ? (
              <p className='mt-6 text-base font-bold'>
                Resend {mode === 'sms' ? 'SMS' : 'email'} in {minutes}:{seconds}
              </p>
            ) : (
              <div className='mt-6'></div>
            )}
            <Button
              onClick={() => (action ? action() : onComplete(''))}
              size='lg'
              className='mt-6 w-full'
            >
              {actionText || 'Verify'}
            </Button>
          </>
        )}
      </div>
    );
  }
);

OtpSecurityVerification.displayName = 'OtpSecurityVerification';

export default OtpSecurityVerification;
