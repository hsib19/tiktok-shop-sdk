# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

This is a pnpm + TurboRepo monorepo. All commands are run from the root.

```bash
pnpm install              # Install dependencies
pnpm build                # Build all packages (turbo)
pnpm test                 # Run all tests (turbo)
pnpm test:cov             # Run tests with coverage
pnpm lint                 # Lint all packages (turbo)
pnpm format               # Format with prettier
```

### SDK-specific commands (from `packages/sdk/`)

```bash
pnpm --filter tiktok-shop-sdk test              # Run SDK tests only
pnpm --filter tiktok-shop-sdk exec jest <path>  # Run a single test file
pnpm --filter tiktok-shop-sdk build             # Build SDK only (tsup)
pnpm --filter tiktok-shop-sdk lint              # Lint SDK only
```

### Other apps

```bash
pnpm dev:examples         # Run the examples CLI app
pnpm docs:dev             # Run docs dev server (VitePress)
```

## Architecture

### Monorepo Structure

- **`packages/sdk`** — The core published npm package (`tiktok-shop-sdk`). This is where most development happens.
- **`apps/examples`** — Interactive CLI examples for each SDK module
- **`apps/docs`** — VitePress documentation site
- **`apps/landing`** — Next.js landing page

### SDK Internal Architecture (`packages/sdk/src/`)

The SDK uses **path aliases** configured in both `tsconfig.json` and `jest.config.ts`:

- `@modules` → `src/modules/`
- `@client` → `src/client/`
- `@sdk` → `src/sdk/`
- `@types` → `src/types/`
- `@utils` → `src/utils/`

**Key layers:**

1. **`sdk/TikTokShopSDK.ts`** — Main entry point class. Instantiates all API modules and wires them with configured request functions. Three request variants: `request` (no shop cipher), `requestCipher` (with shop cipher), and `requestMultipart` (multipart with cipher).

2. **`client/`** — HTTP layer. Three request functions:
   - `Request.ts` — Standard JSON requests using native `fetch`. Handles signature generation, query param construction, and error parsing.
   - `AuthRequest.ts` — Auth-specific requests (different signing for token endpoints).
   - `RequestMultipart.ts` — Multipart/form-data requests for file uploads.

3. **`modules/`** — One module class per TikTok Shop API domain (Auth, Product, Order, Logistic, etc.). Each module receives a request function and exposes typed methods for API endpoints.

4. **`types/`** — TypeScript interfaces for all request/response shapes, organized per module (e.g., `ProductTypes.ts`, `OrderTypes.ts`). `RequestTypes.ts` contains shared request infrastructure types.

5. **`utils/`** — `signature.ts` generates HMAC-SHA256 signatures (v1 and v2 formats). `handleResponse.ts` contains `TikTokAPIError` class and response validation.

### Module Pattern

Each module (e.g., `ProductModule`) follows the same pattern:

- Constructor receives a `RequestFunction` (and optionally `MultipartRequestFunction`)
- Methods map 1:1 to TikTok Shop API endpoints
- All methods are typed with input params and response types from `@types`

### Testing

- Jest with ts-jest, configured in `packages/sdk/jest.config.ts`
- **100% coverage threshold** enforced (branches, functions, lines, statements)
- Tests mock `@client` module and verify correct request parameters
- Test files live alongside source: `src/modules/__tests__/` and `src/__tests__/`
- The `src/types/` directory is excluded from coverage

### Build

- SDK builds with **tsup** producing both ESM (`.mjs`) and CJS (`.js`) outputs with type declarations
- Pre-commit hooks via Husky + lint-staged (runs Prettier)
