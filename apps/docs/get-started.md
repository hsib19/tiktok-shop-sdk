---
title: TikTok Shop SDK – Get Started
outline: deep
---

# Get Started

A simple, modular, and fully-typed SDK that wraps the official TikTok Shop APIs, designed to make integration effortless for developers. While TikTok's official APIs are powerful, they can be complex and require handling low-level details. This SDK abstracts away boilerplate and authentication steps, so you can focus on building products, automating workflows, or creating dashboards.

# 1. Installation

Install via **npm** or **yarn**:

```bash
npm install tiktok-shop-sdk
# or
yarn add tiktok-shop-sdk
```

---

## 2. Initialize the Client

```ts
import { TikTokShopClient } from 'tiktok-shop-sdk';

const client = new TikTokShopClient({
  appKey: process.env.TTS_APP_KEY!,
  appSecret: process.env.TTS_APP_SECRET!,
  shopId: process.env.TTS_SHOP_ID!,
});

// Example: Get product list
const products = await client.product.getProducts({ page_size: 20 });
console.log(products);
```

---

## 2a. Get TikTok Auth Code

Before using the SDK, you must obtain a **TIKTOK_AUTH_CODE**.

Official guide: <a href="https://partner.tiktokshop.com/docv2/page/partner-authorization-guide" target="_blank">Partner Authorization Guide</a>

### Steps:

1. Login to the TikTok Shop Partner portal.
2. Register your app → get **appKey** & **appSecret**.
3. Redirect users to the authorization URL.
4. After authorization, TikTok returns a **TIKTOK_AUTH_CODE**.
5. Exchange it for access tokens using the SDK.

---

## 3. Call an API

Example:

```ts
const products = await client.product.getProducts({ page_size: 20 });
```

---

## 4. Next Steps

- Explore **OrderModule**
- Use **FinanceModule**
- Explore **AffiliateModule**
- Integrate SDK with cron jobs or backend services

---

## Tips

- Store **appSecret** using environment variables.
- Use proper `async/await` and error handling.
- Refer to documentation for each module.

You're now ready to build with **TikTok Shop SDK**!
