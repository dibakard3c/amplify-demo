'use client';

import React, { PropsWithChildren, useState } from 'react';
import { Icons, MenuOpen } from '@estia/assets';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@estia/utils/utils';
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
import HomeIcon from '@estia/assets/icons/home';
import { SCREENS } from '@estia/constants/screens';
import ContextMenuItem from '@estia/components/layout/context-menu-item';
import InactiveTimeout from '@estia/components/dialogs/inactive-timeout';
import { SidebarProvider, SidebarTrigger } from '@estia/components/ui/sidebar';
import { MobileSidebar } from '@estia/components/layout/sidebar';
import { useTranx } from '@estia/hooks/useTranx';

function DesktopView({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [open, setOpen] = useState<string>(''); // '' = closed

  const { t } = useTranx();

  const closeMenu = () => setOpen('');

  return (
    <>
      <div className="h-full min-h-dvh w-full bg-[url('/dashboard-bg.svg')] bg-cover bg-fixed bg-no-repeat dark:bg-none">
        {/* Desktop Header */}
        <header className='bg-nav-bg dark:bg-neutral-8 hidden h-[90px] w-full md:block min-[140rem]:h-[150px]'>
          <div className='resp-container m-auto flex h-full items-center'>
            {/* LOGO */}
            <div className='border-divider flex h-full items-center'>
              <Link
                href='/dashboard'
                className='relative aspect-[3] h-[60%] w-auto cursor-pointer max-xl:h-[50%]'
              >
                <Image
                  src={Icons.estiaLogo2}
                  alt={t('common.estia_logo_alt')}
                  fill
                />
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
                            pathname?.includes(item?.path) &&
                              // compareIgnoreCase(
                              //   pathname,
                              //   item?.path,
                              //   ...(item?.matches || [])
                              // )
                              'text-neutral-1'
                          )}
                        >
                          <Link
                            className='cursor-pointer px-3 py-6 text-base font-bold'
                            href={item?.path}
                          >
                            {t(item?.key as any)}
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
              <NavigationMenu
                delayDuration={1000}
                value={open}
                onValueChange={setOpen}
              >
                <NavigationMenuList>
                  <Link
                    href={SCREENS.DASHBOARD}
                    className='text-neutral-4 hover:bg-accent relative mr-3 flex size-11 items-center justify-center rounded-full bg-transparent p-0 pb-0.5 hover:text-white 2xl:size-12 min-[140rem]:mr-6'
                  >
                    <HomeIcon className='size-7 min-[140rem]:size-11' />
                  </Link>
                  <NotificationMenuItem closeMenu={closeMenu} />
                  <WalletMenuItem />
                  <ProfileMenuItem />
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </header>
        <div className='resp-container mx-auto pb-24 min-[140rem]:pt-5'>
          {children}
        </div>
      </div>
    </>
  );
}

function MobileView({ children }: PropsWithChildren) {
  const [open, setOpen] = useState<string>('');

  const { t } = useTranx();

  const closeMenu = () => setOpen('');

  return (
    <SidebarProvider>
      <MobileSidebar />
      <main className="h-full min-h-dvh w-full bg-[url('/dashboard-bg.svg')] bg-cover bg-no-repeat dark:bg-none">
        {/* Mobile Header */}
        <header className='bg-nav-bg dark:bg-neutral-8 h-[70px] w-full'>
          <div className='resp-container m-auto flex h-full items-center justify-between'>
            <div className='flex h-full w-auto items-center'>
              <SidebarTrigger className='text-neutral-4 mr-2 size-12 hover:text-white'>
                <MenuOpen className='size-12 p-3' />
              </SidebarTrigger>
              {/* LOGO */}
              <div className='border-divider flex h-full items-center'>
                <Link
                  href='/dashboard'
                  className='relative aspect-[3] h-[70%] w-auto cursor-pointer max-xl:h-[60%]'
                >
                  <Image
                    src={Icons.estiaLogo2}
                    alt={t('common.estia_logo_alt')}
                    fill
                  />
                </Link>
              </div>
            </div>
            {/* ACTIONS */}
            <div className='flex items-center'>
              <NavigationMenu
                delayDuration={1000}
                value={open}
                onValueChange={setOpen}
              >
                <NavigationMenuList>
                  <NotificationMenuItem
                    closeMenu={closeMenu}
                    containerClassName='mr-2 min-sm:mr-3'
                  />
                  <WalletMenuItem className='mr-3 ml-0' />
                  <ProfileMenuItem />
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </header>
        <div className='resp-container mx-auto pb-24'>{children}</div>
      </main>
    </SidebarProvider>
  );
}

export default function DashboardLayout({ children }: any) {
  return (
    <>
      <div className='block min-[970px]:hidden'>
        <MobileView>{children}</MobileView>
      </div>
      <div className='hidden min-[970px]:block'>
        <DesktopView>{children}</DesktopView>
      </div>
      <InactiveTimeout />
    </>
  );
}
