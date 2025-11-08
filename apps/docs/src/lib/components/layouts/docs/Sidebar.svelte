<script lang="ts">
	import { X } from 'lucide-svelte';

	export let links: { title: string; href: string }[] = [];

	export let sidebarOpen: boolean = false;
	export let toggleSidebar: () => void = () => {};
</script>

<!-- Sidebar -->
<aside
	class="fixed top-0 left-0 z-50 h-screen w-[250px] transform overflow-y-auto
         bg-gray-100 p-4 transition-transform duration-300
         md:translate-x-0 dark:bg-gray-900
         {sidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-40"
>
	<!-- Close button mobile -->
	<button class="mb-4 rounded bg-gray-200 p-2 md:hidden" on:click={toggleSidebar}>
		<X class="h-5 w-5" />
	</button>

	<ul class="mt-10 space-y-2 md:mt-0">
		{#each links as link (link)}
			<li>
				<a
					href={link.href}
					class="block rounded p-2 text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800"
				>
					{link.title}
				</a>
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
