import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

type CopiedState = {
  npm: boolean;
  pnpm: boolean;
  yarn: boolean;
};

export default function QuickLinksSection() {
  const { t, json } = useI18n('quickLinks');
  const features = json<string[]>('features');

  const [copied, setCopied] = useState<CopiedState>({
    npm: false,
    pnpm: false,
    yarn: false,
  });

  async function copyToClipboard(key: keyof CopiedState, command: string) {
    await navigator.clipboard.writeText(command);
    setCopied((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [key]: false }));
    }, 1000);
  }

  return (
    <section className="w-full bg-white pt-8 dark:bg-neutral-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-[60%_40%] lg:px-8">
        {/* Left: Install Instructions */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t('title')}
          </h2>
          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            {t('subtitle')}
          </p>

          <ul className="list-disc space-y-2 pl-6 text-neutral-700 dark:text-neutral-300">
            {Array.isArray(features) &&
              features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        </div>

        {/* Right: Install Code Blocks */}
        <div className="space-y-6">
          {/* pnpm */}
          <div>
            <h3 className="mb-2 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              pnpm
            </h3>
            <div className="interactive-shadow relative overflow-auto rounded-xl bg-white p-6 font-mono text-sm leading-relaxed dark:bg-neutral-900">
              <button
                onClick={() =>
                  copyToClipboard('pnpm', 'pnpm add tiktok-shop-sdk')
                }
                className="absolute top-4 right-4 rounded p-2 transition hover:bg-neutral-200 dark:hover:bg-neutral-800"
                aria-label="Copy pnpm command"
              >
                {copied.pnpm ? (
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : (
                  <Copy className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </button>
              <pre className="whitespace-pre-wrap text-neutral-800 dark:text-neutral-100">
                <code>
                  <span className="text-purple-600">pnpm</span>{' '}
                  <span className="text-blue-500">add</span>{' '}
                  <span className="text-rose-500">tiktok-shop-sdk</span>
                </code>
              </pre>
            </div>
          </div>

          {/* npm */}
          <div>
            <h3 className="mb-2 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              npm
            </h3>
            <div className="interactive-shadow relative overflow-auto rounded-xl bg-white p-6 font-mono text-sm leading-relaxed dark:bg-neutral-900">
              <button
                onClick={() =>
                  copyToClipboard('npm', 'npm install tiktok-shop-sdk')
                }
                className="absolute top-4 right-4 rounded p-2 transition hover:bg-neutral-200 dark:hover:bg-neutral-800"
                aria-label="Copy npm command"
              >
                {copied.npm ? (
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : (
                  <Copy className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </button>
              <pre className="whitespace-pre-wrap text-neutral-800 dark:text-neutral-100">
                <code>
                  <span className="text-purple-600">npm</span>{' '}
                  <span className="text-blue-500">install</span>{' '}
                  <span className="text-rose-500">tiktok-shop-sdk</span>
                </code>
              </pre>
            </div>
          </div>

          {/* yarn */}
          <div>
            <h3 className="mb-2 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              yarn
            </h3>
            <div className="interactive-shadow relative overflow-auto rounded-xl bg-white p-6 font-mono text-sm leading-relaxed dark:bg-neutral-900">
              <button
                onClick={() =>
                  copyToClipboard('yarn', 'yarn add tiktok-shop-sdk')
                }
                className="absolute top-4 right-4 rounded p-2 transition hover:bg-neutral-200 dark:hover:bg-neutral-800"
                aria-label="Copy yarn command"
              >
                {copied.yarn ? (
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : (
                  <Copy className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </button>
              <pre className="whitespace-pre-wrap text-neutral-800 dark:text-neutral-100">
                <code>
                  <span className="text-purple-600">yarn</span>{' '}
                  <span className="text-blue-500">add</span>{' '}
                  <span className="text-rose-500">tiktok-shop-sdk</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
