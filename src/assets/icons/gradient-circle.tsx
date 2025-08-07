import React, { PropsWithChildren } from 'react';
import { SVGProps } from 'react';
import { cn } from '@estia/lib/utils';

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
    <div className={cn('relative size-12 rounded-full', className)}>
      <GradientCircleComp className={cn('size-full', containerClassName)} />
      <div
        className={cn(
          'absolute top-0 right-0 bottom-0 left-[20%] flex size-[60%] items-center justify-center self-center',
          containerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
