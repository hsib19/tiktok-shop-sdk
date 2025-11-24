import type { UserConfig } from 'next-i18next';
import { i18nNamespaces } from '@/constants/i18nNamespaces';

const i18nConfig: UserConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
  },
  defaultNS: 'hero',
  ns: i18nNamespaces,
};

export default i18nConfig;
