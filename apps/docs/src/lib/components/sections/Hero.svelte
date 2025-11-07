<script lang="ts">
	import ButtonCTA from '../ui/ButtonCTA.svelte';
	import { ArrowRight, Github } from 'lucide-svelte';
</script>

<section class="w-full bg-white pt-23 md:pt-40 dark:bg-neutral-950">
	<div
		class="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-[50%_50%] lg:px-8"
	>
		<!-- Left: Text -->
		<div class="space-y-6">
			<h1 class="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
				Modular TikTok Shop SDK for Node.js and Web Frameworks
			</h1>
			<p class="my-10 text-xl text-neutral-700 dark:text-neutral-300">
				A lightweight SDK that simplifies TikTok Shop API usage for developers—no boilerplate, no
				guesswork.
			</p>

			<!-- CTA Buttons -->
			<div class="flex flex-row gap-4">
				<ButtonCTA
					href="/docs/getting-started"
					label="Get Started"
					size="lg"
					variant="primary"
					className="w-full md:w-auto"
				>
					<ArrowRight class="ml-2 h-5 w-5" />
				</ButtonCTA>

				<ButtonCTA
					href="https://github.com/hsib19/tiktok-shop-sdk"
					label="See Code"
					size="lg"
					variant="outline"
					className="w-full md:w-auto"
				>
					<Github class="ml-2 h-5 w-5" />
				</ButtonCTA>
			</div>
		</div>

		<!-- Right: Code Example -->
		<div
			class="interactive-shadow rounded-xl bg-white p-8 font-mono text-sm leading-relaxed dark:bg-neutral-900"
		>
			<pre class="whitespace-pre-wrap text-neutral-800 dark:text-neutral-100"><code
					><span class="text-purple-600">import</span> &#123; <span class="text-blue-500"
						>TikTokShopSDK</span
					>, <span class="text-blue-500">TikTokAPIError</span> &#125; <span class="text-purple-600"
						>from</span
					> <span class="text-rose-500">'tiktok-shop-sdk'</span>;
<br /><span class="text-purple-600">const</span> sdk = <span class="text-purple-600">new</span
					> <span class="text-blue-500">TikTokShopSDK</span>(&#123;<br />&nbsp;&nbsp;appKey: <span
						class="text-blue-500">env</span
					>.<span class="text-blue-500">TIKTOK_APP_KEY</span>!,<br />&nbsp;&nbsp;appSecret: <span
						class="text-blue-500">env</span
					>.<span class="text-blue-500">TIKTOK_APP_SECRET</span>!,
&#125;);</code
				></pre>
		</div>
	</div>
</section>
