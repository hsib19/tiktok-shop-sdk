import { useState, useEffect } from 'react';
import { Moon, Sun, ChevronDown, Menu, X } from 'lucide-react';
import { useRouter } from 'next/router';
import { useTheme } from '@/context/theme/ThemeContext';
import { useI18n } from '@/hooks/useI18n';
import Link from 'next/link';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n('footer');
  const router = useRouter();

  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll < lastScroll) setShowNavbar(true);
      else if (currentScroll > lastScroll + 10) setShowNavbar(false);
      lastScroll = currentScroll;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLang = (lang: string) => {
    setShowLangDropdown(false);
    const pathWithoutLocale = router.asPath.replace(/^\/(en|id)/, '');
    router.replace(`/${lang}${pathWithoutLocale}`);
  };

  const rawLanguages = t('languages.options', { returnObjects: true });
  const languages: { label: string; href: string; code: string }[] =
    Array.isArray(rawLanguages) ? rawLanguages : [];

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 bg-white py-4 shadow transition-transform duration-300 ease-in-out dark:bg-neutral-950 ${
        showNavbar ? '' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 md:h-16 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-neutral-900 dark:text-white"
        >
          TIKTOK SHOP SDK
          <span className="rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
            Unofficial
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded p-2 text-neutral-800 dark:text-yellow-500"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown((prev) => !prev)}
              className="flex items-center gap-1 rounded border border-neutral-200 px-3 py-1 text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
              aria-label="Toggle language dropdown"
            >
              {(router.locale ?? 'en').toUpperCase()}
              <ChevronDown className="h-4 w-4" />
            </button>

            {showLangDropdown && (
              <div className="absolute right-0 z-10 mt-2 w-24 rounded border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
                {languages.map((langOption) => (
                  <button
                    key={langOption.code}
                    onClick={() => switchLang(langOption.code)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800"
                  >
                    {langOption.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded p-2 text-neutral-800 dark:text-white"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="mt-5 border-t border-neutral-200 bg-white pt-3 shadow-lg md:hidden dark:border-neutral-700 dark:bg-neutral-950">
          <div className="flex flex-col gap-2 px-4 py-4 dark:text-white">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 rounded p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {languages.map((langOption) => (
              <button
                key={langOption.code}
                onClick={() => switchLang(langOption.code)}
                className="rounded p-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                {langOption.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
