import { 
    BrandCreateResponse,
    BrandFilterInput,
    BrandInput,
    CategoriesResponse,
    CheckListingPrerequisitesResponse,
    GetAttributesResponse,
    GetBrandsResponse,
    GetCategoriesQuery,
    GetCategoryAttributes,
    GetCategoryRulesQuery,
    GetCategoryRulesResponse,
    GetProductParams,
    GetProductResponse,
    RecommendCategoryByProductParams,
    RecommendCategoryByProductResponse,
    RequestFunction,
    SearchProductInput,
    SearchProductsResponse,
    SearchSizeChartResponse,
    SearchSizeChartsInput,
    TikTokAPIResponse
} from '@types';

export class ProductModule {
    constructor(
        private request: RequestFunction,
    ) { }

    /**
     * Get product listing prerequisites for the seller.
     * This checks for any missing configurations required before listing a product,
     * such as setting a return warehouse or brand approval.
     *
     * @returns A Promise resolving to the prerequisites check result.
     */
    getProductPrerequisites(): Promise<TikTokAPIResponse<CheckListingPrerequisitesResponse>> {

        return this.request({
            method: 'GET',
            path: '/product/202309/prerequisites',
        })
    }

    getCategories(query: GetCategoriesQuery): Promise<TikTokAPIResponse<CategoriesResponse>> {

        return this.request({
            method: 'GET',
            path: '/product/202309/categories',
            query: query
        })
    }

    recommendCategory(body: RecommendCategoryByProductParams): Promise<TikTokAPIResponse<RecommendCategoryByProductResponse>> {

        return this.request({
            method: 'POST',
            path: '/product/202309/categories/recommend',
            body: body
        })
    }

    getCategoryRules(params: GetCategoryRulesQuery): Promise<TikTokAPIResponse<GetCategoryRulesResponse>> {

        return this.request({
            method: 'GET',
            path: `/product/202309/categories/${params.category_id}/rules`,
            query: params.query
        })
    }

    getAttributes(params: GetCategoryAttributes): Promise<TikTokAPIResponse<GetAttributesResponse>> {

        return this.request({
            method: 'GET',
            path: `/product/202309/categories/${params.category_id}/attributes`,
            query: params.query
        })
    }

    createCustomBrands(body: BrandInput): Promise<TikTokAPIResponse<BrandCreateResponse>> {

        return this.request({
            method: 'POST',
            path: `/product/202309/brands`,
            body: body
        })
    }

    getBrands(query: BrandFilterInput): Promise<TikTokAPIResponse<GetBrandsResponse>> {

        return this.request({
            method: 'GET',
            path: `/product/202309/brands`,
            query: query
        })
    }

    searchSizeCharts(params: SearchSizeChartsInput): Promise<TikTokAPIResponse<SearchSizeChartResponse>> {

        return this.request({
            method: 'POST',
            path: `/product/202407/sizecharts/search`,
            query: params.query,
            body: params.body
        })
    }

    searchProducts(params: SearchProductInput): Promise<TikTokAPIResponse<SearchProductsResponse>> {

        return this.request({
            method: 'POST',
            path: `/product/202502/products/search`,
            query: params.query,
            body: params.body
        })
    }

    getProduct(params: GetProductParams): Promise<TikTokAPIResponse<GetProductResponse>> {

        return this.request({
            method: 'GET',
            path: `/product/202309/products/${params.product_id}`,
            query: params.query
        })
    }

}
