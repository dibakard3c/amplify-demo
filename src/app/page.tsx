'use client';

import { redirect } from 'next/navigation';
import { SCREENS } from '@estia/constants/screens';
import { STORAGE_KEYS } from '@estia/constants/storage-keys';

export default function Home() {
  const isFirstTimeLaunch = localStorage.getItem(STORAGE_KEYS.SHOW_WELCOME);

  return redirect(
    isFirstTimeLaunch !== 'true' ? SCREENS.WELCOME : SCREENS.LOGIN
  );
}
