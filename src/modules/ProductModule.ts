import { CategoriesResponse, CheckListingPrerequisitesResponse, GetAttributesResponse, GetCategoriesQuery, GetCategoryAttributes, GetCategoryRulesQuery, GetCategoryRulesResponse, RecommendCategoryByProductParams, RecommendCategoryByProductResponse, RequestFunction, TikTokAPIResponse } from '@types';

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

}
