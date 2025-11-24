import { featureIcons } from '@/constants/featureSections';
import { useI18n } from '@/hooks/useI18n';

export default function FeaturesSection() {
  const { t, json } = useI18n('featuresSection');
  const featureItems = json<{ title: string; description: string }[]>('items');

  return (
    <section className="w-full bg-white pt-14 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t('title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-700 dark:text-neutral-300">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featureItems.map((feature, i) => {
            const Icon = featureIcons[i];
            return (
              <div
                key={feature.title}
                className="interactive-shadow space-y-3 rounded-xl bg-white p-6 dark:bg-neutral-900"
              >
                <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
