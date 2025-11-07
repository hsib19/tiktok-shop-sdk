<script lang="ts">
	import { Github, GitFork, Languages, ExternalLink } from 'lucide-svelte';
</script>

<footer
	class="w-full border-t border-neutral-200 bg-white py-16 dark:border-neutral-800 dark:bg-neutral-950"
>
	<div class="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
		<!-- Grid: 4 Columns -->
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			<!-- Languages -->
			<div class="space-y-4">
				<h3
					class="flex items-center gap-2 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
				>
					<Languages class="h-4 w-4" />
					Languages
				</h3>
				<ul class="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
					<li><a href="/en" class="hover:underline">English</a></li>
					<li><a href="/id" class="hover:underline">Indonesia</a></li>
				</ul>
			</div>

			<!-- Open Source -->
			<div class="space-y-4">
				<h3
					class="flex items-center gap-2 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
				>
					<Github class="h-4 w-4" />
					Open Source
				</h3>
				<ul class="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
					<li>
						<a
							href="https://github.com/hsib19/tiktok-shop-sdk"
							target="_blank"
							class="flex items-center gap-2 hover:underline">Source on GitHub</a
						>
					</li>
					<li>
						<a
							href="https://github.com/hsib19/tiktok-shop-sdk/issues"
							target="_blank"
							class="flex items-center gap-2 hover:underline">Issues</a
						>
					</li>
					<li>
						<a
							href="https://github.com/hsib19/tiktok-shop-sdk/pulls"
							target="_blank"
							class="flex items-center gap-2 hover:underline">Pull Request</a
						>
					</li>
				</ul>
			</div>

			<!-- Contribute -->
			<div class="space-y-4">
				<h3
					class="flex items-center gap-2 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
				>
					<GitFork class="h-4 w-4" />
					Contribute
				</h3>
				<ul class="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
					<li>
						<a
							href="https://github.com/hsib19/tiktok-shop-sdk/fork"
							target="_blank"
							class="flex items-center gap-2 hover:underline">Fork on GitHub</a
						>
					</li>
					<li>
						<a
							href="https://github.com/hsib19/tiktok-shop-sdk/fork?target=website"
							target="_blank"
							class="flex items-center gap-2 hover:underline">Fork the Website</a
						>
					</li>
					<li>
						<a
							href="https://github.com/hsib19/tiktok-shop-sdk/issues/new"
							target="_blank"
							class="flex items-center gap-2 hover:underline">Create an Issue</a
						>
					</li>
				</ul>
			</div>

			<!-- TikTok Shop API -->
			<div class="space-y-4">
				<h3
					class="flex items-center gap-2 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
				>
					<ExternalLink class="h-4 w-4" />
					TikTok Shop API
				</h3>
				<ul class="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
					<li>
						<a
							href="htthttps://partner.tiktokshop.com/docv2/page/tts-developer-guide"
							target="_blank"
							class="hover:underline">Official Portal</a
						>
					</li>
					<li>
						<a
							href="https://partner.tiktokshop.com/docv2/page/get-authorized-category-assets-202405"
							target="_blank"
							class="hover:underline">API Docs</a
						>
					</li>
					<li>
						<a
							href="https://partner.tiktokshop.com/docv2/page/17-shoppable-content-posting"
							target="_blank"
							class="hover:underline">Webhook Guide</a
						>
					</li>
				</ul>
			</div>
		</div>

		<!-- Copyright -->
		<div
			class="border-t border-neutral-200 pt-10 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
		>
			© 2025 Hasib Muharam. All content is MIT licensed and open for contribution.
		</div>
	</div>
</footer>
