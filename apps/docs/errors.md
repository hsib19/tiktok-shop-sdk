# Errors & Troubleshooting

Learn how to handle errors when using the **TikTok Shop SDK**. Proper error handling is essential for building stable and reliable applications.

---

## Example: Handling TikTok API Errors

Use `TikTokAPIError` to catch API-related errors and inspect details such as status codes and request IDs.

```ts
import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

async function main() {
  try {
    const response = await sdk.auth.getAccessToken({
      auth_code: process.env.TIKTOK_AUTH_CODE!,
      grant_type: 'authorized_code',
    });
    console.log(response.data?.access_token);
  } catch (error) {
    if (error instanceof TikTokAPIError) {
      console.error('TikTok API Error:', error.message);
      console.error('Status Code:', error.code);
      console.log('Request Id:', error.request_id);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}
```

---

## Official Reference

For a full list of common errors and their explanations, refer to the official
[TikTok Shop Common Errors documentation.](https://partner.tiktokshop.com/docv2/page/common-errors)

---

## Tips

- Always wrap SDK calls in `try/catch`.
- Log error details, but never expose your `appSecret`.
- Use `instanceof TikTokAPIError` to differentiate API errors from other kinds of errors.
- Implement retries for network-related errors when appropriate.
