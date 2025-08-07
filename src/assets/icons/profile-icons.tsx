import * as React from 'react';
import { SVGProps } from 'react';

export const UserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M12 13.001a7 7 0 0 0-7 7v2a1 1 0 1 1-2 0v-2a9 9 0 1 1 18 0v2a1 1 0 1 1-2 0v-2a7 7 0 0 0-7-7Z'
      clipRule='evenodd'
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M12 11.001a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'
      clipRule='evenodd'
    />
  </svg>
);

export const IntegrationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <rect
      width={9}
      height={7}
      x={2}
      y={4.001}
      stroke='#777E90'
      strokeWidth={1.813}
      rx={2.417}
    />
    <rect
      width={9}
      height={7}
      x={14.001}
      y={13.001}
      stroke='#777E90'
      strokeWidth={1.813}
      rx={2.417}
    />
    <path
      stroke='#777E90'
      strokeLinecap='round'
      strokeWidth={1.813}
      d='m19.414 6.001 1.293 1.293a1 1 0 0 1 0 1.414l-1.293 1.293m-4.414-2h5.414M4.586 15.001l-1.293 1.293a1 1 0 0 0 0 1.414l1.293 1.293m4.414-2H3.586'
    />
  </svg>
);

export const MarketingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <path
      fill='#777E90'
      fillRule='evenodd'
      d='M2 3.001a1 1 0 0 1 1 1v14a1 1 0 0 0 1 1h18a1 1 0 1 1 0 2H4a3 3 0 0 1-3-3v-14a1 1 0 0 1 1-1Z'
      clipRule='evenodd'
    />
    <path
      fill='#777E90'
      d='M18 5.001a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1ZM10 7.001a1 1 0 0 0-1 1v8a1 1 0 1 0 2 0v-8a1 1 0 0 0-1-1ZM6 13.001a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM13 10.001a1 1 0 1 1 2 0v6a1 1 0 1 1-2 0v-6Z'
    />
  </svg>
);

export const MerchantIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <path
      stroke='#777E90'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d='m8.81 2.001-3.62 3.63M15.19 2.001l3.62 3.63'
    />
    <path
      stroke='#777E90'
      strokeWidth={1.5}
      d='M2 7.851c0-1.85.99-2 2.22-2h15.56c1.23 0 2.22.15 2.22 2 0 2.15-.99 2-2.22 2H4.22c-1.23 0-2.22.15-2.22-2Z'
    />
    <path
      stroke='#777E90'
      strokeLinecap='round'
      strokeWidth={1.5}
      d='M9.76 14.001v3.55M14.36 14.001v3.55M3.5 10.001l1.41 8.64c.32 1.94 1.09 3.36 3.95 3.36h6.03c3.11 0 3.57-1.36 3.93-3.24l1.68-8.76'
    />
  </svg>
);

export const AgreementIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 20.001C16.4183 20.001 20 16.4193 20 12.001C20 7.5827 16.4183 4.00098 12 4.00098C7.58172 4.00098 4 7.5827 4 12.001C4 16.4193 7.58172 20.001 12 20.001ZM12 22.001C17.5228 22.001 22 17.5238 22 12.001C22 6.47813 17.5228 2.00098 12 2.00098C6.47715 2.00098 2 6.47813 2 12.001C2 17.5238 6.47715 22.001 12 22.001Z'
      fill='#777E90'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 7.00098C11.4477 7.00098 11 7.44869 11 8.00098C11 8.55326 11.4477 9.00098 12 9.00098C12.5523 9.00098 13 8.55326 13 8.00098C13 7.44869 12.5523 7.00098 12 7.00098ZM12 11.001C11.4477 11.001 11 11.4487 11 12.001V16.001C11 16.5533 11.4477 17.001 12 17.001C12.5523 17.001 13 16.5533 13 16.001V12.001C13 11.4487 12.5523 11.001 12 11.001Z'
      fill='#777E90'
    />
  </svg>
);

