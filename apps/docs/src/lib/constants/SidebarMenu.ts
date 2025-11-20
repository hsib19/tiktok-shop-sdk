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
			{ titleKey: 'sidebar.event', href: '/docs/core/event' },
			{ titleKey: 'sidebar.seller', href: '/docs/core/seller' },
			{ titleKey: 'sidebar.products', href: '/docs/core/products' },
			{ titleKey: 'sidebar.promotion', href: '/docs/core/promotion' },
			{ titleKey: 'sidebar.orders', href: '/docs/core/orders' },
			{ titleKey: 'sidebar.fulfilment', href: '/docs/core/fulfilment' },
			{ titleKey: 'sidebar.logistic', href: '/docs/core/logistic' },
			{ titleKey: 'sidebar.return_refund', href: '/docs/core/return-and-refund' },
			{ titleKey: 'sidebar.finance', href: '/docs/core/finance' },
			{ titleKey: 'sidebar.analytics', href: '/docs/core/analytics' },
			{ titleKey: 'sidebar.customer_service', href: '/docs/core/customer-service' },
			{ titleKey: 'sidebar.customer_engagement', href: '/docs/core/customer-engagement' },
			{ titleKey: 'sidebar.affiliate_creator', href: '/docs/core/affiliate-creator' },
			{ titleKey: 'sidebar.affiliate_partner', href: '/docs/core/affiliate-partner' },
			{ titleKey: 'sidebar.affiliate_seller', href: '/docs/core/affiliate-seller' },
			{ titleKey: 'sidebar.supply_chain', href: '/docs/core/supply-chain' }
		]
	}
];
