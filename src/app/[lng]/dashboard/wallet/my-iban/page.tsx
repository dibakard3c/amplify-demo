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
import { useTranx } from '@estia/hooks/useTranx';
import { KYC_STATUS } from '@estia/constants/kyc-status';

export default function Page() {
  const currentUser = useSelector(selectUser);

  const { data, isLoading } = useFetchFiatWalletQuery(undefined, {
    skip: !compareIgnoreCase(currentUser?.kycStatus, KYC_STATUS.COMPLETED),
  });

  const { t } = useTranx();

  const ibanDetails = useMemo(
    () => [
      {
        title: t('dashboard.wallet.my_iban_page.account_holder'),
        value: data?.bankAccountHolderName,
      },
      {
        title: t('dashboard.wallet.my_iban_page.bic'),
        value: data?.bic,
      },
      {
        title: t('dashboard.wallet.my_iban_page.iban'),
        value: formatIBAN(data?.iban),
      },
      {
        title: t('dashboard.wallet.my_iban_page.bank_name_and_address'),
        value: `${data?.bankName || ''}\n${data?.bankAddress?.replace(/,\s*/g, ',\n') || ''}`,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  if (isLoading) {
    return (
      <div className='mx-auto flex h-full max-w-[45%] flex-col items-center justify-center'>
        <h3 className='text-center text-xl font-semibold'>
          {t('common.loading')}
        </h3>
      </div>
    );
  }

  if (isEmpty(data?.iban)) {
    return (
      <ErrorView
        title={t('dashboard.wallet.my_iban_page.error_title')}
        errorMsg={t('dashboard.wallet.my_iban_page.error_msg')}
      />
    );
  }

  return (
    <DashboardSubNavCard title={t('dashboard.wallet.my_iban_page.page_title')}>
      <div className='iban-shadow w-full rounded-2xl bg-white p-6 md:max-w-[27rem] min-[140rem]:max-w-[50rem] min-[140rem]:p-10'>
        {ibanDetails?.map((item, index) => (
          <CopyToClipboard
            key={index}
            text={item?.value}
            onCopy={() =>
              Toast.showSuccess({
                message: t('common.clipboard_copy'),
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
