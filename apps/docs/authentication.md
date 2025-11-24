# TikTok Shop SDK Authentication

Learn how to authenticate your application with TikTok Shop and obtain access tokens to start using the SDK.

---

## 1. Obtain TikTok Auth Code

Before using the SDK, you need a `TIKTOK_AUTH_CODE`. This code is required to authenticate your app and access shop data.

Follow the official guide:

- [https://partner.tiktokshop.com/docv2/page/partner-authorization-guide](https://partner.tiktokshop.com/docv2/page/partner-authorization-guide)

Steps:

1. Log in to the TikTok Shop Partner portal.
2. Register your app to get `appKey` and `appSecret`.
3. Redirect users to the authorization URL.
4. After authorization, receive `TIKTOK_AUTH_CODE` in the callback URL.

---

## 2. Initialize SDK Client

Create a client instance using your credentials and auth code:

```ts
import { TikTokShopClient } from 'tiktok-shop-sdk';

const client = new TikTokShopClient({
  appKey: process.env.TTS_APP_KEY!,
  appSecret: process.env.TTS_APP_SECRET!,
  authCode: process.env.TIKTOK_AUTH_CODE!,
});
```

---

## 3. Get Access Token

Use the auth module to exchange your auth code for an access token:

```ts
const tokenData = await client.auth.getAccessToken();
console.log(tokenData);
```

---

## 4. Refresh Token

Access tokens expire. Use the refresh token to obtain a new access token:

```ts
const refreshed = await client.auth.refreshAccessToken();
console.log(refreshed);
```

---

## Tips & Best Practices

- Store `appSecret` and tokens securely (environment variables recommended)
- Always handle async/await errors using try/catch
- Follow TikTok Shop documentation for each module
