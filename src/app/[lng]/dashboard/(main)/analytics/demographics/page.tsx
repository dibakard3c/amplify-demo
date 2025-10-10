'use client';

import React from 'react';
import { CustomerDemographicsDetailedTable } from '@estia/components/analytics/customer-demographics-detailed-table';
import { CustomerDemographicsAgeDistributionChart } from '@estia/components/analytics/customer-demographics-age-distribution';
import DashboardCard from '@estia/components/layout/dashboard-card';
import { useTranx } from '@estia/hooks/useTranx';

export default function Page() {
  const { t } = useTranx();

  const demographicsList = [
    {
      title: t('dashboard.analytics.demographics_page.total_customers'),
      count: '24.582',
      history: t(
        'dashboard.analytics.demographics_page.total_customers_metrics',
        {
          percentage: '+12.5',
        }
      ),
    },
    {
      title: t('dashboard.analytics.demographics_page.average_age'),
      count: t('dashboard.analytics.demographics_page.average_age_count', {
        age: '34,7',
      }),
      history: t('dashboard.analytics.demographics_page.average_age_metrics', {
        percentage: '+1.5',
      }),
    },
    {
      title: t('dashboard.analytics.demographics_page.income'),
      count: '€24.582,10',
      history: t('dashboard.analytics.demographics_page.income_metrics', {
        percentage: '+12.5',
      }),
    },
  ];

  return (
    <DashboardCard
      title={t('dashboard.analytics.demographics_page.page_title')}
    >
      <div className='mt-6 flex flex-col justify-between md:flex-row'>
        {demographicsList?.map((item, index) => (
          <div
            key={index}
            className='dashboard-shadow relative mb-3 w-full rounded-xl p-6 md:mb-0 md:w-[32%]'
          >
            <h1 className='text-xl'>{item?.title}</h1>
            <h2 className='py-2 text-3xl font-semibold'>{item?.count}</h2>
            <p className='text-primary-4 text-sm font-semibold'>
              {item?.history}
            </p>
          </div>
        ))}
      </div>
      <div className='dashboard-shadow relative mt-8 rounded-xl p-6'>
        <div className='mb-4 flex flex-row justify-between'>
          <h2 className='text-lg md:text-2xl'>
            {t('dashboard.analytics.demographics_page.age_distribution_title')}
          </h2>
        </div>
        <CustomerDemographicsAgeDistributionChart />
      </div>
      <div className='dashboard-shadow relative mt-8 rounded-xl p-6'>
        <div className='mb-4 flex flex-row justify-between'>
          <h2 className='text-lg md:text-2xl'>
            {t(
              'dashboard.analytics.demographics_page.detailed_demographics_title'
            )}
          </h2>
        </div>
        <div className='flex flex-col md:flex-row'>
          <CustomerDemographicsDetailedTable className='w-full' />
          {/*<CustomerDemographicsGraph className='w-full flex-1 md:ml-2 md:w-1/2' />*/}
        </div>
      </div>
    </DashboardCard>
  );
}
