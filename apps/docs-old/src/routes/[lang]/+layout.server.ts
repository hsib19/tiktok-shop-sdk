import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';

const SUPPORTED_LANGUAGES = ['en', 'id'];

export const load: LayoutServerLoad = async ({ params }) => {
	const lang = params.lang;

	// Ensure lang is defined and valid
	if (!lang || !SUPPORTED_LANGUAGES.includes(lang)) {
		throw redirect(307, `/en`);
	}

	return { lang };
};
