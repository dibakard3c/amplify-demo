'use client';

import React from 'react';
import { CopyIcon } from '@estia/assets';
import { ShareIcon } from '@estia/assets/icons/share';
import QRCode from 'react-qr-code';
import { useSelector } from 'react-redux';
import { selectUser } from '@estia/store/selector';
import { useFetchDefiWalletQuery } from '@estia/networking/endpoints/transaction';
import { compareIgnoreCase } from '@estia/utils/general';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Toast } from '@estia/helpers/toast';
import { RWebShare } from 'react-web-share';
import DashboardSubNavCard from '@estia/components/layout/dashboard-sub-nav-card';
import { KYC_STATUS } from '@estia/constants/kyc-status';
import { useTranx } from '@estia/hooks/useTranx';

export default function Page() {
  const user = useSelector(selectUser);

  const { t } = useTranx();

  const { data: defiInfo, isLoading } = useFetchDefiWalletQuery(undefined, {
    skip: !compareIgnoreCase(user?.kycStatus, KYC_STATUS.COMPLETED),
  });

  if (isLoading) {
    return (
      <div className='mx-auto flex h-full max-w-[45%] flex-col items-center justify-center'>
        <h3 className='text-center text-xl font-semibold'>
          {t('common.loading')}
        </h3>
      </div>
    );
  }

  return (
    <DashboardSubNavCard
      title={t('dashboard.wallet.receive_est_page.page_title')}
      titleClassName='text-xl'
    >
      <div className='max-w-[27rem] self-center min-[140rem]:mt-4 min-[140rem]:max-w-[45rem]'>
        <div className='border-secondary-3 relative mt-5 flex aspect-[1] h-auto w-full items-center justify-center rounded-2xl border-4'>
          <div className='bg-neutral-8 absolute -top-2 -bottom-2 left-[25%] h-full w-[50%]'></div>
          <div className='bg-neutral-8 absolute -bottom-2 left-[25%] h-full w-[50%]'></div>
          <div className='bg-neutral-8 absolute top-[25%] -left-2 h-[50%] w-full'></div>
          <div className='bg-neutral-8 absolute top-[25%] -right-2 h-[50%] w-full'></div>
          <QRCode
            size={256}
            style={{
              height: 'auto',
              maxWidth: '82%',
              width: '82%',
              zIndex: 10,
            }}
            value={defiInfo?.walletAddress || ''}
            viewBox={`0 0 256 256`}
          />
        </div>
        <CopyToClipboard
          text={defiInfo?.walletAddress}
          onCopy={() =>
            Toast.showSuccess({ message: t('common.clipboard_copy') })
          }
        >
          <div className='mt-10 flex items-center justify-between'>
            <p className='text-neutral-4 w-2/3 text-lg font-bold break-all min-[140rem]:leading-loose'>
              {defiInfo?.walletAddress}
            </p>
            <CopyIcon className='ml-8 size-16 cursor-pointer' />
          </div>
        </CopyToClipboard>
        <RWebShare
          data={{
            title: t('dashboard.wallet.receive_est_page.wallet_address'),
            text: defiInfo?.walletAddress,
            url: '',
          }}
          disableNative={true}
        >
          <div className='mt-12 mb-8 flex cursor-pointer items-center justify-center self-center min-[140rem]:mt-22'>
            <ShareIcon className='min-[140rem]:size-18' />
            <p className='text-neutral-2 ml-2 text-2xl font-bold'>
              {t('common.share')}
            </p>
          </div>
        </RWebShare>
      </div>
    </DashboardSubNavCard>
  );
}
