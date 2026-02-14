'use server';

import { headers } from 'next/headers';
import { headerName } from '@estia/translations/settings';
import i18next from '@estia/translations/i18next';

export async function getTranx(ns?: any, options?: { keyPrefix?: any }) {
  const headerList = await headers();
  const lng = headerList.get(headerName);

  if (lng && i18next.resolvedLanguage !== lng) {
    await i18next.changeLanguage(lng);
  }
  if (ns && !i18next.hasLoadedNamespace(ns)) {
    await i18next.loadNamespaces(ns);
  }

  return {
    t: i18next.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options?.keyPrefix
    ),
    i18n: i18next,
  };
}
