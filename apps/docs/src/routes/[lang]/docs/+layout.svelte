<script lang="ts">
	import Sidebar from '$lib/components/layouts/docs/Sidebar.svelte';
	import Navbar from '$lib/components/layouts/docs/Navbar.svelte';
	import Footer from '$lib/components/layouts/docs/Footer.svelte';

	const sidebarLinks = [
		{ title: 'Introduction', href: '#intro' },
		{ title: 'Getting Started', href: '#getting-started' },
		{ title: 'API Reference', href: '#api' },
		{ title: 'FAQ', href: '#faq' }
	];

	// Sidebar toggle mobile
	let sidebarOpen = false;
	const toggleSidebar = () => (sidebarOpen = !sidebarOpen);
</script>

<div class="flex min-h-screen">
	<!-- Sidebar -->
	<Sidebar links={sidebarLinks} {sidebarOpen} {toggleSidebar} />

	<!-- Main content -->
	<div class="mt-16 flex flex-1 flex-col md:ml-[250px]">
		<!-- Navbar -->
		<Navbar {toggleSidebar} />

		<!-- Content -->
		<main class="flex-1 overflow-auto p-6">
			<slot />
		</main>

		<!-- Footer -->
		<Footer />
	</div>
</div>
