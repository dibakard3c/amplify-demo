import React, { PropsWithChildren } from 'react';
import { SVGProps } from 'react';
import { cn } from '@estia/utils/utils';

export const GradientCircleComp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={49}
    height={49}
    viewBox='0 0 49 49'
    fill='none'
    {...props}
  >
    <circle cx={24.167} cy={24.167} r={24.167} fill='url(#a)' />
    <circle
      cx={24.167}
      cy={24.167}
      r={24.167}
      fill='url(#b)'
      fillOpacity={0.2}
    />
    <circle cx={24.167} cy={24.167} r={22.656} fill='#fff' />
    <defs>
      <linearGradient
        id='a'
        x1={39.506}
        x2={8.828}
        y1={0}
        y2={48.333}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#A36BE3' />
        <stop offset={0.859} stopColor='#F2D3AE' />
      </linearGradient>
      <linearGradient
        id='b'
        x1={9.091}
        x2={39.242}
        y1={0}
        y2={48.333}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#DC92E6' />
        <stop offset={1} stopColor='#DD8998' />
      </linearGradient>
    </defs>
  </svg>
);

interface GradientCircleProps extends PropsWithChildren {
  containerClassName?: string;
  className?: string;
}

export function GradientCircle({
  containerClassName,
  children,
  className,
}: GradientCircleProps) {
  return (
    <div
      className={cn(
        'relative flex size-12 items-center justify-center rounded-full',
        className
      )}
    >
      <GradientCircleComp
        className={cn('absolute z-10 size-full', containerClassName)}
      />
      <div className={cn('z-20', containerClassName)}>{children}</div>
    </div>
  );
}
