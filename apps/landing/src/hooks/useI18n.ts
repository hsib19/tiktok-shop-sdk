import { useTranslation } from 'next-i18next';
import type { UseTranslationResponse } from 'react-i18next';
import type {
  HeroKeys,
  QuickLinksKeys,
  FeaturesSectionKeys,
  GithubSectionKeys,
  ContributorsSectionKeys,
  GithubContentSectionKeys,
  FooterKeys,
  PagesKeys,
  I18nNamespaces,
} from '../../types/i18n-generated';

type NamespaceMap = {
  hero: HeroKeys;
  quickLinks: QuickLinksKeys;
  featuresSection: FeaturesSectionKeys;
  githubSection: GithubSectionKeys;
  contributorsSection: ContributorsSectionKeys;
  githubContentSection: GithubContentSectionKeys;
  footer: FooterKeys;
  pages: PagesKeys;
};

export function useI18n<N extends keyof NamespaceMap>(
  namespace: N,
): UseTranslationResponse<NamespaceMap[N], undefined> & {
  json: <T = unknown>(key: string) => T;
};

export function useI18n(
  namespace: Exclude<I18nNamespaces, keyof NamespaceMap>,
): UseTranslationResponse<string, undefined> & {
  json: <T = unknown>(key: string) => T;
};

export function useI18n(namespace: I18nNamespaces) {
  const { t, i18n } = useTranslation(namespace);
  const json = <T = unknown>(key: string): T =>
    t(key, { returnObjects: true }) as T;
  return { t, i18n, json };
}
