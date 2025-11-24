import React, { useEffect, useState } from 'react';
import { useI18n } from '@/hooks/useI18n';
import Link from 'next/link';
import Image from 'next/image';

type Contributor = {
  login: string;
  avatar_url: string;
  html_url: string;
};

export default function ContributorsSection() {
  const { t } = useI18n('contributorsSection');
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const res = await fetch(
          'https://api.github.com/repos/hsib19/tiktok-shop-sdk/contributors',
        );
        if (res.ok) {
          const data = await res.json();
          setContributors(data);
        }
      } catch (err) {
        console.error('Failed to fetch contributors', err);
      } finally {
        setLoading(false);
      }
    }
    fetchContributors();
  }, []);

  return (
    <section className="w-full bg-white py-10 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t('title')}
          </h2>
          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            {t('subtitle')}
          </p>
        </div>

        {/* Contributor List */}
        <div className="flex items-center gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex animate-pulse items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-neutral-200 dark:bg-neutral-800"></div>
                  <div className="flex flex-col gap-1">
                    <div className="h-4 w-24 rounded bg-neutral-200 dark:bg-neutral-800"></div>
                    <div className="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-800"></div>
                  </div>
                </div>
              ))
            : contributors.map((c) => (
                <Link
                  key={c.login}
                  href={c.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4"
                >
                  <Image
                    src={c.avatar_url}
                    alt={c.login}
                    width={80}
                    height={80}
                    className="h-12 w-12 rounded-full transition group-hover:scale-105"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      {c.login}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      @{c.login}
                    </span>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
