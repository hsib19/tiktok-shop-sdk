<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import type { SeoData } from '$lib/types/seo';

	let { data, children }: { data?: { seo?: SeoData }; children: unknown } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<title>{data?.seo?.title ?? 'TikTok Shop SDK — Unofficial API Integration'}</title>
	<meta
		name="description"
		content={data?.seo?.description ??
			'Integrate TikTok Shop features into your apps with ease. Manage products, orders, and affiliate programs using the unofficial TikTok Shop SDK.'}
	/>
	<meta
		name="keywords"
		content="TikTok Shop, API, SDK, Node.js, TypeScript, e-commerce, product integration, orders, affiliate"
	/>
	<meta name="author" content="Hasib Muharam" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- Open Graph -->
	<meta
		property="og:title"
		content={data?.seo?.title ?? 'TikTok Shop SDK — Unofficial API Integration'}
	/>
	<meta
		property="og:description"
		content={data?.seo?.description ??
			'Easily connect to TikTok Shop APIs and automate product, order, and affiliate management with this SDK.'}
	/>
	<meta property="og:image" content={data?.seo?.image ?? '/images/tiktok-shop-og.png'} />
	<meta property="og:url" content={data?.seo?.url ?? 'https://tiktok-shop-sdk-docs.vercel.app/'} />
	<meta property="og:type" content="website" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content={data?.seo?.title ?? 'TikTok Shop SDK — Unofficial API Integration'}
	/>
	<meta
		name="twitter:description"
		content={data?.seo?.description ??
			'Easily integrate TikTok Shop features using the unofficial SDK for Node.js and TypeScript.'}
	/>
	<meta name="twitter:image" content={data?.seo?.image ?? '/images/tiktok-shop-og.png'} />
</svelte:head>

{@render children()}
