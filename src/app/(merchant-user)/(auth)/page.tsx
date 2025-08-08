'use client';
import { redirect } from 'next/navigation';
import { SCREENS } from '@estia/constants/screens';

export default function Page() {
  return redirect(SCREENS.LOGIN);
}
