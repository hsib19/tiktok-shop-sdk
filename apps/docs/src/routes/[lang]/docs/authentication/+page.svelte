<script lang="ts">
	import { onMount } from 'svelte';
	import { Cpu, Key, Zap } from 'lucide-svelte';
	import { createHighlighter } from 'shiki';
	import type { Highlighter } from 'shiki';

	let initHtml = '';
	let getTokenHtml = '';
	let refreshHtml = '';

	const initCode = `import { TikTokShopClient } from "tiktok-shop-sdk";

const client = new TikTokShopClient({
  appKey: process.env.TTS_APP_KEY!,
  appSecret: process.env.TTS_APP_SECRET!,
  authCode: process.env.TIKTOK_AUTH_CODE!,
});`;

	const getTokenCode = `const tokenData = await client.auth.getAccessToken();
console.log(tokenData);`;

	const refreshCode = `const refreshed = await client.auth.refreshAccessToken();
console.log(refreshed);`;

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

		initHtml = highlighter.codeToHtml(initCode, { lang: 'ts', theme });
		getTokenHtml = highlighter.codeToHtml(getTokenCode, { lang: 'ts', theme });
		refreshHtml = highlighter.codeToHtml(refreshCode, { lang: 'ts', theme });
	}

	onMount(async () => {
		document.title = 'TikTok Shop SDK – Authentication';

		await initHighlighters();

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		updateHighlight(mediaQuery.matches);

		mediaQuery.addEventListener('change', (e) => {
			updateHighlight(e.matches);
		});
	});
</script>

<div class="prose max-w-none space-y-6 prose-slate dark:prose-invert">
	<!-- Hero -->
	<h1 class="flex items-center gap-2 text-3xl font-bold">
		<Cpu class="h-6 w-6 text-blue-500" /> TikTok Shop SDK Authentication
	</h1>
	<p class="mt-2 text-lg">
		Learn how to authenticate your app with TikTok Shop and obtain access tokens to start using the
		SDK. Follow the steps below to integrate securely and efficiently.
	</p>

	<hr class="my-6" />

	<!-- Step 1: Get TikTok Auth Code -->
	<h2 class="flex items-center gap-2">
		<Key class="h-5 w-5 text-teal-500" /> 1. Obtain TikTok Auth Code
	</h2>
	<p>
		Before using the SDK, you need a <code>TIKTOK_AUTH_CODE</code>. This code is required to
		authenticate your app and access shop data.
	</p>
	<p>
		Follow the official guide:
		<a
			href="https://partner.tiktokshop.com/docv2/page/partner-authorization-guide"
			target="_blank"
			class="text-blue-500 underline"
		>
			Partner Authorization Guide
		</a>.
	</p>
	<ol class="list-decimal space-y-1 pl-5">
		<li>Log in to the TikTok Shop Partner portal.</li>
		<li>Register your app to get <code>appKey</code> and <code>appSecret</code>.</li>
		<li>Redirect users to the authorization URL.</li>
		<li>After authorization, receive <code>TIKTOK_AUTH_CODE</code> in the callback URL.</li>
	</ol>

	<!-- Step 2: Initialize SDK -->
	<h2 class="flex items-center gap-2">
		<Cpu class="h-5 w-5 text-purple-500" /> 2. Initialize SDK Client
	</h2>
	<p>Create a client instance using your credentials and auth code:</p>
	<div class="overflow-x-auto rounded-lg">
		{@html initHtml}
	</div>

	<!-- Step 3: Get Access Token -->
	<h2 class="flex items-center gap-2">
		<Key class="h-5 w-5 text-yellow-500" /> 3. Get Access Token
	</h2>
	<p>Use the auth module to exchange your auth code for an access token:</p>
	<div class="overflow-x-auto rounded-lg">
		{@html getTokenHtml}
	</div>

	<!-- Step 4: Refresh Token -->
	<h2 class="flex items-center gap-2">
		<Zap class="h-5 w-5 text-red-500" /> 4. Refresh Token
	</h2>
	<p>Access tokens expire. Use refresh token to obtain a new access token:</p>
	<div class="overflow-x-auto rounded-lg">
		{@html refreshHtml}
	</div>

	<!-- Tips -->
	<h2 class="flex items-center gap-2">
		<Cpu class="h-5 w-5 text-indigo-500" /> Tips & Best Practices
	</h2>
	<ul>
		<li>Store <code>appSecret</code> and tokens securely (environment variables recommended)</li>
		<li>Always handle async/await errors using try/catch</li>
		<li>Follow TikTok Shop documentation for each module</li>
	</ul>
</div>
