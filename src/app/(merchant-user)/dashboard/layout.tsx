'use client';

import React, { useEffect } from 'react';
import { Icons } from '@estia/assets';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegments } from 'next/navigation';
import { cn } from '@estia/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@estia/components/ui/navigation-menu';
import NotificationMenuItem from '@estia/components/layout/notification-menu-item';
import WalletMenuItem from '@estia/components/layout/wallet-menu-item';
import ProfileMenuItem from '@estia/components/layout/profile-menu-item';
import { navbarLinks } from '@estia/helpers/links';
import { useRefreshAccountInfoQuery } from '@estia/networking/endpoints/auth';
import { compareIgnoreCase } from '@estia/utils/general';
import HomeIcon from '@estia/assets/icons/home';
import { SCREENS } from '@estia/constants/screens';
import ContextMenuItem from '@estia/components/layout/context-menu-item';
import InactiveTimeout from '@estia/components/dialogs/inactive-timeout';
import { useAppDispatch } from '@estia/store/store';
import {
  connectSocket,
  disconnectSocket,
} from '@estia/networking/stomp-middleware';

export default function Layout({ children }: any) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
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

  return (
    <>
      <div className="h-full min-h-dvh w-full bg-[url('/dashboard-bg.png')] bg-cover bg-fixed bg-no-repeat dark:bg-none">
        <header className='bg-nav-bg dark:bg-neutral-8 hidden h-[90px] w-full sm:block'>
          <div className='container m-auto flex h-full items-center'>
            {/* LOGO */}
            <div className='border-divider flex h-full items-center'>
              <Link
                href='/dashboard'
                className='relative aspect-[3] h-[60%] w-auto cursor-pointer max-xl:h-[50%]'
              >
                <Image src={Icons.estiaLogo2} alt='Estia logo' fill />
              </Link>
            </div>
            {/* DIVIDER */}
            <div className='border-divider mx-8 h-[50%] w-1 border-r max-xl:mx-2'></div>
            {/* NAVIGATIONS */}
            <div className='flex-1'>
              <NavigationMenu delayDuration={1000}>
                <ul className='flex items-center'>
                  {navbarLinks?.map((item, index) =>
                    item?.isContextMenu ? (
                      <ContextMenuItem
                        key={index}
                        totalSize={item?.subMenu?.length}
                        item={item}
                        pathname={pathname}
                      />
                    ) : (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          asChild
                          className={cn(
                            'text-neutral-4 pr-3 max-xl:pr-1 2xl:pr-4',
                            compareIgnoreCase(
                              pathname,
                              item?.path,
                              ...(item?.matches || [])
                            ) && 'text-neutral-1'
                          )}
                        >
                          <Link
                            className='cursor-pointer px-3 py-6 text-base font-bold'
                            href={item?.path}
                          >
                            {item?.title}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  )}
                </ul>
              </NavigationMenu>
            </div>
            {/* ACTIONS */}
            <div className='flex items-center'>
              <NavigationMenu delayDuration={1000}>
                <NavigationMenuList>
                  <Link
                    href={SCREENS.DASHBOARD}
                    className='text-neutral-4 hover:bg-accent relative mr-3 flex size-11 items-center justify-center rounded-full bg-transparent p-0 pb-0.5 hover:text-white 2xl:size-12'
                  >
                    <HomeIcon className='size-7 2xl:size-8' />
                  </Link>
                  <NotificationMenuItem />
                  <WalletMenuItem />
                  <ProfileMenuItem />
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </header>
        <header className='bg-nav-bg dark:bg-neutral-8 h-[90px] w-full sm:hidden'>
          <div className='container m-auto flex h-full items-center justify-between'>
            {/* LOGO */}
            <div className='border-divider flex h-full items-center'>
              <Link
                href='/dashboard'
                className='relative aspect-[3] h-[60%] w-auto cursor-pointer max-xl:h-[50%]'
              >
                <Image src={Icons.estiaLogo2} alt='Estia logo' fill />
              </Link>
            </div>
            {/* DIVIDER */}
            <div className='border-divider mx-8 h-[50%] w-1 border-r max-xl:mx-2'></div>
            {/* NAVIGATIONS */}
            {/*<div className='flex-1'>*/}
            {/*  <NavigationMenu delayDuration={1000}>*/}
            {/*    <ul className='flex items-center'>*/}
            {/*      {navbarLinks?.map((item, index) =>*/}
            {/*        item?.isContextMenu ? (*/}
            {/*          <ContextMenuItem*/}
            {/*            key={index}*/}
            {/*            totalSize={item?.subMenu?.length}*/}
            {/*            item={item}*/}
            {/*            pathname={pathname}*/}
            {/*          />*/}
            {/*        ) : (*/}
            {/*          <NavigationMenuItem key={index}>*/}
            {/*            <NavigationMenuLink*/}
            {/*              asChild*/}
            {/*              className={cn(*/}
            {/*                'text-neutral-4 pr-3 max-xl:pr-1 2xl:pr-4',*/}
            {/*                compareIgnoreCase(*/}
            {/*                  pathname,*/}
            {/*                  item?.path,*/}
            {/*                  ...(item?.matches || [])*/}
            {/*                ) && 'text-neutral-1'*/}
            {/*              )}*/}
            {/*            >*/}
            {/*              <Link*/}
            {/*                className='cursor-pointer px-3 py-6 text-base font-bold'*/}
            {/*                href={item?.path}*/}
            {/*              >*/}
            {/*                {item?.title}*/}
            {/*              </Link>*/}
            {/*            </NavigationMenuLink>*/}
            {/*          </NavigationMenuItem>*/}
            {/*        )*/}
            {/*      )}*/}
            {/*    </ul>*/}
            {/*  </NavigationMenu>*/}
            {/*</div>*/}
            {/* ACTIONS */}
            <div className='flex items-center'>
              <NavigationMenu delayDuration={1000}>
                <NavigationMenuList>
                  {/*<Link*/}
                  {/*  href={SCREENS.DASHBOARD}*/}
                  {/*  className='text-neutral-4 hover:bg-accent relative mr-3 flex size-11 items-center justify-center rounded-full bg-transparent p-0 pb-0.5 hover:text-white 2xl:size-12'*/}
                  {/*>*/}
                  {/*  <HomeIcon className='size-7 2xl:size-8' />*/}
                  {/*</Link>*/}
                  <NotificationMenuItem containerClassName='mr-4' />
                  {/*<WalletMenuItem />*/}
                  <ProfileMenuItem />
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </header>
        <div className='container mx-auto pb-24'>{children}</div>
      </div>
      <InactiveTimeout />
    </>
  );
}
