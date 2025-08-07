import * as React from 'react';
import { SVGProps } from 'react';

export const ChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={8}
    height={13}
    fill='none'
    {...props}
  >
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M.724.723c-.521.52-.521 1.365 0 1.886l3.724 3.724-3.724 3.723a1.333 1.333 0 1 0 1.885 1.886l4.667-4.667c.52-.52.52-1.364 0-1.885L2.609.723a1.333 1.333 0 0 0-1.885 0Z'
      clipRule='evenodd'
    />
  </svg>
);

export const ChevronBack = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={32}
    height={32}
    viewBox='0 0 32 32'
    fill='none'
    {...props}
  >
    <rect
      width={30}
      height={30}
      x={1}
      y={1}
      stroke='#E6E8EC'
      strokeWidth={2}
      rx={15}
    />
    <path
      fill='#23262F'
      fillRule='evenodd'
      d='M18.943 21.61c.52-.521.52-1.365 0-1.886L15.219 16l3.724-3.724a1.333 1.333 0 1 0-1.886-1.886l-4.666 4.667c-.521.52-.521 1.365 0 1.886l4.666 4.666c.52.521 1.365.521 1.886 0Z'
      clipRule='evenodd'
    />
  </svg>
);

export const ChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={17}
    height={16}
    viewBox='0 0 17 16'
    fill='none'
    {...props}
  >
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M11.305 6.529a.667.667 0 0 0-.943 0L8.5 8.39 6.638 6.529a.667.667 0 0 0-.943.942L8.03 9.805c.26.26.682.26.942 0l2.334-2.334a.667.667 0 0 0 0-.942Z'
      clipRule='evenodd'
    />
  </svg>
);
