import {
    ActivateProductInput,
    BrandCreateResponse,
    BrandFilterInput,
    BrandInput,
    CategoriesResponse,
    CheckListingPrerequisitesResponse,
    CreateManufacturerInput,
    CreateManufacturerResponse,
    CreateProductInput,
    CreateProductResponse,
    CreateResponsiblePersonInput,
    CreateResponsiblePersonResponse,
    DeactivateProductInput,
    DeleteProductInput,
    EditPartialManufacturerParam,
    EditProductParams,
    EditProductResponse,
    EditResponsiblePersonInput,
    GetAttributesResponse,
    GetBrandsResponse,
    GetCategoriesQuery,
    GetCategoryAttributes,
    GetCategoryRulesQuery,
    GetCategoryRulesResponse,
    GetGlobalAttributeResponse,
    GetGlobalAttributesQuery,
    GetGlobalCategoriesQuery,
    GetGlobalCategoriesResponse,
    GetManufacturersResponse,
    GetProductParams,
    GetProductResponse,
    GetProductSEOWordsResponse,
    GetRecommendedProductTitleAndDescriptionQuery,
    GetRecommendedProductTitleAndDescriptionResponse,
    MultipartRequestFunction,
    OptimizedImagesInput,
    OptimizedImagesResponse,
    ProductDiagnosisResponse,
    RecommendCategoryByProductParams,
    RecommendCategoryByProductResponse,
    RecoverProductBody,
    RequestFunction,
    SearchManufacturerQuery,
    SearchProductInput,
    SearchProductsResponse,
    SearchResponsiblePersonsParam,
    SearchResponsiblePersonsResponse,
    SearchSizeChartResponse,
    SearchSizeChartsInput,
    TikTokAPIResponse,
    UploadImageParams,
    UploadImageResponse
} from '@types';
import FormData from 'form-data';

/**
 * ProductModule provides methods to interact with TikTok Shop's product-related endpoints.
 */
export class ProductModule {
    constructor(
        private request: RequestFunction,
        private requestMultipart: MultipartRequestFunction
    ) { }

    /**
     * Check if the seller has fulfilled all necessary prerequisites to list products.
     * This may include return address setup or brand approval.
     */
    getProductPrerequisites(): Promise<TikTokAPIResponse<CheckListingPrerequisitesResponse>> {
        return this.request({
            method: 'GET',
            path: '/product/202309/prerequisites',
        });
    }

    /**
     * Retrieve available product categories.
     * Useful when the seller needs to browse or filter categories for listing.
     */
    getCategories(query: GetCategoriesQuery): Promise<TikTokAPIResponse<CategoriesResponse>> {
        return this.request({
            method: 'GET',
            path: '/product/202309/categories',
            query: query
        });
    }

    /**
     * Get recommended category for a product based on title, description, or image.
     */
    recommendCategory(body: RecommendCategoryByProductParams): Promise<TikTokAPIResponse<RecommendCategoryByProductResponse>> {
        return this.request({
            method: 'POST',
            path: '/product/202309/categories/recommend',
            body: body
        });
    }

    /**
     * Get category-specific rules (e.g., mandatory fields, validations) for listing a product.
     */
    getCategoryRules(params: GetCategoryRulesQuery): Promise<TikTokAPIResponse<GetCategoryRulesResponse>> {
        return this.request({
            method: 'GET',
            path: `/product/202309/categories/${params.category_id}/rules`,
            query: params.query
        });
    }

    /**
     * Get category-specific product attributes (e.g., color, size) required for listing.
     */
    getAttributes(params: GetCategoryAttributes): Promise<TikTokAPIResponse<GetAttributesResponse>> {
        return this.request({
            method: 'GET',
            path: `/product/202309/categories/${params.category_id}/attributes`,
            query: params.query
        });
    }

