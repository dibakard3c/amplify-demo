import en from '../translations/languages/en.json';

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
