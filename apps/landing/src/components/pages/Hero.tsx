import ButtonCTA from '@/components/ui/ButtonCTA';
import { useI18n } from '@/hooks/useI18n';
import { ArrowRight, Github } from 'lucide-react';

export default function Hero() {
  const { t } = useI18n('hero');

  return (
    <section className="mb-3 w-full bg-white pt-24 md:pt-44 md:pb-10 dark:bg-neutral-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-[50%_50%] lg:px-8">
        {/* Left: Text */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-4xl dark:text-white">
            {t('tagline')}
          </h1>
          <p className="my-5 text-base text-neutral-700 md:my-10 md:text-xl dark:text-neutral-300">
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-4">
            <ButtonCTA
              href="https://tiktok-shop-sdk-docs.vercel.app"
              label={t('cta.getStarted')}
              size="lg"
              variant="primary"
              className="w-full md:w-auto"
            >
              <ArrowRight className="ml-2 h-5 w-5" />
            </ButtonCTA>

            <ButtonCTA
              href="https://github.com/hsib19/tiktok-shop-sdk"
              label={t('cta.seeCode')}
              size="lg"
              variant="outline"
              className="w-full md:w-auto"
            >
              <Github className="ml-2 h-5 w-5" />
            </ButtonCTA>
          </div>
        </div>

        {/* Right: Code Example */}
        <div className="interactive-shadow rounded-xl bg-white p-8 font-mono text-sm leading-relaxed dark:bg-neutral-900">
          <pre className="whitespace-pre-wrap text-neutral-800 dark:text-neutral-100">
            <code>
              <span className="text-purple-600">import</span> {'{'}{' '}
              <span className="text-blue-500">TikTokShopSDK</span> {'}'}{' '}
              <span className="text-purple-600">from</span>{' '}
              <span className="text-rose-500">&apos;tiktok-shop-sdk&apos;</span>
              ;
              <br />
              <br />
              <span className="text-purple-600">const</span> sdk ={' '}
              <span className="text-purple-600">new</span>{' '}
              <span className="text-blue-500">TikTokShopSDK</span>({'{'}
              <br />
              &nbsp;&nbsp;appKey: <span className="text-blue-500">env</span>.
              <span className="text-blue-500">TIKTOK_APP_KEY</span>!,
              <br />
              &nbsp;&nbsp;appSecret: <span className="text-blue-500">env</span>.
              <span className="text-blue-500">TIKTOK_APP_SECRET</span>!,
              <br />
              {'}'});
              <br />
              <br />
              <span className="text-blue-500">sdk.setAccessToken</span>(
              <span className="text-rose-500">env.ACCESS_KEY</span>!);
              <br />
              <span className="text-purple-600">const</span> response ={' '}
              <span className="text-purple-600">await</span>{' '}
              <span className="text-rose-500">
                sdk.shop.getAuthorizedShops();
              </span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