    /**
     * Create a custom brand under the seller's account.
     * Useful when listing products that don’t belong to existing brands.
     */
    createCustomBrands(body: BrandInput): Promise<TikTokAPIResponse<BrandCreateResponse>> {
        return this.request({
            method: 'POST',
            path: `/product/202309/brands`,
            body: body
        });
    }

    /**
     * Search for existing brands by keyword or filter.
     */
    getBrands(query: BrandFilterInput): Promise<TikTokAPIResponse<GetBrandsResponse>> {
        return this.request({
            method: 'GET',
            path: `/product/202309/brands`,
            query: query
        });
    }

    /**
     * Search for size charts based on category and product attributes.
     * Used when size chart is required for apparel or similar categories.
     */
    searchSizeCharts(params: SearchSizeChartsInput): Promise<TikTokAPIResponse<SearchSizeChartResponse>> {
        return this.request({
            method: 'POST',
            path: `/product/202407/sizecharts/search`,
            query: params.query,
            body: params.body
        });
    }

    /**
     * Search for existing products using keywords, filters, or pagination.
     * Helpful for managing listed inventory or checking duplicates.
     */
    searchProducts(params: SearchProductInput): Promise<TikTokAPIResponse<SearchProductsResponse>> {
        return this.request({
            method: 'POST',
            path: `/product/202502/products/search`,
            query: params.query,
            body: params.body
        });
    }

    /**
     * Retrieve detailed information about a specific product by ID.
     */
    getProduct(params: GetProductParams): Promise<TikTokAPIResponse<GetProductResponse>> {
        return this.request({
            method: 'GET',
            path: `/product/202309/products/${params.product_id}`,
            query: params.query
        });
    }
    /**
     * Create a new responsible person for product compliance.
     */
    createResponsiblePerson(body: CreateResponsiblePersonInput): Promise<TikTokAPIResponse<CreateResponsiblePersonResponse>> {
        return this.request({
            method: 'POST',
            path: `/product/202409/compliance/responsible_persons`,
            body: body
        });
    }

    /**
     * Search responsible persons based on given query and filters.
     */
    searchResponsiblePersons(params: SearchResponsiblePersonsParam): Promise<TikTokAPIResponse<SearchResponsiblePersonsResponse>> {
        return this.request({
            method: 'POST',
            path: `/product/202409/compliance/responsible_persons/search`,
            query: params.query,
            body: params.body
        });
    }

    /**
     * Edit details of a responsible person partially by ID.
     */
    editResponsiblePersons(params: EditResponsiblePersonInput): Promise<TikTokAPIResponse<object>> {
        return this.request({
            method: 'POST',
            path: `/product/202409/compliance/responsible_persons/${params.responsible_person_id}/partial_edit`,
            body: params.body
        });
    }

    /**
     * Create a category upgrade task for products.
     */
    createCategoryUpgradeTask(): Promise<TikTokAPIResponse<object>> {
        return this.request({
            method: 'POST',
            path: `/product/202407/products/category_upgrade_task`,
        });
    }

    /**
     * Get recommended product titles and descriptions.
     */
    getRecommendedProductTitleAndDescription(query: GetRecommendedProductTitleAndDescriptionQuery): Promise<TikTokAPIResponse<GetRecommendedProductTitleAndDescriptionResponse>> {
        return this.request({
            method: 'GET',
            path: `/product/202405/products/suggestions`,
            query
        });
    }

    /**
     * Get SEO words recommendations for products.
     */
    getProductsSEOWords(query: GetRecommendedProductTitleAndDescriptionQuery): Promise<TikTokAPIResponse<GetProductSEOWordsResponse>> {
        return this.request({
            method: 'GET',
            path: `/product/202405/products/seo_words`,
            query
        });
    }

    /**
     * Diagnose product information issues.
     */
    productInformationIssueDiagnosis(query: GetRecommendedProductTitleAndDescriptionQuery): Promise<TikTokAPIResponse<ProductDiagnosisResponse>> {
        return this.request({
            method: 'GET',
            path: `/product/202405/products/diagnoses`,
            query
        });
    }

