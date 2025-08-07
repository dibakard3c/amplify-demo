import * as React from 'react';
import { SVGProps } from 'react';

export const RoundedGradient = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={32}
    height={32}
    fill='none'
    viewBox='0 0 32 32'
    {...props}
  >
    <g clipPath='url(#a)'>
      <circle cx={16} cy={16} r={16} fill='url(#b)' />
      <circle cx={16} cy={16} r={16} fill='url(#c)' fillOpacity={0.2} />
      <circle cx={16} cy={16} r={15} fill='#fff' />
    </g>
    <defs>
      <linearGradient
        id='b'
        x1={26.155}
        x2={5.844}
        y1={0}
        y2={32}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#A36BE3' />
        <stop offset={0.859} stopColor='#F2D3AE' />
      </linearGradient>
      <linearGradient
        id='c'
        x1={6.019}
        x2={25.981}
        y1={0}
        y2={32}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#DC92E6' />
        <stop offset={1} stopColor='#DD8998' />
      </linearGradient>
      <clipPath id='a'>
        <path fill='#fff' d='M0 0h32v32H0z' />
      </clipPath>
    </defs>
  </svg>
);
