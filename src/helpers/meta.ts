import type { Metadata } from 'next';

export function generateMeta(title: string = 'Estia Payments'): Metadata {
  return {
    title: title !== 'Estia Payments' ? `${title} | Estia Payments` : title,
    description: 'Easy Crypto Payments for Retailers & Consumers',
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
