import React from 'react';
import {
  compareIgnoreCase,
  formatCurrency,
  formatNumber,
} from '@estia/utils/general';
import { EstiaLogo } from '@estia/assets';
import {
  useFetchBalanceSummaryQuery,
  useFetchDefiWalletQuery,
  useFetchFiatWalletQuery,
} from '@estia/networking/endpoints/transaction';
import { useSelector } from 'react-redux';
import { selectDashboardSummary, selectUser } from '@estia/store/selector';
import Skeleton from 'react-loading-skeleton';
import { formatIBAN } from '@estia/utils/currency';
import { Toast } from '@estia/helpers/toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranx } from '@estia/hooks/useTranx';

export default function BalanceSummary() {
  const dashboardSummary = useSelector(selectDashboardSummary);
  const currentUser = useSelector(selectUser);

  const { t } = useTranx();

  const { isFetching } = useFetchBalanceSummaryQuery(
    undefined, // { showLoader: true },
    {
      skip: !compareIgnoreCase(currentUser?.kycStatus, 'COMPLETED'),
    }
  );

  const { data: fiatInfo, isFetching: isFiatLoading } = useFetchFiatWalletQuery(
    undefined,
    {
      skip: !compareIgnoreCase(currentUser?.kycStatus, 'COMPLETED'),
    }
  );

  const { data: defiInfo, isFetching: isFetchingRate } =
    useFetchDefiWalletQuery(undefined, {
      skip: !compareIgnoreCase(currentUser?.kycStatus, 'COMPLETED'),
    });

  return (
    <div className='border-border dashboard-shadow flex-1 rounded-xl bg-white p-4 sm:flex-[0.58_0.58_0%] sm:px-8 sm:py-6'>
      <div className='w-fit'>
        <h2 className='text-neutral-2 mb-2 text-lg sm:text-2xl min-[140rem]:mb-3'>
          {t('dashboard.home_page.account.total_amount')}
        </h2>
        {isFetching ? (
          <Skeleton className='h-8 !w-60 sm:w-full min-[140rem]:h-10' />
        ) : (
          <h3 className='text-primary text-3xl font-bold'>
            {formatCurrency(dashboardSummary?.totalAmount)}
          </h3>
        )}
      </div>
      <div className='text-primary mt-8 flex items-center justify-between pr-2'>
        <div className='flex sm:w-[25%]'>
          <div className='mr-4 size-10'>
            <EstiaLogo width='100%' height='100%' className='sm:block' />
          </div>
          <div className='w-max text-right'>
            <p className='font-medium max-[140rem]:text-sm sm:text-base min-[140rem]:mb-2 min-[140rem]:text-2xl'>
              Estia/€
            </p>
            {isFetching ? (
              <Skeleton className='h-6 !w-20 max-w-44 sm:w-full min-[140rem]:h-8' />
            ) : (
              <p className='font-bold max-[140rem]:text-base sm:text-lg min-[140rem]:text-2xl'>
                {formatCurrency(dashboardSummary?.estiaAmountInEuro)}
              </p>
            )}
          </div>
        </div>
        <div className='w-max-w text-right sm:w-[30%]'>
          <p className='font-medium max-[140rem]:text-sm sm:text-base min-[140rem]:mb-2 min-[140rem]:text-2xl'>
            Estia {t('dashboard.home_page.account.tokens')}
          </p>
          {isFetching ? (
            <Skeleton className='h-6 !w-60 max-w-20 sm:w-full min-[140rem]:h-8 min-[140rem]:max-w-36' />
          ) : (
            <p className='font-bold max-[140rem]:text-base sm:text-lg min-[140rem]:text-2xl'>
              {`EST ${formatNumber(dashboardSummary?.estiaAmount)}`}
            </p>
          )}
        </div>
        <div className='w-max-w text-right sm:w-[30%]'>
          <p className='font-medium max-[140rem]:text-sm sm:text-base min-[140rem]:mb-2 min-[140rem]:text-2xl'>
            {t('dashboard.home_page.account.cash_back')}
          </p>
          {isFetching ? (
            <Skeleton className='h-6 !w-60 max-w-20 sm:w-full min-[140rem]:h-8 min-[140rem]:max-w-36' />
          ) : (
            <p className='font-bold max-[140rem]:text-base sm:text-lg min-[140rem]:text-2xl'>
              {formatCurrency(dashboardSummary?.cashBackAmount)}
            </p>
          )}
        </div>
        <div className='w-max-w text-right sm:w-[30%]'></div>
      </div>
      <div className='text-primary mt-6 flex flex-col justify-between pr-2 sm:flex-row'>
        <div className='w-max-w flex sm:w-[25%]'>
          <div className='flex w-max items-center text-left sm:block'>
            <p className='mr-2 font-medium max-[140rem]:text-sm sm:mr-0 sm:text-base min-[140rem]:mb-2 min-[140rem]:text-2xl'>
              Estia {t('dashboard.home_page.account.iban_balance')}
            </p>
            {isFetching ? (
              <Skeleton className='h-6 !w-60 max-w-20 sm:w-full min-[140rem]:h-8 min-[140rem]:max-w-36' />
            ) : (
              <p className='font-bold max-[140rem]:text-base sm:text-lg min-[140rem]:text-2xl'>
                {formatCurrency(dashboardSummary?.ibanAmount)}
              </p>
            )}
          </div>
        </div>
        <div className='w-max-w my-2 flex items-center sm:my-0 sm:block sm:w-[30%] sm:text-right'>
          <p className='mr-2 font-medium max-[140rem]:text-sm sm:mr-0 sm:text-base min-[140rem]:mb-2 min-[140rem]:text-2xl'>
            {t('dashboard.home_page.account.revenue_type', {
              type: t('common.euro'),
            })}
          </p>
          {isFetching ? (
            <Skeleton className='h-6 !w-60 max-w-20 sm:w-full min-[140rem]:h-8 min-[140rem]:max-w-36' />
          ) : (
            <p className='font-bold max-[140rem]:text-base sm:text-lg min-[140rem]:text-2xl'>
              PENDING
            </p>
          )}
        </div>
        <div className='w-max-w mb-2 flex items-center sm:mb-0 sm:block sm:w-[30%] sm:text-right'>
          <p className='mr-2 font-medium max-[140rem]:text-sm sm:mr-0 sm:text-base min-[140rem]:mb-2 min-[140rem]:text-2xl'>
            {t('dashboard.home_page.account.revenue_type', {
              type: 'Estia',
            })}
          </p>
          {isFetching ? (
            <Skeleton className='h-6 !w-60 max-w-20 sm:w-full min-[140rem]:h-8 min-[140rem]:max-w-36' />
          ) : (
            <p className='font-bold max-[140rem]:text-base sm:text-lg min-[140rem]:text-2xl'>
              PENDING
            </p>
          )}
        </div>
        <div className='w-max-w flex items-center sm:block sm:w-[30%] sm:text-right'>
          <p className='mr-2 font-medium max-[140rem]:text-sm sm:mr-0 sm:text-base min-[140rem]:mb-2 min-[140rem]:text-2xl'>
            Estia {t('dashboard.home_page.account.estia_rate')}
          </p>
          {isFetchingRate ? (
            <Skeleton className='h-6 !w-60 max-w-20 sm:w-full min-[140rem]:h-8 min-[140rem]:max-w-36' />
          ) : (
            <p className='font-bold max-[140rem]:text-base sm:text-lg min-[140rem]:text-2xl'>
              {formatCurrency(defiInfo?.rate, 'currency', 'el-GR', 'EUR', 4)}
            </p>
          )}
        </div>
      </div>
      <div className='text-primary mt-2 flex flex-col justify-between pr-2 sm:mt-6 sm:flex-row'>
        <div className='flex'>
          <CopyToClipboard
            text={fiatInfo?.iban || ''}
            onCopy={() =>
              Toast.showSuccess({
                message: t('common.clipboard_copy'),
              })
            }
          >
            <div className='flex w-full cursor-copy items-center sm:block'>
              <p className='mr-2 font-medium max-[140rem]:text-sm sm:mr-0 sm:text-base min-[140rem]:mb-2 min-[140rem]:text-2xl'>
                IBAN
              </p>
              {isFiatLoading ? (
                <Skeleton className='h-6 !w-60 sm:w-full min-[140rem]:h-8 min-[140rem]:max-w-36' />
              ) : (
                <p className='font-bold max-[140rem]:text-base sm:text-lg min-[140rem]:text-2xl'>
                  {fiatInfo?.iban ? formatIBAN(fiatInfo?.iban) : 'N/A'}
                </p>
              )}
            </div>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}
