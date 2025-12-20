import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TikTok Shop SDK Docs",
  description: "Modern SDK documentation for TikTok Shop integrations",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    nav: [
      { text: 'Guide', link: '/get-started' },
      {
        text: 'v1.0.3',
        items: [
          { text: 'Current (1.0.3)', link: '/' },
        ]
      },
      {
        text: 'Official Docs',
        link: 'https:/partner.tiktokshop.com/docv2/page/tts-developer-guide/'
      },
      {
        text: 'More',
        items: [
          { text: 'Changelog', link: 'https://github.com/hsib19/tiktok-shop-sdk/blob/main/CHANGELOG.md' },
          { text: 'Contributing', link: 'https://github.com/hsib19/tiktok-shop-sdk/blob/main/CONTRIBUTING.md' },
        ]
      }
    ],

    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          { text: 'Get Started', link: '/get-started' },
          { text: 'Authentication', link: '/authentication' },
          { text: 'Errors', link: '/errors' },
          {
            text: 'Core API',
            items: [
              {
                text: 'Authorization',
                collapsed: true,
                items: [
                  { text: 'Get Authorized Category Assets', link: '/core-api/authorization/get-authorized-category-assets' },
                  { text: 'Get Authorized Shop', link: '/core-api/authorization/get-authorized-shop' },
                ]
              },
              {
                text: 'Event',
                collapsed: true,
                items: [
                  { text: 'Get Shop Webhooks', link: '/core-api/event/get-shop-webhooks' },
                  { text: 'Update Shop Webhook', link: '/core-api/event/update-shop-webhook' },
                  { text: 'Delete Shop Webhook', link: '/core-api/event/delete-shop-webhook' },
                ]
              },
              {
                text: 'Seller',
                collapsed: true,
                items: [
                  { text: 'Get Active Shops', link: '/core-api/seller/get-active-shops' },
                  { text: 'Get Seller Permissions', link: '/core-api/seller/get-seller-permissions' }
                ]
              },
              {
                text: 'Products',
                collapsed: true,
                items: [
                  { text: 'Check Listing Prerequisites', link: '/core-api/products/check-listing-prerequisites' },
                  { text: 'Get Categories', link: '/core-api/products/get-categories' },
                  { text: 'Recommend Category', link: '/core-api/products/recommend-category' },
                  { text: 'Get Category Rules', link: '/core-api/products/get-category-rules' },
                  { text: 'Get Attributes', link: '/core-api/products/get-attributes' },
                  { text: 'Get Brands', link: '/core-api/products/get-brands' },
                  { text: 'Create Custom Brands', link: '/core-api/products/create-custom-brands' },
                  { text: 'Check Product Listing', link: '/core-api/products/check-product-listing' },
                  { text: 'Upload Product Image', link: '/core-api/products/upload-product-image' },
                  { text: 'Upload Product File', link: '/core-api/products/upload-product-file' },
                  { text: 'Search Size Charts', link: '/core-api/products/search-size-charts' },
                  { text: 'Create Product', link: '/core-api/products/create-product' },
                  { text: 'Activate Product', link: '/core-api/products/activate-product' },
                  { text: 'Deactivate Products', link: '/core-api/products/deactivate-products' },
                  { text: 'Delete Products', link: '/core-api/products/delete-products' },
                  { text: 'Recover Products', link: '/core-api/products/recover-products' },
                  { text: 'Get Product', link: '/core-api/products/get-product' },
                  { text: 'Search Products', link: '/core-api/products/search-products' },
                  { text: 'Update Price', link: '/core-api/products/update-price' },
                  { text: 'Update Inventory', link: '/core-api/products/update-inventory' },
                  { text: 'Inventory Search', link: '/core-api/products/inventory-search' },
                  { text: 'Diagnose And Optimize Product', link: '/core-api/products/diagnose-and-optimize-product' },
                  { text: 'Product Information Issue Diagnosis', link: '/core-api/products/product-information-issue-diagnosis' },
                  { text: 'Get Products SEO Words', link: '/core-api/products/get-products-seo-words' },
                  { text: 'Get Recommended Product Title And Description', link: '/core-api/products/get-recommended-product-title-and-description' },
                  { text: 'Optimized Images', link: '/core-api/products/optimized-images' },
                  { text: 'Create Image Translation Tasks', link: '/core-api/products/create-image-translation-tasks' },
                  { text: 'Get Image Translation Tasks', link: '/core-api/products/get-image-translation-tasks' },
                  { text: 'Get Global Categories', link: '/core-api/products/get-global-categories' },
                  { text: 'Recommend Global Categories', link: '/core-api/products/recommend-global-categories' },
                  { text: 'Get Global Category Rules', link: '/core-api/products/get-global-category-rules' },
                  { text: 'Get Global Attributes', link: '/core-api/products/get-global-attributes' },
                  { text: 'Create Global Product', link: '/core-api/products/create-global-product' },
                  { text: 'Publish Global Product', link: '/core-api/products/publish-global-product' },
                  { text: 'Edit Global Product', link: '/core-api/products/edit-global-product' },
                  { text: 'Delete Global Products', link: '/core-api/products/delete-global-products' },
                  { text: 'Get Global Product', link: '/core-api/products/get-global-product' },
                  { text: 'Search Global Products', link: '/core-api/products/search-global-products' },
                  { text: 'Update Global Inventory', link: '/core-api/products/update-global-inventory' },
                  { text: 'Create Manufacturer', link: '/core-api/products/create-manufacturer' },
                  { text: 'Partial Edit Manufacturer', link: '/core-api/products/partial-edit-manufacturer' },
                  { text: 'Search Manufacturers', link: '/core-api/products/search-manufacturers' },
                  { text: 'Create Responsible Person', link: '/core-api/products/create-responsible-person' },
                  { text: 'Partial Edit Responsible Person', link: '/core-api/products/partial-edit-responsible-person' },
                  { text: 'Search Responsible Persons', link: '/core-api/products/search-responsible-persons' },
                  { text: 'Create Category Upgrade Task', link: '/core-api/products/create-category-upgrade-task' },
                  { text: 'Get Global Listing Rules', link: '/core-api/products/get-global-listing-rules' },
                  { text: 'Replicate Product', link: '/core-api/products/replicate-product' },
                  { text: 'Get Global Replicated Products', link: '/core-api/products/get-global-replicated-products' },
                  { text: 'Edit Product', link: '/core-api/products/edit-product' },
                  { text: 'Partial Edit Product', link: '/core-api/products/partial-edit-product' },
                  { text: 'Partial Edit Global Product', link: '/core-api/products/partial-edit-global-product' }
                ]
              },
              {
                text: 'Promotion',
                collapsed: true,
                items: [
                  { text: 'Create Activity', link: '/core-api/promotion/create-activity' },
                  { text: 'Update Activity', link: '/core-api/promotion/update-activity' },
                  { text: 'Deactivate Activity', link: '/core-api/promotion/deactivate-activity' },
                  { text: 'Get Activity', link: '/core-api/promotion/get-activity' },
                  { text: 'Search Activities', link: '/core-api/promotion/search-activities' },
                  { text: 'Update Activity Product', link: '/core-api/promotion/update-activity-product' },
                  { text: 'Remove Activity Product', link: '/core-api/promotion/remove-activity-product' },
                  { text: 'Get Coupon', link: '/core-api/promotion/get-coupon' },
                  { text: 'Search Coupons', link: '/core-api/promotion/search-coupons' }
                ]
              },
              {
                text: 'Orders',
                collapsed: true,
                items: [
                  { text: 'Get Order List', link: '/core-api/orders/get-order-list' },
                  { text: 'Get Price Detail', link: '/core-api/orders/get-price-detail' },
                  { text: 'Add External Order References', link: '/core-api/orders/add-external-order-references' },
                  { text: 'Get External Order References', link: '/core-api/orders/get-external-order-references' },
                  { text: 'Search Order By External Order Reference', link: '/core-api/orders/search-order-by-external-order-reference' },
                  { text: 'Get Order Detail', link: '/core-api/orders/get-order-detail' }
                ]
              },
              {
                text: 'Fulfilment',
                collapsed: true,
                items: [
                  { text: 'Get Order Split Attributes', link: '/core-api/fulfilment/get-order-split-attributes' },
                  { text: 'Split Orders', link: '/core-api/fulfilment/split-orders' },
                  { text: 'Get Eligible Shipping Service', link: '/core-api/fulfilment/get-eligible-shipping-service' },
                  { text: 'Create First Mile Bundle', link: '/core-api/fulfilment/create-first-mile-bundle' },
                  { text: 'Create Packages', link: '/core-api/fulfilment/create-packages' },
                  { text: 'Search Package', link: '/core-api/fulfilment/search-package' },
                  { text: 'Search Combinable Packages', link: '/core-api/fulfilment/search-combinable-packages' },
                  { text: 'Combine Package', link: '/core-api/fulfilment/combine-package' },
                  { text: 'Uncombine Packages', link: '/core-api/fulfilment/uncombine-packages' },
                  { text: 'Get Package Handover Time Slots', link: '/core-api/fulfilment/get-package-handover-time-slots' },
                  { text: 'Ship Package', link: '/core-api/fulfilment/ship-package' },
                  { text: 'Batch Ship Packages', link: '/core-api/fulfilment/batch-ship-packages' },
                  { text: 'Mark Package As Shipped', link: '/core-api/fulfilment/mark-package-as-shipped' },
                  { text: 'Get Package Shipping Document', link: '/core-api/fulfilment/get-package-shipping-document' },
                  { text: 'Get Package Detail', link: '/core-api/fulfilment/get-package-detail' },
                  { text: 'Get Tracking', link: '/core-api/fulfilment/get-tracking' },
                  { text: 'Update Shipping Info', link: '/core-api/fulfilment/update-shipping-info' },
                  { text: 'Update Package Shipping Info', link: '/core-api/fulfilment/update-package-shipping-info' },
                  { text: 'Fulfillment Upload', link: '/core-api/fulfilment/fulfillment-upload' }
                ]
              },
              {
                text: 'Logistic',
                collapsed: true,
                items: [
                  { text: 'Get Warehouse List', link: '/core-api/logistic/get-warehouse-list' },
                  { text: 'Get Global Seller Warehouse', link: '/core-api/logistic/get-global-seller-warehouse' },
                  { text: 'Get Warehouse Delivery Options', link: '/core-api/logistic/get-warehouse-delivery-options' },
                  { text: 'Get Shipping Providers', link: '/core-api/logistic/get-shipping-providers' },
                  { text: 'Get Available Shipping Template', link: '/core-api/logistic/get-available-shipping-template' }
                ]
              },
              {
                text: 'Return & Refund',
                collapsed: true,
                items: [
                  { text: 'Get Aftersale Eligibility', link: '/core-api/return-and-refund/get-aftersale-eligibility' },
                  { text: 'Get Reject Reasons', link: '/core-api/return-and-refund/get-reject-reasons' },
                  { text: 'Create Return', link: '/core-api/return-and-refund/create-return' },
                  { text: 'Approve Return', link: '/core-api/return-and-refund/approve-return' },
                  { text: 'Reject Return', link: '/core-api/return-and-refund/reject-return' },
                  { text: 'Search Returns', link: '/core-api/return-and-refund/search-returns' },
                  { text: 'Get Return Records', link: '/core-api/return-and-refund/get-return-records' },
                  { text: 'Cancel Order', link: '/core-api/return-and-refund/cancel-order' },
                  { text: 'Approve Cancellation', link: '/core-api/return-and-refund/approve-cancellation' },
                  { text: 'Reject Cancellation', link: '/core-api/return-and-refund/reject-cancellation' },
                  { text: 'Search Cancellations', link: '/core-api/return-and-refund/search-cancellations' },
                  { text: 'Calculate Refund', link: '/core-api/return-and-refund/calculate-refund' }
                ]
              },
              {
                text: 'Finance',
                collapsed: true,
                items: [
                  { text: 'Get Statements', link: '/core-api/finance/get-statements' },
                  { text: 'Get Payments', link: '/core-api/finance/get-payments' },
                  { text: 'Get Withdrawals', link: '/core-api/finance/get-withdrawals' },
                  { text: 'Get Transactions by Order', link: '/core-api/finance/get-transactions-by-order' },
                  { text: 'Get Transactions by Statement', link: '/core-api/finance/get-transactions-by-statement' },
                  { text: 'Get Unsettled Transactions', link: '/core-api/finance/get-unsettled-transactions' }
                ]
              },
              {
                text: 'Analytics',
                collapsed: true,
                items: [
                  { text: 'Get Shop Performance', link: '/core-api/analytics/get-shop-performance' },
                  { text: 'Get Shop Product Performance List', link: '/core-api/analytics/get-shop-product-performance-list' },
                  { text: 'Get Shop Product Performance', link: '/core-api/analytics/get-shop-product-performance' },
                  { text: 'Get Shop SKU Performance List', link: '/core-api/analytics/get-shop-sku-performance-list' },
                  { text: 'Get Shop SKU Performance', link: '/core-api/analytics/get-shop-sku-performance' },
                  { text: 'Get Shop Video Performance Overview', link: '/core-api/analytics/get-shop-video-performance-overview' },
                  { text: 'Get Shop Video Performance List', link: '/core-api/analytics/get-shop-video-performance-list' },
                  { text: 'Get Shop Video Performance Details', link: '/core-api/analytics/get-shop-video-performance-details' },
                  { text: 'Get Shop Video Product Performance List', link: '/core-api/analytics/get-shop-video-product-performance-list' },
                  { text: 'Get Shop LIVE Performance Overview', link: '/core-api/analytics/get-shop-live-performance-overview' },
                  { text: 'Get Shop LIVE Performance List', link: '/core-api/analytics/get-shop-live-performance-list' }
                ]
              },
              {
                text: 'Customer Service',
                collapsed: true,
                items: [
                  { text: 'Create Conversation', link: '/core-api/customer-service/create-conversation' },
                  { text: 'Get Conversations', link: '/core-api/customer-service/get-conversations' },
                  { text: 'Get Conversation Messages', link: '/core-api/customer-service/get-conversation-messages' },
                  { text: 'Upload Buyer Messages Image', link: '/core-api/customer-service/upload-buyer-messages-image' },
                  { text: 'Send Message', link: '/core-api/customer-service/send-message' },
                  { text: 'Read Message', link: '/core-api/customer-service/read-message' },
                  { text: 'Get Agent Settings', link: '/core-api/customer-service/get-agent-settings' },
                  { text: 'Update Agent Settings', link: '/core-api/customer-service/update-agent-settings' },
                  { text: 'Get Customer Service Performance', link: '/core-api/customer-service/get-customer-service-performance' }
                ]
              },
              {
                text: 'Customer Engagement',
                collapsed: true,
                items: [
                  { text: 'Get Message Templates', link: '/core-api/customer-engagement/get-message-templates' },
                  { text: 'Create Engagement Task', link: '/core-api/customer-engagement/create-engagement-task' },
                  { text: 'Send Engagement Message', link: '/core-api/customer-engagement/send-engagement-message' },
                  { text: 'Get Task Performances', link: '/core-api/customer-engagement/get-task-performances' },
                  { text: 'Create Custom Engagement Task', link: '/core-api/customer-engagement/create-custom-engagement-task' },
                  { text: 'Get Feature Permissions', link: '/core-api/customer-engagement/get-feature-permissions' }
                ]
              },
              {
                text: 'Affiliate Creator',
                collapsed: true,
                items: [
                  { text: 'Add Showcase Products', link: '/core-api/affiliate-creator/add-showcase-products' },
                  { text: 'Get Showcase Products', link: '/core-api/affiliate-creator/get-showcase-products' },
                  { text: 'Creator Search Open Collaboration Product', link: '/core-api/affiliate-creator/creator-search-open-collaboration-product' },
                  { text: 'Search Creator Target Collaborations', link: '/core-api/affiliate-creator/search-creator-target-collaborations' },
                  { text: 'Remove Showcase Products', link: '/core-api/affiliate-creator/remove-showcase-products' },
                  { text: 'Top Showcase Products', link: '/core-api/affiliate-creator/top-showcase-products' },
                  { text: 'Creator Search Sample Application Fulfillments', link: '/core-api/affiliate-creator/creator-search-sample-application-fulfillments' },
                  { text: 'Search Creator Affiliate Orders', link: '/core-api/affiliate-creator/search-creator-affiliate-orders' },
                  { text: 'Get Creator Sample Application Detail', link: '/core-api/affiliate-creator/get-creator-sample-application-detail' },
                  { text: 'Get Creator Applicable Sample Label', link: '/core-api/affiliate-creator/get-creator-applicable-sample-label' },
                  { text: 'Search Creator Sample Applications', link: '/core-api/affiliate-creator/search-creator-sample-applications' },
                  { text: 'Creator Generate General Link', link: '/core-api/affiliate-creator/creator-generate-general-link' },
                  { text: 'Creator Generate Publisher Link', link: '/core-api/affiliate-creator/creator-generate-publisher-link' },
                  { text: 'Creator Search Affiliate Trace Orders', link: '/core-api/affiliate-creator/creator-search-affiliate-trace-orders' },
                  { text: 'Get Creator Profile', link: '/core-api/affiliate-creator/get-creator-profile' },
                  { text: 'Get Open Collaboration Product List By Product Ids', link: '/core-api/affiliate-creator/get-open-collaboration-product-list-by-product-ids' }
                ]
              },
              {
                text: 'Affiliate Partner',
                collapsed: true,
                items: [
                  { text: 'Create Affiliate Partner Campaign', link: '/core-api/affiliate-partner/create-affiliate-partner-campaign' },
                  { text: 'Edit Affiliate Partner Campaign', link: '/core-api/affiliate-partner/edit-affiliate-partner-campaign' },
                  { text: 'Publish Affiliate Partner Campaign', link: '/core-api/affiliate-partner/publish-affiliate-partner-campaign' },
                  { text: 'Review Affiliate Partner Campaign Product', link: '/core-api/affiliate-partner/review-affiliate-partner-campaign-product' },
                  { text: 'Generate Affiliate Partner Campaign Product Link', link: '/core-api/affiliate-partner/generate-affiliate-partner-campaign-product-link' },
                  { text: 'Get Affiliate Partner Campaign Detail', link: '/core-api/affiliate-partner/get-affiliate-partner-campaign-detail' },
                  { text: 'Get Affiliate Partner Campaign List', link: '/core-api/affiliate-partner/get-affiliate-partner-campaign-list' },
                  { text: 'Get Affiliate Partner Campaign Product List', link: '/core-api/affiliate-partner/get-affiliate-partner-campaign-product-list' },
                  { text: 'Search Tap Affiliate Orders', link: '/core-api/affiliate-partner/search-tap-affiliate-orders' },
                  { text: 'Get Affiliate Campaign Creator Fulfillment Status List', link: '/core-api/affiliate-partner/get-affiliate-campaign-creator-fulfillment-status-list' },
                  { text: 'Search CAP Affiliate Orders', link: '/core-api/affiliate-partner/search-cap-affiliate-orders' },
                  { text: 'Partner Generate Multi Affiliate Campaign Product Link', link: '/core-api/affiliate-partner/partner-generate-multi-affiliate-campaign-product-link' },
                  { text: 'Get Affiliate Campaign Creator Fulfillment Status Info', link: '/core-api/affiliate-partner/get-affiliate-campaign-creator-fulfillment-status-info' },
                  { text: 'Get Affiliate Campaign Creator Product Content Statistics', link: '/core-api/affiliate-partner/get-affiliate-campaign-creator-product-content-statistics' },
                  { text: 'Get Affiliate Campaign Creator Product Sample Status', link: '/core-api/affiliate-partner/get-affiliate-campaign-creator-product-sample-status' }
                ]
              },
              {
                text: 'Affiliate Seller',
                collapsed: true,
                items: [
                  { text: 'Edit Open Collaboration Settings', link: '/core-api/affiliate-seller/edit-open-collaboration-settings' },
                  { text: 'Generate Affiliate Product Promotion Link', link: '/core-api/affiliate-seller/generate-affiliate-product-promotion-link' },
                  { text: 'Seller Search Affiliate Open Collaboration Product', link: '/core-api/affiliate-seller/seller-search-affiliate-open-collaboration-product' },
                  { text: 'Search Seller Affiliate Orders', link: '/core-api/affiliate-seller/search-seller-affiliate-orders' },
                  { text: 'Seller Search Sample Applications Fulfillments', link: '/core-api/affiliate-seller/seller-search-sample-applications-fulfillments' },
                  { text: 'Get Open Collaboration Sample Rules', link: '/core-api/affiliate-seller/get-open-collaboration-sample-rules' },
                  { text: 'Edit Open Collaboration Sample Rule', link: '/core-api/affiliate-seller/edit-open-collaboration-sample-rule' },
                  { text: 'Remove Target Collaboration', link: '/core-api/affiliate-seller/remove-target-collaboration' },
                  { text: 'Get Open Collaboration Settings', link: '/core-api/affiliate-seller/get-open-collaboration-settings' },
                  { text: 'Search Open Collaboration', link: '/core-api/affiliate-seller/search-open-collaboration' },
                  { text: 'Create Open Collaboration', link: '/core-api/affiliate-seller/create-open-collaboration' },
                  { text: 'Get Message In The Conversation', link: '/core-api/affiliate-seller/get-message-in-the-conversation' },
                  { text: 'Get Conversation List', link: '/core-api/affiliate-seller/get-conversation-list' },
                  { text: 'Send IM Message', link: '/core-api/affiliate-seller/send-im-message' },
                  { text: 'Mark Conversation Read', link: '/core-api/affiliate-seller/mark-conversation-read' },
                  { text: 'Get Latest Unread Messages', link: '/core-api/affiliate-seller/get-latest-unread-messages' },
                  { text: 'Seller Review Sample Applications', link: '/core-api/affiliate-seller/seller-review-sample-applications' },
                  { text: 'Seller Search Creator On Marketplace', link: '/core-api/affiliate-seller/seller-search-creator-on-marketplace' },
                  { text: 'Get Marketplace Creator Performance', link: '/core-api/affiliate-seller/get-marketplace-creator-performance' },
                  { text: 'Create Target Collaboration', link: '/core-api/affiliate-seller/create-target-collaboration' },
                  { text: 'Search Target Collaborations', link: '/core-api/affiliate-seller/search-target-collaborations' },
                  { text: 'Remove Creator From Open Collaboration', link: '/core-api/affiliate-seller/remove-creator-from-open-collaboration' },
                  { text: 'Update Target Collaboration', link: '/core-api/affiliate-seller/update-target-collaboration' },
                  { text: 'Query Target Collaboration Detail', link: '/core-api/affiliate-seller/query-target-collaboration-detail' },
                  { text: 'Create Conversation With Creator', link: '/core-api/affiliate-seller/create-conversation-with-creator' },
                  { text: 'Seller Search Sample Applications', link: '/core-api/affiliate-seller/seller-search-sample-applications' },
                  { text: 'Get Open Collaboration Creator Content Detail', link: '/core-api/affiliate-seller/get-open-collaboration-creator-content-detail' },
                  { text: 'Generate Target Collaboration Link', link: '/core-api/affiliate-seller/generate-target-collaboration-link' },
                  { text: 'Upload Message Image', link: '/core-api/affiliate-seller/upload-message-image' }
                ]
              },
              {
                text: 'Supply Chain',
                collapsed: true,
                items: [
                  { text: 'Confirm Package Shipment', link: '/core-api/supply-chain/confirm-package-shipment' }
                ]
              }
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hsib19/tiktok-shop-sdk' }
    ],

    footer: {
      message: 'Released under MIT License',
      copyright: 'Copyright © 2025 Hasib'
    }
  }
})
