import React, {
  forwardRef,
  HTMLAttributes,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { cn } from '@estia/utils/utils';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@estia/components/ui/input-otp';
import { Button } from '@estia/components/ui/button';
import { useCountDownTimer } from '@estia/hooks/useCountDownTimer';
import { ClassValue } from 'clsx';
import { useTranx } from '@estia/hooks/useTranx';

interface OtpSecurityVerificationProps {
  mode: 'email' | 'sms';
  message: string; // email or phone number
  onResendCode?: () => void;
  onComplete: (otp: string) => void;
  titleClassName?: HTMLAttributes<HTMLElement>['className'];
  messageClassName?: HTMLAttributes<HTMLElement>['className'];
  className?: ClassValue;
  title: string;
  viewType?: 'profile' | 'wallet' | 'auth' | string;
}

export interface OtpSecurityVerificationRef {
  reset: () => void;
  countFailedAttempt: () => void;
}

function ProfileViewActions({
  mode,
  seconds,
  minutes,
  resetTimer,
  onResendCode,
}: any) {
  const { t } = useTranx();

  return (
    <>
      {seconds !== '00' ? (
        <p className='mt-6 text-base font-bold'>
          {t('common.security_verification_resend_desc', {
            mode: mode === 'sms' ? 'SMS' : 'Email',
            minutes,
            seconds,
          })}
        </p>
      ) : (
        <div className='mt-4'></div>
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
        {t('common.security_verification_send_again_desc')}
      </Button>
    </>
  );
}

function AuthViewActions({
  mode,
  seconds,
  minutes,
  resetTimer,
  onResendCode,
}: any) {
  const { t } = useTranx();

  return (
    <>
      <p className='mt-8 text-sm font-bold md:text-base'>
        {t('common.security_verification_didnt_receive_desc')}
      </p>
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
        {t('common.security_verification_send_again_desc')}
      </Button>
      {seconds !== '00' ? (
        <p className='mt-6 text-base font-bold'>
          {t('common.security_verification_resend_desc', {
            mode: mode === 'sms' ? 'SMS' : 'Email',
            minutes,
            seconds,
          })}
        </p>
      ) : null}
    </>
  );
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
      viewType,
    },
    ref
  ) => {
    const [otpValue, setOtpValue] = useState('');
    const [attemptsLeft, setAttemptsLeft] = useState(3);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [totalAttempts, setTotalAttempts] = useState(0);

    const { t } = useTranx();

    const { minutes, seconds, resetTimer } = useCountDownTimer(
      true,
      30,
      () => {}
    );

    const preventOtpInput = useMemo(() => attemptsLeft <= 0, [attemptsLeft]);

    function failedAttempt() {
      setAttemptsLeft((_attemptsLeft) => _attemptsLeft - 1);
      setTotalAttempts((_totalAttempts) => {
        const newTotal = _totalAttempts + 1;
        if (newTotal % 3 === 0) {
          const multiples = newTotal / 3;
          resetTimer((multiples + 1) * 30);
        }
        return newTotal;
      });
    }

    useImperativeHandle(ref, () => ({
      reset: () => {
        setOtpValue('');
      },
      countFailedAttempt: () => {
        failedAttempt();
      },
    }));

    return (
      <div
        className={cn(
          'mx-auto w-full max-w-xs flex-1 py-4 sm:max-w-md lg:mt-12 xl:max-w-[400px] min-[140rem]:max-w-[50rem]',
          viewType === 'wallet' && 'lg:mt-6',
          className
        )}
      >
        <h1
          className={cn('sm:text-3x mb-3 text-2xl font-bold', titleClassName)}
        >
          {title}
        </h1>
        <p
          className={cn(
            'text-neutral-4 mb-8 font-medium max-[140rem]:text-sm md:text-base/7.5 min-[140rem]:text-xl min-[140rem]:leading-loose',
            messageClassName
          )}
        >
          {message}
          {mode === 'email' && (
            <>
              <br />
              <span className='font-medium max-[140rem]:text-sm md:text-base/7.5 min-[140rem]:text-xl'>
                {t('common.security_verification_check_mail')}
              </span>
            </>
          )}
        </p>
        <InputOTP
          value={otpValue}
          onChange={setOtpValue}
          maxLength={6}
          onComplete={(otp) => {
            if (onComplete) {
              onComplete(otp);
            }
          }}
          disabled={preventOtpInput}
        >
          <InputOTPGroup className='-pr-3 flex w-full flex-1 justify-center'>
            <InputOTPSlot
              index={0}
              className='flex-1 rounded-lg border border-black/50 py-5 text-2xl font-bold shadow-none md:py-8 min-[140rem]:py-12'
            />
            <InputOTPSlot
              index={1}
              className='flex-1 rounded-lg border border-black/50 py-5 text-2xl font-bold shadow-none md:py-8 min-[140rem]:py-12'
            />
            <InputOTPSlot
              index={2}
              className='flex-1 rounded-lg border border-black/50 py-5 text-2xl font-bold shadow-none md:py-8 min-[140rem]:py-12'
            />
            <InputOTPSlot
              index={3}
              className='flex-1 rounded-lg border border-black/50 py-5 text-2xl font-bold shadow-none md:py-8 min-[140rem]:py-12'
            />
            <InputOTPSlot
              index={4}
              className='flex-1 rounded-lg border border-black/50 py-5 text-2xl font-bold shadow-none md:py-8 min-[140rem]:py-12'
            />
            <InputOTPSlot
              index={5}
              className='flex-1 rounded-lg border border-black/50 py-5 text-2xl font-bold shadow-none md:py-8 min-[140rem]:py-12'
            />
          </InputOTPGroup>
        </InputOTP>
        {attemptsLeft > 0 && attemptsLeft !== 3 ? (
          <p className='mt-4 text-base font-bold text-red-500'>
            {t('common.security_verification_attempts_left', {
              count: attemptsLeft,
            })}
          </p>
        ) : null}
        {(viewType === 'profile' || viewType === 'wallet') && (
          <ProfileViewActions
            mode={mode}
            seconds={seconds}
            minutes={minutes}
            resetTimer={resetTimer}
            onResendCode={() => {
              setAttemptsLeft(3);
              if (onResendCode) {
                onResendCode();
              }
            }}
          />
        )}
        {viewType === 'auth' && (
          <AuthViewActions
            mode={mode}
            seconds={seconds}
            minutes={minutes}
            resetTimer={resetTimer}
            onResendCode={() => {
              setAttemptsLeft(3);
              if (onResendCode) {
                onResendCode();
              }
            }}
          />
        )}
      </div>
    );
  }
);

// eslint-disable-next-line i18next/no-literal-string
OtpSecurityVerification.displayName = 'OtpSecurityVerification';

export default OtpSecurityVerification;
