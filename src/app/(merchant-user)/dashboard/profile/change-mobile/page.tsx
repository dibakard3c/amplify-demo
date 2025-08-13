'use client';

import React, { useRef, useState } from 'react';
import { Button } from '@estia/components/ui/button';
import OtpSecurityVerification, {
  OtpSecurityVerificationRef,
} from '@estia/components/auth/otp-security-verification';
import {
  useChangeMobileMutation,
  useInitChangeMobileMutation,
  useSendMobileOtpMutation,
  useValidateMobileMutation,
  useVerifyChangeMobileOtpMutation,
  useVerifyMobileMutation,
} from '@estia/networking/endpoints/auth';
import { useForm } from 'react-hook-form';
import { ChangeMobileForm } from '@estia/typings/login-form';
import { Form } from '@estia/components/ui/form';
import { Icons } from '@estia/assets';
import Image from 'next/image';
import { SCREENS } from '@estia/constants/screens';
import { useRouter } from 'next/navigation';
import MobileInput from '@estia/components/form/mobile-input';
import { useSelector } from 'react-redux';
import { selectUser } from '@estia/store/selector';
import { maskString } from '@estia/utils/general';
import { Toast } from '@estia/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DashboardSubNavCard from '@estia/components/layout/dashboard-sub-nav-card';

const CHANGE_STEPS = {
  CHANGE_MOBILE: 'change_mobile',
  NEW_MOBILE_VERIFICATION: 'new_otp_verification',
  CHANGE_SUCCESS: 'change_success',
  OLD_MOBILE_VERIFICATION: 'old_otp_verification',
};

type ChangeMobileStep = (typeof CHANGE_STEPS)[keyof typeof CHANGE_STEPS];

