import React from 'react';
import { PhoneIcon } from '@estia/assets/icons/phone';
import { CallIcon } from '@estia/assets/icons/call';
import { ChevronBack, ChevronRight } from '@estia/assets/icons/chevron';
import {
  useAccountInfoMutation,
  useSendTwoFactorOtpMutation,
} from '@estia/networking/endpoints/auth';
import { useAppDispatch } from '@estia/store/store';
import { setLoginPayload } from '@estia/store/slices/auth';

export default function SendOtp({ onMoveToPrevStep, onMoveToNextStep }: any) {
  const dispatch = useAppDispatch();
  const [sendOtp] = useSendTwoFactorOtpMutation();
  const [loadAccountInfo] = useAccountInfoMutation();

  const otpOptions = [
    {
      icon: PhoneIcon,
      title: 'Security code sent by SMS',
      type: 'sms',
    },
    { icon: CallIcon, title: 'Security code sent by email', type: 'email' },
  ];

  function onSendOtp(mode: string) {
    sendOtp(
      mode === 'sms'
        ? 'TWO_STEP_VERIFICATION_MOBILE'
        : 'TWO_STEP_VERIFICATION_EMAIL'
    ).then(() => {
      if (mode === 'sms') {
        loadAccountInfo()
          .unwrap()
          .then((res) => {
            dispatch(
              setLoginPayload({
                otpMode: mode,
                countryCode: res?.primaryUserMobileCountryCode,
                mobileNumber: res?.primaryUserMobileNumber,
              })
            );
            onMoveToNextStep();
          });
      } else {
        dispatch(
          setLoginPayload({
            otpMode: mode,
          })
        );
        onMoveToNextStep();
      }
    });
  }

  return (
    <div className='mx-auto flex h-full items-center justify-center self-center sm:px-4 sm:pl-2'>
      <div
        className='absolute top-5 left-5 flex max-w-max items-center justify-center rounded-full'
        onClick={() => onMoveToPrevStep()}
      >
        <ChevronBack className='size-11' />
      </div>
      <div className='w-full sm:max-w-[70%] xl:max-w-[60%]'>
        <h1 className='mt-8 mb-4 text-center text-xl font-bold sm:mt-0 sm:text-3xl'>
          Choose a 2-step verification
          <br />
          method
        </h1>
        <div className='mx-auto py-1 sm:px-8'>
          {otpOptions?.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                onSendOtp(item.type);
              }}
              className='hover:bg-accent group hover:text-accent-foreground my-5 flex cursor-pointer items-center justify-between rounded px-4 py-3 pr-5 sm:my-3'
            >
              <div className='flex items-center'>
                <item.icon className='size-10 sm:size-14' />
                <p className='text-primary-1 mb-1 ml-3 text-base font-bold group-hover:text-white sm:ml-8 sm:text-lg'>
                  {item?.title}
                </p>
              </div>
              <div>
                <ChevronRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
