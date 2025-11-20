<script lang="ts">
	import { onMount } from 'svelte';
	import { Rocket, Package, Cpu, BookOpen, Users, FileText } from 'lucide-svelte';
	import { highlight } from '$lib/utils/highlight';

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

	onMount(async () => {
		document.title = 'TikTok Shop SDK – Introduction';

		// Generate HTML with Shiki highlight
		installationHtml = await highlight(installationCode, 'bash', 'nord');
		quickStartHtml = await highlight(quickStartCode, 'ts', 'nord');
	});
</script>

<div class="prose max-w-none space-y-12 prose-slate dark:prose-invert">
	<!-- Hero Section -->
	<section id="hero">
		<h1 class="flex items-center gap-2 text-3xl font-bold">TikTok Shop SDK for Node.js</h1>
		<p class="mt-2 text-lg">
			A simple, modular, and fully-typed SDK for interacting with TikTok Shop APIs.
		</p>
		<p>
			The SDK provides a clean and developer-friendly wrapper around the TikTok Shop APIs—making it
			easier to authenticate, send requests, handle errors, and integrate e-commerce features.
		</p>
		<p>
			Whether you're building automation tools, affiliate platforms, inventory sync systems, or
			financial dashboards, this SDK gives you everything you need with minimal setup and maximum
			type safety.
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
		<div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
			{@html installationHtml}
		</div>
	</section>

	<!-- Quick Start Section -->
	<section id="quick-start">
		<h2 class="flex items-center gap-2">
			<Cpu class="h-5 w-5 text-purple-500" /> Quick Start
		</h2>
		<div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
			{@html quickStartHtml}
		</div>
	</section>

	<!-- Modules Section -->
	<section id="modules">
		<h2 class="flex items-center gap-2">
			<BookOpen class="h-5 w-5 text-orange-500" /> Included Modules
		</h2>
		<ul>
			<li><strong>AuthModule</strong> — refresh tokens, get shops</li>
			<li><strong>ProductModule</strong> — products, categories, listings</li>
			<li><strong>OrderModule</strong> — order details, logistics</li>
			<li><strong>FinanceModule</strong> — statements, payments, withdrawals</li>
			<li><strong>AffiliateModule</strong> — affiliate seller/creator APIs</li>
			<li><strong>LogisticsModule</strong> — shipping & tracking</li>
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
