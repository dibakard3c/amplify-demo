import React from 'react';
import { SCREENS } from '@estia/constants/screens';
import { cn } from '@estia/utils/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useTranx } from '@estia/hooks/useTranx';

export default function UsersTabSwitcher({ className }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranx();

  return (
    <div className={cn('flex items-center text-sm sm:justify-end', className)}>
      <p
        onClick={() => {
          router.push(SCREENS.USERS);
        }}
        className={cn(
          'text-neutral-4 cursor-pointer rounded-full px-4 py-2 text-base font-bold',
          pathname.includes(SCREENS.USERS) && 'bg-primary text-white'
        )}
      >
        {t('dashboard.users_and_pos.users_switcher')}
      </p>
      <p
        onClick={() => {
          router.push(SCREENS.POS);
        }}
        className={cn(
          'text-neutral-4 cursor-pointer rounded-full px-4 py-2 text-base font-bold',
          pathname.includes(SCREENS.POS) && 'bg-primary text-white'
        )}
      >
        {t('dashboard.users_and_pos.pos_switcher')}
      </p>
    </div>
  );
}
