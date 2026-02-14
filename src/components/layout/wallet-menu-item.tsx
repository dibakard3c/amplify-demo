import React from 'react';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from '@estia/components/ui/navigation-menu';
import { cn } from '@estia/utils/utils';
import { walletLinks } from '@estia/helpers/links';
import Link from 'next/link';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { useTranx } from '@estia/hooks/useTranx';

interface WalletMenuItemProps {
  className?: string;
}

export default function WalletMenuItem({ className }: WalletMenuItemProps) {
  const { t } = useTranx();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          'text-md mx-5 h-11 rounded-full border-2 bg-transparent px-4 py-0 font-bold max-sm:hidden 2xl:h-12 min-[140rem]:h-15 min-[140rem]:px-6',
          className
        )}
      >
        {t(`dashboard.nav_links.wallet`)}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className='w-[300px] px-4 py-2 min-[140rem]:w-[800px]'>
          {walletLinks?.map((item, index) => (
            <NavigationMenuPrimitive.Link
              key={index}
              asChild
              className='rounded-none px-0 hover:bg-none'
            >
              <Link key={index} href={item?.path}>
                <div
                  className={cn(
                    'py-2 min-[140rem]:py-4',
                    index !== walletLinks?.length - 1 &&
                      'border-divider border-b'
                  )}
                >
                  <p className='text-neutral-1 text-base font-bold min-[140rem]:text-xl'>
                    {t(item?.key as any)}
                  </p>
                  <p className='text-neutral-4 mt-1 text-xs leading-relaxed font-semibold min-[140rem]:text-lg'>
                    {t(item?.subtitle_key as any)}
                  </p>
                </div>
              </Link>
            </NavigationMenuPrimitive.Link>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
