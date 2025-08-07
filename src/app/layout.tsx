import type { Metadata } from 'next';
import './globals.css';
import { PropsWithChildren } from 'react';
import { customFonts } from '@estia/assets';
import { Toaster } from '@estia/components/ui/sonner';
import StoreProvider from '@estia/store/store-provider';
import 'react-loading-skeleton/dist/skeleton.css';
import { generateMeta } from '@estia/helpers/meta';

export const metadata: Metadata = generateMeta('Dashboard');

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#711186' />
        <title>Estia Payments</title>
      </head>
      <body className={`${customFonts.className} text-neutral-3 antialiased`}>
        {/*<ThemeProvider*/}
        {/*  attribute='class'*/}
        {/*  forcedTheme='dark'*/}
        {/*  enableSystem*/}
        {/*  disableTransitionOnChange*/}
        {/*>*/}
        <main>
          <StoreProvider>{children}</StoreProvider>
        </main>
        <Toaster />
        {/*</ThemeProvider>*/}
      </body>
    </html>
  );
}
