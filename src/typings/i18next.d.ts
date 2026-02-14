import en from '../translations/locales/en.json';

import 'i18next';

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof en;
    };
  }
}
