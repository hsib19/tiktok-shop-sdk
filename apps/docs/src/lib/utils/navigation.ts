export async function navigateWithLocale(href: string) {
	const path = window.location.pathname;
	const [, maybeLocale] = path.split('/');
	const hasLocale = /^[a-z]{2}$/.test(maybeLocale);

	if (!href.startsWith('/')) href = '/' + href;

	let target = href;

	if (hasLocale && !/^[a-z]{2}$/.test(href.split('/')[1])) {
		target = `/${maybeLocale}${href}`;
	}

	return target;
}

export function stripLocale(pathname: string): string {
	const [, maybeLocale, ...rest] = pathname.split('/');

	if (/^[a-z]{2}$/.test(maybeLocale)) {
		const restPath = rest.join('/');
		const result = restPath ? `/${restPath}` : '/';
		return result;
	}
	return pathname || '/';
}
