import React, { PropsWithChildren } from 'react';
import AuthLayout from '@estia/components/layout/auth-layout';
import type { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#711186',
};

export default function Layout({ children }: PropsWithChildren) {
  return <AuthLayout>{children}</AuthLayout>;
}
