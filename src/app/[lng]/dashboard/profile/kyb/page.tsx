'use client';

import React from 'react';
import SumsubWebSdk from '@sumsub/websdk-react';
import { useLoadKybVerificationQuery } from '@estia/networking/endpoints/auth';
import { toggleLoader } from '@estia/store/slices/general';
import { useAppDispatch } from '@estia/store/store';
import { apiHandler, QUERY_TAGS } from '@estia/networking/api-handler';
import { compareIgnoreCase } from '@estia/utils/general';
import { useSelector } from 'react-redux';
import { selectUser } from '@estia/store/selector';
import { Button } from '@estia/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@estia/assets';
import { useTranx } from '@estia/hooks/useTranx';
import { KYC_STATUS } from '@estia/constants/kyc-status';

export default function Page() {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  const { t } = useTranx();

  const { isLoading, data, refetch } = useLoadKybVerificationQuery(undefined, {
    skip: compareIgnoreCase(user?.kycStatus, KYC_STATUS.COMPLETED),
  });

  if (!data?.accessToken && isLoading) {
    return null;
  }

  return data?.accessToken &&
    !compareIgnoreCase(user?.kycStatus, KYC_STATUS.COMPLETED) ? (
    <SumsubWebSdk
      accessToken={data?.accessToken || ''}
      testEnv={true}
      expirationHandler={() => refetch()}
      config={
        {
          // lang: 'zh-tw',
        }
      }
      options={{ addViewportTag: false, adaptIframeHeight: true }}
      onMessage={(messageType: any, payload: any) => {
        if (
          messageType === 'idCheck.onApplicantStatusChanged' &&
          compareIgnoreCase(payload?.reviewResult?.reviewAnswer, 'GREEN') &&
          !compareIgnoreCase(user?.kycStatus, KYC_STATUS.COMPLETED)
        ) {
          dispatch(toggleLoader(true));
          setTimeout(() => {
            dispatch(apiHandler.util.invalidateTags([QUERY_TAGS.ACCOUNT_INFO]));
            dispatch(toggleLoader(false));
          }, 3000);
        }
      }}
      //  onError={(data) => console.log('onError', data)}
    />
  ) : (
    <div className='mx-auto flex flex-col items-center justify-center min-md:max-w-[90%] md:pt-12 lg:max-w-md min-[140rem]:max-w-[45rem]'>
      <div className='relative mx-auto size-24 lg:size-30'>
        <Image src={Icons.success} alt='' fill />
      </div>
      <p className='my-6 text-center text-2xl font-bold md:text-3xl min-[140rem]:leading-relaxed'>
        {t('dashboard.profile_management.kyb_page.success_title')}
      </p>
      <div>
        <p className='text-base leading-loose'>
          {t('dashboard.profile_management.kyb_page.success_message')}
        </p>
      </div>
      <Button
        asChild
        size='lg'
        className='mt-12 h-14 w-full px-16 text-base md:text-lg min-[140rem]:max-w-[45rem]'
      >
        <Link href='/dashboard'>
          {t('dashboard.profile_management.kyb_page.success_message_action')}
        </Link>
      </Button>
    </div>
  );
}