export default function Page() {
  const router = useRouter();
  const user = useSelector(selectUser);
  const [mode, setMode] = useState<ChangeMobileStep>('');

  const otpOldRef = useRef<OtpSecurityVerificationRef>(null);
  const otpNewRef = useRef<OtpSecurityVerificationRef>(null);

  const [initChangeMobile] = useInitChangeMobileMutation();
  const [verifyChangeMobileOtp] = useVerifyChangeMobileOtpMutation();
  const [changeMobile] = useChangeMobileMutation();
  const [verifyMobile] = useVerifyMobileMutation();
  const [checkMobile] = useValidateMobileMutation();
  const [resendMobileOtp] = useSendMobileOtpMutation();

  const form = useForm<ChangeMobileForm>({
    resolver: yupResolver(
      yup.object().shape({
        mobile_phone: yup.object({
          country_code: yup.object({
            countryAbbreviation: yup
              .string()
              .required('Country code is required'),
            countryName: yup.string().required('Country code is required'),
            mobileCode: yup.string().required('Country code is required'),
          }),
          number: yup.string().required('Contact phone is required'),
        }),
      })
    ),
    defaultValues: {
      mobile_phone: {
        country_code: {
          countryAbbreviation: 'GR',
          countryName: 'Greece',
          mobileCode: '+30',
        },
        number: '',
      },
    },
    mode: 'onChange',
    delayError: 500,
  });

  const onSendMobileOtpSubmit = (formValues: ChangeMobileForm) => {
    if (
      formValues?.mobile_phone.number === user?.primaryUserMobileNumber &&
      formValues?.mobile_phone?.country_code?.mobileCode ===
        user?.primaryUserMobileCountryCode
    ) {
      Toast.showError({
        message:
          'You can’t use your current number. Please enter a different one.',
      });
      return;
    }
    checkMobile({
      number: `${formValues?.mobile_phone?.country_code?.mobileCode}${formValues?.mobile_phone?.number}`,
      countryCode: formValues?.mobile_phone?.country_code?.countryAbbreviation,
    })
      .unwrap()
      .then(() => {
        changeMobile({
          mobile: {
            countryCode: formValues?.mobile_phone?.country_code?.mobileCode,
            number: formValues?.mobile_phone?.number,
          },
        })
          .unwrap()
          .then(() => {
            setMode(CHANGE_STEPS.NEW_MOBILE_VERIFICATION);
          });
      })
      .catch((reason) => {
        form.setError('mobile_phone', {
          message: reason?.data?.detail,
        });
      });
  };

  const onSendMobileOtp = () => {
    initChangeMobile()
      .unwrap()
      .then((response: any) => {
        if (response?.otp) {
          Toast.showSuccess({ message: `OTP is ${response?.otp}` });
        }
        setMode(CHANGE_STEPS.OLD_MOBILE_VERIFICATION);
      });
  };

  const onVerifyMobile = (otp: string) => {
    verifyChangeMobileOtp(otp)
      .unwrap()
      .then(() => {
        setMode(CHANGE_STEPS.CHANGE_MOBILE);
      })
      .catch(() => {
        otpOldRef.current?.reset();
      });
  };

  const onVerifyNewMobile = (otp: string) => {
    verifyMobile(otp)
      .unwrap()
      .then(() => {
        setMode(CHANGE_STEPS.CHANGE_SUCCESS);
      })
      .catch(() => {
        otpNewRef.current?.reset();
      });
  };

  if (mode === CHANGE_STEPS.CHANGE_SUCCESS) {
    return (
      <div className='mx-auto flex h-full flex-col items-center justify-center pb-24 md:max-w-[50%]'>
        <div className='relative size-24 lg:size-30'>
          <Image src={Icons.success} alt='' fill />
        </div>
        <p className='text-neutral-2 mt-6 text-center text-3xl font-bold'>
          Your mobile phone has changed
        </p>
        <Button
          onClick={() => {
            router.push(SCREENS.PROFILE);
          }}
          size='lg'
          className='mt-8 w-full'
        >
          Back to Profile
        </Button>
      </div>
    );
  }

  if (mode === CHANGE_STEPS.NEW_MOBILE_VERIFICATION) {
    return (
      <OtpSecurityVerification
        ref={otpNewRef}
        resendMode
        title='Security Verification'
        titleClassName='text-center pb-3'
        message={`Please enter 6-digit code we have sent to at ${maskString(`${form?.getValues('mobile_phone.country_code.mobileCode')}${form?.getValues('mobile_phone.number')}`, 3, 3)}`}
        messageClassName='text-center pb-3'
        mode='sms'
        onResendCode={() => {
          resendMobileOtp('MOBILE_CHANGE');
        }}
        onComplete={onVerifyNewMobile}
        className='mx-auto mt-24 md:max-w-[45%] xl:max-w-[400px]'
        actionText='Send me again'
      />
    );
  }

  if (mode === CHANGE_STEPS.CHANGE_MOBILE) {
    return (
      <div className='mx-auto flex flex-col pt-12 md:max-w-[60%]'>
        <p className='mt-8 text-center text-3xl font-bold'>
          Change mobile phone
        </p>
        <p className='my-4 text-base leading-loose'>
          We will text a verification code to your new mobile phone to confirm
          it.
        </p>
        <Form {...form}>
          <MobileInput
            control={form?.control}
            countryCodeName='phone.country_code'
            numberName='mobile_phone.number'
            label='MOBILE PHONE'
            placeholder='Your mobile number'
            error={form?.formState?.errors?.mobile_phone?.message}
            currentCountryCode={user?.primaryUserMobileCountryCode}
            currentMobile={user?.primaryUserMobileNumber}
          />
        </Form>
        <Button
          className='mt-12 h-14 w-full px-16 text-lg'
          onClick={() => {
            form.handleSubmit(onSendMobileOtpSubmit)();
          }}
        >
          Change mobile phone
        </Button>
      </div>
    );
  }

  if (mode === CHANGE_STEPS.OLD_MOBILE_VERIFICATION) {
    return (
      <OtpSecurityVerification
        ref={otpOldRef}
        title='Security Verification'
        titleClassName='text-center pb-3'
        message={`Please enter 6-digit code we have sent to at ${maskString(user?.primaryUserMobileCountryCode + '' + user?.primaryUserMobileNumber, 3, 3)}`}
        messageClassName='text-center pb-3'
        mode='sms'
        resendMode
        onResendCode={onSendMobileOtp}
        onComplete={onVerifyMobile}
        className='mx-auto mt-24 md:max-w-[45%] xl:max-w-[400px]'
        actionText='Send me again'
      />
    );
  }

  return (
    <DashboardSubNavCard title='Change mobile phone' titleClassName='my-8'>
      <div>
        <p className='my-4 text-base leading-loose'>
          To change your mobile phone, you will follow these steps:
        </p>
        <ul className='mt-4 ml-6 list-disc text-base'>
          <li className='text-base'>
            Enter the verification code sent to your current mobile phone.
          </li>
          <li className='my-4 text-base'>Enter your new mobile phone.</li>
          <li className='text-base'>
            Enter the verification code sent to your new mobile phone.
          </li>
        </ul>
      </div>
      <Button
        className='mt-12 h-14 w-full px-16 text-lg'
        onClick={() => {
          onSendMobileOtp();
        }}
      >
        Proceed to change mobile phone
      </Button>
    </DashboardSubNavCard>
  );
}
