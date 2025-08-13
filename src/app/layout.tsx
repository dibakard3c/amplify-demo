import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PropsWithChildren } from 'react';
import { customFonts } from '@estia/assets';
import { Toaster } from '@estia/components/ui/sonner';
import StoreProvider from '@estia/store/store-provider';
import 'react-loading-skeleton/dist/skeleton.css';
import { generateMeta } from '@estia/helpers/meta';

export const metadata: Metadata = generateMeta('Dashboard');

export const viewport: Viewport = {
  themeColor: '#2f034c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'light',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <title>Estia Payments</title>
      </head>
      <body
        className={`${customFonts.className} text-neutral-3 bg-[#2f034c] antialiased`}
      >
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
