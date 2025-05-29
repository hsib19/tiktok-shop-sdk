import { CategoriesResponse, CheckListingPrerequisitesResponse, GetCategoriesQuery, RequestFunction, TikTokAPIResponse } from '@types';

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

}
