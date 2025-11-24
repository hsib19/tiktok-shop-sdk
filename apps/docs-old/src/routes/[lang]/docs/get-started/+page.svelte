<script lang="ts">
	import { onMount } from 'svelte';
	import { Rocket, Package, Cpu, FileText, Zap } from 'lucide-svelte';
	import { createHighlighter } from 'shiki';
	import type { Highlighter } from 'shiki';

	// Page title
	onMount(() => {
		document.title = 'TikTok Shop SDK – Get Started';
	});

	let installationHtml = '';
	let quickStartHtml = '';

	const installationCode = `npm install tiktok-shop-sdk
# or
yarn add tiktok-shop-sdk`;

	const quickStartCode = `import { TikTokShopClient } from "tiktok-shop-sdk";

const client = new TikTokShopClient({
  appKey: process.env.TTS_APP_KEY!,
  appSecret: process.env.TTS_APP_SECRET!,
  shopId: process.env.TTS_SHOP_ID!,
});

// Example: Get product list
const products = await client.product.getProducts({ page_size: 20 });
console.log(products);`;

	let lightHighlighter: Highlighter;
	let darkHighlighter: Highlighter;

	async function initHighlighters() {
		lightHighlighter = await createHighlighter({
			themes: ['nord'],
			langs: ['bash', 'ts']
		});
		darkHighlighter = await createHighlighter({
			themes: ['vitesse-dark'],
			langs: ['bash', 'ts']
		});
	}

	function updateHighlight(isDark: boolean) {
		const highlighter = isDark ? darkHighlighter : lightHighlighter;
		const theme = isDark ? 'vitesse-dark' : 'nord';

		installationHtml = highlighter.codeToHtml(installationCode, { lang: 'bash', theme });
		quickStartHtml = highlighter.codeToHtml(quickStartCode, { lang: 'ts', theme });
	}

	onMount(async () => {
		await initHighlighters();

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		updateHighlight(mediaQuery.matches);

		// Listen for theme changes
		mediaQuery.addEventListener('change', (e) => {
			updateHighlight(e.matches);
		});
	});
</script>

<div class="prose max-w-none space-y-6 prose-slate dark:prose-invert">
	<!-- Hero -->
	<h1 class="flex items-center gap-2 text-3xl font-bold">
		<Rocket class="h-6 w-6 text-blue-500" /> Get Started with TikTok Shop SDK
	</h1>
	<p class="mt-2 text-lg">
		A simple, modular, and fully-typed SDK that wraps the official TikTok Shop APIs, designed to
		make integration effortless for developers. While TikTok's official APIs are powerful, they can
		be complex and require handling low-level details. This SDK abstracts away boilerplate and
		authentication steps, so you can focus on building products, automating workflows, or creating
		dashboards.
	</p>

	<hr class="my-6" />

	<!-- Installation -->
	<h2 class="flex items-center gap-2">
		<Package class="h-5 w-5 text-green-500" /> 1. Installation
	</h2>
	<p>Install the SDK using npm or yarn:</p>
	<div class="overflow-x-auto rounded-lg">
		{@html installationHtml}
	</div>

	<!-- Initialize Client -->
	<h2 class="flex items-center gap-2">
		<Cpu class="h-5 w-5 text-purple-500" /> 2. Initialize the Client
	</h2>
	<p>Create a client instance with your credentials:</p>
	<div class="overflow-x-auto rounded-lg">
		{@html quickStartHtml}
	</div>

	<!-- Get TikTok Auth Code -->
	<h2 class="flex items-center gap-2">
		<Cpu class="h-5 w-5 text-teal-500" /> 2a. Get TikTok Auth Code
	</h2>
	<p>
		Before you can use the TikTok Shop SDK, you need to obtain an <code>TIKTOK_AUTH_CODE</code>.
		This is required to authenticate your app and access shop data.
	</p>
	<p>
		Follow the official TikTok Shop Partner guide:
		<a
			href="https://partner.tiktokshop.com/docv2/page/partner-authorization-guide"
			target="_blank"
			class="text-blue-500 underline">Partner Authorization Guide</a
		>.
	</p>
	<p>Steps overview:</p>
	<ol class="list-decimal space-y-1 pl-5">
		<li>Go to the TikTok Shop Partner portal and log in with your account.</li>
		<li>Register your app to get your <code>appKey</code> and <code>appSecret</code>.</li>
		<li>Redirect your shop users to the authorization URL provided in the guide.</li>
		<li>
			Once the user authorizes, you'll receive a <code>TIKTOK_AUTH_CODE</code> in the callback URL.
		</li>
		<li>Use this code with the SDK to get an access token and start calling APIs.</li>
	</ol>
	<p class="mt-2">
		With this code, you can initialize the SDK client and access products, orders, and other
		modules.
	</p>

	<!-- Call API -->
	<h2 class="flex items-center gap-2">
		<Zap class="h-5 w-5 text-yellow-500" /> 3. Call an API
	</h2>
	<p>Example: Fetch product list using the client instance.</p>

	<!-- Next Steps -->
	<h2 class="flex items-center gap-2">
		<FileText class="h-5 w-5 text-gray-500" /> 4. Next Steps
	</h2>
	<ul>
		<li>Explore <strong>OrderModule</strong> to manage orders</li>
		<li>Use <strong>FinanceModule</strong> to check statements and payments</li>
		<li>Check <strong>AffiliateModule</strong> for affiliate integrations</li>
		<li>Integrate SDK into cron jobs or backend services</li>
	</ul>

	<!-- Tips -->
	<h2 class="flex items-center gap-2">
		<Rocket class="h-5 w-5 text-indigo-500" /> Tips
	</h2>
	<ul>
		<li>Always store <code>appSecret</code> securely (env variables recommended)</li>
		<li>Use async/await and proper error handling</li>
		<li>Refer to the <strong>Documentation</strong> for each module</li>
	</ul>

	<p class="mt-6">You're now ready to start building with TikTok Shop SDK!</p>
</div>
