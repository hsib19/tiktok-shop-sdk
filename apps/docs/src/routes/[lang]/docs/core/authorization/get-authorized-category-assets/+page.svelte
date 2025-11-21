<script lang="ts">
	import { onMount } from 'svelte';
	import { Shield, FileSearch } from 'lucide-svelte';
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
    // Set Access Token (required for seller-level APIs)
    sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);

    // Fetch authorized category assets
    const response = await sdk.shop.getCategoryAssets({
      category_type: 1,   // 1 = Product Category
      page_number: 1,
      page_size: 50
    });

    console.log("Authorized Categories:", response.data);
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
    "category_assets": [
      {
        "cipher": "TTP_XF90igAAAABh0sddwer0qsWgt233vOiG",
        "target_market": "US",
        "category": {
          "id": 3,
          "name": "Customer Support"
        }
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
		document.title = 'Get Authorized Category Assets – TikTok Shop SDK';
		renderShiki();
	});

	$: if ($theme) renderShiki();
</script>

<div class="prose max-w-none space-y-10 prose-slate dark:prose-invert">
	<!-- Header -->
	<section class="space-y-2">
		<h1 class="flex items-center gap-2 text-3xl font-bold">
			<Shield class="h-7 w-7 text-purple-500" />
			Get Authorized Category Assets
		</h1>

		<p class="text-lg">
			Retrieve seller-authorized product categories using the
			<strong>TikTok Shop SDK</strong>. This API is commonly used in product creation workflows to
			ensure only approved categories can be selected.
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
			<li>App must have category authorization from the seller</li>
			<li>Use <code>shop.getCategoryAssets()</code> from the SDK</li>
		</ul>

		<p>
			Official API reference:
			<a
				href="https://partner.tiktokshop.com/docv2/page/get-authorized-category-assets-202405"
				target="_blank"
				class="text-blue-600 underline dark:text-blue-400"
			>
				TikTok Shop – Get Authorized Category Assets
			</a>
		</p>
	</section>

	<hr />

	<!-- Usage Example -->
	<section id="usage" class="space-y-3">
		<h2 class="flex items-center gap-2">
			<Shield class="h-5 w-5 text-green-500" />
			Usage Example
		</h2>

		<p>This example shows how to retrieve authorized product categories.</p>

		<div class="rounded-xl border border-border-light dark:border-border-dark">
			{@html exampleCode}
		</div>
	</section>

	<hr />

	<!-- Response Example -->
	<section id="response" class="space-y-3">
		<h2>Response Example</h2>

		<p>This is a real example returned from TikTok Shop:</p>

		<div class="overflow-hidden rounded-xl border border-border-light dark:border-border-dark">
			{@html responseJSON}
		</div>

		<p class="mt-3">Each <code>category_assets</code> entry contains:</p>

		<ul>
			<li><strong>cipher</strong> — encrypted identifier</li>
			<li><strong>target_market</strong> — marketplace (e.g. US)</li>
			<li><strong>category.id</strong> — category numeric ID</li>
			<li><strong>category.name</strong> — readable category name</li>
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
			Full list of TikTok error codes:
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
