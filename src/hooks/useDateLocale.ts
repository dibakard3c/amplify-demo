import { enUS, el, Locale } from 'date-fns/locale';
import { useTranx } from '@estia/hooks/useTranx';

const localeMap: Record<string, Locale> = {
  en: enUS,
  el: el,
};

export function useDateLocale() {
  const { i18n } = useTranx();
  return localeMap[i18n.language] || enUS; // fallback to English
}
