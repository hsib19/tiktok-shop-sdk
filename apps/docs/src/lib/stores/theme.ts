import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultTheme = 'light';
const stored = browser ? localStorage.getItem('theme') : null;

export const theme = writable(stored || defaultTheme);

if (browser) {
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
		document.documentElement.classList.toggle('dark', value === 'dark');
	});
}
