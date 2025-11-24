<script lang="ts">
	import { _, json } from '$lib/i18n';
	import { Github, Users, Star, GitBranch } from 'lucide-svelte';
	import ButtonCTA from '../ui/ButtonCTA.svelte';

	const icons = [Github, Star, GitBranch, Users];

	interface GitHubItem {
		title: string;
		description: string;
	}

	const githubItems: GitHubItem[] = $json('githubContentSection.items') as unknown as GitHubItem[];

	const iconColors = [
		{ light: 'text-blue-600', dark: 'dark:text-blue-400' },
		{ light: 'text-yellow-500', dark: 'dark:text-yellow-400' },
		{ light: 'text-green-600', dark: 'dark:text-green-400' },
		{ light: 'text-purple-600', dark: 'dark:text-purple-400' }
	];
</script>

<section class="w-full bg-white pt-13 dark:bg-neutral-950">
	<div class="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
		<!-- Title -->
		<div class="space-y-4 text-center">
			<h2 class="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
				{$_('githubSection.title')}
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-neutral-700 dark:text-neutral-300">
				{$_('githubSection.subtitle')}
			</p>
		</div>

		<!-- GitHub Stats Grid -->
		<div class="grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
			{#each githubItems as item, i (item.title)}
				<div class="interactive-shadow space-y-2 rounded-xl bg-white p-6 dark:bg-neutral-900">
					<svelte:component
						this={icons[i]}
						class={`mx-auto h-6 w-6 ${iconColors[i].light} ${iconColors[i].dark} transition-colors duration-200`}
					/>
					<p class="text-sm text-neutral-700 dark:text-neutral-300">{item.title}</p>
				</div>
			{/each}
		</div>

		<!-- CTA -->
		<div class="text-center">
			<ButtonCTA
				href="/docs/getting-started"
				label={$_('githubSection.cta')}
				size="lg"
				variant="primary"
				className="w-full md:w-auto"
			>
				<Github class="ml-2 h-4 w-4" />
			</ButtonCTA>
		</div>
	</div>
</section>
