<script lang="ts">
	import { onMount } from 'svelte';
	import { AlertCircle } from 'lucide-svelte';
	import { createHighlighter } from 'shiki';
	import type { Highlighter } from 'shiki';

	let errorCodeHtml = '';

	const errorCodeExample = `import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

async function main() {
  try {
    const response = await sdk.auth.getAccessToken({
      auth_code: process.env.TIKTOK_AUTH_CODE!,
      grant_type: 'authorized_code',
    });
    console.log(response.data?.access_token);
  } catch (error) {
    if (error instanceof TikTokAPIError) {
      console.error('TikTok API Error:', error.message);
      console.error('Status Code:', error.code);
      console.log('Request Id: ', error.request_id);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}`;

	let lightHighlighter: Highlighter;
	let darkHighlighter: Highlighter;

	async function initHighlighters() {
		lightHighlighter = await createHighlighter({
			themes: ['nord'],
			langs: ['ts']
		});
		darkHighlighter = await createHighlighter({
			themes: ['vitesse-dark'],
			langs: ['ts']
		});
	}

	function updateHighlight(isDark: boolean) {
		const highlighter = isDark ? darkHighlighter : lightHighlighter;
		const theme = isDark ? 'vitesse-dark' : 'nord';
		errorCodeHtml = highlighter.codeToHtml(errorCodeExample, { lang: 'ts', theme });
	}

	onMount(async () => {
		document.title = 'TikTok Shop SDK – Errors & Troubleshooting';

		await initHighlighters();

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		updateHighlight(mediaQuery.matches);

		mediaQuery.addEventListener('change', (e) => {
			updateHighlight(e.matches);
		});
	});
</script>

<div class="prose max-w-none space-y-6 prose-slate dark:prose-invert">
	<h1 class="flex items-center gap-2 text-3xl font-bold">
		<AlertCircle class="h-6 w-6 text-red-500" /> Errors & Troubleshooting
	</h1>

	<p class="mt-2 text-lg">
		Learn how to handle errors when using the TikTok Shop SDK. Proper error handling is crucial for
		building robust applications.
	</p>

	<hr class="my-6" />

	<h2 class="flex items-center gap-2">
		<AlertCircle class="h-5 w-5 text-red-500" /> Example: Handling TikTok API Errors
	</h2>

	<p>
		Use <code>TikTokAPIError</code> to catch API errors and inspect details like status code and request
		ID:
	</p>
	<div class="overflow-x-auto rounded-lg">
		{@html errorCodeHtml}
	</div>

	<h2 class="flex items-center gap-2">
		<AlertCircle class="h-5 w-5 text-yellow-500" /> Official Reference
	</h2>
	<p>
		For a complete list of common errors and their meanings, refer to the
		<a
			href="https://partner.tiktokshop.com/docv2/page/common-errors"
			target="_blank"
			class="text-blue-500 underline"
		>
			TikTok Shop Common Errors documentation
		</a>.
	</p>

	<h2 class="flex items-center gap-2">
		<AlertCircle class="h-5 w-5 text-indigo-500" /> Tips
	</h2>
	<ul>
		<li>Always wrap SDK calls in <code>try/catch</code>.</li>
		<li>Log error details but never expose your <code>appSecret</code>.</li>
		<li>
			Use <code>instanceof TikTokAPIError</code> to differentiate API errors from other errors.
		</li>
		<li>Implement retries for network errors if necessary.</li>
	</ul>
</div>
