import React from 'react';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from '@estia/components/ui/navigation-menu';
import { cn } from '@estia/lib/utils';
import { walletLinks } from '@estia/helpers/links';
import Link from 'next/link';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';

export default function WalletMenuItem() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className='text-md mx-5 h-11 rounded-full border-2 bg-transparent px-4 py-0 font-bold 2xl:h-12'>
        Wallet
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className='w-[300px] px-4 py-2'>
          {walletLinks?.map((item, index) => (
            <NavigationMenuPrimitive.Link
              key={index}
              asChild
              className='rounded-none px-0 hover:bg-none'
            >
              <Link key={index} href={item?.path}>
                <div
                  className={cn(
                    'py-2',
                    index !== walletLinks?.length - 1 &&
                      'border-divider border-b'
                  )}
                >
                  <p className='text-neutral-1 text-base font-bold'>
                    {item?.title}
                  </p>
                  <p className='text-neutral-4 mt-1 text-xs leading-relaxed font-semibold'>
                    {item?.subtitle}
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
