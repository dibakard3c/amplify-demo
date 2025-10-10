import type { Metadata } from 'next';
import { tranx } from '@estia/translations/i18next';

export function generateMeta(title: string = 'Estia Payments'): Metadata {
  return {
    title:
      title !== 'Estia Payments'
        ? `${title} | ${tranx('common.company_name', {
            app_name: 'Estia',
          })}`
        : tranx('common.company_name', {
            app_name: 'Estia',
          }),
    description: tranx('common.company_desc'),
    icons: {
      icon: [
        {
          rel: 'icon',
          media: '(prefers-color-scheme: dark)',
          type: 'image/ico',
          url: '/favicon-dark.svg',
        },
      ],
    },
  };
}
