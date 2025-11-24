import { redirect } from '@sveltejs/kit';

export const load = ({ url }) => {
	const pathname = url.pathname;

	if (!/^\/(en|id)(\/|$)/.test(pathname)) {
		throw redirect(307, `/en${pathname}`);
	}
};
