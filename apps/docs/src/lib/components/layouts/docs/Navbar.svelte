<script lang="ts">
	import { goto } from '$app/navigation';
	import { changeLanguage } from '$lib/i18n/lang';
	import { theme } from '$lib/stores/theme';
	import { _, locale } from '$lib/i18n';
	import { get } from 'svelte/store';

	import { Menu, Sun, Moon, X, ChevronDown } from 'lucide-svelte';
	import { Id, Us } from 'svelte-flag-icons';

	export let toggleSidebar: () => void;

	const languages = [
		{ code: 'en', label: 'English', flag: Us },
		{ code: 'id', label: 'Indonesia', flag: Id }
	];

	let open = false;
	let mobileMenuOpen = false;

	const toggleMobileMenu = () => (mobileMenuOpen = !mobileMenuOpen);

	const toggleDark = () => {
		theme.set(get(theme) === 'dark' ? 'light' : 'dark');
	};

	function switchLang(lang: string) {
		locale.set(lang);
		changeLanguage(lang);

		// SSR-safe: avoid window during SSR
		if (typeof window !== 'undefined') {
			const path = window.location.pathname;
			const newPath = path.replace(/^\/(en|id)/, '');
			goto(`/${lang}${newPath}`, { replaceState: true });
		}

		open = false;
	}

	$: currentLanguage = languages.find((l) => l.code === $locale);
</script>

<nav
	class="fixed top-0 right-0 left-0 z-40 flex items-center justify-between border-b border-border-light bg-white px-4 py-4 shadow md:left-[250px] dark:border-border-dark dark:bg-dark-secondary"
>
	<!-- Left side -->
	<div class="flex items-center space-x-4">
		<button
			class="rounded bg-gray-200 p-2 md:hidden dark:bg-gray-700"
			on:click={toggleSidebar}
			aria-label="Toggle sidebar"
		>
			<Menu class="h-5 w-5" />
		</button>
		<div class="flex text-xl font-bold md:hidden">Tiktok Shop SDK</div>
	</div>

	<!-- Right side -->
	<div class="flex items-center space-x-8">
		<!-- Mobile burger -->
		<button
			class="rounded bg-gray-200 p-2 md:hidden dark:bg-gray-700"
			on:click={toggleMobileMenu}
			aria-label="Toggle mobile menu"
		>
			{#if mobileMenuOpen}
				<X class="h-5 w-5" />
			{:else}
				<Menu class="h-5 w-5" />
			{/if}
		</button>

		<!-- Desktop actions -->
		<div class="text-dark hidden items-center space-x-4 md:flex dark:text-white">
			<!-- Dark Mode -->
			<button class="mr-5 rounded" on:click={toggleDark} aria-label="Toggle dark mode">
				{#if $theme === 'dark'}<Sun class="h-5 w-5" />{:else}<Moon class="h-5 w-5" />{/if}
			</button>

			<!-- Language Dropdown -->
			<div class="relative">
				<button
					class="flex items-center space-x-2 rounded bg-transparent p-1"
					on:click={() => (open = !open)}
					aria-haspopup="true"
					aria-expanded={open}
				>
					<svelte:component this={currentLanguage?.flag} class="h-5 w-5" />
					<ChevronDown class="h-4 w-4" />
				</button>

				{#if open}
					<div
						class="absolute right-0 z-50 mt-2 w-40 rounded border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-neutral-950"
					>
						{#each languages as lang (lang.code)}
							<button
								class="flex w-full items-center space-x-2 rounded px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
								on:click={() => switchLang(lang.code)}
							>
								<lang.flag class="h-5 w-5" />
								<span>{lang.label}</span>
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Version -->
			<div class="text-gray-700 dark:text-gray-200">v1.0.0</div>
		</div>
	</div>
</nav>

<!-- Mobile Menu Slide -->
{#if mobileMenuOpen}
	<div class="flex flex-row flex-wrap space-x-2 bg-white p-4 shadow md:hidden dark:bg-neutral-950">
		<!-- Dark Mode Toggle -->
		<button
			class="rounded bg-gray-200 p-2 dark:bg-gray-700"
			on:click={toggleDark}
			aria-label="Toggle dark mode"
		>
			{#if $theme === 'dark'}<Sun class="h-5 w-5" />{:else}<Moon class="h-5 w-5" />{/if}
		</button>

		<!-- Language Selector -->
		<button
			class="flex items-center space-x-2 rounded bg-transparent p-1"
			on:click={() => (open = !open)}
			aria-haspopup="true"
			aria-expanded={open}
		>
			<svelte:component this={currentLanguage?.flag} class="h-5 w-5" />
			<ChevronDown class="h-4 w-4" />
		</button>

		<!-- Version -->
		<div class="text-lg text-gray-700 dark:text-gray-200">v1.0.0</div>
	</div>
{/if}
