<script lang="ts">
	import { _ } from '$lib/i18n';
	import { json } from 'svelte-i18n';
	import { Github, GitFork, Languages, ExternalLink } from 'lucide-svelte';

	interface FooterLink {
		label: string;
		href: string;
	}

	interface FooterOption {
		label: string;
		href: string;
	}

	interface FooterSection {
		title: string;
		links?: FooterLink[];
		options?: FooterOption[];
	}

	// Cast JSON from i18n to typed arrays
	$: languageSection = $json('footer.languages') as unknown as FooterSection;
	$: openSourceSection = $json('footer.openSource') as unknown as FooterSection;
	$: contributeSection = $json('footer.contribute') as unknown as FooterSection;
	$: tiktokAPISection = $json('footer.tiktokAPI') as unknown as FooterSection;

	$: sections = [
		{ icon: Languages, data: languageSection },
		{ icon: Github, data: openSourceSection },
		{ icon: GitFork, data: contributeSection },
		{ icon: ExternalLink, data: tiktokAPISection }
	];
</script>

<footer
	class="w-full border-t border-neutral-200 bg-white py-16 dark:border-neutral-800 dark:bg-neutral-950"
>
	<div class="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
		<!-- Grid: 4 Columns -->
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each sections as section (section.data.title)}
				<div class="space-y-4">
					<h3
						class="flex items-center gap-2 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
					>
						<svelte:component this={section.icon} class="h-4 w-4" />
						{section.data.title}
					</h3>

					{#if section.data.links}
						<ul class="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
							{#each section.data.links as link (link.href)}
								<li>
									<a
										href={link.href}
										target="_blank"
										class="flex items-center gap-2 hover:underline"
									>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					{:else if section.data.options}
						<ul class="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
							{#each section.data.options as option (option.href)}
								<li>
									<a href={option.href} class="hover:underline">{option.label}</a>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Copyright -->
		<div
			class="border-t border-neutral-200 pt-10 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
		>
			{$_('footer.copyright')}
		</div>
	</div>
</footer>
