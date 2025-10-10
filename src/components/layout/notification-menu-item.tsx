import React from 'react';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from '@estia/components/ui/navigation-menu';
import { Button } from '@estia/components/ui/button';
import {
  NotificationIcon,
  NotificationMobileIcon,
} from '@estia/assets/icons/notification';
import Link from 'next/link';
import {
  useListNotificationsQuery,
  useMarkAllNotificationAsReadMutation,
  useMarkNotificationAsReadMutation,
  usePendingNotificationsStatusQuery,
} from '@estia/networking/endpoints/general';
import { selectNotifications } from '@estia/store/selector';
import { SCREENS } from '@estia/constants/screens';
import NotificationItem, {
  NOTIFICATION_VIEW_TYPE,
} from '@estia/components/item-views/notification-item';
import { markNotificationsAsRead } from '@estia/store/slices/temporary';
import { useAppDispatch, useAppSelector } from '@estia/store/store';
import { usePathname } from 'next/navigation';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { Images } from '@estia/assets';
import { cn } from '@estia/utils/utils';
import { useTranx } from '@estia/hooks/useTranx';

interface NotificationMenuItemProps {
  containerClassName?: string;
  closeMenu: () => void;
}

export default function NotificationMenuItem({
  containerClassName,
  closeMenu,
}: NotificationMenuItemProps) {
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

  const { t } = useTranx();

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
          'sm:text-neutral-4 text-neutral-4 relative flex size-11 items-center justify-center rounded-full bg-transparent p-0 hover:text-white 2xl:size-12 min-[140rem]:size-16',
          containerClassName
        )}
      >
        {pendingNotificationData?.hasPending ? (
          <div className='bg-primary-4 absolute top-0 right-0.5 size-3 rounded-full'></div>
        ) : null}
        <NotificationIcon className='hidden size-5 sm:block 2xl:size-6 min-[140rem]:size-9' />
        <NotificationMobileIcon className='size-8 sm:hidden' />
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className='w-[calc(100vw_-_60px)] sm:w-[350px] min-[140rem]:w-[700px]'>
          <h1 className='px-4 pt-4 text-xl font-bold 2xl:text-2xl'>
            {t('dashboard.notifications_page.page_title')}
          </h1>
          {notifications?.list
            ?.slice(0, 5)
            ?.map((item, index) => (
              <NotificationItem
                key={index}
                notification={item}
                viewType={NOTIFICATION_VIEW_TYPE.NAVBAR}
                markNotificationAsRead={markNotificationAsRead}
              />
            ))}
          {!isLoading && isEmpty(notifications?.list) ? (
            <div className='flex w-full flex-col items-center justify-center py-12'>
              <Image
                src={Images.emptyNotifications}
                className='mb-2 size-30'
                alt={t('dashboard.notifications_page.empty_notifications_alt')}
              />
              <p className='text-neutral-1 mt-4 text-sm font-semibold'>
                {t('dashboard.notifications_page.no_new_notifications')}
              </p>
            </div>
          ) : (
            <div className='flex px-4 pt-2 pb-4'>
              {pathname !== SCREENS.NOTIFICATIONS ? (
                <>
                  <Button
                    variant='default'
                    className='text-md mr-2 flex-1 border-2 py-6 font-bold min-[140rem]:py-8'
                  >
                    <Link onClick={closeMenu} href={SCREENS.NOTIFICATIONS}>
                      {t('dashboard.notifications_page.view_all')}
                    </Link>
                  </Button>
                  <Button
                    variant='outline'
                    className='text-md ml-2 flex-1 border-2 py-6 font-bold min-[140rem]:py-8'
                    onClick={() => {
                      markAllAsRead();
                    }}
                  >
                    {t('dashboard.notifications_page.mark_all_as_read')}
                  </Button>
                </>
              ) : (
                <Button
                  variant='outline'
                  className='text-md flex-1 border-2 py-6 font-bold min-[140rem]:py-8'
                  onClick={() => {
                    markAllAsRead();
                  }}
                >
                  {t('dashboard.notifications_page.mark_all_as_read')}
                </Button>
              )}
            </div>
          )}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
