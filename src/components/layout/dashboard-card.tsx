import React, { PropsWithChildren } from 'react';

interface DashboardCardProps extends PropsWithChildren {
  title?: string;
}
export default function DashboardCard({ title, children }: DashboardCardProps) {
  return (
    <div className='bg-neutral-8 mt-6 rounded-2xl p-4 sm:mt-8 sm:p-8'>
      {title ? (
        <h1 className='text-xl font-bold sm:text-3xl'>{title}</h1>
      ) : null}
      {children}
    </div>
  );
}
