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
} from '@estia/networking/endpoints/transaction';
import { useSelector } from 'react-redux';
import { selectDashboardSummary, selectUser } from '@estia/store/selector';
import Skeleton from 'react-loading-skeleton';

export default function BalanceSummary() {
  const dashboardSummary = useSelector(selectDashboardSummary);
  const currentUser = useSelector(selectUser);

  const { isFetching } = useFetchBalanceSummaryQuery(
    { showLoader: true },
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
      <h2 className='text-neutral-2 text-lg sm:text-2xl'>Total Amount</h2>
      <div className='mt-2'>
        {isFetching ? (
          <Skeleton height={25} width={130} />
        ) : (
          <h3 className='text-primary text-3xl font-bold'>
            {formatCurrency(dashboardSummary?.totalAmount)}
          </h3>
        )}
      </div>
      <div className='text-primary mt-8 flex items-center justify-between pr-2'>
        <div className='flex'>
          <div className='mr-4 size-10'>
            <EstiaLogo width='100%' height='100%' className='sm:block' />
          </div>
          <div className='flex justify-between'>
            <div className='w-max text-right'>
              <p className='text-sm font-medium sm:text-base'>Estia/€</p>
              {isFetching ? (
                <Skeleton height={20} width={60} />
              ) : (
                <p className='text-base font-bold sm:text-lg'>
                  {formatCurrency(dashboardSummary?.estiaAmountInEuro)}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className='text-right sm:w-[40%]'>
          <p className='text-sm font-medium sm:text-base'>Estia tokens</p>
          {isFetching ? (
            <Skeleton height={20} width={60} />
          ) : (
            <p className='text-base font-bold sm:text-lg'>
              {`EST ${formatNumber(dashboardSummary?.estiaAmount)}`}
            </p>
          )}
        </div>
        <div className='text-right sm:w-[30%]'>
          <p className='text-sm font-medium sm:text-base'>Cash Back</p>
          {isFetching ? (
            <Skeleton height={20} width={60} />
          ) : (
            <p className='text-base font-bold sm:text-lg'>
              {formatCurrency(dashboardSummary?.cashBackAmount)}
            </p>
          )}
        </div>
      </div>
      <div className='text-primary mt-8 flex flex-col justify-between pr-2 sm:flex-row'>
        <div className='w-max-w flex sm:justify-end sm:px-4'>
          <div className='flex w-max items-center text-right sm:block'>
            <p className='mr-2 text-sm font-medium sm:mr-0 sm:text-base'>
              Estia IBAN
            </p>
            {isFetching ? (
              <Skeleton height={20} width={60} />
            ) : (
              <p className='text-base font-bold sm:text-lg'>
                {formatCurrency(dashboardSummary?.ibanAmount)}
              </p>
            )}
          </div>
        </div>
        <div className='w-max-w my-2 flex items-center sm:my-0 sm:block sm:w-[40%] sm:text-right'>
          <p className='mr-2 text-sm font-medium sm:mr-0 sm:text-base'>
            Total Revenue generated
          </p>
          {isFetching ? (
            <Skeleton height={20} width={60} />
          ) : (
            <p className='text-base font-bold sm:text-lg'>PENDING</p>
          )}
        </div>
        <div className='w-max-w flex items-center sm:block sm:w-[30%] sm:text-right'>
          <p className='mr-2 text-sm font-medium sm:mr-0 sm:text-base'>
            Estia Rate
          </p>
          {isFetchingRate ? (
            <Skeleton height={20} width={60} />
          ) : (
            <p className='text-base font-bold sm:text-lg'>
              {formatCurrency(defiInfo?.rate, 'currency', 'el-GR', 'EUR', 4)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
