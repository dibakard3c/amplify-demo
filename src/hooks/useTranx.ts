import { useParams } from 'next/navigation';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import { useEffect } from 'react';
import i18next from '@estia/translations/i18next';

export function useTranx(
  ...args: Parameters<typeof useTranslation>
): UseTranslationResponse<'en', any> {
  const lng = useParams()?.lng;

  useEffect(() => {
    if (typeof lng === 'string' && i18next.resolvedLanguage !== lng) {
      i18next.changeLanguage(lng);
    }
  }, [lng]);

  return useTranslation(...args);
}
