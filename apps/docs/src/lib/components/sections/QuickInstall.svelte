<script lang="ts">
	import { _ } from '$lib/i18n';
	import { json } from 'svelte-i18n';
	import { Copy, Check } from 'lucide-svelte';
	import { tick } from 'svelte';

	$: features = $json('quickLinks.features') as string[];

	let copied = {
		npm: false,
		pnpm: false,
		yarn: false
	};

	async function copyToClipboard(key: keyof typeof copied, command: string) {
		await navigator.clipboard.writeText(command);
		copied[key] = true;
		await tick();
		setTimeout(() => {
			copied[key] = false;
		}, 1000);
	}
</script>

<section class="w-full bg-white pt-8 dark:bg-neutral-950">
	<div
		class="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-[60%_40%] lg:px-8"
	>
		<!-- Left: Install Instructions -->
		<div class="space-y-6">
			<h2 class="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
				{$_('quickLinks.title')}
			</h2>
			<p class="text-lg text-neutral-700 dark:text-neutral-300">
				{$_('quickLinks.subtitle')}
			</p>

			<ul class="list-disc space-y-2 pl-6 text-neutral-700 dark:text-neutral-300">
				{#each features as feature (feature)}
					<li>{feature}</li>
				{/each}
			</ul>
		</div>

		<!-- Right: Install Code Blocks -->
		<div class="space-y-6">
			<!-- pnpm -->
			<div>
				<h3
					class="dark:text-neutral-400interactive-shadow mb-2 text-sm font-semibold tracking-wide text-neutral-500 uppercase"
				>
					pnpm
				</h3>
				<div
					class="interactive-shadow relative overflow-auto rounded-xl bg-white p-6 font-mono text-sm leading-relaxed dark:bg-neutral-900"
				>
					<button
						on:click={() => copyToClipboard('pnpm', 'pnpm add tiktok-shop-sdk')}
						class="absolute top-4 right-4 rounded p-2 transition hover:bg-neutral-200 dark:hover:bg-neutral-800"
						aria-label="Copy pnpm command"
					>
						{#if copied.pnpm}
							<Check class="h-4 w-4 text-green-600 dark:text-green-400" />
						{:else}
							<Copy class="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
						{/if}
					</button>
					<pre class="whitespace-pre-wrap text-neutral-800 dark:text-neutral-100"><code
							><span class="text-purple-600">pnpm</span> <span class="text-blue-500">add</span
							> <span class="text-rose-500">tiktok-shop-sdk</span></code
						></pre>
				</div>
			</div>

			<!-- npm -->
			<div>
				<h3
					class="mb-2 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
				>
					npm
				</h3>
				<div
					class="interactive-shadow relative overflow-auto rounded-xl bg-white p-6 font-mono text-sm leading-relaxed dark:bg-neutral-900"
				>
					<button
						on:click={() => copyToClipboard('npm', 'npm install tiktok-shop-sdk')}
						class="absolute top-4 right-4 rounded p-2 transition hover:bg-neutral-200 dark:hover:bg-neutral-800"
						aria-label="Copy npm command"
					>
						{#if copied.npm}
							<Check class="h-4 w-4 text-green-600 dark:text-green-400" />
						{:else}
							<Copy class="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
						{/if}
					</button>
					<pre class="whitespace-pre-wrap text-neutral-800 dark:text-neutral-100"><code
							><span class="text-purple-600">npm</span> <span class="text-blue-500">install</span
							> <span class="text-rose-500">tiktok-shop-sdk</span></code
						></pre>
				</div>
			</div>

			<!-- yarn -->
			<div>
				<h3
					class="mb-2 text-sm font-semibold tracking-wide text-neutral-500 uppercase transition-shadow duration-300 ease-in-out dark:text-neutral-400"
				>
					yarn
				</h3>
				<div
					class="interactive-shadow relative overflow-auto rounded-xl bg-white p-6 font-mono text-sm leading-relaxed dark:bg-neutral-900"
				>
					<button
						on:click={() => copyToClipboard('yarn', 'yarn add tiktok-shop-sdk')}
						class="absolute top-4 right-4 rounded p-2 transition hover:bg-neutral-200 dark:hover:bg-neutral-800"
						aria-label="Copy yarn command"
					>
						{#if copied.yarn}
							<Check class="h-4 w-4 text-green-600 dark:text-green-400" />
						{:else}
							<Copy class="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
						{/if}
					</button>
					<pre class="whitespace-pre-wrap text-neutral-800 dark:text-neutral-100"><code
							><span class="text-purple-600">yarn</span> <span class="text-blue-500">add</span
							> <span class="text-rose-500">tiktok-shop-sdk</span></code
						></pre>
				</div>
			</div>
		</div>
	</div>
</section>
