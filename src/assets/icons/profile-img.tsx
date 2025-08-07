import * as React from 'react';
import { SVGProps } from 'react';

export const ProfileImg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={40}
    height={40}
    viewBox='0 0 40 40'
    fill='none'
    {...props}
  >
    <circle cx={19.5} cy={19.5} r={19.5} fill='url(#a)' />
    <circle cx={19.5} cy={19.5} r={19.5} fill='url(#b)' fillOpacity={0.2} />
    <circle cx={19.5} cy={19.5} r={18.5} fill='#fff' />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M38 19.5a18.455 18.455 0 0 1-6.203 13.821 15.24 15.24 0 0 0-6.437-5.39 10.103 10.103 0 0 0 3.975-8.041c0-5.589-4.53-10.12-10.12-10.12-5.588 0-10.12 4.531-10.12 10.12 0 3.278 1.56 6.192 3.976 8.041a15.237 15.237 0 0 0-6.217 5.072A18.449 18.449 0 0 1 1 19.5C1 9.283 9.283 1 19.5 1S38 9.283 38 19.5ZM19.215 30.01a11.793 11.793 0 0 0-9.696 5.07A18.414 18.414 0 0 0 19.5 38c3.507 0 6.787-.976 9.581-2.671a11.796 11.796 0 0 0-9.866-5.32Zm6.747-10.12a6.746 6.746 0 1 1-13.493 0 6.746 6.746 0 0 1 13.493 0Z'
      clipRule='evenodd'
    />
    <defs>
      <linearGradient
        id='a'
        x1={31.877}
        x2={7.123}
        y1={0}
        y2={39}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#A36BE3' />
        <stop offset={0.859} stopColor='#F2D3AE' />
      </linearGradient>
      <linearGradient
        id='b'
        x1={7.336}
        x2={31.664}
        y1={0}
        y2={39}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#DC92E6' />
        <stop offset={1} stopColor='#DD8998' />
      </linearGradient>
    </defs>
  </svg>
);
