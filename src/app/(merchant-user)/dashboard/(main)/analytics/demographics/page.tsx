'use client';

import React from 'react';
import { CustomerDemographicsGraph } from '@estia/components/analytics/customer-demographics-graph';
import { CustomerDemographicsDetailedTable } from '@estia/components/analytics/customer-demographics-detailed-table';
import { CustomerDemographicsAgeDistributionChart } from '@estia/components/analytics/customer-demographics-age-distribution';

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
    <div className='bg-neutral-8 mt-8 rounded-2xl p-8'>
      <h1 className='mb-4 text-3xl font-bold'>Customer Demographics</h1>
      <div className='mt-6 flex justify-between'>
        {demographicsList?.map((item, index) => (
          <div
            key={index}
            className='dashboard-shadow relative w-[32%] rounded-xl p-6'
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
          <h2 className='text-2xl'>Age Distribution</h2>
        </div>
        <CustomerDemographicsAgeDistributionChart />
      </div>
      <div className='dashboard-shadow relative mt-8 rounded-xl p-6'>
        <div className='mb-4 flex flex-row justify-between'>
          <h2 className='text-2xl'>Detailed Demographics</h2>
        </div>
        <div className='flex'>
          <CustomerDemographicsDetailedTable className='mr-8 w-1/2' />
          <CustomerDemographicsGraph className='ml-2 w-1/2 flex-1' />
        </div>
      </div>
    </div>
  );
}
