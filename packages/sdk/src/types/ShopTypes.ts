export interface GetAuthorizedShopListParams {
  page_size?: number;
  page_number?: number;
}

export interface AuthorizedShopList {
  shop_id: string;
  region: string;
  authorize_time: number;
}

export interface GetAuthorizedShopListResponse {
  total: number;
  shop_list: AuthorizedShopList[];
}

export interface AuthorizedShop {
  cipher: string;
  code: string;
  id: string;
  name: string;
  region: string;
  seller_type: string;
}

export interface AuthorizedShopsResponse {
  shops: AuthorizedShop[];
}

export interface CategoryAsset {
  cipher: string;
  target_market: string;
  category: {
    id: number;
    name: string;
  };
}

export interface CategoryAssetsResponse {
  category_assets: CategoryAsset[];
}
