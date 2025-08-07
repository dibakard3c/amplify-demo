import React from 'react';
import { SVGProps } from 'react';

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    viewBox='0 0 20 20'
    fill='none'
    {...props}
  >
    <path
      fill='#672082'
      fillRule='evenodd'
      d='M12.422 13.6a6.667 6.667 0 1 1 1.178-1.178l4.49 4.488a.833.833 0 0 1-1.179 1.179l-4.49-4.49Zm.912-5.267a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z'
      clipRule='evenodd'
    />
  </svg>
);
