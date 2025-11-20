<script lang="ts">
	import { onMount } from 'svelte';
	import { Rocket, Package, Cpu, BookOpen, Users, FileText } from 'lucide-svelte';
	import { createHighlighter } from 'shiki';
	import type { Highlighter } from 'shiki';

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
		const theme = isDark ? 'vitesse-dark' : 'nord';
		installationHtml = (isDark ? darkHighlighter : lightHighlighter).codeToHtml(installationCode, {
			lang: 'bash',
			theme
		});
		quickStartHtml = (isDark ? darkHighlighter : lightHighlighter).codeToHtml(quickStartCode, {
			lang: 'ts',
			theme
		});
	}

	onMount(async () => {
		document.title = 'TikTok Shop SDK – Introduction';

		await initHighlighters();

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		updateHighlight(mediaQuery.matches);

		// Listen for theme changes
		mediaQuery.addEventListener('change', (e) => {
			updateHighlight(e.matches);
		});
	});
</script>

<div class="prose max-w-none space-y-12 prose-slate dark:prose-invert">
	<!-- Hero Section -->
	<section id="hero">
		<h1 class="flex items-center gap-2 text-3xl font-bold">TikTok Shop SDK for Node.js</h1>
		<p class="mt-2 text-lg">
			A simple, modular, and fully-typed SDK that wraps the official TikTok Shop APIs, designed to
			make integration effortless for developers. While TikTok's official APIs are powerful, they
			can be complex and require handling low-level details. This SDK abstracts away the boilerplate
			and authentication steps, so you can focus on building your products, automating workflows, or
			creating dashboards, rather than worrying about the underlying API calls.
		</p>
	</section>

	<hr class="my-8" />

	<!-- Features Section -->
	<section id="features">
		<h2 class="flex items-center gap-2">
			<Rocket class="h-5 w-5 text-blue-500" /> Features
		</h2>
		<ul>
			<li><strong>Full TypeScript support</strong> — complete typed requests & responses</li>
			<li><strong>Secure authentication</strong> with signature-based HMAC</li>
			<li><strong>Modular structure</strong> (Product, Order, Finance, Auth, etc.)</li>
			<li><strong>Supports Seller & Partner endpoints</strong></li>
			<li><strong>Auto-generated query signatures</strong></li>
			<li><strong>Lightweight & framework-agnostic</strong></li>
		</ul>
	</section>

	<!-- Installation Section -->
	<section id="installation">
		<h2 class="flex items-center gap-2">
			<Package class="h-5 w-5 text-green-500" /> Installation
		</h2>
		<div class="overflow-x-auto rounded-lg">
			{@html installationHtml}
		</div>
	</section>

	<!-- Quick Start Section -->
	<section id="quick-start">
		<h2 class="flex items-center gap-2">
			<Cpu class="h-5 w-5 text-purple-500" /> Quick Start
		</h2>
		<div class="overflow-x-auto rounded-lg">
			{@html quickStartHtml}
		</div>
	</section>

	<!-- Modules Section -->
	<section id="modules">
		<h2 class="flex items-center gap-2">
			<BookOpen class="h-5 w-5 text-orange-500" /> Included Modules
		</h2>
		<ul class="list-disc space-y-1 pl-5">
			<li><strong>Auth</strong> — handle authentication and tokens</li>
			<li><strong>Shop</strong> — manage shops and basic info</li>
			<li><strong>Event</strong> — subscribe and fetch events</li>
			<li><strong>Seller</strong> — seller account APIs</li>
			<li><strong>Products</strong> — products, categories, and listings</li>
			<li><strong>Orders</strong> — orders, details, and statuses</li>
			<li><strong>Logistic</strong> — shipping, tracking, and courier info</li>
			<li><strong>Return & Refund</strong> — handle returns and refunds</li>
			<li><strong>Finance</strong> — statements, payments, withdrawals</li>
			<li><strong>Fulfillment</strong> — manage fulfillment processes</li>
			<li><strong>Promotion</strong> — coupons, discounts, and campaigns</li>
			<li><strong>Affiliate Seller</strong> — APIs for affiliate sellers</li>
			<li><strong>Analytics</strong> — insights and performance metrics</li>
		</ul>
	</section>

	<!-- Audience Section -->
	<section id="audience">
		<h2 class="flex items-center gap-2">
			<Users class="h-5 w-5 text-teal-500" /> Who is this SDK for?
		</h2>
		<ul>
			<li>E-commerce automation developers</li>
			<li>ERP & inventory sync tools</li>
			<li>Affiliate management platforms</li>
			<li>AI agent workflows for shopping</li>
			<li>Backend services that connect to TikTok Shop</li>
		</ul>
	</section>

	<!-- Documentation Section -->
	<section id="documentation">
		<h2 class="flex items-center gap-2">
			<FileText class="h-5 w-5 text-gray-500" /> Documentation
		</h2>
		<p>
			Explore module guides, API reference, type definitions, and usage examples throughout the
			documentation.
		</p>
	</section>
</div>
