import React from 'react';
import { Github, Users, Star, GitBranch } from 'lucide-react';
import ButtonCTA from '@/components/ui/ButtonCTA';
import { useI18n } from '@/hooks/useI18n';

interface GitHubItem {
  title: string;
  description: string;
}

const icons = [Github, Star, GitBranch, Users];

const iconColors = [
  { light: 'text-blue-600', dark: 'dark:text-blue-400' },
  { light: 'text-yellow-500', dark: 'dark:text-yellow-400' },
  { light: 'text-green-600', dark: 'dark:text-green-400' },
  { light: 'text-purple-600', dark: 'dark:text-purple-400' },
];

export default function GithubSection() {
  const { t } = useI18n('githubSection');
  const { json } = useI18n('githubContentSection');
  const githubItems = json<GitHubItem[]>('items');

  return (
    <section className="w-full bg-white pt-14 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t('title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-700 dark:text-neutral-300">
            {t('subtitle')}
          </p>
        </div>

        {/* GitHub Stats Grid */}
        <div className="grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
          {Array.isArray(githubItems) &&
            githubItems.map((item, i) => {
              const Icon = icons[i];
              const colors = iconColors[i];
              return (
                <div
                  key={item.title}
                  className="interactive-shadow space-y-2 rounded-xl bg-white p-6 dark:bg-neutral-900"
                >
                  <Icon
                    className={`mx-auto h-6 w-6 ${colors.light} ${colors.dark} transition-colors duration-200`}
                  />
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    {item.title}
                  </p>
                </div>
              );
            })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <ButtonCTA
            href="https://github.com/hsib19/tiktok-shop-sdk"
            label={t('cta')}
            size="lg"
            variant="primary"
            className="w-full md:w-auto"
          >
            <Github className="ml-2 h-4 w-4" />
          </ButtonCTA>
        </div>
      </div>
    </section>
  );
}
