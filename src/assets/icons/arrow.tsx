import * as React from 'react';
import { SVGProps } from 'react';

export const ArrowUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={25}
    viewBox='0 0 24 25'
    fill='none'
    {...props}
  >
    <path
      fill='#360C46'
      fillRule='evenodd'
      d='M16.735 10.41a1 1 0 0 0-.057-1.414l-3.5-3.23a1 1 0 0 0-1.356 0l-3.5 3.23a1 1 0 1 0 1.356 1.47L11.5 8.784V18.5a1 1 0 1 0 2 0V8.784l1.822 1.682a1 1 0 0 0 1.413-.057Z'
      clipRule='evenodd'
    />
  </svg>
);

export const ArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={25}
    height={25}
    viewBox='0 0 25 25'
    fill='none'
    {...props}
  >
    <path
      fill='#360C46'
      fillRule='evenodd'
      d='M16.1 14.456a1 1 0 0 1-.056 1.413l-3.5 3.231a1 1 0 0 1-1.357 0l-3.5-3.23a1 1 0 0 1 1.357-1.47l1.821 1.681V6.365a1 1 0 1 1 2 0v9.716l1.822-1.681a1 1 0 0 1 1.413.056Z'
      clipRule='evenodd'
    />
  </svg>
);
