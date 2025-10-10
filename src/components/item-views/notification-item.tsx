import React from 'react';
import { cn } from '@estia/utils/utils';
import { formatDate } from '@estia/utils/general';
import { buildMessage } from '@estia/helpers/notification';
import { InAppNotification } from '@estia/typings/notifications';

interface NotificationItemProps {
  notification: InAppNotification;
  viewType: 'navbar' | 'page';
  markNotificationAsRead: (id: string) => void;
}

export const NOTIFICATION_VIEW_TYPE = {
  NAVBAR: 'navbar',
  PAGE: 'page',
} as const;

export default function NotificationItem({
  notification,
  viewType,
  markNotificationAsRead,
}: NotificationItemProps) {
  if (viewType === 'navbar') {
    return (
      <div
        className={cn('group border-divider m-4 cursor-pointer border-b pb-3')}
        onClick={() => {
          if (!notification?.isRead) {
            markNotificationAsRead(notification.id);
          }
        }}
      >
        <div className='flex items-center justify-between'>
          <h2 className='text-neutral-1 text-sm font-bold min-[140rem]:text-lg'>
            {notification?.type}
          </h2>
          {!notification?.isRead ? (
            <div className='bg-primary-4 ml-3 size-3 rounded-full'></div>
          ) : null}
        </div>
        <p className='text-neutral-1 py-2 text-sm font-semibold min-[140rem]:text-lg'>
          {buildMessage(notification)}
        </p>
        <p className='text-neutral-4 text-xs font-semibold min-[140rem]:text-lg'>
          {formatDate(notification?.createdAt, 'yyyy-MM-dd HH:mm')}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group my-4 cursor-pointer pb-3',
        'border-divider border-b'
      )}
      onClick={() => {
        if (!notification?.isRead) {
          markNotificationAsRead(notification.id);
        }
      }}
    >
      <div className='flex justify-between'>
        <h2 className='text-neutral-1 text-base font-bold'>
          {notification?.type}
        </h2>
        <div className='flex items-center'>
          <p className='text-neutral-4 font-semibold max-[140rem]:text-sm md:text-base min-[140rem]:text-xl'>
            {formatDate(notification?.createdAt, 'yyyy-MM-dd HH:mm')}
          </p>
          {!notification?.isRead ? (
            <div className='bg-primary-4 ml-3 size-3 rounded-full'></div>
          ) : null}
        </div>
      </div>
      <p className='text-neutral-1 py-2 font-semibold max-[140rem]:text-sm md:text-base min-[140rem]:py-4 min-[140rem]:text-2xl'>
        {buildMessage(notification)}
      </p>
    </div>
  );
}
