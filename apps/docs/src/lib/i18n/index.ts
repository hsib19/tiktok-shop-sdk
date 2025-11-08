// src/lib/i18n.ts

// Import necessary functions from svelte-i18n
import { addMessages, init, locale, _, locales, json, waitLocale } from 'svelte-i18n';
import en from './locale/en.json';
import id from './locale/id.json';

// --------------------------
// Add translation messages
// --------------------------
addMessages('en', en); // English messages
addMessages('id', id); // Indonesian messages

// --------------------------
// Fallback locale in case current locale is missing
// --------------------------
const fallbackLocale = 'en';

// --------------------------
// Function to determine initial locale
// Tries to read from cookie first, then from browser language
// --------------------------
function getInitialLocale() {
	// Check if document is defined (avoid SSR issues)
	if (typeof document !== 'undefined') {
		const match = document.cookie.match(/locale=([^;]+)/);
		if (match) return match[1]; // Return locale from cookie if exists
	}

	// Fallback to browser language if available
	if (typeof navigator !== 'undefined') {
		return navigator.language.split('-')[0] || fallbackLocale;
	}

	// Default fallback
	return fallbackLocale;
}

// Get initial locale
const initialLocale = getInitialLocale();

// --------------------------
// Initialize svelte-i18n
// --------------------------
init({
	fallbackLocale,
	initialLocale
});

// --------------------------
// Persist locale changes to a cookie
// This allows the selected language to survive page reloads
// --------------------------
locale.subscribe((value) => {
	if (typeof document !== 'undefined' && value) {
		document.cookie = `locale=${value};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
	}
});

// --------------------------
// Preload function to wait until translations are loaded
// Useful for SSR or layouts to avoid language flicker
// --------------------------
export async function preload() {
	await waitLocale(); // waits for the dictionaries to be loaded
}

// --------------------------
// Export helpers for Svelte components
// --------------------------
export { locale, _, locales, json };