export const LogoutIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fillRule='evenodd'
      clip-rule='evenodd'
      d='M10.0401 15.0024C10.5916 14.973 11.0625 15.3962 11.0919 15.9477C11.132 16.7004 11.1811 17.2966 11.2302 17.7624C11.2962 18.3881 11.6805 18.7682 12.2333 18.8314C13.0269 18.9221 14.2279 19.001 16.0002 19.001C17.7724 19.001 18.9735 18.9221 19.7671 18.8314C20.3208 18.7681 20.7041 18.3889 20.77 17.7642C20.8855 16.6702 21.0002 14.8617 21.0002 12.001C21.0002 9.14022 20.8855 7.33176 20.77 6.23773C20.7041 5.61304 20.3208 5.23386 19.7671 5.17056C18.9735 5.07984 17.7724 5.00098 16.0002 5.00098C14.2279 5.00098 13.0269 5.07984 12.2333 5.17056C11.6805 5.23375 11.2962 5.61389 11.2302 6.23951C11.1811 6.70537 11.132 7.30152 11.0919 8.05421C11.0625 8.60571 10.5916 9.02896 10.0401 8.99956C9.48855 8.97016 9.0653 8.49924 9.0947 7.94774C9.13644 7.1649 9.18805 6.53404 9.24124 6.02975C9.39779 4.54534 10.4509 3.36129 12.0061 3.18351C12.8925 3.08218 14.1717 3.00098 16.0002 3.00098C17.8287 3.00098 19.1079 3.08218 19.9943 3.18351C21.5486 3.36118 22.6022 4.54248 22.7589 6.02781C22.8836 7.20904 23.0002 9.09019 23.0002 12.001C23.0002 14.9118 22.8836 16.7929 22.7589 17.9741C22.6022 19.4595 21.5486 20.6408 19.9943 20.8184C19.1079 20.9198 17.8287 21.001 16.0002 21.001C14.1717 21.001 12.8925 20.9198 12.0061 20.8184C10.4509 20.6407 9.39779 19.4566 9.24124 17.9722C9.18805 17.4679 9.13644 16.837 9.09471 16.0542C9.0653 15.5027 9.48855 15.0318 10.0401 15.0024Z'
      fill='#777E90'
    />
    <path
      fillRule='evenodd'
      clip-rule='evenodd'
      d='M6.20711 14.7939C6.59763 15.1844 6.59763 15.8176 6.20711 16.2081C5.81658 16.5986 5.18342 16.5986 4.79289 16.2081L1.29289 12.7081C0.902369 12.3176 0.902369 11.6844 1.29289 11.2939L4.79289 7.79387C5.18342 7.40334 5.81658 7.40334 6.20711 7.79387C6.59763 8.18439 6.59763 8.81756 6.20711 9.20808L4.41421 11.001L14 11.001C14.5523 11.001 15 11.4487 15 12.001C15 12.5533 14.5523 13.001 14 13.001L4.41421 13.001L6.20711 14.7939Z'
      fill='#777E90'
    />
  </svg>
);

export const MailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M20 5H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1ZM4 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H4Z'
      clipRule='evenodd'
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M5.232 7.36a1 1 0 0 1 1.408-.128l4.72 3.933a1 1 0 0 0 1.28 0l4.72-3.933a1 1 0 0 1 1.28 1.536l-4.72 3.933a3 3 0 0 1-3.84 0L5.36 8.768a1 1 0 0 1-.128-1.408Z'
      clipRule='evenodd'
    />
  </svg>
);

export const PasswordIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M12 11c-1.773 0-3.352.065-4.642.147a2.381 2.381 0 0 0-2.252 2.226A37.223 37.223 0 0 0 5 16c0 .852.043 1.763.106 2.627a2.381 2.381 0 0 0 2.252 2.226 73.539 73.539 0 0 0 9.284 0 2.381 2.381 0 0 0 2.252-2.226c.063-.864.106-1.775.106-2.627 0-.852-.044-1.763-.106-2.627a2.381 2.381 0 0 0-2.252-2.226A73.536 73.536 0 0 0 12 11ZM7.231 9.15a4.381 4.381 0 0 0-4.12 4.079A39.206 39.206 0 0 0 3 16c0 .915.047 1.877.111 2.771a4.381 4.381 0 0 0 4.12 4.078 75.543 75.543 0 0 0 9.537 0 4.381 4.381 0 0 0 4.12-4.078c.065-.894.112-1.856.112-2.771 0-.915-.047-1.877-.111-2.771a4.381 4.381 0 0 0-4.12-4.078 75.545 75.545 0 0 0-9.537 0Z'
      clipRule='evenodd'
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M13 16.732A2 2 0 0 0 12 13a2 2 0 0 0-1 3.732V18a1 1 0 1 0 2 0v-1.268ZM7 6a5 5 0 0 1 10 0v4a1 1 0 1 1-2 0V6a3 3 0 1 0-6 0v4a1 1 0 1 1-2 0V6Z'
      clipRule='evenodd'
    />
  </svg>
);

export const MobileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M17 2H7a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1ZM7 0a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H7Z'
      clipRule='evenodd'
    />
    <path fill='#777E90' d='M13 19a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z' />
  </svg>
);

export const KybIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M19 19.874c1.725-.444 3-2.01 3-3.874V6a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v10a4.002 4.002 0 0 0 3 3.874V21a1 1 0 1 0 2 0v-1h10v1a1 1 0 1 0 2 0v-1.126ZM18 4H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z'
      clipRule='evenodd'
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M11 7a1 1 0 1 1 2 0v1.17A3.008 3.008 0 0 1 14.83 10H16a1 1 0 1 1 0 2h-1.17A3.009 3.009 0 0 1 13 13.83V15a1 1 0 1 1-2 0v-1.17A3.008 3.008 0 0 1 9.17 12H8a1 1 0 1 1 0-2h1.17A3.008 3.008 0 0 1 11 8.17V7Zm0 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z'
      clipRule='evenodd'
    />
  </svg>
);
