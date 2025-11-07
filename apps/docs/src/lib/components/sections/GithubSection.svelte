<script lang="ts">
	import { Github, Users, Star, GitBranch } from 'lucide-svelte';
	import ButtonCTA from '../ui/ButtonCTA.svelte';
</script>

<section class="w-full bg-white py-16 dark:bg-neutral-950">
	<div class="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
		<!-- Title -->
		<div class="space-y-4 text-center">
			<h2 class="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
				Open Source & GitHub
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-neutral-700 dark:text-neutral-300">
				This SDK is fully open source—built for transparency, collaboration, and rapid iteration.
				Contributions are welcome!
			</p>
		</div>

		<!-- GitHub Stats Grid -->
		<div class="grid grid-cols-1 gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
			<div
				class="space-y-2 rounded-xl bg-white p-6 shadow-[0px_10px_50px_rgba(0,0,0,0.1)] dark:bg-neutral-900"
			>
				<Github class="mx-auto h-6 w-6 text-blue-600 dark:text-blue-400" />
				<p class="text-sm text-neutral-700 dark:text-neutral-300">MIT Licensed</p>
			</div>

			<div
				class="space-y-2 rounded-xl bg-white p-6 shadow-[0px_10px_50px_rgba(0,0,0,0.1)] dark:bg-neutral-900"
			>
				<Star class="mx-auto h-6 w-6 text-yellow-500 dark:text-yellow-400" />
				<p class="text-sm text-neutral-700 dark:text-neutral-300">Star us on GitHub</p>
			</div>

			<div
				class="space-y-2 rounded-xl bg-white p-6 shadow-[0px_10px_50px_rgba(0,0,0,0.1)] dark:bg-neutral-900"
			>
				<GitBranch class="mx-auto h-6 w-6 text-green-600 dark:text-green-400" />
				<p class="text-sm text-neutral-700 dark:text-neutral-300">Actively maintained</p>
			</div>

			<div
				class="space-y-2 rounded-xl bg-white p-6 shadow-[0px_10px_50px_rgba(0,0,0,0.1)] dark:bg-neutral-900"
			>
				<Users class="mx-auto h-6 w-6 text-purple-600 dark:text-purple-400" />
				<p class="text-sm text-neutral-700 dark:text-neutral-300">Open to contributors</p>
			</div>
		</div>

		<!-- CTA -->
		<div class="pt-8 text-center">
			<ButtonCTA
				href="/docs/getting-started"
				label="View on GitHub"
				size="lg"
				variant="primary"
				className="w-full md:w-auto"
			>
				<Github class="ml-2 h-4 w-4" />
			</ButtonCTA>
		</div>
	</div>
</section>
