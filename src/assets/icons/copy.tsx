import React from 'react';
import { SVGProps } from 'react';

export const CopyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={48}
    height={48}
    viewBox='0 0 48 48'
    fill='none'
    {...props}
  >
    <path
      stroke='#3C0449'
      strokeLinejoin='round'
      strokeWidth={4}
      d='M10 8a4 4 0 0 1 4-4h22c3.771 0 5.657 0 6.828 1.172C44 6.343 44 8.229 44 12v22a4 4 0 0 1-4 4m-28 6h16c3.771 0 5.657 0 6.828-1.172C36 41.657 36 39.771 36 36V20c0-3.771 0-5.657-1.172-6.828C33.657 12 31.771 12 28 12H12c-3.771 0-5.657 0-6.828 1.172C4 14.343 4 16.229 4 20v16c0 3.771 0 5.657 1.172 6.828C6.343 44 8.229 44 12 44Z'
    />
  </svg>
);
