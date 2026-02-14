import i18next from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import {
  cookieName,
  fallbackLng,
  languages,
} from '@estia/translations/settings';
import { el as greekLocale, enGB as englishLocale } from 'date-fns/locale';
import { setDefaultOptions } from 'date-fns';

export const runsOnServerSide = typeof window === 'undefined';

// i18next
//   .use(initReactI18next)
//   .use(LanguageDetector)
//   //.use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
//   // .use(runsOnServerSide ? LocizeBackend : resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`))) // locize backend could be used, but prefer to keep it in sync with server side
//   .init({
//     // debug: true,
//     compatibilityJSON: 'v4',
//     supportedLngs: languages,
//     fallbackLng,
//     lng: undefined, // let detect the language on client side
//     fallbackNS: defaultNS,
//     defaultNS,
//     detection: {
//       order: ['path', 'htmlTag', 'cookie', 'navigator'],
//     },
//     preload: runsOnServerSide ? languages : [],
//     // backend: {
//     //   projectId: '01b2e5e8-6243-47d1-b36f-963dbb8bcae3'
//     // }
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// Initialize i18next
// i18next
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   // .use(LanguageDetector)
//   .init({
//     compatibilityJSON: 'v4',
//     resources: supportedLanguages,
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false,
//     },
//   });

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: any) => import(`./locales/${language}.json`))
  )
  .init({
    // debug: true,
    compatibilityJSON: 'v4',
    supportedLngs: languages,
    fallbackLng,
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? languages : [],
  });

i18next.on('languageChanged', (lng) => {
  setDefaultOptions({
    locale: lng === 'el' ? greekLocale : englishLocale,
  });
});

export default i18next;

export const tranx = i18next.t.bind(i18next);

export function switchLanguage(pathname: string, lng: string) {
  i18next.changeLanguage(lng);

  // Replace the current language in the pathname or add it
  const newPath = pathname.match(/^\/(en|el)(?=\/|$)/)
    ? pathname.replace(/^\/(en|el)(?=\/|$)/, `/${lng}`)
    : `/${lng}${pathname}`;

  // Set the language cookie
  document.cookie = `${cookieName}=${lng}; path=/; max-age=31536000`; // 1 year

  window.history.pushState(null, '', newPath);
}
