import { useI18n } from '@/hooks/useI18n';
import { getFooterSections } from '@/constants/footerSections';
import Link from 'next/link';

export default function Footer() {
  const { t } = useI18n('footer');
  const sections = getFooterSections(t);

  return (
    <footer className="w-full border-t border-neutral-200 bg-white py-16 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map(({ icon: Icon, title, links }) => (
            <div key={title} className="space-y-4">
              <span className="flex items-center gap-2 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                <Icon className="h-4 w-4" />
                {title}:
              </span>
              <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                {links.map((link) => (
                  <li key={link.key}>
                    <Link
                      href="/"
                      locale={link.key}
                      className="text-black! hover:underline dark:text-white!"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-200 pt-10 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
