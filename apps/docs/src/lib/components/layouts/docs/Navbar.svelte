<script lang="ts">
	import { Menu, Sun, Moon, Github, X } from 'lucide-svelte';

	// Sidebar toggle
	export let toggleSidebar: () => void;

	// Mobile navbar menu toggle
	let mobileMenuOpen = false;
	const toggleMobileMenu = () => (mobileMenuOpen = !mobileMenuOpen);

	// Dark Mode
	let darkMode = false;
	const toggleDarkMode = () => (darkMode = !darkMode);

	// Language
	const languages = ['EN', 'ID'];
	let currentLang = 'EN';
</script>

<nav
	class="fixed top-0 right-0 left-0 z-40 flex items-center justify-between bg-white p-4 shadow md:left-[250px] dark:bg-gray-800"
>
	<!-- Kiri: Sidebar burger + Logo -->
	<div class="flex items-center space-x-4">
		<button
			class="rounded bg-gray-200 p-2 md:hidden dark:bg-gray-700"
			on:click={toggleSidebar}
			aria-label="Toggle sidebar"
		>
			<Menu class="h-5 w-5" />
		</button>
		<div class="text-xl font-bold">Tiktok Shop SDK</div>
	</div>

	<!-- Kanan: Mobile menu burger + Desktop menu -->
	<div class="flex items-center space-x-4">
		<!-- Mobile menu burger -->
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

		<!-- Desktop menu links + actions -->
		<div class="hidden items-center space-x-4 md:flex">
			<!-- Dark Mode -->
			<button
				class="rounded bg-gray-200 p-2 dark:bg-gray-700"
				on:click={toggleDarkMode}
				aria-label="Toggle dark mode"
			>
				{#if darkMode}<Sun class="h-5 w-5" />{:else}<Moon class="h-5 w-5" />{/if}
			</button>

			<!-- Language -->
			<select
				bind:value={currentLang}
				class="rounded bg-gray-200 p-1 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
				aria-label="Select language"
			>
				{#each languages as lang (lang)}<option value={lang}>{lang}</option>{/each}
			</select>

			<!-- GitHub -->
			<a
				href="https://github.com"
				target="_blank"
				class="rounded bg-gray-200 p-2 dark:bg-gray-700"
				aria-label="Github"
			>
				<Github class="h-5 w-5" />
			</a>

			<!-- Version -->
			<div class="text-gray-700 dark:text-gray-200">v1.0.0</div>
		</div>
	</div>
</nav>

<!-- Mobile Menu Slide -->
{#if mobileMenuOpen}
	<div class="flex flex-row flex-wrap space-x-2 bg-white p-4 shadow md:hidden dark:bg-gray-800">
		<!-- Dark Mode Toggle -->
		<button
			class="rounded bg-gray-200 p-2 dark:bg-gray-700"
			on:click={toggleDarkMode}
			aria-label="Toggle dark mode"
		>
			{#if darkMode}<Sun class="h-5 w-5" />{:else}<Moon class="h-5 w-5" />{/if}
		</button>

		<!-- Language Selector -->
		<select
			bind:value={currentLang}
			class="rounded bg-gray-200 p-2 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
			aria-label="Select language"
		>
			{#each languages as lang (lang)}<option value={lang}>{lang}</option>{/each}
		</select>

		<!-- GitHub Icon -->
		<a
			href="https://github.com"
			target="_blank"
			class="rounded bg-gray-200 p-2 dark:bg-gray-700"
			aria-label="Github"
		>
			<Github class="h-5 w-5" />
		</a>

		<!-- Version -->
		<div class="text-lg text-gray-700 dark:text-gray-200">v1.0.0</div>
	</div>
{/if}
