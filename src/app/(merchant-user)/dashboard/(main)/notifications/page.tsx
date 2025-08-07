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
import NotificationItem from '@estia/components/item-views/notification-item';
import { markNotificationsAsRead } from '@estia/store/slices/temporary';
import Image from 'next/image';
import { Images } from '@estia/assets';
import { isEmpty } from 'lodash';

export default function Page() {
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
    <div className='bg-neutral-8 mt-8 rounded-2xl p-8'>
      <div className='dashboard-shadow rounded-xl bg-white p-6'>
        <div className='flex items-center justify-between'>
          <h1 className='mb-6 text-3xl font-bold'>Notifications</h1>
          <Button
            variant='outline'
            className='text-md -mr-1 border-2 p-6 py-5 font-bold'
            onClick={() => {
              markAllAsRead();
            }}
          >
            Mark all as read
          </Button>
        </div>
        {notifications?.list?.map((item, index) => (
          <NotificationItem
            key={index}
            notification={item}
            viewType='page'
            markNotificationAsRead={markNotificationAsRead}
          />
        ))}
        {!isLoading && isEmpty(notifications?.list) ? (
          <div className='flex w-full flex-col items-center justify-center py-12'>
            <Image
              src={Images.emptyNotifications}
              className='mb-2 size-30'
              alt='Empty Notifications'
            />
            <p className='text-neutral-1 mt-4 text-sm font-semibold'>
              No new notifications
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
              className='text-md border-2 p-6 py-5 font-bold'
              onClick={() => {
                setPage((currPage) => currPage + 1);
              }}
            >
              Load more
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
