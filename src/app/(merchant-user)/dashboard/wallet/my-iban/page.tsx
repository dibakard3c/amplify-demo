'use client';

import React, { useMemo } from 'react';
import { CopyIcon } from '@estia/assets';
import { useFetchFiatWalletQuery } from '@estia/networking/endpoints/transaction';
import { compareIgnoreCase } from '@estia/utils/general';
import { useSelector } from 'react-redux';
import { selectUser } from '@estia/store/selector';
import { formatIBAN } from '@estia/utils/currency';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Toast } from '@estia/helpers/toast';
import { isEmpty } from 'lodash';
import ErrorView from '@estia/components/general/ErrorView';
import DashboardSubNavCard from '@estia/components/layout/dashboard-sub-nav-card';

export default function Page() {
  const currentUser = useSelector(selectUser);

  const { data, isLoading } = useFetchFiatWalletQuery(undefined, {
    skip: !compareIgnoreCase(currentUser?.kycStatus, 'completed'),
  });

  const ibanDetails = useMemo(
    () => [
      {
        title: 'Account holder',
        value: data?.bankAccountHolderName,
      },
      { title: 'BIC', value: data?.bic },
      {
        title: 'IBAN',
        value: formatIBAN(data?.iban),
      },
      {
        title: 'Bank name and address',
        value: `${data?.bankName || ''}\n${data?.bankAddress?.replace(/,\s*/g, ',\n') || ''}`,
      },
    ],
    [data]
  );

  if (isLoading) {
    return (
      <div className='mx-auto flex h-full max-w-[45%] flex-col items-center justify-center'>
        <h3 className='text-center text-xl font-semibold'>Loading...</h3>
      </div>
    );
  }

  if (isEmpty(data?.iban)) {
    return (
      <ErrorView
        title='Unable to Retrieve IBAN'
        errorMsg='We couldn’t load your IBAN information. Please try again later or contact support if the issue persists.'
      />
    );
  }

  return (
    <DashboardSubNavCard title='My IBAN'>
      <div className='iban-shadow w-full max-w-[27rem] rounded-2xl bg-white p-6'>
        {ibanDetails?.map((item, index) => (
          <CopyToClipboard
            key={index}
            text={item?.value}
            onCopy={() =>
              Toast.showSuccess({
                message: 'Copied to clipboard successfully',
              })
            }
          >
            <div key={index} className='mb-6 flex justify-between'>
              <div className='flex-1'>
                <h1 className='text-base font-medium'>{item?.title}</h1>
                <h2 className='mt-2 text-base leading-relaxed font-bold whitespace-pre-wrap'>
                  {item?.value}
                </h2>
              </div>
              <CopyIcon className='size-8 cursor-pointer' />
            </div>
          </CopyToClipboard>
        ))}
      </div>
    </DashboardSubNavCard>
  );
}
