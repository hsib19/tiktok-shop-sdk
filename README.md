
# TikTok Shop SDK for Typescript

![npm](https://img.shields.io/npm/v/tiktok-shop-sdk)
![Build Status](https://github.com/hsib19/tiktok-shop-sdk/actions/workflows/ci.yml/badge.svg)
![Bundle size](https://img.shields.io/bundlephobia/minzip/tiktok-shop-sdk)
[![codecov](https://codecov.io/gh/hsib19/tiktok-shop-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/hsib19/tiktok-shop-sdk)
![Types](https://img.shields.io/npm/types/tiktok-shop-sdk)
[![GitHub](https://img.shields.io/badge/GitHub-View%20Repo-blue?logo=github)](https://github.com/hsib19/tiktok-shop-sdk)
![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-3178c6?logo=typescript&logoColor=white)
![Open Source](https://badgen.net/badge/status/open%20source/green)
![Downloads](https://img.shields.io/npm/dw/tiktok-shop-sdk)
[![License](https://img.shields.io/npm/l/tiktok-shop-sdk.svg)](https://www.npmjs.com/package/tiktok-shop-sdk)

**[View on npm](https://www.npmjs.com/package/tiktok-shop-sdk)**

An unofficial, community-driven SDK built with **TypeScript**, designed to simplify integration with the **TikTok Shop API** for Node.js environments. This library provides a convenient, type-safe, and modern JavaScript-friendly way to interact with various TikTok Shop functionalities programmatically.

Leverage the power of TypeScript for robust development, including static typing, autocompletion (IntelliSense), and compile-time checks, reducing runtime errors and improving developer experience.

Whether you're looking to automate product listings, streamline order management, synchronize inventory, or build custom e-commerce solutions on top of TikTok Shop, this SDK aims to reduce boilerplate code and allow you to focus on your application's core logic.

---

## Table of Contents

- [Features](#features)
- [Disclaimer](#disclaimer)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Modules Status](#modules-status)
- [Usage](#usage)
- [Error Handling](#error-handling)
- [Managing Access Token and Shop Cipher](#managing-access-token-and-shop-cipher)
- [Running Tests](#running-tests)
- [Resources](#resources)
- [Contributing](#contributing)
- [License](#license)

---

## Features

* **Strongly Typed:** Fully written in TypeScript, offering type safety for API requests and responses, improving code quality and maintainability.
* **Authentication:** Simplified OAuth 2.0 flow and token management for secure API access.
* **Product Management:** Easily create, retrieve, update, and delete product listings with typed interfaces.
* **Order Management:** Fetch order details, create external order (e.g., shopify, woocomerce), and manage fulfillment with clear data structures.
* **Inventory Management:** Programmatically update and synchronize stock levels with type-checked inputs.
* **Reverse Order Management:** Handle return and refund requests through the API using defined types.
* **Logistics Management:** Interact with shipping and fulfillment services.
* **Shop Management:** Retrieve shop information, seller performance, and configurations.
* **Finance Management:** (If API supports) Access settlement records and financial data.
* **Promotion Management:** (If API supports) Create and manage discounts, vouchers, and promotional campaigns.
* **Modern JavaScript Support:** Utilizes async/await for cleaner asynchronous operations.
* **Comprehensive Error Handling:** Graceful handling of API errors and exceptions, with typed error objects.
* **Modular Design:** (Optional: if applicable) Easily import and use only the modules you need.

## Disclaimer

This is an unofficial SDK. It is not affiliated with, endorsed, or sponsored by TikTok or ByteDance. The TikTok Shop API endpoints, request/response structures, and policies may change over time, which could impact the functionality of this SDK. While we strive to keep it updated, always refer to the [Official TikTok Shop API Documentation](https://partner.tiktokshop.com/doc/page/262708) (or the relevant official link) for the most authoritative and up-to-date information.

## Prerequisites
Before you begin, ensure you have the following set up:

* **Node.js:** It's recommended to use an active LTS (Long Term Support) version of Node.js. This SDK is tested and compatible with:
    * `Node.js >= 18.x` (LTS)
* **npm:** The Node Package Manager is included with Node.js.
    * `npm >= 8.x` 

    You can check your versions by running `node -v` and `npm -v` in your terminal.

* **TikTok Shop Developer Account & App:**
    *  **Register as a TikTok Shop Developer:** Sign up on the [TikTok Shop Partner Portal](https://partner.tiktokshop.com/) (ensure this link is the most current official one).
    *  **Create an App:** Within the Partner Portal, create an application to obtain your `App Key` and `App Secret`.
    *  **Seller Authorization (OAuth 2.0):** Your application will need to be authorized by TikTok Shop sellers to access their shop data. This process uses the OAuth 2.0 protocol. Familiarize yourself with the official TikTok Shop API documentation on how to implement the authorization flow. This SDK may provide helper utilities for parts of this flow, but the require manual interaction with the TikTok Shop platform.

## Installation

```bash
npm install tiktok-shop-sdk
```

or with Yarn:

```bash
yarn add tiktok-shop-sdk
```

## Modules Status

Below is the current development status of each module within the TikTok Shop SDK.  
Modules marked as **Completed** are fully implemented and tested, while those marked as **Work in Progress** are still under active development.

| Module | Status |
| :-------- | :------------ |
| `Auth` | `✅ Completed` |
| `Shop` | `✅ Completed` |
| `Event` | `✅ Completed` |
| `Seller` | `✅ Completed` |
| `Products` | `🚧 In Progress` |
| `Orders` | `✅ Completed` |
| `Logistic` | `✅ Completed` |
| `Return & Refund` | `🚧 In Progress` |
| `Finance` | `✅ Completed` |

## Usage

Please refer to the [`apps/examples/`](./apps/examples) directory in this repository. Each file in that folder demonstrates a specific feature or workflow.

```ts
import { TikTokShopSDK } from 'tiktok-shop-sdk';

// Initialize SDK with your app key and secret
const sdk = new TikTokShopSDK({
    appKey: "",       // Your TikTok Shop App Key
    appSecret: ""     // Your TikTok Shop App Secret
});

async function main() {

    // Example 1: Request an access token using authorization code grant
    // This step is necessary to obtain a valid access token for authenticated API calls
    const response = await sdk.auth.getAccessToken({
        auth_code: "",               // Authorization code obtained from TikTok (must be provided)
        grant_type: "authorized_code" // Grant type, typically fixed as "authorized_code"
    });

    console.log('Access Token Response:', response);

    // Example 2: Use Access Token and Shop Cipher to update a webhook
    // Before making API calls that require authorization, set the access token and shop cipher

    // Set Access Token - typically stored in environment variables
    sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);

    // Set Shop Cipher - also typically stored in environment variables
    sdk.setShopCipher(process.env.TIKTOK_SHOP_CIPHER!);

    // Update shop webhook configuration with new webhook URL and event type
    const updateResponse = await sdk.event.updateShopWebhook({
        address: "https://urlhere.com/notify",  
        event_type: "NEW_CONVERSATION"           
    });

    console.log(updateResponse);
}

```

## Error Handling

The SDK provides built-in error forwarding. You can catch API-related errors using standard try/catch blocks. Each error contains useful debugging information such as HTTP status, message, and optional TikTok API error codes (if returned).

**Example**

```ts

import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
    appKey: "",
    appSecret: ""
});

try {
    const response = await sdk.auth.refreshAccessToken({
        refresh_token: process.env.TIKTOK_REFFRESH_TOKEN!,
        grant_type: "refresh_token"
    });

    console.log(response)
    
} catch (error) {
    if (error instanceof TikTokAPIError) {
        console.error("TikTok API Error:", error.message);
        console.error("Status Code:", error.code);
        console.log("Request Id: ", error.requestId)
    } else {
        console.error("Unexpected error:", error);
    }
}
```

## Managing Access Token and Shop Cipher

To make authenticated API requests on behalf of a TikTok Shop seller, you must set the following credentials in your SDK instance:

### 1. `setAccessToken(token: string)`

Sets the access token for all subsequent API calls. This token is obtained via the OAuth 2.0 authorization process.

```ts
sdk.setAccessToken("your_access_token_here");
```

- You should call this once after successfully retrieving the token.
- It is stored internally in the SDK instance and reused for all authorized API calls.
- If the token expires, you need to refresh it and update the SDK with the new token using this method.

### 2. `setShopCipher(cipher: string)`
Sets the shop cipher (unique shop ID) required by most endpoints.
```ts
sdk.setShopCipher("your_shop_cipher_here");
```

- Typically obtained alongside the access token.
- Required for shop-scoped actions like product management, order updates, event subscriptions, etc.

> ⚠️ Call `setAccessToken` and `setShopCipher` after you obtain valid credentials — usually right after the OAuth process completes. You only need to call them once per session.


## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Resources
- __TikTok Shop OpenAPI Documentation__: Official API reference with endpoint details and usage examples.<br>[TikTok Shop OpenAPI Documentation](https://partner.tiktokshop.com/docv2/page/6789f6f818828103147a8b05)
- __GitHub Issues__: Report bugs, request features, or contribute to the SDK development.<br>[Github Issues](https://github.com/hsib19/tiktok-shop-sdk/issues)

## Contributing
Contributions are welcome! Please open an issue or pull request to discuss improvements.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
