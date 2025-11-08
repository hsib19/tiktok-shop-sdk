import { addMessages, init, locale, _, locales, json, waitLocale } from 'svelte-i18n';
import en from './locale/en.json';
import id from './locale/id.json';

// Add translations
addMessages('en', en);
addMessages('id', id);

const fallbackLocale = 'en';

function getInitialLocale() {
	if (typeof document !== 'undefined') {
		const match = document.cookie.match(/locale=([^;]+)/);
		if (match) return match[1];
	}
	if (typeof navigator !== 'undefined') {
		return navigator.language.split('-')[0] || fallbackLocale;
	}
	return fallbackLocale;
}

const initialLocale = getInitialLocale();

// Initialize svelte-i18n
init({
	fallbackLocale,
	initialLocale
});

// Subscribe locale to save in cookie
locale.subscribe((value) => {
	if (typeof document !== 'undefined' && value) {
		document.cookie = `locale=${value};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
	}
});

async function preload() {
	// awaits for the loading of the 'en-US' and 'en' dictionaries
	return waitLocale();
}

export { locale, _, locales, json, preload };
