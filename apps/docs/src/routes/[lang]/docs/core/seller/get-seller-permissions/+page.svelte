<script lang="ts">
	import { onMount } from 'svelte';
	import { Store, FileSearch } from 'lucide-svelte';
	import { codeToHtml } from 'shiki';
	import { theme } from '$lib/stores/theme';

	let exampleCode = '';
	let responseJSON = '';

	const tsExample = `
import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

try {
  // Set Access Token
  sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);

  const response = await sdk.seller.getSellerPermissions();
  console.log(JSON.stringify(response));
} catch (error) {
  if (error instanceof TikTokAPIError) {
    console.error('TikTok API Error:', error.message);
    console.error('Status Code:', error.code);
    console.log('Request Id: ', error.request_id);
  } else {
    console.error('Unexpected error:', error);
  }
}
`;

	const jsonExample = `
{
  "code": 0,
  "data": {
    "permissions": [
      "MANAGE_GLOBAL_PRODUCT"
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
`;

	async function renderShiki() {
		const selectedTheme = $theme === 'dark' ? 'material-theme-darker' : 'github-light';

		exampleCode = await codeToHtml(tsExample, {
			lang: 'ts',
			themes: { dark: selectedTheme, light: selectedTheme }
		});

		responseJSON = await codeToHtml(jsonExample, {
			lang: 'json',
			themes: { dark: selectedTheme, light: selectedTheme }
		});
	}

	onMount(() => {
		document.title = 'Get Seller Permissions – TikTok Shop SDK';
		renderShiki();
	});

	$: if ($theme) renderShiki();
</script>

<div class="prose max-w-none space-y-10 prose-slate dark:prose-invert">
	<!-- Header -->
	<section class="space-y-2">
		<h1 class="flex items-center gap-2 text-3xl font-bold">
			<Store class="h-7 w-7 text-purple-500" />
			Get Seller Permissions
		</h1>

		<p class="text-lg">
			Retrieve the list of permissions granted to a seller account. This API is useful for verifying
			access scopes and managing feature availability in dashboards or automation flows.
		</p>
	</section>

	<hr />

	<!-- Requirements -->
	<section id="requirements" class="space-y-3">
		<h2 class="flex items-center gap-2">
			<FileSearch class="h-5 w-5 text-blue-500" />
			Requirements
		</h2>

		<ul>
			<li>A valid seller <strong>Access Token</strong></li>
			<li>Use <code>seller.getSellerPermissions()</code> from the SDK</li>
		</ul>

		<p>
			Official documentation:
			<a
				href="https://partner.tiktokshop.com/docv2/page/get-seller-permissions-202309"
				target="_blank"
				class="text-blue-600 underline dark:text-blue-400"
			>
				TikTok Shop – Get Seller Permissions
			</a>
		</p>
	</section>

	<hr />

	<!-- Usage Example -->
	<section id="usage" class="space-y-3">
		<h2 class="flex items-center gap-2">
			<Store class="h-5 w-5 text-green-500" />
			Usage Example
		</h2>

		<p>This example shows how to retrieve all permissions granted to a seller.</p>

		<div class="rounded-xl border border-border-light dark:border-border-dark">
			{@html exampleCode}
		</div>
	</section>

	<hr />

	<!-- Response Example -->
	<section id="response" class="space-y-3">
		<h2>Response Example</h2>

		<p>This is a real example returned by TikTok Shop:</p>

		<div class="overflow-hidden rounded-xl border border-border-light dark:border-border-dark">
			{@html responseJSON}
		</div>

		<p class="mt-3">The <code>permissions</code> array contains:</p>

		<ul>
			<li>
				<strong>permissions</strong> — list of permission codes granted to the seller (e.g., MANAGE_GLOBAL_PRODUCT)
			</li>
		</ul>
	</section>

	<hr />

	<!-- Errors -->
	<section id="errors" class="space-y-3">
		<h2>Error Handling</h2>

		<p>
			All API errors throw <code>TikTokAPIError</code>, which contains:
		</p>

		<ul>
			<li><strong>message</strong></li>
			<li><strong>code</strong></li>
			<li><strong>request_id</strong></li>
		</ul>

		<p>
			Full error reference:
			<a
				href="https://partner.tiktokshop.com/docv2/page/common-errors"
				target="_blank"
				class="text-blue-600 underline dark:text-blue-400"
			>
				TikTok Common Errors
			</a>
		</p>
	</section>
</div>
