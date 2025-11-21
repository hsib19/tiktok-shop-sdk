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
  sdk.setShopCipher(process.env.TIKTOK_SHOP_CIPHER!);

  const response = await sdk.event.getShopWebhooks();

  console.log(response);
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
    "webhooks": [
      {
        "event_type": "ORDER_STATUS_CHANGE",
        "address": "https://partner.tiktokshop.com",
        "create_time": 1635338186,
        "update_time": 1635338186
      }
    ],
    "total_count": 1
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
        document.title = 'Get Shop Webhooks – TikTok Shop SDK';
        renderShiki();
    });

    $: if ($theme) renderShiki();
</script>

<div class="prose max-w-none space-y-10 prose-slate dark:prose-invert">
    <!-- Header -->
    <section class="space-y-2">
        <h1 class="flex items-center gap-2 text-3xl font-bold">
            <Store class="h-7 w-7 text-purple-500" />
            Get Shop Webhooks
        </h1>

        <p class="text-lg">
            Retrieve all webhook subscriptions configured for a shop. Useful for monitoring events such
            as order status changes, product updates, and logistics notifications.
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
            <li>A valid <strong>Shop Cipher</strong> (encrypted shop identifier)</li>
            <li>Use <code>event.getShopWebhooks()</code> from the SDK</li>
        </ul>

        <p>
            Official documentation:
            <a
                href="https://partner.tiktokshop.com/docv2/page/get-shop-webhooks-202309"
                target="_blank"
                class="text-blue-600 underline dark:text-blue-400"
            >
                TikTok Shop – Get Shop Webhooks
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

        <p>This example shows how to retrieve all webhook subscriptions for a shop.</p>

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

        <p class="mt-3">Each <code>webhooks</code> entry contains:</p>

        <ul>
            <li><strong>event_type</strong> — type of event (e.g., ORDER_STATUS_CHANGE)</li>
            <li><strong>address</strong> — webhook callback URL</li>
            <li><strong>create_time</strong> — creation timestamp (Unix)</li>
            <li><strong>update_time</strong> — last update timestamp (Unix)</li>
        </ul>

        <p><strong>total_count</strong> indicates the number of webhooks configured for the shop.</p>
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
