<script lang="ts">
	import { _, json } from '$lib/i18n';
	import { Boxes, PackageCheck, ShieldCheck, RefreshCcw, Bug, PackagePlus } from 'lucide-svelte';

	interface FeatureItem {
		title: string;
		description: string;
	}

	const featureItems: FeatureItem[] = $json('featuresSection.items') as unknown as FeatureItem[];

	const icons = [Boxes, PackageCheck, ShieldCheck, RefreshCcw, Bug, PackagePlus];
</script>

<section class="w-full bg-white pt-13 dark:bg-neutral-950">
	<div class="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
		<!-- Title -->
		<div class="space-y-4 text-center">
			<h2 class="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
				{$_('featuresSection.title')}
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-neutral-700 dark:text-neutral-300">
				{$_('featuresSection.subtitle')}
			</p>
		</div>

		<!-- Feature Grid -->
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
			<!-- Order API -->
			{#each featureItems as feature, i (feature.title)}
				<div class="interactive-shadow space-y-3 rounded-xl bg-white p-6 dark:bg-neutral-900">
					<svelte:component this={icons[i]} class="h-6 w-6 text-blue-600 dark:text-blue-400" />
					<h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400">{feature.title}</h3>
					<p class="text-sm text-neutral-700 dark:text-neutral-300">
						{feature.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
