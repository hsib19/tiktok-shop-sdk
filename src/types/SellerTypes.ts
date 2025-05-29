export interface SellerShop {
    id: string;
    region: string;
    [key: string]: unknown;
}

export interface SellerShopsResponse {
    shops: SellerShop[];
}

export interface SellerPermissionsResponse {
    permissions: string[];
}
