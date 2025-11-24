import { useEffect, useState } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { Contributor } from '@/types/contributor.types';
import { getContributors } from '@/services/contributors.service';
import { ContributorSkeleton } from '../contributors/ContributorSkeleton';
import { ContributorCard } from '../contributors/ContributorCard';

export default function ContributorsSection() {
  const { t } = useI18n('contributorsSection');
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContributors()
      .then(setContributors)
      .catch((err) => console.error('Failed to fetch contributors', err))
      .finally(() => setLoading(false));
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
                <ContributorSkeleton key={i} />
              ))
            : contributors.map((c) => (
                <ContributorCard key={c.login} contributor={c} />
              ))}
        </div>
      </div>
    </section>
  );
}
