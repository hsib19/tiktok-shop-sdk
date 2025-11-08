import type { Handle } from '@sveltejs/kit';
import { init } from 'svelte-i18n';

export const handle: Handle = async ({ event, resolve }) => {
	// Get language from cookie first
	const cookieLocale = event.cookies.get('locale');

	// If no cookie, get browser language from Accept-Language header
	const acceptLanguage = event.request.headers.get('accept-language');
	const browserLocale = acceptLanguage?.split(',')[0] ?? 'en';

	// Determine the initial language for SSR
	const initialLocale = cookieLocale ?? browserLocale;

	// Initialize i18n for this request
	init({
		fallbackLocale: 'en',
		initialLocale
	});

	// Proceed with request
	const response = await resolve(event);

	// If no language cookie exists, set it
	if (!cookieLocale) {
		response.headers.set('set-cookie', `locale=${initialLocale}; Path=/; HttpOnly; SameSite=Lax`);
	}

	return response;
};
