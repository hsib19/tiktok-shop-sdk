<script lang="ts">
	import { SIDEBAR_MENU } from '$lib/constants/SidebarMenu';
	import { X, ChevronDown, ChevronRight } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { _ } from '$lib/i18n';
	import { stripLocale } from '$lib/utils/navigation';

	export let sidebarOpen = false;
	export let toggleSidebar: () => void = () => {};

	function isActive(href: string) {
		if (!href) return false;
		const current = stripLocale($page.url.pathname);
		const target = stripLocale(href);

		return current === target;
	}

	function isParentActive(children?: { href?: string }[]): boolean {
		if (!children) return false;
		return children.some((child) => isActive(child.href ?? ''));
	}

	let openMenus: Record<string, boolean> = {};
	for (const link of SIDEBAR_MENU) {
		if (link.children) {
			openMenus[link.titleKey] = true;
		}
	}

	function toggleMenu(title: string) {
		openMenus[title] = !openMenus[title];
	}

	function localized(href: string): string {
		const path = $page.url.pathname;
		const [, maybeLocale] = path.split('/');

		if (/^[a-z]{2}$/.test(maybeLocale)) {
			return `/${maybeLocale}${href}`;
		}
		return href;
	}
</script>

<aside
	class="fixed top-0 left-0 z-50 h-screen w-[250px] transform
        overflow-y-auto border-r border-gray-600 bg-white py-4
        transition-transform duration-300 dark:bg-dark-secondary
        {sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0"
>
	<button class="mb-4 rounded bg-gray-200 p-2 md:hidden" on:click={toggleSidebar}>
		<X class="h-5 w-5" />
	</button>

	<div class="text-center">
		<a href="/">
			<h2
				class="border-b border-b-border-light pb-3 text-2xl font-bold text-black dark:border-b-border-dark dark:text-white"
			>
				TikTok Shop SDK
			</h2>
		</a>
	</div>

	<ul class="mt-4 space-y-1 px-4">
		{#each SIDEBAR_MENU as link (link.titleKey)}
			<li>
				{#if link.children}
					<button
						on:click={() => toggleMenu(link.titleKey)}
						class="flex w-full cursor-pointer items-center justify-between rounded p-2 text-sm font-semibold transition-colors
                            {isParentActive(link.children)
							? 'bg-gray-100 text-blue-600 dark:bg-neutral-800'
							: 'text-gray-700 dark:text-gray-200'}"
					>
						<span>{$_(link.titleKey)}</span>
						{#if openMenus[link.titleKey]}
							<ChevronDown class="h-4 w-4" />
						{:else}
							<ChevronRight class="h-4 w-4" />
						{/if}
					</button>

					{#if openMenus[link.titleKey]}
						<ul class="mt-1 space-y-1 border-l border-gray-700/30 pl-3">
							{#each link.children as child (child.titleKey)}
								<li>
									<a
										href={localized(child.href ?? '/')}
										class="transition-colorstext-gray-600 block w-full cursor-pointer rounded px-2 py-1 text-left text-sm dark:text-gray-300"
									>
										{$_(child.titleKey)}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				{:else}
					<a
						href={localized(link.href ?? '/')}
						class:active={isActive(link.href ?? '')}
						class="block w-full cursor-pointer rounded p-2 text-left text-sm font-semibold text-gray-700 transition-colors dark:text-gray-200"
					>
						{$_(link.titleKey)}
					</a>
				{/if}
			</li>
		{/each}
	</ul>
</aside>

{#if sidebarOpen}
	<div
		class="fixed inset-0 z-30 bg-black opacity-25 md:hidden"
		role="button"
		tabindex="0"
		on:click={toggleSidebar}
		on:keydown={(e) => e.key === 'Enter' && toggleSidebar()}
	></div>
{/if}
