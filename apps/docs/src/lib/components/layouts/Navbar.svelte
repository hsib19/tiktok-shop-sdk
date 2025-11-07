<script lang="ts">
	import { Moon, Sun, ChevronDown } from 'lucide-svelte';
	import { theme } from '$lib/stores/theme';
	import { get } from 'svelte/store';

	import { resolve } from '$app/paths';

	let lang = 'EN';
	let showLangDropdown = false;

	const toggleDark = () => {
		theme.set(get(theme) === 'dark' ? 'light' : 'dark');
	};

	const toggleLangDropdown = () => {
		showLangDropdown = !showLangDropdown;
	};

	const setLang = (value: string) => {
		lang = value;
		showLangDropdown = false;
	};
</script>

<nav class="sticky top-0 z-50 bg-white py-3 dark:bg-neutral-950">
	<div
		class="mx-auto flex h-auto max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 md:h-16 md:gap-0 lg:px-8"
	>
		<!-- Brand -->
		<a
			href={resolve('/')}
			class="flex items-center gap-2 text-2xl font-bold text-neutral-900 dark:text-white"
		>
			TIKTOK SHOP SDK
			<span
				class="rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
				>Unofficial</span
			>
		</a>

		<!-- Toggles -->
		<div class="relative flex items-center gap-4">
			<!-- Dark Mode Toggle -->
			<button
				on:click={toggleDark}
				aria-label="Toggle dark mode"
				class="rounded p-2 text-neutral-800 dark:text-yellow-500"
			>
				{#if $theme === 'dark'}
					<Sun class="h-5 w-5" />
				{:else}
					<Moon class="h-5 w-5" />
				{/if}
			</button>

			<!-- Language Dropdown -->
			<div class="relative">
				<button
					on:click={toggleLangDropdown}
					class="flex items-center gap-1 rounded border border-neutral-200 px-3 py-1 text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
					aria-label="Toggle language dropdown"
				>
					{lang}
					<ChevronDown class="h-4 w-4" />
				</button>

				{#if showLangDropdown}
					<div
						class="absolute right-0 z-10 mt-2 w-24 rounded border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
					>
						<button
							on:click={() => setLang('EN')}
							class="w-full px-3 py-2 text-left text-sm hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800"
						>
							English
						</button>
						<button
							on:click={() => setLang('ID')}
							class="w-full px-3 py-2 text-left text-sm hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800"
						>
							Indonesia
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</nav>
