import { TFunction } from 'i18next';
import { Languages, Github, GitFork, ExternalLink } from 'lucide-react';

export type FooterLink = {
  key: string;
  href: string;
  label: string;
};

export type FooterSection = {
  icon: React.ElementType;
  title: string;
  links: FooterLink[];
};

export function getFooterSections(t: TFunction): FooterSection[] {
  const languages = t('languages.options', { returnObjects: true }) as {
    label: string;
    href: string;
    code: string;
  }[];

  const openSourceLinks = t('openSource.links', { returnObjects: true }) as {
    label: string;
    href: string;
  }[];

  const contributeLinks = t('contribute.links', { returnObjects: true }) as {
    label: string;
    href: string;
  }[];

  const apiLinks = t('tiktokAPI.links', { returnObjects: true }) as {
    label: string;
    href: string;
  }[];

  return [
    {
      icon: Languages,
      title: t('languages.title'),
      links: languages.map((lang) => ({
        key: lang.code,
        href: lang.href,
        label: lang.label,
      })),
    },
    {
      icon: Github,
      title: t('openSource.title'),
      links: openSourceLinks.map((link) => ({
        key: link.href,
        href: link.href,
        label: link.label,
      })),
    },
    {
      icon: GitFork,
      title: t('contribute.title'),
      links: contributeLinks.map((link) => ({
        key: link.href,
        href: link.href,
        label: link.label,
      })),
    },
    {
      icon: ExternalLink,
      title: t('tiktokAPI.title'),
      links: apiLinks.map((link) => ({
        key: link.href,
        href: link.href,
        label: link.label,
      })),
    },
  ];
}
