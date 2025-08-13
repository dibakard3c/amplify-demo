'use client';

import React from 'react';
import { CustomerDemographicsGraph } from '@estia/components/analytics/customer-demographics-graph';
import { CustomerDemographicsDetailedTable } from '@estia/components/analytics/customer-demographics-detailed-table';
import { CustomerDemographicsAgeDistributionChart } from '@estia/components/analytics/customer-demographics-age-distribution';
import DashboardCard from '@estia/components/layout/dashboard-card';

export default function Page() {
  const demographicsList = [
    {
      title: 'Total Customers',
      count: '24.582',
      history: '+12.5% from last month',
    },
    {
      title: 'Average Age',
      count: '34,7 years old',
      history: '+1.5% from last year',
    },
    {
      title: 'Average Income (per year)',
      count: '€24.582,10',
      history: '+12.5% from last month',
    },
  ];

  return (
    <DashboardCard title='Customer Demographics'>
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
          <h2 className='text-lg md:text-2xl'>Age Distribution</h2>
        </div>
        <CustomerDemographicsAgeDistributionChart />
      </div>
      <div className='dashboard-shadow relative mt-8 rounded-xl p-6'>
        <div className='mb-4 flex flex-row justify-between'>
          <h2 className='text-lg md:text-2xl'>Detailed Demographics</h2>
        </div>
        <div className='flex flex-col md:flex-row'>
          <CustomerDemographicsDetailedTable className='mr-8 w-full md:w-1/2' />
          <CustomerDemographicsGraph className='w-full flex-1 md:ml-2 md:w-1/2' />
        </div>
      </div>
    </DashboardCard>
  );
}
