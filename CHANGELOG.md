# Changelog

All notable changes to this project will be documented in this file.

---

## [v1.0.0] – 2025-07-13

This release marks the first stable version of `tiktok-shop-sdk`, building on the foundation set in `v0.1.0`. It includes comprehensive support for product-related operations, covering both local and global product management features.

### Added

#### Local Product Features

- `checkProductListing` – Check the listing status of a product.
- `uploadProductFile` – Upload a product file (e.g., CSV/XLSX).
- `searchInventory` – Search inventory by keyword or filter.
- `updatePrice` – Update the price of a product.
- `updateInventory` – Update the stock quantity of a product.

#### Global Product Features

- `recommendGlobalCategories` – Get category recommendations based on product name.
- `getGlobalCategoryRules` – Retrieve rules and attributes for a specific category.
- `createGlobalProduct` – Create a new global product.
- `publishGlobalProduct` – Publish a global product to the shop.
- `editGlobalProduct` – Edit an existing global product.
- `deleteGlobalProducts` – Delete one or multiple global products.
- `getGlobalProduct` – Get detailed information about a global product.
- `searchGlobalProducts` – Search global products using filters.
- `updateGlobalInventory` – Update inventory for global products.

#### Image Translation Features

- `createImageTranslationTasks` – Create tasks to translate text in product images.
- `getImageTranslationTasks` – Retrieve results of image translation tasks.

#### SDK Structure

- Exposed all request functions as class properties on `TikTokShopSDK` for improved usability and modular integration.

---

## [v0.8.0] - 2025-07-05

### Changed

- Replaced Axios with native `fetch` for better compatibility (thanks @KeKs0r)

---

## [v0.7.0] - 2025-07-04

### Added

- `ReturnRefundModule` to support Return & Cancellation flow:
  - `getAftersaleEligibility`
  - `getRejectReasons`
  - `createReturn`
  - `searchReturn`
  - `getReturnRecord`
  - `approveReturn`
  - `rejectReturn`
  - `cancelOrder`
  - `approveCancellation`
  - `rejectCancellation`
  - `searchCancellation`
  - `calculateCancellation`
- `PromotionModule` for managing seller campaigns and coupons:
  - `createActivity`
  - `updateActivity`
  - `deactivateActivity`
  - `getActivity`
  - `searchActivity`
  - `getCoupon`
  - `searchCoupon`
  - `updateActivityProduct`
  - `removeActivityProduct`
- `FulfillmentModule` to support package and shipping operations:
  - `createPackage`
  - `createFirstMileBundle`
  - `combinablePackage`
  - `uncombinePackages`
  - `splitOrders`
  - `getEligibleShippingService`
  - `getPackageHandoverTimeSlots`
  - `getOrderSplitAttributes`
  - `searchPackage`
  - `searchCombinablePackages`

### Notes

- Adds full support for TikTok Shop's return, refund, and fulfillment workflows.

### Improvements

- Added full test coverage for `ReturnRefundModule` endpoints
- Improved internal typings and documentation (JSDoc) for new modules

### Notes

- This release expands SDK capabilities to handle post-order operations and promotional campaign management. Refer to official docs for integration details:
  - https://partner.tiktokshop.com/docv2/page/return-refund-and-cancel-api-overview
  - https://partner.tiktokshop.com/docv2/page/promotion-api-overview
  - https://partner.tiktokshop.com/docv2/page/fulfillment-api-overview

---

## [v0.6.0] - 2025-06-30

### Added

- `FinanceModule` to support TikTok Shop Partner API:
  - `getStatements`
  - `getPayments`
  - `getWithdrawals`
  - `getTransactionsByOrder`
  - `getTransactionsByStatement`
- Unit tests for FinanceModule to validate each method and request structure

### Notes

- This release adds initial support for TikTok Shop's finance-related endpoints. It enables partners to retrieve financial statements, payments, withdrawals, and transactions efficiently.

---

## [v0.5.0] - 2025-06-10

### Added

- `LogisticModule` to support TikTok Shop Logistics API:
  - `getWarehouses`
  - `getGlobalSellerWarehouses`
  - `getWarehouseDeliveryOptions`
  - `getShippingProviders`

### Improvements

- Refactored request typings for better maintainability
- Improved error handling for logistics-related endpoints

---

## [v0.4.0] - 2025-06-02

### Added

- `OrderModule` with support for key endpoints:
  - `getOrderList`
  - `getOrderDetail`
  - `getPriceDetail`
  - `addExternalOrderReferences`
  - `searchOrderByExternalOrderReference`

---

## [v0.3.0] - 2025-06-01

### Product

- Added endpoint to create, update, and delete products
- Supported managing product drafts and retrieving product details

### Category

- Implemented category list retrieval
- Added recommended category suggestion

### Brand

- Added endpoint to retrieve and create brands

---

## [v0.2.7] - 2025-05-30

### Added

- `getCategories()` to fetch TikTok product categories
- `recommendCategory()` for auto-suggestion
- `getCategoryRules()` to retrieve required fields and certifications
- `getAttributes()` for allowed product attributes
- Initial implementation of `SellerModule`

### Improvements

- Expanded test coverage
- Improved handling of combined query + body requests

### Fixed

- Fixed query param handling in signed POST requests
- Fixed type mismatch in `shop_cipher` handling

---

## [v0.1.0] - 2025-05-20

### Initial Beta Release

#### Highlights

- Core support for:
  - Authentication (OAuth 2.0)
  - Shop Management
  - Event Handling
  - Product Management

- Full TypeScript support
- Async/Await-based API
- Basic error handling

#### Known Limitations

- Orders, Logistics, Returns, Finance not yet implemented
- Expect frequent updates as SDK evolves

---
