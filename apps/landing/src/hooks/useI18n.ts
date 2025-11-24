import { useTranslation } from 'next-i18next';
import type { UseTranslationResponse } from 'react-i18next';
import {
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

// Overloads for each namespace
export function useI18n(
  namespace: 'hero',
): UseTranslationResponse<HeroKeys, undefined>;

export function useI18n(
  namespace: 'quickLinks',
): UseTranslationResponse<QuickLinksKeys, undefined>;

export function useI18n(
  namespace: 'featuresSection',
): UseTranslationResponse<FeaturesSectionKeys, undefined>;

export function useI18n(
  namespace: 'githubSection',
): UseTranslationResponse<GithubSectionKeys, undefined>;

export function useI18n(
  namespace: 'contributorsSection',
): UseTranslationResponse<ContributorsSectionKeys, undefined>;

export function useI18n(
  namespace: 'githubContentSection',
): UseTranslationResponse<GithubContentSectionKeys, undefined>;

export function useI18n(
  namespace: 'footer',
): UseTranslationResponse<FooterKeys, undefined>;

export function useI18n(
  namespace: 'pages',
): UseTranslationResponse<PagesKeys, undefined>;

// Fallback overload for any other namespace
export function useI18n(
  namespace: Exclude<
    I18nNamespaces,
    | 'hero'
    | 'quickLinks'
    | 'featuresSection'
    | 'githubSection'
    | 'contributorsSection'
    | 'githubContentSection'
    | 'footer'
    | 'pages'
  >,
): UseTranslationResponse<string, undefined>;

// Implementation
export function useI18n(namespace: I18nNamespaces) {
  return useTranslation(namespace);
}
