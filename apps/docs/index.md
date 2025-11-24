---
title: TikTok Shop SDK – Introduction
outline: deep
---

# TikTok Shop SDK for Node.js

A simple, modular, and fully-typed SDK that wraps the official TikTok Shop APIs, designed to make integration effortless for developers. TikTok's official APIs are powerful but can be complex; this SDK abstracts boilerplate and authentication so you can focus on building your product.

---

## Features

- **Full TypeScript support** — typed requests & responses
- **Secure authentication** using HMAC signatures
- **Modular structure** (Product, Order, Finance, Auth, etc.)
- **Supports Seller & Partner endpoints**
- **Auto-generated query signatures**
- **Lightweight & framework-agnostic**

---

## Installation

```bash
npm install tiktok-shop-sdk
# or
yarn add tiktok-shop-sdk
```

---

## Quick Start

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

## Included Modules

- **Auth** — authentication & tokens
- **Shop** — shop info
- **Event** — event subscription & fetch
- **Seller** — seller account APIs
- **Products** — products, categories, listings
- **Orders** — orders, status, details
- **Logistic** — shipping, tracking
- **Return & Refund** — return workflows
- **Finance** — statements, payments, withdrawals
- **Fulfillment** — fulfillment process
- **Promotion** — coupons, discounts
- **Affiliate Seller** — affiliate APIs
- **Analytics** — performance metrics

---

## Who is this SDK for?

- E-commerce automation developers
- ERP & inventory sync tools
- Affiliate platforms
- AI agent workflows for commerce
- Backend services that connect to TikTok Shop

---

## Documentation

Refer to the module guides, API references, and examples throughout this documentation.
