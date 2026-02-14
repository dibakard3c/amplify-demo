import React from 'react';
import { SVGProps } from 'react';

export function NotificationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={18}
      height={19}
      fill='currentColor'
      viewBox='0 0 18 19'
      {...props}
    >
      <path d='M18 15.023a.884.884 0 0 1-.884.884H.884a.884.884 0 0 1 0-1.768H.9V7.981C.9 3.573 4.527 0 9 0s8.1 3.573 8.1 7.98v6.16h.016c.488 0 .884.395.884.883ZM2.7 14.14h12.6V7.98c0-3.43-2.82-6.213-6.3-6.213S2.7 4.55 2.7 7.981v6.159Zm4.276 3.616c-.245-.495.222-.965.774-.965h2.5c.552 0 1.019.47.774.965a2.21 2.21 0 0 1-.433.597A2.271 2.271 0 0 1 9 19a2.271 2.271 0 0 1-1.591-.647 2.209 2.209 0 0 1-.433-.597Z' />
    </svg>
  );
}

export function NotificationMobileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      {...props}
    >
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d='M12.02 2.91c-3.31 0-6 2.69-6 6v2.89c0 .61-.26 1.54-.57 2.06L4.3 15.77c-.71 1.18-.22 2.49 1.08 2.93 4.31 1.44 8.96 1.44 13.27 0 1.21-.4 1.74-1.83 1.08-2.93l-1.15-1.91c-.3-.52-.56-1.45-.56-2.06V8.91c0-3.3-2.7-6-6-6Z'
      />
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d='M13.87 3.2a6.754 6.754 0 0 0-3.7 0c.29-.74 1.01-1.26 1.85-1.26.84 0 1.56.52 1.85 1.26Z'
      />
      <path
        stroke='currentColor'
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d='M15.02 19.06c0 1.65-1.35 3-3 3-.82 0-1.58-.34-2.12-.88a3.01 3.01 0 0 1-.88-2.12'
      />
    </svg>
  );
}
