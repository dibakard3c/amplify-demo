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

export default function Page() {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  const { isLoading, data, refetch } = useLoadKybVerificationQuery(undefined, {
    skip: compareIgnoreCase(user?.kycStatus, 'COMPLETED'),
  });

  if (!data?.accessToken && isLoading) {
    return null;
  }

  return data?.accessToken &&
    !compareIgnoreCase(user?.kycStatus, 'COMPLETED') ? (
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
          !compareIgnoreCase(user?.kycStatus, 'COMPLETED')
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
    <div className='mx-auto flex max-w-[50%] flex-col items-center justify-center pt-12'>
      <p className='my-8 text-3xl font-bold'>
        Business Verification Successful
      </p>
      <div>
        <p className='my-4 text-center text-base leading-loose'>
          Your business identity has been successfully verified. You now have
          unrestricted access to your dashboard and all available features
          designed to support and grow your business operations.
        </p>
      </div>
      <Button asChild className='mt-12 h-14 w-full px-16 text-lg'>
        <Link href='/dashboard'>Continue to Dashboard</Link>
      </Button>
    </div>
  );
}
