import { locale } from './index';

/**
 * Change the application language and store it in a cookie.
 * This function can be reused across the app to switch languages.
 * @param lang - Language code, e.g., 'en' or 'id'
 */
export function changeLanguage(lang: string) {
	// Update the svelte-i18n locale store
	locale.set(lang);

	// Update the cookie so the language preference persists across reloads
	if (typeof document !== 'undefined') {
		document.cookie = `locale=${lang}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
	}
}

/**
 * Retrieve the current language from the cookie
 * @returns Language code string if cookie exists, otherwise null
 */
export function getLanguageFromCookie(): string | null {
	if (typeof document === 'undefined') return null;
	const match = document.cookie.match(/locale=([^;]+)/);
	return match ? match[1] : null;
}
