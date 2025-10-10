import React, { PropsWithChildren } from 'react';
import { useAppSelector } from '@estia/store/store';
import { selectAccessToken, selectIsUserLoggedIn } from '@estia/store/selector';
import { isEmpty } from 'lodash';
import DashboardLayout from '@estia/components/layout/dashboard-layout';
import GuestLayout from '@estia/components/layout/guest-layout';

export default function AdaptiveLayout({ children }: PropsWithChildren) {
  const accessToken = useAppSelector(selectAccessToken);
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  if (!isEmpty(accessToken) && isUserLoggedIn) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return <GuestLayout>{children}</GuestLayout>;
}
