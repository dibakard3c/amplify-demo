import React from 'react';
import { SCREENS } from '@estia/constants/screens';
import { cn } from '@estia/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

export default function UsersTabSwitcher({ className }: any) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={cn('flex items-center text-sm sm:justify-end', className)}>
      <p
        onClick={() => {
          router.push(SCREENS.USERS);
        }}
        className={cn(
          'text-neutral-4 cursor-pointer rounded-full px-4 py-2 text-base font-bold',
          pathname === SCREENS.USERS && 'bg-primary text-white'
        )}
      >
        Users
      </p>
      <p
        onClick={() => {
          router.push(SCREENS.POS);
        }}
        className={cn(
          'text-neutral-4 cursor-pointer rounded-full px-4 py-2 text-base font-bold',
          pathname === SCREENS.POS && 'bg-primary text-white'
        )}
      >
        POS
      </p>
    </div>
  );
}
