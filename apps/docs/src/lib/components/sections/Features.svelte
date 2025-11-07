<script lang="ts">
	import { Boxes, PackageCheck, ShieldCheck, RefreshCcw, Bug, PackagePlus } from 'lucide-svelte';
</script>

<section class="w-full bg-white pt-10 dark:bg-neutral-950">
	<div class="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
		<!-- Title -->
		<div class="space-y-4 text-center">
			<h2 class="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
				Supported Features
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-neutral-700 dark:text-neutral-300">
				The SDK covers essential TikTok Shop APIs with clear methods and built-in types—ready for
				production use.
			</p>
		</div>

		<!-- Feature Grid -->
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
			<!-- Order API -->
			<div class="interactive-shadow space-y-3 rounded-xl bg-white p-6 dark:bg-neutral-900">
				<Boxes class="h-6 w-6 text-blue-600 dark:text-blue-400" />
				<h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400">Order API</h3>
				<p class="text-sm text-neutral-700 dark:text-neutral-300">
					Fetch, filter, and paginate orders with full type safety and error handling.
				</p>
			</div>

			<!-- Product Sync -->
			<div class="interactive-shadow space-y-3 rounded-xl bg-white p-6 dark:bg-neutral-900">
				<PackageCheck class="h-6 w-6 text-blue-600 dark:text-blue-400" />
				<h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400">Product Sync</h3>
				<p class="text-sm text-neutral-700 dark:text-neutral-300">
					Sync product listings, update inventory, and manage SKUs programmatically.
				</p>
			</div>

			<!-- Webhook Verification -->
			<div class="interactive-shadow space-y-3 rounded-xl bg-white p-6 dark:bg-neutral-900">
				<ShieldCheck class="h-6 w-6 text-blue-600 dark:text-blue-400" />
				<h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400">Webhook Verification</h3>
				<p class="text-sm text-neutral-700 dark:text-neutral-300">
					Verify incoming webhooks with built-in signature validation and timestamp checks.
				</p>
			</div>

			<!-- Token Refresh -->
			<div class="interactive-shadow space-y-3 rounded-xl bg-white p-6 dark:bg-neutral-900">
				<RefreshCcw class="h-6 w-6 text-blue-600 dark:text-blue-400" />
				<h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400">Token Refresh</h3>
				<p class="text-sm text-neutral-700 dark:text-neutral-300">
					Automatically refresh expired tokens using secure OAuth2 flows.
				</p>
			</div>

			<!-- Error Types -->
			<div class="interactive-shadow space-y-3 rounded-xl bg-white p-6 dark:bg-neutral-900">
				<Bug class="h-6 w-6 text-blue-600 dark:text-blue-400" />
				<h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400">Error Types</h3>
				<p class="text-sm text-neutral-700 dark:text-neutral-300">
					Catch and classify API errors with typed exceptions like <code>TikTokAPIError</code>.
				</p>
			</div>

			<!-- Modular Imports -->
			<div class="interactive-shadow space-y-3 rounded-xl bg-white p-6 dark:bg-neutral-900">
				<PackagePlus class="h-6 w-6 text-blue-600 dark:text-blue-400" />
				<h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400">Modular Imports</h3>
				<p class="text-sm text-neutral-700 dark:text-neutral-300">
					Import only what you need—no unused code, no bloated bundles.
				</p>
			</div>
		</div>
	</div>
</section>
