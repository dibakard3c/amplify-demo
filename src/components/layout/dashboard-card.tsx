import React, { PropsWithChildren } from 'react';
import { cn } from '@estia/utils/utils';

interface DashboardCardProps extends PropsWithChildren {
  title?: string;
  className?: string;
}
export default function DashboardCard({
  title,
  children,
  className,
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        'bg-neutral-8 mt-6 rounded-2xl p-4 sm:mt-8 sm:p-8 lg:min-h-[80vh]',
        className
      )}
    >
      {title ? (
        <h1 className='text-xl font-bold sm:text-3xl'>{title}</h1>
      ) : null}
      {children}
    </div>
  );
}
