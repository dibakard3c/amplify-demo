import React from 'react';
import { SVGProps } from 'react';

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={25}
    viewBox='0 0 24 25'
    fill='none'
    {...props}
  >
    <path
      fill='#777E91'
      d='M6.4 19.5 5 18.1l5.6-5.6L5 6.9l1.4-1.4 5.6 5.6 5.6-5.6L19 6.9l-5.6 5.6 5.6 5.6-1.4 1.4-5.6-5.6-5.6 5.6Z'
    />
  </svg>
);
