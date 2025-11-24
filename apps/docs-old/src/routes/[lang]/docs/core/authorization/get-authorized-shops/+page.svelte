<script lang="ts">
	import { onMount } from 'svelte';
	import { Store, FileSearch } from 'lucide-svelte';
	import { codeToHtml } from 'shiki';
	import { theme } from '$lib/stores/theme';

	let exampleCode = '';
	let responseJSON = '';

	const tsExample = `
import { TikTokShopSDK, TikTokAPIError } from "tiktok-shop-sdk";

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

async function main() {
  try {
    // Set Access Token (seller-level)
    sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);

    // Get authorized shops
    const response = await sdk.shop.getAuthorizedShops();

    console.log("Authorized Shops:", response.data);
  } catch (error) {
    if (error instanceof TikTokAPIError) {
      console.error("TikTok API Error:", error.message);
      console.error("Status Code:", error.code);
      console.error("Request ID:", error.request_id);
    } else {
      console.error("Unexpected Error:", error);
    }
  }
}

main();
`;

	const jsonExample = `
{
  "code": 0,
  "data": {
    "shops": [
      {
        "id": "7000714532876273420",
        "name": "Maomao beauty shop",
        "region": "GB",
        "seller_type": "CROSS_BORDER",
        "cipher": "GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3",
        "code": "CNGBCBA4LLU8"
      }
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
			themes: {
				dark: selectedTheme,
				light: selectedTheme
			}
		});

		responseJSON = await codeToHtml(jsonExample, {
			lang: 'json',
			themes: {
				dark: selectedTheme,
				light: selectedTheme
			}
		});
	}

	onMount(() => {
		document.title = 'Get Authorized Shops – TikTok Shop SDK';
		renderShiki();
	});

	$: if ($theme) renderShiki();
</script>

<div class="prose max-w-none space-y-10 prose-slate dark:prose-invert">
	<!-- Header -->
	<section class="space-y-2">
		<h1 class="flex items-center gap-2 text-3xl font-bold">
			<Store class="h-7 w-7 text-purple-500" />
			Get Authorized Shops
		</h1>

		<p class="text-lg">
			Retrieve a list of shops that have authorized your TikTok Shop application. This API is
			commonly used for multi-store dashboards, automation systems, and account management flows.
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
			<li>The seller must authorize your app</li>
			<li>Use <code>shop.getAuthorizedShops()</code> from the SDK</li>
		</ul>

		<p>
			Official documentation:
			<a
				href="https://partner.tiktokshop.com/docv2/page/get-authorized-shops-202309"
				target="_blank"
				class="text-blue-600 underline dark:text-blue-400"
			>
				TikTok Shop – Get Authorized Shops
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

		<p>This example shows how to retrieve all shops authorized by a seller.</p>

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

		<p class="mt-3">Each <code>shops</code> entry contains:</p>

		<ul>
			<li><strong>code</strong> — API status code (0 means success)</li>

			<li><strong>data</strong> — container object holding the main response data</li>

			<ul>
				<li><strong>shops</strong> — list of authorized or connected shops</li>

				<ul>
					<li><strong>id</strong> — unique shop identifier</li>
					<li><strong>name</strong> — shop display name</li>
					<li><strong>region</strong> — marketplace region (e.g., GB, US, ID)</li>
					<li><strong>seller_type</strong> — type of seller (e.g., CROSS_BORDER, LOCAL)</li>
					<li><strong>cipher</strong> — encrypted shop identifier provided by TikTok</li>
					<li><strong>code</strong> — authorization code associated with the shop</li>
				</ul>
			</ul>

			<li><strong>message</strong> — response message (e.g., "Success")</li>
			<li><strong>request_id</strong> — unique identifier for the API request</li>
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
