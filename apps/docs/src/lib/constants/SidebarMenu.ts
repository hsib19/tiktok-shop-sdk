export interface SidebarItem {
	titleKey: string;
	href?: string;
	children?: SidebarItem[];
}

export const SIDEBAR_MENU: SidebarItem[] = [
	{ titleKey: 'sidebar.introduction', href: '/docs/introduction' },
	{ titleKey: 'sidebar.get_started', href: '/docs/get-started' },
	{ titleKey: 'sidebar.authentication', href: '/docs/authentication' },
	{ titleKey: 'sidebar.errors', href: '/docs/errors' },
	{
		titleKey: 'sidebar.core_api',
		children: [
			{
				titleKey: 'sidebar.authorization.title',
				href: '/docs/core/authorization',
				children: [
					{
						titleKey: 'sidebar.authorization.GetAuthorizedCategoryAssets',
						href: '/docs/core/authorization/get-authorized-category-assets'
					},
					{
						titleKey: 'sidebar.authorization.GetAuthorizedShops',
						href: '/docs/core/authorization/get-authorized-shops'
					}
				]
			},
			{
				titleKey: 'sidebar.event.title',
				href: '/docs/core/event',
				children: [
					{ titleKey: 'sidebar.event.GetShopWebhooks', href: '/docs/core/event/get-shop-webhooks' },
					{
						titleKey: 'sidebar.event.UpdateShopWebhook',
						href: '/docs/core/event/update-shop-webhook'
					},
					{
						titleKey: 'sidebar.event.DeleteShopWebhook',
						href: '/docs/core/event/delete-shop-webhook'
					}
				]
			},
			{
				titleKey: 'sidebar.seller.title',
				href: '/docs/core/seller',
				children: [
					{ titleKey: 'sidebar.seller.GetActiveShops', href: '/docs/core/seller/get-active-shops' },
					{
						titleKey: 'sidebar.seller.GetSellerPermissions',
						href: '/docs/core/seller/get-seller-permissions'
					}
				]
			},
			{
				titleKey: 'sidebar.products.title',
				href: '/docs/core/products',
				children: [
					{
						titleKey: 'sidebar.products.CheckListingPrerequisites',
						href: '/docs/core/products/check-listing-prerequisites'
					},
					{
						titleKey: 'sidebar.products.GetCategories',
						href: '/docs/core/products/get-categories'
					},
					{
						titleKey: 'sidebar.products.RecommendCategory',
						href: '/docs/core/products/recommend-category'
					},
					{
						titleKey: 'sidebar.products.GetCategoryRules',
						href: '/docs/core/products/get-category-rules'
					},
					{
						titleKey: 'sidebar.products.GetAttributes',
						href: '/docs/core/products/get-attributes'
					},
					{ titleKey: 'sidebar.products.GetBrands', href: '/docs/core/products/get-brands' },
					{
						titleKey: 'sidebar.products.CreateCustomBrands',
						href: '/docs/core/products/create-custom-brands'
					},
					{
						titleKey: 'sidebar.products.CheckProductListing',
						href: '/docs/core/products/check-product-listing'
					},
					{
						titleKey: 'sidebar.products.UploadProductImage',
						href: '/docs/core/products/upload-product-image'
					},
					{
						titleKey: 'sidebar.products.UploadProductFile',
						href: '/docs/core/products/upload-product-file'
					},
					{
						titleKey: 'sidebar.products.SearchSizeCharts',
						href: '/docs/core/products/search-size-charts'
					},
					{
						titleKey: 'sidebar.products.CreateProduct',
						href: '/docs/core/products/create-product'
					},
					{
						titleKey: 'sidebar.products.ActivateProduct',
						href: '/docs/core/products/activate-product'
					},
					{
						titleKey: 'sidebar.products.DeactivateProducts',
						href: '/docs/core/products/deactivate-products'
					},
					{
						titleKey: 'sidebar.products.DeleteProducts',
						href: '/docs/core/products/delete-products'
					},
					{
						titleKey: 'sidebar.products.RecoverProducts',
						href: '/docs/core/products/recover-products'
					},
					{ titleKey: 'sidebar.products.GetProduct', href: '/docs/core/products/get-product' },
					{
						titleKey: 'sidebar.products.SearchProducts',
						href: '/docs/core/products/search-products'
					},
					{ titleKey: 'sidebar.products.UpdatePrice', href: '/docs/core/products/update-price' },
					{
						titleKey: 'sidebar.products.UpdateInventory',
						href: '/docs/core/products/update-inventory'
					},
					{
						titleKey: 'sidebar.products.InventorySearch',
						href: '/docs/core/products/inventory-search'
					},
					{
						titleKey: 'sidebar.products.DiagnoseAndOptimizeProduct',
						href: '/docs/core/products/diagnose-and-optimize-product'
					},
					{
						titleKey: 'sidebar.products.ProductInformationIssueDiagnosis',
						href: '/docs/core/products/product-information-issue-diagnosis'
					},
					{
						titleKey: 'sidebar.products.GetProductsSEOWords',
						href: '/docs/core/products/get-products-seo-words'
					},
					{
						titleKey: 'sidebar.products.GetRecommendedProductTitleAndDescription',
						href: '/docs/core/products/get-recommended-product-title-and-description'
					},
					{
						titleKey: 'sidebar.products.OptimizedImages',
						href: '/docs/core/products/optimized-images'
					},
					{
						titleKey: 'sidebar.products.CreateImageTranslationTasks',
						href: '/docs/core/products/create-image-translation-tasks'
					},
					{
						titleKey: 'sidebar.products.GetImageTranslationTasks',
						href: '/docs/core/products/get-image-translation-tasks'
					},
					{
						titleKey: 'sidebar.products.GetGlobalCategories',
						href: '/docs/core/products/get-global-categories'
					},
					{
						titleKey: 'sidebar.products.RecommendGlobalCategories',
						href: '/docs/core/products/recommend-global-categories'
					},
					{
						titleKey: 'sidebar.products.GetGlobalCategoryRules',
						href: '/docs/core/products/get-global-category-rules'
					},
					{
						titleKey: 'sidebar.products.GetGlobalAttributes',
						href: '/docs/core/products/get-global-attributes'
					},
					{
						titleKey: 'sidebar.products.CreateGlobalProduct',
						href: '/docs/core/products/create-global-product'
					},
					{
						titleKey: 'sidebar.products.PublishGlobalProduct',
						href: '/docs/core/products/publish-global-product'
					},
					{
						titleKey: 'sidebar.products.EditGlobalProduct',
						href: '/docs/core/products/edit-global-product'
					},
					{
						titleKey: 'sidebar.products.DeleteGlobalProducts',
						href: '/docs/core/products/delete-global-products'
					},
					{
						titleKey: 'sidebar.products.GetGlobalProduct',
						href: '/docs/core/products/get-global-product'
					},
					{
						titleKey: 'sidebar.products.SearchGlobalProducts',
						href: '/docs/core/products/search-global-products'
					},
					{
						titleKey: 'sidebar.products.UpdateGlobalInventory',
						href: '/docs/core/products/update-global-inventory'
					},
					{
						titleKey: 'sidebar.products.CreateManufacturer',
						href: '/docs/core/products/create-manufacturer'
					},
					{
						titleKey: 'sidebar.products.PartialEditManufacturer',
						href: '/docs/core/products/partial-edit-manufacturer'
					},
					{
						titleKey: 'sidebar.products.SearchManufacturers',
						href: '/docs/core/products/search-manufacturers'
					},
					{
						titleKey: 'sidebar.products.CreateResponsiblePerson',
						href: '/docs/core/products/create-responsible-person'
					},
					{
						titleKey: 'sidebar.products.PartialEditResponsiblePerson',
						href: '/docs/core/products/partial-edit-responsible-person'
					},
					{
						titleKey: 'sidebar.products.SearchResponsiblePersons',
						href: '/docs/core/products/search-responsible-persons'
					},
					{
						titleKey: 'sidebar.products.CreateCategoryUpgradeTask',
						href: '/docs/core/products/create-category-upgrade-task'
					},
					{
						titleKey: 'sidebar.products.GetGlobalListingRules',
						href: '/docs/core/products/get-global-listing-rules'
					},
					{
						titleKey: 'sidebar.products.ReplicateProduct',
						href: '/docs/core/products/replicate-product'
					},
					{
						titleKey: 'sidebar.products.GetGlobalReplicatedProducts',
						href: '/docs/core/products/get-global-replicated-products'
					},
					{ titleKey: 'sidebar.products.EditProduct', href: '/docs/core/products/edit-product' },
					{
						titleKey: 'sidebar.products.PartialEditProduct',
						href: '/docs/core/products/partial-edit-product'
					},
					{
						titleKey: 'sidebar.products.PartialEditGlobalProduct',
						href: '/docs/core/products/partial-edit-global-product'
					}
				]
			},
			{
				titleKey: 'sidebar.promotion.title',
				href: '/docs/core/promotion',
				children: [
					{
						titleKey: 'sidebar.promotion.CreateActivity',
						href: '/docs/core/promotion/create-activity'
					},
					{
						titleKey: 'sidebar.promotion.UpdateActivity',
						href: '/docs/core/promotion/update-activity'
					},
					{
						titleKey: 'sidebar.promotion.DeactivateActivity',
						href: '/docs/core/promotion/deactivate-activity'
					},
					{
						titleKey: 'sidebar.promotion.GetActivity',
						href: '/docs/core/promotion/get-activity'
					},
					{
						titleKey: 'sidebar.promotion.SearchActivities',
						href: '/docs/core/promotion/search-activities'
					},
					{
						titleKey: 'sidebar.promotion.UpdateActivityProduct',
						href: '/docs/core/promotion/update-activity-product'
					},
					{
						titleKey: 'sidebar.promotion.RemoveActivityProduct',
						href: '/docs/core/promotion/remove-activity-product'
					},
					{
						titleKey: 'sidebar.promotion.GetCoupon',
						href: '/docs/core/promotion/get-coupon'
					},
					{
						titleKey: 'sidebar.promotion.SearchCoupons',
						href: '/docs/core/promotion/search-coupons'
					}
				]
			},
			{
				titleKey: 'sidebar.orders.title',
				href: '/docs/core/orders',
				children: [
					{ titleKey: 'sidebar.orders.GetOrderList', href: '/docs/core/orders/get-order-list' },
					{ titleKey: 'sidebar.orders.GetPriceDetail', href: '/docs/core/orders/get-price-detail' },
					{
						titleKey: 'sidebar.orders.AddExternalOrderReferences',
						href: '/docs/core/orders/add-external-order-references'
					},
					{
						titleKey: 'sidebar.orders.GetExternalOrderReferences',
						href: '/docs/core/orders/get-external-order-references'
					},
					{
						titleKey: 'sidebar.orders.SearchOrderByExternalOrderReference',
						href: '/docs/core/orders/search-order-by-external-order-reference'
					},
					{ titleKey: 'sidebar.orders.GetOrderDetail', href: '/docs/core/orders/get-order-detail' }
				]
			},
			{
				titleKey: 'sidebar.fulfilment.title',
				href: '/docs/core/fulfilment',
				children: [
					{
						titleKey: 'sidebar.fulfilment.GetOrderSplitAttributes',
						href: '/docs/core/fulfilment/get-order-split-attributes'
					},
					{
						titleKey: 'sidebar.fulfilment.SplitOrders',
						href: '/docs/core/fulfilment/split-orders'
					},
					{
						titleKey: 'sidebar.fulfilment.GetEligibleShippingService',
						href: '/docs/core/fulfilment/get-eligible-shipping-service'
					},
					{
						titleKey: 'sidebar.fulfilment.CreateFirstMileBundle',
						href: '/docs/core/fulfilment/create-first-mile-bundle'
					},
					{
						titleKey: 'sidebar.fulfilment.CreatePackages',
						href: '/docs/core/fulfilment/create-packages'
					},
					{
						titleKey: 'sidebar.fulfilment.SearchPackage',
						href: '/docs/core/fulfilment/search-package'
					},
					{
						titleKey: 'sidebar.fulfilment.SearchCombinablePackages',
						href: '/docs/core/fulfilment/search-combinable-packages'
					},
					{
						titleKey: 'sidebar.fulfilment.CombinePackage',
						href: '/docs/core/fulfilment/combine-package'
					},
					{
						titleKey: 'sidebar.fulfilment.UncombinePackages',
						href: '/docs/core/fulfilment/uncombine-packages'
					},
					{
						titleKey: 'sidebar.fulfilment.GetPackageHandoverTimeSlots',
						href: '/docs/core/fulfilment/get-package-handover-time-slots'
					},
					{
						titleKey: 'sidebar.fulfilment.ShipPackage',
						href: '/docs/core/fulfilment/ship-package'
					},
					{
						titleKey: 'sidebar.fulfilment.BatchShipPackages',
						href: '/docs/core/fulfilment/batch-ship-packages'
					},
					{
						titleKey: 'sidebar.fulfilment.MarkPackageAsShipped',
						href: '/docs/core/fulfilment/mark-package-as-shipped'
					},
					{
						titleKey: 'sidebar.fulfilment.GetPackageShippingDocument',
						href: '/docs/core/fulfilment/get-package-shipping-document'
					},
					{
						titleKey: 'sidebar.fulfilment.GetPackageDetail',
						href: '/docs/core/fulfilment/get-package-detail'
					},
					{
						titleKey: 'sidebar.fulfilment.GetTracking',
						href: '/docs/core/fulfilment/get-tracking'
					},
					{
						titleKey: 'sidebar.fulfilment.UpdateShippingInfo',
						href: '/docs/core/fulfilment/update-shipping-info'
					},
					{
						titleKey: 'sidebar.fulfilment.UpdatePackageShippingInfo',
						href: '/docs/core/fulfilment/update-package-shipping-info'
					},
					{
						titleKey: 'sidebar.fulfilment.FulfillmentUpload',
						href: '/docs/core/fulfilment/fulfillment-upload'
					}
				]
			},
			{
				titleKey: 'sidebar.logistic.title',
				href: '/docs/core/logistic',
				children: [
					{
						titleKey: 'sidebar.logistic.GetWarehouseList',
						href: '/docs/core/logistic/get-warehouse-list'
					},
					{
						titleKey: 'sidebar.logistic.GetGlobalSellerWarehouse',
						href: '/docs/core/logistic/get-global-seller-warehouse'
					},
					{
						titleKey: 'sidebar.logistic.GetWarehouseDeliveryOptions',
						href: '/docs/core/logistic/get-warehouse-delivery-options'
					},
					{
						titleKey: 'sidebar.logistic.GetShippingProviders',
						href: '/docs/core/logistic/get-shipping-providers'
					},
					{
						titleKey: 'sidebar.logistic.GetAvailableShippingTemplate',
						href: '/docs/core/logistic/get-available-shipping-template'
					}
				]
			},
			{
				titleKey: 'sidebar.return_refund.title',
				href: '/docs/core/return-and-refund',
				children: [
					{
						titleKey: 'sidebar.return_refund.GetAftersaleEligibility',
						href: '/docs/core/return-and-refund/get-aftersale-eligibility'
					},
					{
						titleKey: 'sidebar.return_refund.GetRejectReasons',
						href: '/docs/core/return-and-refund/get-reject-reasons'
					},
					{
						titleKey: 'sidebar.return_refund.CreateReturn',
						href: '/docs/core/return-and-refund/create-return'
					},
					{
						titleKey: 'sidebar.return_refund.ApproveReturn',
						href: '/docs/core/return-and-refund/approve-return'
					},
					{
						titleKey: 'sidebar.return_refund.RejectReturn',
						href: '/docs/core/return-and-refund/reject-return'
					},
					{
						titleKey: 'sidebar.return_refund.SearchReturns',
						href: '/docs/core/return-and-refund/search-returns'
					},
					{
						titleKey: 'sidebar.return_refund.GetReturnRecords',
						href: '/docs/core/return-and-refund/get-return-records'
					},
					{
						titleKey: 'sidebar.return_refund.CancelOrder',
						href: '/docs/core/return-and-refund/cancel-order'
					},
					{
						titleKey: 'sidebar.return_refund.ApproveCancellation',
						href: '/docs/core/return-and-refund/approve-cancellation'
					},
					{
						titleKey: 'sidebar.return_refund.RejectCancellation',
						href: '/docs/core/return-and-refund/reject-cancellation'
					},
					{
						titleKey: 'sidebar.return_refund.SearchCancellations',
						href: '/docs/core/return-and-refund/search-cancellations'
					},
					{
						titleKey: 'sidebar.return_refund.CalculateRefund',
						href: '/docs/core/return-and-refund/calculate-refund'
					}
				]
			},
			{
				titleKey: 'sidebar.finance.title',
				href: '/docs/core/finance',
				children: [
					{ titleKey: 'sidebar.finance.GetStatements', href: '/docs/core/finance/get-statements' },
					{ titleKey: 'sidebar.finance.GetPayments', href: '/docs/core/finance/get-payments' },
					{
						titleKey: 'sidebar.finance.GetWithdrawals',
						href: '/docs/core/finance/get-withdrawals'
					},
					{
						titleKey: 'sidebar.finance.GetTransactionsbyOrder',
						href: '/docs/core/finance/get-transactions-by-order'
					},
					{
						titleKey: 'sidebar.finance.GetTransactionsbyStatement',
						href: '/docs/core/finance/get-transactions-by-statement'
					},
					{
						titleKey: 'sidebar.finance.GetUnsettledTransactions',
						href: '/docs/core/finance/get-unsettled-transactions'
					}
				]
			},
			{
				titleKey: 'sidebar.analytics.title',
				href: '/docs/core/analytics',
				children: [
					{
						titleKey: 'sidebar.analytics.GetShopPerformance',
						href: '/docs/core/analytics/get-shop-performance'
					},
					{
						titleKey: 'sidebar.analytics.GetShopProductPerformanceList',
						href: '/docs/core/analytics/get-shop-product-performance-list'
					},
					{
						titleKey: 'sidebar.analytics.GetShopProductPerformance',
						href: '/docs/core/analytics/get-shop-product-performance'
					},
					{
						titleKey: 'sidebar.analytics.GetShopSKUPerformanceList',
						href: '/docs/core/analytics/get-shop-sku-performance-list'
					},
					{
						titleKey: 'sidebar.analytics.GetShopSKUPerformance',
						href: '/docs/core/analytics/get-shop-sku-performance'
					},
					{
						titleKey: 'sidebar.analytics.GetShopVideoPerformanceOverview',
						href: '/docs/core/analytics/get-shop-video-performance-overview'
					},
					{
						titleKey: 'sidebar.analytics.GetShopVideoPerformanceList',
						href: '/docs/core/analytics/get-shop-video-performance-list'
					},
					{
						titleKey: 'sidebar.analytics.GetShopVideoPerformanceDetails',
						href: '/docs/core/analytics/get-shop-video-performance-details'
					},
					{
						titleKey: 'sidebar.analytics.GetShopVideoProductPerformanceList',
						href: '/docs/core/analytics/get-shop-video-product-performance-list'
					},
					{
						titleKey: 'sidebar.analytics.GetShopLIVEPerformanceOverview',
						href: '/docs/core/analytics/get-shop-live-performance-overview'
					},
					{
						titleKey: 'sidebar.analytics.GetShopLIVEPerformanceList',
						href: '/docs/core/analytics/get-shop-live-performance-list'
					}
				]
			},
			{
				titleKey: 'sidebar.customer_service.title',
				href: '/docs/core/customer-service',
				children: [
					{
						titleKey: 'sidebar.customer_service.CreateConversation',
						href: '/docs/core/customer-service/create-conversation'
					},
					{
						titleKey: 'sidebar.customer_service.GetConversations',
						href: '/docs/core/customer-service/get-conversations'
					},
					{
						titleKey: 'sidebar.customer_service.GetConversationMessages',
						href: '/docs/core/customer-service/get-conversation-messages'
					},
					{
						titleKey: 'sidebar.customer_service.UploadBuyerMessagesImage',
						href: '/docs/core/customer-service/upload-buyer-messages-image'
					},
					{
						titleKey: 'sidebar.customer_service.SendMessage',
						href: '/docs/core/customer-service/send-message'
					},
					{
						titleKey: 'sidebar.customer_service.ReadMessage',
						href: '/docs/core/customer-service/read-message'
					},
					{
						titleKey: 'sidebar.customer_service.GetAgentSettings',
						href: '/docs/core/customer-service/get-agent-settings'
					},
					{
						titleKey: 'sidebar.customer_service.UpdateAgentSettings',
						href: '/docs/core/customer-service/update-agent-settings'
					},
					{
						titleKey: 'sidebar.customer_service.GetCustomerServicePerformance',
						href: '/docs/core/customer-service/get-customer-service-performance'
					}
				]
			},
			{
				titleKey: 'sidebar.customer_engagement.title',
				href: '/docs/core/customer-engagement',
				children: [
					{
						titleKey: 'sidebar.customer_engagement.GetMessageTemplates',
						href: '/docs/core/customer-engagement/get-message-templates'
					},
					{
						titleKey: 'sidebar.customer_engagement.CreateEngagementTask',
						href: '/docs/core/customer-engagement/create-engagement-task'
					},
					{
						titleKey: 'sidebar.customer_engagement.SendEngagementMessage',
						href: '/docs/core/customer-engagement/send-engagement-message'
					},
					{
						titleKey: 'sidebar.customer_engagement.GetTaskPerformances',
						href: '/docs/core/customer-engagement/get-task-performances'
					},
					{
						titleKey: 'sidebar.customer_engagement.CreateCustomEngagementTask',
						href: '/docs/core/customer-engagement/create-custom-engagement-task'
					},
					{
						titleKey: 'sidebar.customer_engagement.GetFeaturePermissions',
						href: '/docs/core/customer-engagement/get-feature-permissions'
					}
				]
			},
			{
				titleKey: 'sidebar.affiliate_creator.title',
				href: '/docs/core/affiliate-creator',
				children: [
					{
						titleKey: 'sidebar.affiliate_creator.AddShowcaseProducts',
						href: '/docs/core/affiliate-creator/add-showcase-products'
					},
					{
						titleKey: 'sidebar.affiliate_creator.GetShowcaseProducts',
						href: '/docs/core/affiliate-creator/get-showcase-products'
					},
					{
						titleKey: 'sidebar.affiliate_creator.CreatorSearchOpenCollaborationProduct',
						href: '/docs/core/affiliate-creator/creator-search-open-collaboration-product'
					},
					{
						titleKey: 'sidebar.affiliate_creator.SearchCreatorTargetCollaborations',
						href: '/docs/core/affiliate-creator/search-creator-target-collaborations'
					},
					{
						titleKey: 'sidebar.affiliate_creator.RemoveShowcaseProducts',
						href: '/docs/core/affiliate-creator/remove-showcase-products'
					},
					{
						titleKey: 'sidebar.affiliate_creator.TopShowcaseProducts',
						href: '/docs/core/affiliate-creator/top-showcase-products'
					},
					{
						titleKey: 'sidebar.affiliate_creator.CreatorSearchSampleApplicationFulfillments',
						href: '/docs/core/affiliate-creator/creator-search-sample-application-fulfillments'
					},
					{
						titleKey: 'sidebar.affiliate_creator.SearchCreatorAffiliateOrders',
						href: '/docs/core/affiliate-creator/search-creator-affiliate-orders'
					},
					{
						titleKey: 'sidebar.affiliate_creator.GetCreatorSampleApplicationDetail',
						href: '/docs/core/affiliate-creator/get-creator-sample-application-detail'
					},
					{
						titleKey: 'sidebar.affiliate_creator.GetCreatorApplicableSampleLabel',
						href: '/docs/core/affiliate-creator/get-creator-applicable-sample-label'
					},
					{
						titleKey: 'sidebar.affiliate_creator.SearchCreatorSampleApplications',
						href: '/docs/core/affiliate-creator/search-creator-sample-applications'
					},
					{
						titleKey: 'sidebar.affiliate_creator.CreatorGenerateGeneralLink',
						href: '/docs/core/affiliate-creator/creator-generate-general-link'
					},
					{
						titleKey: 'sidebar.affiliate_creator.CreatorGeneratePublisherLink',
						href: '/docs/core/affiliate-creator/creator-generate-publisher-link'
					},
					{
						titleKey: 'sidebar.affiliate_creator.CreatorSearchAffiliateTraceOrders',
						href: '/docs/core/affiliate-creator/creator-search-affiliate-trace-orders'
					},
					{
						titleKey: 'sidebar.affiliate_creator.GetCreatorProfile',
						href: '/docs/core/affiliate-creator/get-creator-profile'
					},
					{
						titleKey: 'sidebar.affiliate_creator.GetOpenCollaborationProductListByProductIds',
						href: '/docs/core/affiliate-creator/get-open-collaboration-product-list-by-product-ids'
					}
				]
			},
			{
				titleKey: 'sidebar.affiliate_partner.title',
				href: '/docs/core/affiliate-partner',
				children: [
					{
						titleKey: 'sidebar.affiliate_partner.CreateAffiliatePartnerCampaign',
						href: '/docs/core/affiliate-partner/create-affiliate-partner-campaign'
					},
					{
						titleKey: 'sidebar.affiliate_partner.EditAffiliatePartnerCampaign',
						href: '/docs/core/affiliate-partner/edit-affiliate-partner-campaign'
					},
					{
						titleKey: 'sidebar.affiliate_partner.PublishAffiliatePartnerCampaign',
						href: '/docs/core/affiliate-partner/publish-affiliate-partner-campaign'
					},
					{
						titleKey: 'sidebar.affiliate_partner.ReviewAffiliatePartnerCampaignProduct',
						href: '/docs/core/affiliate-partner/review-affiliate-partner-campaign-product'
					},
					{
						titleKey: 'sidebar.affiliate_partner.GenerateAffiliatePartnerCampaignProductLink',
						href: '/docs/core/affiliate-partner/generate-affiliate-partner-campaign-product-link'
					},
					{
						titleKey: 'sidebar.affiliate_partner.GetAffiliatePartnerCampaignDetail',
						href: '/docs/core/affiliate-partner/get-affiliate-partner-campaign-detail'
					},
					{
						titleKey: 'sidebar.affiliate_partner.GetAffiliatePartnerCampaignList',
						href: '/docs/core/affiliate-partner/get-affiliate-partner-campaign-list'
					},
					{
						titleKey: 'sidebar.affiliate_partner.GetAffiliatePartnerCampaignProductList',
						href: '/docs/core/affiliate-partner/get-affiliate-partner-campaign-product-list'
					},
					{
						titleKey: 'sidebar.affiliate_partner.SearchTapAffiliateOrders',
						href: '/docs/core/affiliate-partner/search-tap-affiliate-orders'
					},
					{
						titleKey: 'sidebar.affiliate_partner.GetAffiliateCampaignCreatorFulfillmentStatusList',
						href: '/docs/core/affiliate-partner/get-affiliate-campaign-creator-fulfillment-status-list'
					},
					{
						titleKey: 'sidebar.affiliate_partner.PartnerGenerateMultiAffiliateCampaignProductLink',
						href: '/docs/core/affiliate-partner/partner-generate-multi-affiliate-campaign-product-link'
					},
					{
						titleKey: 'sidebar.affiliate_partner.GetAffiliateCampaignCreatorFulfillmentStatusInfo',
						href: '/docs/core/affiliate-partner/get-affiliate-campaign-creator-fulfillment-status-info'
					},
					{
						titleKey:
							'sidebar.affiliate_partner.GetAffiliateCampaignCreatorProductContentStatistics',
						href: '/docs/core/affiliate-partner/get-affiliate-campaign-creator-product-content-statistics'
					},
					{
						titleKey: 'sidebar.affiliate_partner.GetAffiliateCampaignCreatorProductSampleStatus',
						href: '/docs/core/affiliate-partner/get-affiliate-campaign-creator-product-sample-status'
					}
				]
			},
			{
				titleKey: 'sidebar.affiliate_seller.title',
				href: '/docs/core/affiliate-seller',
				children: [
					{
						titleKey: 'sidebar.affiliate_seller.EditOpenCollaborationSettings',
						href: '/docs/core/affiliate-seller/edit-open-collaboration-settings'
					},
					{
						titleKey: 'sidebar.affiliate_seller.GenerateAffiliateProductPromotionLink',
						href: '/docs/core/affiliate-seller/generate-affiliate-product-promotion-link'
					},
					{
						titleKey: 'sidebar.affiliate_seller.SellerSearchAffiliateOpenCollaborationProduct',
						href: '/docs/core/affiliate-seller/seller-search-affiliate-open-collaboration-product'
					},
					{
						titleKey: 'sidebar.affiliate_seller.SearchSellerAffiliateOrders',
						href: '/docs/core/affiliate-seller/search-seller-affiliate-orders'
					},
					{
						titleKey: 'sidebar.affiliate_seller.SellerSearchSampleApplicationsFulfillments',
						href: '/docs/core/affiliate-seller/seller-search-sample-applications-fulfillments'
					},
					{
						titleKey: 'sidebar.affiliate_seller.GetOpenCollaborationSampleRules',
						href: '/docs/core/affiliate-seller/get-open-collaboration-sample-rules'
					},
					{
						titleKey: 'sidebar.affiliate_seller.EditOpenCollaborationSampleRule',
						href: '/docs/core/affiliate-seller/edit-open-collaboration-sample-rule'
					},
					{
						titleKey: 'sidebar.affiliate_seller.RemoveTargetCollaboration',
						href: '/docs/core/affiliate-seller/remove-target-collaboration'
					},
					{
						titleKey: 'sidebar.affiliate_seller.GetOpenCollaborationSettings',
						href: '/docs/core/affiliate-seller/get-open-collaboration-settings'
					},
					{
						titleKey: 'sidebar.affiliate_seller.SearchOpenCollaboration',
						href: '/docs/core/affiliate-seller/search-open-collaboration'
					},
					{
						titleKey: 'sidebar.affiliate_seller.CreateOpenCollaboration',
						href: '/docs/core/affiliate-seller/create-open-collaboration'
					},
					{
						titleKey: 'sidebar.affiliate_seller.GetMessageInTheConversation',
						href: '/docs/core/affiliate-seller/get-message-in-the-conversation'
					},
					{
						titleKey: 'sidebar.affiliate_seller.GetConversationList',
						href: '/docs/core/affiliate-seller/get-conversation-list'
					},
					{
						titleKey: 'sidebar.affiliate_seller.SendIMMessage',
						href: '/docs/core/affiliate-seller/send-im-message'
					},
					{
						titleKey: 'sidebar.affiliate_seller.MarkConversationRead',
						href: '/docs/core/affiliate-seller/mark-conversation-read'
					},

					{
						titleKey: 'sidebar.affiliate_seller.GetLatestUnreadMessages',
						href: '/docs/core/affiliate-seller/get-latest-unread-messages'
					},
					{
						titleKey: 'sidebar.affiliate_seller.SellerReviewSampleApplications',
						href: '/docs/core/affiliate-seller/seller-review-sample-applications'
					},
					{
						titleKey: 'sidebar.affiliate_seller.SellerSearchCreatorOnMarketplace',
						href: '/docs/core/affiliate-seller/seller-search-creator-on-marketplace'
					},
					{
						titleKey: 'sidebar.affiliate_seller.GetMarketplaceCreatorPerformance',
						href: '/docs/core/affiliate-seller/get-marketplace-creator-performance'
					},
					{
						titleKey: 'sidebar.affiliate_seller.CreateTargetCollaboration',
						href: '/docs/core/affiliate-seller/create-target-collaboration'
					},
					{
						titleKey: 'sidebar.affiliate_seller.SearchTargetCollaborations',
						href: '/docs/core/affiliate-seller/search-target-collaborations'
					},
					{
						titleKey: 'sidebar.affiliate_seller.RemoveCreatorFromOpenCollaboration',
						href: '/docs/core/affiliate-seller/remove-creator-from-open-collaboration'
					},
					{
						titleKey: 'sidebar.affiliate_seller.UpdateTargetCollaboration',
						href: '/docs/core/affiliate-seller/update-target-collaboration'
					},
					{
						titleKey: 'sidebar.affiliate_seller.QueryTargetCollaborationDetail',
						href: '/docs/core/affiliate-seller/query-target-collaboration-detail'
					},
					{
						titleKey: 'sidebar.affiliate_seller.CreateConversationWithCreator',
						href: '/docs/core/affiliate-seller/create-conversation-with-creator'
					},
					{
						titleKey: 'sidebar.affiliate_seller.SellerSearchSampleApplications',
						href: '/docs/core/affiliate-seller/seller-search-sample-applications'
					},
					{
						titleKey: 'sidebar.affiliate_seller.GetOpenCollaborationCreatorContentDetail',
						href: '/docs/core/affiliate-seller/get-open-collaboration-creator-content-detail'
					},
					{
						titleKey: 'sidebar.affiliate_seller.GenerateTargetCollaborationLink',
						href: '/docs/core/affiliate-seller/generate-target-collaboration-link'
					},
					{
						titleKey: 'sidebar.affiliate_seller.UploadMessageImage',
						href: '/docs/core/affiliate-seller/upload-message-image'
					}
				]
			},
			{
				titleKey: 'sidebar.supply_chain.title',
				href: '/docs/core/supply-chain',
				children: [
					{
						titleKey: 'sidebar.supply_chain.ConfirmPackageShipment',
						href: '/docs/core/supply-chain/confirm-package-shipment'
					}
				]
			}
		]
	}
];
