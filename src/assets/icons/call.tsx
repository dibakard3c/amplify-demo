import * as React from 'react';
import { SVGProps } from 'react';

export const CallIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <g clipPath='url(#c)'>
      <path
        fill='#360C46'
        d='m32.607 30.949-1.746 1.746s-4.537 1.944-11.019-4.537c-6.482-6.482-4.537-11.02-4.537-11.02l1.746-1.746a1.833 1.833 0 0 1 2.763.197l1.667 2.222c.547.73.475 1.751-.17 2.396l-1.469 1.469s0 1.296 2.593 3.889 3.889 2.593 3.889 2.593l1.468-1.469a1.833 1.833 0 0 1 2.397-.17l2.222 1.667c.893.67.985 1.974.196 2.763Z'
      />
    </g>
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
      <clipPath id='c'>
        <path fill='#fff' d='M13 13h22v22H13z' />
      </clipPath>
    </defs>
  </svg>
);
