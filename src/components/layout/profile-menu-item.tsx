import React from 'react';
import {
  NavigationMenuContent,
  NavigationMenuItem,
} from '@estia/components/ui/navigation-menu';
import { cn } from '@estia/utils/utils';
import { profileLinks } from '@estia/helpers/links';
import Link from 'next/link';
import { ProfileImg } from '@estia/assets/icons/profile-img';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { useAppDispatch } from '@estia/store/store';
import { logoutAction } from '@estia/store/slices/auth';
import { useTranx } from '@estia/hooks/useTranx';

export default function ProfileMenuItem() {
  const dispatch = useAppDispatch();
  const { t } = useTranx();

  return (
    <NavigationMenuItem>
      <NavigationMenuPrimitive.Trigger
        asChild
        data-slot='navigation-menu-trigger'
        className='text-primary-2 data-[state=open]:hover:text-accent data-[state=open]:focus:text-accent focus-visible:ring-ring/50 flex cursor-pointer items-center justify-center rounded-full fill-current p-0 transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1'
      >
        <ProfileImg className='size-11 2xl:size-12 min-[140rem]:size-14' />
      </NavigationMenuPrimitive.Trigger>
      <NavigationMenuContent>
        {profileLinks?.map((item, index) => (
          <NavigationMenuPrimitive.Link
            asChild
            key={index}
            className='w-[250px] rounded-none min-[140rem]:w-[700px]'
          >
            <Link
              target={item?.path?.startsWith('https') ? '_blank' : undefined}
              href={item?.path}
              onClick={(e) => {
                if (item?.key === 'logout') {
                  dispatch(logoutAction());
                  if (!/\/dashboard/i.test(item?.path)) {
                    e.preventDefault();
                  }
                }
              }}
              className={cn(
                'group p-4',
                index !== profileLinks?.length - 1 && 'border-divider border-b',
                'flex flex-row'
              )}
            >
              <div>
                {item?.icon ? (
                  <item.icon className='text-neutral-4 mr-3 size-6 min-[140rem]:size-8' />
                ) : null}
              </div>
              <div>
                <p className='text-neutral-1 text-base font-bold min-[140rem]:text-xl'>
                  {t(item?.key as any)}
                </p>
                {item?.subtitle_key ? (
                  <p className='text-neutral-4 mt-1 text-xs leading-relaxed font-semibold min-[140rem]:text-lg'>
                    {t(item?.subtitle_key as any)}
                  </p>
                ) : null}
              </div>
            </Link>
          </NavigationMenuPrimitive.Link>
        ))}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
