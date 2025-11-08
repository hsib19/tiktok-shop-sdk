<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import ButtonCTA from '$lib/components/ui/ButtonCTA.svelte';
	import { _ } from '$lib/i18n';

	onMount(async () => {
		await import('@lottiefiles/lottie-player');
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>404 – Page Not Found</title>
</svelte:head>

<div
	class="flex h-screen w-full flex-col items-center justify-center bg-white px-4 py-24 text-center text-gray-900 dark:bg-neutral-900 dark:text-white"
	role="alert"
	aria-labelledby="error-title"
	aria-describedby="error-message"
>
	<lottie-player
		src="/404-animation.json"
		background="transparent"
		speed="1"
		autoplay
		loop
		style="width: 100%; max-width: 320px; height: auto"
		aria-hidden="true"
		title="Lost in space animation"
	>
	</lottie-player>

	<h1 id="error-title" class="mt-6 text-6xl font-bold tracking-tight">404</h1>
	<p id="error-message" class="my-10 mt-4 max-w-md text-xl">
		{$_('pages.404_message')}
	</p>

	<ButtonCTA
		href="/"
		label={$_('pages.404_back')}
		size="lg"
		variant="primary"
		className="w-full md:w-auto"
	></ButtonCTA>
</div>
