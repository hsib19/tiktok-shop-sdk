export interface SellerShop {
    id: string;
    region: string;
    [key: string]: unknown;
}

export interface SellerShopsResponse {
    data: {
        shops: SellerShop[];
    };
}

export interface SellerPermissionsResponse {
    data: {
        permissions: string[];
    };
}
