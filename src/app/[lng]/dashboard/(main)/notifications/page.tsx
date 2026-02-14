'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@estia/store/store';
import { selectNotifications } from '@estia/store/selector';
import {
  useListNotificationsQuery,
  useMarkAllNotificationAsReadMutation,
  useMarkNotificationAsReadMutation,
} from '@estia/networking/endpoints/general';
import { Button } from '@estia/components/ui/button';
import NotificationItem, {
  NOTIFICATION_VIEW_TYPE,
} from '@estia/components/item-views/notification-item';
import { markNotificationsAsRead } from '@estia/store/slices/temporary';
import Image from 'next/image';
import { Images } from '@estia/assets';
import { isEmpty } from 'lodash';
import DashboardCard from '@estia/components/layout/dashboard-card';
import { useTranx } from '@estia/hooks/useTranx';

export default function Page() {
  const { t } = useTranx();

  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const notifications = useAppSelector(selectNotifications);

  const { isLoading } = useListNotificationsQuery({
    page: page,
    size: 10,
  });
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [markAllAsReadMutation] = useMarkAllNotificationAsReadMutation();

  const markAllAsRead = () => {
    markAllAsReadMutation();
  };

  function markNotificationAsRead(id: string) {
    markAsRead(id)
      .unwrap()
      .then(() => {
        dispatch(markNotificationsAsRead(id));
      });
  }

  return (
    <DashboardCard>
      <div className='dashboard-shadow rounded-xl bg-white p-6'>
        <div className='mb-6 flex items-center justify-between'>
          <h1 className='text-xl font-bold md:text-3xl'>
            {t('dashboard.notifications_page.page_title')}
          </h1>
          <Button
            variant='outline'
            className='md:text-md -mr-1 border-2 py-5 text-sm font-bold sm:p-6'
            onClick={() => {
              markAllAsRead();
            }}
          >
            {t('dashboard.notifications_page.mark_all_as_read')}
          </Button>
        </div>
        {notifications?.list?.map((item, index) => (
          <NotificationItem
            key={index}
            notification={item}
            viewType={NOTIFICATION_VIEW_TYPE.PAGE}
            markNotificationAsRead={markNotificationAsRead}
          />
        ))}
        {!isLoading && isEmpty(notifications?.list) ? (
          <div className='flex w-full flex-col items-center justify-center py-12'>
            <Image
              src={Images.emptyNotifications}
              className='mb-2 size-30'
              alt={t('common.empty_notification_alt')}
            />
            <p className='text-neutral-1 mt-4 text-sm font-semibold'>
              {t('dashboard.notifications_page.no_new_notifications')}
            </p>
          </div>
        ) : null}
        {notifications?.hasMore &&
        !isLoading &&
        !isEmpty(notifications?.list) &&
        page <= 2 ? (
          <div className='flex w-full items-center justify-center py-6'>
            <Button
              variant='outline'
              className='text-md border-2 p-6 py-5 font-bold min-[140rem]:py-8'
              onClick={() => {
                setPage((currPage) => currPage + 1);
              }}
            >
              {t('common.load_more')}
            </Button>
          </div>
        ) : null}
      </div>
    </DashboardCard>
  );
}
