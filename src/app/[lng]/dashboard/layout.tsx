'use client';

import React, { useEffect } from 'react';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useRefreshAccountInfoQuery } from '@estia/networking/endpoints/auth';
import { useAppDispatch } from '@estia/store/store';
import {
  connectSocket,
  disconnectSocket,
} from '@estia/networking/stomp-middleware';
import DashboardLayout from '@estia/components/layout/dashboard-layout';

export default function Layout({ children }: any) {
  const dispatch = useAppDispatch();
  const [firstSegment, secondSegment] = useSelectedLayoutSegments();

  useRefreshAccountInfoQuery(
    {
      firstSegment:
        firstSegment === 'wallet' || firstSegment === 'profile'
          ? secondSegment
          : firstSegment,
    }, // force refresh
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    dispatch(connectSocket());
    return () => {
      dispatch(disconnectSocket());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <DashboardLayout>{children}</DashboardLayout>;
}
