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
	document.cookie = `locale=${lang}; Path=/; SameSite=Lax`;
}

/**
 * Retrieve the current language from the cookie
 * @returns Language code string if cookie exists, otherwise null
 */
export function getLanguageFromCookie(): string | null {
	const match = document.cookie.match(/locale=([^;]+)/);
	return match ? match[1] : null;
}
