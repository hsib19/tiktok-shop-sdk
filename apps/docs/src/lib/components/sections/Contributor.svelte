<script lang="ts">
	import { onMount } from 'svelte';

	type Contributor = {
		login: string;
		avatar_url: string;
		html_url: string;
	};

	let contributors: Contributor[] = [];
	let loading = true;

	onMount(async () => {
		const res = await fetch('https://api.github.com/repos/hsib19/tiktok-shop-sdk/contributors');
		if (res.ok) {
			contributors = await res.json();
		}
		loading = false;
	});
</script>

<section class="w-full bg-white py-10 dark:bg-neutral-950">
	<div class="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
		<!-- Title -->
		<div class="space-y-2">
			<h2 class="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
				Contributors
			</h2>
			<p class="text-lg text-neutral-700 dark:text-neutral-300">
				Join us on GitHub and help improve the SDK.
			</p>
		</div>

		<!-- Contributor List -->
		<div class="space-y-6">
			{#if loading}
				{#each Array(4) as _, i (i)}
					<div class="flex animate-pulse items-center gap-4">
						<div class="h-12 w-12 rounded-full bg-neutral-200 dark:bg-neutral-800"></div>
						<div class="flex flex-col gap-1">
							<div class="h-4 w-24 rounded bg-neutral-200 dark:bg-neutral-800"></div>
							<div class="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-800"></div>
						</div>
					</div>
				{/each}
			{:else}
				{#each contributors as c, i (i)}
					<a
						href={c.html_url}
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center gap-4"
					>
						<img
							src={c.avatar_url}
							alt={c.login}
							class="h-12 w-12 rounded-full transition group-hover:scale-105"
						/>
						<div class="flex flex-col">
							<span class="text-sm font-medium text-neutral-900 dark:text-white">{c.login}</span>
							<span class="text-xs text-neutral-500 dark:text-neutral-400">@{c.login}</span>
						</div>
					</a>
				{/each}
			{/if}
		</div>
	</div>
</section>
