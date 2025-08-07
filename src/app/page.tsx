'use client';

import { redirect } from 'next/navigation';
import { SCREENS } from '@estia/constants/screens';

export default function Home() {
  // const isFirstTimeLaunch = localStorage.getItem('is_first_launch');
  //
  // return redirect(
  //   isFirstTimeLaunch !== 'true' ? SCREENS.WELCOME : SCREENS.LOGIN
  // );
  return redirect(SCREENS.LOGIN);
}
