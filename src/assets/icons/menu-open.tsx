import * as React from 'react';
import { SVGProps } from 'react';

export const MenuOpen = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={22}
    height={15}
    viewBox='0 0 22 15'
    fill='none'
    {...props}
  >
    <path
      fill='currentColor'
      d='M1.333 0a1.333 1.333 0 0 0 0 2.667H20A1.333 1.333 0 1 0 20 0H1.333ZM1.333 12a1.333 1.333 0 0 0 0 2.667H20A1.333 1.333 0 0 0 20 12H1.333ZM1.333 6a1.333 1.333 0 1 0 0 2.667H20A1.333 1.333 0 1 0 20 6H1.333Z'
    />
  </svg>
);
