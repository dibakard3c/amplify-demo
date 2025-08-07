import * as React from 'react';
import { SVGProps } from 'react';

export const PhoneIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path
      fill='#360C46'
      fillRule='evenodd'
      d='M18.583 11a3.25 3.25 0 0 0-3.25 3.25v19.5a3.25 3.25 0 0 0 3.25 3.25h10.834a3.25 3.25 0 0 0 3.25-3.25v-19.5a3.25 3.25 0 0 0-3.25-3.25H18.583ZM24 32.667a1.083 1.083 0 1 0 0-2.167 1.083 1.083 0 0 0 0 2.167Z'
      clipRule='evenodd'
    />
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
