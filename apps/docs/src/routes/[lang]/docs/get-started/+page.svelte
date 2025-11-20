<script>
	import { onMount } from 'svelte';

	// Optional: set page title
	onMount(() => {
		document.title = 'TikTok Shop SDK – Get Started';
	});
</script>

<div class="prose max-w-none prose-slate dark:prose-invert">
	<h1 class="text-3xl font-bold">🚀 Get Started with TikTok Shop SDK</h1>

	<p class="mt-2 text-lg">
		Follow these simple steps to start using the TikTok Shop SDK in your Node.js project.
	</p>

	<hr class="my-6" />

	<h2>📦 1. Installation</h2>
	<p>Install the SDK using npm or yarn:</p>
	<pre><code class="language-bash">
npm install tiktok-shop-sdk
# or
yarn add tiktok-shop-sdk
  </code></pre>

	<h2>🧑‍💻 2. Initialize the Client</h2>
	<p>Create a client instance with your credentials:</p>

	<h2>⚡ 3. Call an API</h2>
	<p>Example: Fetch the product list:</p>
	<pre><code class="language-ts"></code></pre>

	<h2>📝 4. Next Steps</h2>
	<ul>
		<li>Explore <strong>OrderModule</strong> to manage orders</li>
		<li>Use <strong>FinanceModule</strong> to check statements and payments</li>
		<li>Check <strong>AffiliateModule</strong> for affiliate integrations</li>
		<li>Integrate SDK into cron jobs or backend services</li>
	</ul>

	<h2>💡 Tips</h2>
	<ul>
		<li>Always store `appSecret` securely (env variables recommended)</li>
		<li>Use async/await and proper error handling</li>
		<li>Refer to the <strong>Documentation</strong> for each module</li>
	</ul>

	<p class="mt-6">You're now ready to start building with TikTok Shop SDK!</p>
</div>
