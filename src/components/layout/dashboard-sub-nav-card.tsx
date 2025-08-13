import React, { PropsWithChildren } from 'react';
import { cn } from '@estia/lib/utils';

interface DashboardSubNavProps extends PropsWithChildren {
  title?: string;
  titleClassName?: string;
  className?: string;
}
export default function DashboardSubNavCard({
  title,
  children,
  titleClassName,
  className,
}: DashboardSubNavProps) {
  return (
    <div
      className={cn(
        'mx-auto flex w-full flex-col items-center justify-center lg:max-w-[45%]',
        className
      )}
    >
      {title ? (
        <h1
          className={cn(
            'mb-12 text-2xl leading-normal font-bold sm:text-3xl',
            titleClassName
          )}
        >
          {title}
        </h1>
      ) : null}
      {children}
    </div>
  );
}