    /**
     * Retrieve global product categories.
     */
    getGlobalCategories(query: GetGlobalCategoriesQuery): Promise<TikTokAPIResponse<GetGlobalCategoriesResponse>> {
        return this.request({
            method: 'GET',
            path: `/product/202309/global_categories`,
            query
        });
    }

    /**
     * Get global attributes for a specific category.
     */
    getGlobalAttributes(params: GetGlobalAttributesQuery): Promise<TikTokAPIResponse<GetGlobalAttributeResponse>> {
        return this.request({
            method: 'GET',
            path: `/product/202309/categories/${params.category_id}/global_attributes`,
            query: params.query
        });
    }

    /**
     * Create a new manufacturer entry.
     */
    createManufacturer(body: CreateManufacturerInput): Promise<TikTokAPIResponse<CreateManufacturerResponse>> {
        return this.request({
            method: 'POST',
            path: `/product/202409/compliance/manufacturers`,
            body: body
        });
    }

    /**
     * Search manufacturers with filters and query.
     */
    searchManufacturer(params: SearchManufacturerQuery): Promise<TikTokAPIResponse<GetManufacturersResponse>> {
        return this.request({
            method: 'POST',
            path: `/product/202501/compliance/manufacturers/search`,
            query: params.query,
            body: params.body
        });
    }

    /**
     * Partially edit manufacturer information by ID.
     */
    editPartialManufacturer(params: EditPartialManufacturerParam): Promise<TikTokAPIResponse<object>> {
        return this.request({
            method: 'POST',
            path: `/product/202409/compliance/manufacturers/${params.manufacturer_id}/partial_edit`,
            body: params.body
        });
    }

    /**
     * Deactivate products by given list.
     */
    deactivateProducts(body: DeactivateProductInput): Promise<TikTokAPIResponse<object>> {
        return this.request({
            method: 'POST',
            path: `/product/202309/products/deactivate`,
            body: body
        });
    }

    /**
     * Activate products by given list.
     */
    activateProducts(body: ActivateProductInput): Promise<TikTokAPIResponse<object>> {
        return this.request({
            method: 'POST',
            path: `/product/202309/products/activate`,
            body: body
        });
    }

    /**
     * Delete products by given list.
     */
    deleteProducts(body: DeleteProductInput): Promise<TikTokAPIResponse<object>> {
        return this.request({
            method: 'DELETE',
            path: `/product/202309/products`,
            body: body
        });
    }

    /**
     * Upload product images using multipart/form-data.
     */
    async uploadProductImage(body: UploadImageParams): Promise<TikTokAPIResponse<UploadImageResponse>> {

        const formData = new FormData();
        formData.append('data', body.data, "product_name");
        formData.append('use_case', body.use_case);

        return this.requestMultipart({
            method: 'POST',
            path: '/product/202309/images/upload',
            body: formData,
        });
    }

    /**
     * Optimize images for products.
     */
    async optimizedImages(body: OptimizedImagesInput): Promise<TikTokAPIResponse<OptimizedImagesResponse | object>> {

        return this.request({
            method: 'POST',
            path: '/product/202404/images/optimize',
            body: body,
        });
    }

    /**
     * Create a new product with given details.
     */
    async createProduct(body: CreateProductInput): Promise<TikTokAPIResponse<CreateProductResponse | object>> {

        return this.request({
            method: 'POST',
            path: '/product/202309/products',
            body: body,
        });
    }

    /**
     * Edit a product with given details.
     */
    async editProduct(params: EditProductParams): Promise<TikTokAPIResponse<EditProductResponse | object>> {

        return this.request({
            method: 'PUT',
            path: `/product/202309/products/${params.product_id}`,
            body: params.body,
        });
    }

    async recoverProduct(body: RecoverProductBody): Promise<TikTokAPIResponse<object>> {

        return this.request({
            method: 'POST',
            path: `/product/202309/products/recover`,
            body: body,
        });
    }

}
