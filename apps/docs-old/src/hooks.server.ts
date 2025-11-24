import type { Handle } from '@sveltejs/kit';
import { init } from 'svelte-i18n';
import { redirect } from '@sveltejs/kit';

const SUPPORTED_LANGUAGES = ['en', 'id'];

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;

	// Check if the URL already contains a supported language prefix
	const hasLangPrefix = SUPPORTED_LANGUAGES.some((lang) => pathname.startsWith(`/${lang}`));

	if (!hasLangPrefix) {
		// Get preferred language from cookie or browser headers
		const cookieLocale = event.cookies.get('locale');
		const acceptLanguage = event.request.headers.get('accept-language');
		const browserLocale = acceptLanguage?.split(',')[0].split('-')[0] ?? 'en';

		// Fallback to 'en' if locale is unsupported
		const lang = SUPPORTED_LANGUAGES.includes(cookieLocale ?? browserLocale)
			? (cookieLocale ?? browserLocale)
			: 'en';

		// Redirect to the same path with language prefix
		throw redirect(307, `/${lang}${pathname}`);
	}

	// Initialize i18n for SSR with fallback and detected locale
	const cookieLocale = event.cookies.get('locale');
	const acceptLanguage = event.request.headers.get('accept-language');
	const browserLocale = acceptLanguage?.split(',')[0].split('-')[0] ?? 'en';
	const initialLocale = cookieLocale ?? browserLocale;

	init({
		fallbackLocale: 'en',
		initialLocale
	});

	// Proceed with request and set cookie if not already present
	const response = await resolve(event);

	if (!cookieLocale) {
		response.headers.set('set-cookie', `locale=${initialLocale}; Path=/; HttpOnly; SameSite=Lax`);
	}

	return response;
};
