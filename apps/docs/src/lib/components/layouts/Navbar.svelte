<script lang="ts">
	import { onMount } from 'svelte';
	import { Moon, Sun, ChevronDown, Menu, X } from 'lucide-svelte';
	import { theme } from '$lib/stores/theme';
	import { get } from 'svelte/store';
	import { resolve } from '$app/paths';

	// i18n imports
	import { _, locale, locales } from '$lib/i18n';
	import { changeLanguage } from '$lib/i18n/lang';

	let showLangDropdown = false;
	let lastScroll = 0;
	let showNavbar = true;
	let mobileMenuOpen = false;

	const toggleDark = () => {
		theme.set(get(theme) === 'dark' ? 'light' : 'dark');
	};

	const toggleLangDropdown = () => {
		showLangDropdown = !showLangDropdown;
	};

	const toggleMobileMenu = () => {
		mobileMenuOpen = !mobileMenuOpen;
	};

	onMount(() => {
		const handleScroll = () => {
			const currentScroll = window.scrollY;
			if (currentScroll < lastScroll) showNavbar = true;
			else if (currentScroll > lastScroll + 10) showNavbar = false;
			lastScroll = currentScroll;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<nav
	class="fixed top-0 right-0 left-0 z-50 bg-white py-4 shadow-[0px_10px_50px_rgba(0,0,0,0.1)]
           transition-transform duration-300 ease-in-out dark:bg-neutral-950"
	class:!-translate-y-full={!showNavbar}
>
	<div
		class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 md:h-16 lg:px-8"
	>
		<!-- Brand -->
		<a
			href={resolve('/')}
			class="flex items-center gap-2 text-2xl font-bold text-neutral-900 dark:text-white"
		>
			TIKTOK SHOP SDK
			<span
				class="rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
			>
				Unofficial
			</span>
		</a>

		<!-- Desktop menu -->
		<div class="hidden items-center gap-4 md:flex">
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
					{($locale ?? 'en').toUpperCase()}
					<ChevronDown class="h-4 w-4" />
				</button>

				{#if showLangDropdown}
					<div
						class="absolute right-0 z-10 mt-2 w-24 rounded border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
					>
						{#each $locales as langOption (langOption)}
							<button
								on:click={() => {
									changeLanguage(langOption);
									showLangDropdown = false;
								}}
								class="w-full px-3 py-2 text-left text-sm hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800"
							>
								{langOption === 'en' ? 'English' : 'Indonesia'}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<!-- Mobile hamburger -->
		<div class="flex items-center md:hidden">
			<button on:click={toggleMobileMenu} class="rounded p-2 text-neutral-800 dark:text-white">
				{#if mobileMenuOpen}
					<X class="h-6 w-6" />
				{:else}
					<Menu class="h-6 w-6" />
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if mobileMenuOpen}
		<div
			class="mt-5 border-t border-neutral-200 bg-white pt-3 shadow-lg md:hidden dark:border-neutral-700 dark:bg-neutral-950"
		>
			<div class="text-dark flex flex-col gap-2 px-4 py-4 dark:text-white">
				<button
					on:click={toggleDark}
					class="flex items-center gap-2 rounded p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
				>
					{#if $theme === 'dark'}<Sun class="h-5 w-5" />{:else}<Moon class="h-5 w-5" />{/if}
				</button>

				<!-- Mobile language options -->
				{#each $locales as langOption (langOption)}
					<button
						on:click={() => {
							changeLanguage(langOption);
							showLangDropdown = false;
						}}
						class="rounded p-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800"
					>
						{langOption === 'en' ? 'English' : 'Indonesia'}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</nav>
