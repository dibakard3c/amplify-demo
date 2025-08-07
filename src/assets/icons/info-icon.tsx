import { SVGProps } from 'react';
import * as React from 'react';

export const InfoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fill='#777E90'
      fillRule='evenodd'
      d='M8 13.334A5.333 5.333 0 1 0 8 2.667a5.333 5.333 0 0 0 0 10.667Zm0 1.333A6.667 6.667 0 1 0 8 1.334a6.667 6.667 0 0 0 0 13.333Z'
      clipRule='evenodd'
    />
    <path
      fill='#777E90'
      fillRule='evenodd'
      d='M8 4.667A.667.667 0 1 0 8 6a.667.667 0 0 0 0-1.333Zm0 2.666A.667.667 0 0 0 7.333 8v2.666a.667.667 0 1 0 1.333 0V8A.667.667 0 0 0 8 7.333Z'
      clipRule='evenodd'
    />
  </svg>
);
