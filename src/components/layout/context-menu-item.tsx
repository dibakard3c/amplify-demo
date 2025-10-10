import React from 'react';
import {
  NavigationMenuContent,
  NavigationMenuItem,
} from '@estia/components/ui/navigation-menu';
import { cn } from '@estia/utils/utils';
import Link from 'next/link';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { compareIgnoreCase } from '@estia/utils/general';
import { useTranx } from '@estia/hooks/useTranx';

interface ProfileMenuItemProps {
  item: any;
  pathname: string;
  totalSize: number;
}

export default function ContextMenuItem({
  item,
  pathname,
  totalSize,
}: ProfileMenuItemProps) {
  const { t } = useTranx();

  return (
    <NavigationMenuItem>
      <NavigationMenuPrimitive.Trigger
        asChild
        data-slot='navigation-menu-trigger'
      >
        <span
          className={cn(
            'text-neutral-4',
            'cursor-pointer px-3 py-6 text-base font-bold min-[140rem]:text-xl',
            compareIgnoreCase(pathname, item?.path, ...(item?.matches || [])) &&
              'text-neutral-1'
          )}
        >
          {t(item?.key as any)}
        </span>
      </NavigationMenuPrimitive.Trigger>
      <NavigationMenuContent>
        {item?.subMenu?.map((item: any, index: number) => (
          <NavigationMenuPrimitive.Link
            asChild
            key={index}
            className='w-[250px] rounded-none'
          >
            <Link
              target={item?.path?.startsWith('https') ? '_blank' : undefined}
              href={item?.path}
              className={cn(
                'group p-4',
                index !== totalSize - 1 && 'border-divider border-b',
                'flex flex-row'
              )}
            >
              <p className='text-neutral-1 text-base font-bold'>
                {t(item?.key as any)}
              </p>
            </Link>
          </NavigationMenuPrimitive.Link>
        ))}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
