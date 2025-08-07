import React from 'react';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from '@estia/components/ui/navigation-menu';
import { Button } from '@estia/components/ui/button';
import NotificationIcon from '@estia/assets/icons/notification';
import Link from 'next/link';
import {
  useListNotificationsQuery,
  useMarkAllNotificationAsReadMutation,
  useMarkNotificationAsReadMutation,
  usePendingNotificationsStatusQuery,
} from '@estia/networking/endpoints/general';
import { selectNotifications } from '@estia/store/selector';
import { SCREENS } from '@estia/constants/screens';
import NotificationItem from '@estia/components/item-views/notification-item';
import { markNotificationsAsRead } from '@estia/store/slices/temporary';
import { useAppDispatch, useAppSelector } from '@estia/store/store';
import { usePathname } from 'next/navigation';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { Images } from '@estia/assets';
import { cn } from '@estia/lib/utils';

export default function NotificationMenuItem({ containerClassName }: any) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);

  const { isLoading } = useListNotificationsQuery({
    page: 0,
    size: 10,
  });
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [markAllAsReadMutation] = useMarkAllNotificationAsReadMutation();
  const { data: pendingNotificationData } =
    usePendingNotificationsStatusQuery();

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
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          'text-neutral-4 relative flex size-11 items-center justify-center rounded-full bg-transparent p-0 hover:text-white 2xl:size-12',
          containerClassName
        )}
      >
        {pendingNotificationData?.hasPending ? (
          <div className='bg-primary-4 absolute top-0 right-0.5 size-3 rounded-full'></div>
        ) : null}
        <NotificationIcon className='size-5 2xl:size-6' />
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className='w-[350px]'>
          <h1 className='px-4 pt-4 text-xl font-bold 2xl:text-2xl'>
            Notifications
          </h1>
          {notifications?.list
            ?.slice(0, 5)
            ?.map((item, index) => (
              <NotificationItem
                key={index}
                notification={item}
                viewType='navbar'
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
          ) : (
            <div className='flex px-4 pt-2 pb-4'>
              {pathname !== SCREENS.NOTIFICATIONS ? (
                <>
                  <Button
                    variant='default'
                    className='text-md mr-2 flex-1 border-2 py-6 font-bold'
                  >
                    <Link href={SCREENS.NOTIFICATIONS}>View all</Link>
                  </Button>
                  <Button
                    variant='outline'
                    className='text-md ml-2 flex-1 border-2 py-6 font-bold'
                    onClick={() => {
                      markAllAsRead();
                    }}
                  >
                    Mark all as Read
                  </Button>
                </>
              ) : (
                <Button
                  variant='outline'
                  className='text-md flex-1 border-2 py-6 font-bold'
                  onClick={() => {
                    markAllAsRead();
                  }}
                >
                  Mark all as Read
                </Button>
              )}
            </div>
          )}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
