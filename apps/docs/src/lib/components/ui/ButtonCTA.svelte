<script lang="ts">
	import { clsx } from 'clsx';
	import { theme } from '$lib/stores/theme';

	export let href: string = '/docs/getting-started';
	export let label: string = 'Get Started';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let variant: 'primary' | 'outline' = 'primary';
	export let className: string = '';

	// reactive shadow color berdasarkan store $theme
	$: shadowColor =
		$theme === 'dark'
			? 'rgba(37, 99, 235, 0.35)' // dark mode
			: variant === 'primary'
				? 'rgba(37, 99, 235, 0.35)' // primary light
				: 'rgba(0, 0, 0, 0.15)'; // outline light
</script>

<a
	{href}
	class={clsx(
		'inline-flex items-center rounded-xl font-medium transition focus:outline-none',
		size === 'sm' && 'px-3 py-1 text-sm',
		size === 'md' && 'px-4 py-2 text-base',
		size === 'lg' && 'px-6 py-3 text-lg',
		variant === 'primary'
			? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
			: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500 dark:hover:bg-neutral-900',
		'shadow-[0px_1rem_3rem_var(--cta-shadow-color)]',
		className
	)}
	style={`--cta-shadow-color: ${shadowColor};`}
>
	{label}
	<slot />
</a>
