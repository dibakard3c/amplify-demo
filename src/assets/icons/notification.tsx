import React from 'react';
import { SVGProps } from 'react';

export default function NotificationIcon(props: SVGProps<SVGSVGElement>) {
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
