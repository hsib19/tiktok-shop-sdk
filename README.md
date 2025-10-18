# TikTok Shop SDK

![npm](https://img.shields.io/npm/v/tiktok-shop-sdk)
![Build Status](https://github.com/hsib19/tiktok-shop-sdk/actions/workflows/ci.yml/badge.svg)
![Bundle size](https://img.shields.io/bundlephobia/minzip/tiktok-shop-sdk)
![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-3178c6?logo=typescript&logoColor=white)
[![codecov](https://codecov.io/gh/hsib19/tiktok-shop-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/hsib19/tiktok-shop-sdk)
![Open Source](https://badgen.net/badge/status/open%20source/green)
![Downloads](https://img.shields.io/npm/dw/tiktok-shop-sdk)
[![License](https://img.shields.io/npm/l/tiktok-shop-sdk.svg)](https://www.npmjs.com/package/tiktok-shop-sdk)

This is the **TikTok Shop SDK** designed to simplify integration with the TikTok Shop API using TypeScript.

An unofficial, community-driven SDK built with TypeScript, designed to simplify integration with the TikTok Shop API for Node.js environments. This library provides a convenient, type-safe, and modern JavaScript-friendly way to interact with various TikTok Shop functionalities programmatically.

Leverage the power of TypeScript for robust development, including static typing, autocompletion (IntelliSense), and compile-time checks, reducing runtime errors and improving developer experience.

Whether you're looking to automate product listings, streamline order management, synchronize inventory, or build custom e-commerce solutions on top of TikTok Shop, this SDK aims to reduce boilerplate code and allow you to focus on your application's core logic.

**[View on npm](https://www.npmjs.com/package/tiktok-shop-sdk)**

## Disclaimer

This SDK is **not an official** TikTok Shop SDK.

## Installation

```bash
npm install tiktok-shop-sdk
# or
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
| `Products` | `✅ Completed` |
| `Orders` | `✅ Completed` |
| `Logistic` | `✅ Completed` |
| `Return & Refund` | `✅ Completed` |
| `Finance` | `✅ Completed` |
| `Fulfillment` | `✅ Completed` |
| `Promotion` | `✅ Completed` |
| `Affiliate Seller` | `✅ Completed` |
| `Analaytics` | `✅ Completed` |

## Usage

Please refer to the [`Documentations`](./packages/sdk/README.md) file for detailed usage instructions and code examples.

## Getting Started (for Contributors)

This project uses [pnpm](https://pnpm.io) and [TurboRepo](https://turbo.build/repo) to manage the monorepo.

### Prerequisites

Install `pnpm` globally:

```bash
npm install -g pnpm
```

### Install dependencies

```bash
pnpm install
```

### Build all packages

```bash
pnpm build
```

> You can also use `npm` or `yarn`, but `pnpm` is recommended for consistency and performance.

## Scripts

This project uses TurboRepo to run scripts across all packages:

- `pnpm run build` – Build all packages  
- `pnpm run dev` – Run development mode  
- `pnpm run test` – Run tests  
- `pnpm run test:cov` – Run tests with coverage report  
- `pnpm run lint` – Run linter  
- `pnpm run prepare` – Prepare Git hooks with Husky  

### Run the CLI from the monorepo root

```bash
pnpm run dev:examples
```

> This runs the CLI in the `examples` package only, displaying a list of available modules under `src/`.
> Select a module with arrow keys and press Enter to execute it.

## Contributing

Contributions are welcome! Please open a pull request and follow the contribution guidelines.

---
