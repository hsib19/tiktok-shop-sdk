import type { UserConfig } from 'next-i18next';

const i18nConfig: UserConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
  },
  defaultNS: 'footer',
  ns: ['footer', 'hero'],
};

export default i18nConfig;
