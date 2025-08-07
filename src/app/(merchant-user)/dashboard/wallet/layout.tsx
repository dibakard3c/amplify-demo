import React from 'react';
import WalletLayout from '@estia/components/layout/wallet-layout';
import type { Metadata } from 'next';
import { generateMeta } from '@estia/helpers/meta';

export const metadata: Metadata = generateMeta('Wallet');

export default function Layout({ children }: any) {
  return <WalletLayout>{children}</WalletLayout>;
}
