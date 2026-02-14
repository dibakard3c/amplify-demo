import React, { PropsWithChildren } from 'react';
import { cn } from '@estia/utils/utils';

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
        'mx-auto flex w-full flex-col items-center justify-center lg:max-w-[45%] min-[140rem]:max-w-[55%]',
        className
      )}
    >
      {title ? (
        <h1
          className={cn(
            'mb-12 leading-normal font-bold max-[140rem]:text-2xl sm:text-3xl min-[140rem]:text-5xl',
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
