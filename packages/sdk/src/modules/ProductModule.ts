import {
  ActivateProductInput,
  BrandCreateResponse,
  BrandFilterInput,
  BrandInput,
  CategoriesResponse,
  CheckListingPrerequisitesResponse,
  CheckProductListingBody,
  CheckProductListingResponse,
  CreateGlobalProductInput,
  CreateGlobalProductResponse,
  CreateImageTranslationTasksInput,
  CreateImageTranslationTasksResponse,
  CreateManufacturerInput,
  CreateManufacturerResponse,
  CreateProductInput,
  CreateProductResponse,
  CreateResponsiblePersonInput,
  CreateResponsiblePersonResponse,
  DeactivateProductInput,
  DeleteGlobalProductsInput,
  DeleteGlobalProductsResponse,
  DeleteProductInput,
  EditGlobalProductInput,
  EditGlobalProductResponse,
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
  GetGlobalCategoryRulesParams,
  GetGlobalCategoryRulesResponse,
  GetGlobalProductResponse,
  GetImageTranslationTasksQuery,
  GetImageTranslationTasksResponse,
  GetManufacturersResponse,
  GetProductParams,
  GetProductResponse,
  GetProductSEOWordsResponse,
  GetRecommendedProductTitleAndDescriptionQuery,
  GetRecommendedProductTitleAndDescriptionResponse,
  MultipartRequestFunction,
  OptimizedImagesInput,
  OptimizedImagesResponse,
  PartialEditProductParams,
  PartialEditProductResponse,
  ProductDiagnosisResponse,
  PublishGlobalProductInput,
  PublishGlobalProductResponse,
  RecommendCategoryByProductParams,
  RecommendCategoryByProductResponse,
  RecommendGlobalCategoryInput,
  RecommendGlobalCategoryResponse,
  RecoverProductBody,
  RequestFunction,
  SearchGlobalProductsInput,
  SearchGlobalProductsResponse,
  SearchInventoryBody,
  SearchInventoryResponse,
  SearchManufacturerQuery,
  SearchProductInput,
  SearchProductsResponse,
  SearchResponsiblePersonsParam,
  SearchResponsiblePersonsResponse,
  SearchSizeChartResponse,
  SearchSizeChartsInput,
  TikTokAPIResponse,
  UpdateGlobalInventoryInput,
  UpdateGlobalInventoryResponse,
  UpdateProductInventoryInput,
  UpdateProductInventoryResponse,
  UpdateProductPriceInput,
  UpdateProductPriceResponse,
  UploadImageParams,
  UploadImageResponse,
  UploadProductFileParams,
  UploadProductFileResponse,
} from "@types";
import FormData from "form-data";

/**
 * ProductModule provides methods to interact with TikTok Shop's product-related endpoints.
 *
 * Includes operations such as creating, updating, and retrieving product data,
 * managing global products, image translations, inventory, and more.
 *
 * @see https://partner.tiktokshop.com/docv2/page/products-api-overview
 * @class
 */

export class ProductModule {
  constructor(
    private request: RequestFunction,
    private requestMultipart: MultipartRequestFunction,
  ) {}

  /**
   * Check if the seller has fulfilled all necessary prerequisites to list products.
   * This may include return address setup or brand approval.
   */
  getProductPrerequisites(): Promise<
    TikTokAPIResponse<CheckListingPrerequisitesResponse>
  > {
    return this.request({
      method: "GET",
      path: "/product/202309/prerequisites",
    });
  }

  /**
   * Retrieve available product categories.
   * Useful when the seller needs to browse or filter categories for listing.
   */
  getCategories(
    query: GetCategoriesQuery,
  ): Promise<TikTokAPIResponse<CategoriesResponse>> {
    return this.request({
      method: "GET",
      path: "/product/202309/categories",
      query: query,
    });
  }

  /**
   * Get recommended category for a product based on title, description, or image.
   */
  recommendCategory(
    body: RecommendCategoryByProductParams,
  ): Promise<TikTokAPIResponse<RecommendCategoryByProductResponse>> {
    return this.request({
      method: "POST",
      path: "/product/202309/categories/recommend",
      body: body,
    });
  }

  /**
   * Get category-specific rules (e.g., mandatory fields, validations) for listing a product.
   */
  getCategoryRules(
    params: GetCategoryRulesQuery,
  ): Promise<TikTokAPIResponse<GetCategoryRulesResponse>> {
    return this.request({
      method: "GET",
      path: `/product/202309/categories/${params.category_id}/rules`,
      query: params.query,
    });
  }

  /**
   * Get category-specific product attributes (e.g., color, size) required for listing.
   */
  getAttributes(
    params: GetCategoryAttributes,
  ): Promise<TikTokAPIResponse<GetAttributesResponse>> {
    return this.request({
      method: "GET",
      path: `/product/202309/categories/${params.category_id}/attributes`,
      query: params.query,
    });
  }

  /**
   * Create a custom brand under the seller's account.
   * Useful when listing products that don’t belong to existing brands.
   */
  createCustomBrands(
    body: BrandInput,
  ): Promise<TikTokAPIResponse<BrandCreateResponse>> {
    return this.request({
      method: "POST",
      path: `/product/202309/brands`,
      body: body,
    });
  }

  /**
   * Search for existing brands by keyword or filter.
   */
  getBrands(
    query: BrandFilterInput,
  ): Promise<TikTokAPIResponse<GetBrandsResponse>> {
    return this.request({
      method: "GET",
      path: `/product/202309/brands`,
      query: query,
    });
  }

  /**
   * Search for size charts based on category and product attributes.
   * Used when size chart is required for apparel or similar categories.
   */
  searchSizeCharts(
    params: SearchSizeChartsInput,
  ): Promise<TikTokAPIResponse<SearchSizeChartResponse>> {
    return this.request({
      method: "POST",
      path: `/product/202407/sizecharts/search`,
      query: params.query,
      body: params.body,
    });
  }

  /**
   * Search for existing products using keywords, filters, or pagination.
   * Helpful for managing listed inventory or checking duplicates.
   */
  searchProducts(
    params: SearchProductInput,
  ): Promise<TikTokAPIResponse<SearchProductsResponse>> {
    return this.request({
      method: "POST",
      path: `/product/202502/products/search`,
      query: params.query,
      body: params.body,
    });
  }

  /**
   * Retrieve detailed information about a specific product by ID.
   */
  getProduct(
    params: GetProductParams,
  ): Promise<TikTokAPIResponse<GetProductResponse>> {
    return this.request({
      method: "GET",
      path: `/product/202309/products/${params.product_id}`,
      query: params.query,
    });
  }
  /**
   * Create a new responsible person for product compliance.
   */
  createResponsiblePerson(
    body: CreateResponsiblePersonInput,
  ): Promise<TikTokAPIResponse<CreateResponsiblePersonResponse>> {
    return this.request({
      method: "POST",
      path: `/product/202409/compliance/responsible_persons`,
      body: body,
    });
  }

  /**
   * Search responsible persons based on given query and filters.
   */
  searchResponsiblePersons(
    params: SearchResponsiblePersonsParam,
  ): Promise<TikTokAPIResponse<SearchResponsiblePersonsResponse>> {
    return this.request({
      method: "POST",
      path: `/product/202409/compliance/responsible_persons/search`,
      query: params.query,
      body: params.body,
    });
  }

  /**
   * Edit details of a responsible person partially by ID.
   */
  editResponsiblePersons(
    params: EditResponsiblePersonInput,
  ): Promise<TikTokAPIResponse<object>> {
    return this.request({
      method: "POST",
      path: `/product/202409/compliance/responsible_persons/${params.responsible_person_id}/partial_edit`,
      body: params.body,
    });
  }

  /**
   * Create a category upgrade task for products.
   */
  createCategoryUpgradeTask(): Promise<TikTokAPIResponse<object>> {
    return this.request({
      method: "POST",
      path: `/product/202407/products/category_upgrade_task`,
    });
  }

  /**
   * Get recommended product titles and descriptions.
   */
  getRecommendedProductTitleAndDescription(
    query: GetRecommendedProductTitleAndDescriptionQuery,
  ): Promise<
    TikTokAPIResponse<GetRecommendedProductTitleAndDescriptionResponse>
  > {
    return this.request({
      method: "GET",
      path: `/product/202405/products/suggestions`,
      query,
    });
  }

  /**
   * Get SEO words recommendations for products.
   */
  getProductsSEOWords(
    query: GetRecommendedProductTitleAndDescriptionQuery,
  ): Promise<TikTokAPIResponse<GetProductSEOWordsResponse>> {
    return this.request({
      method: "GET",
      path: `/product/202405/products/seo_words`,
      query,
    });
  }

  /**
   * Diagnose product information issues.
   */
  productInformationIssueDiagnosis(
    query: GetRecommendedProductTitleAndDescriptionQuery,
  ): Promise<TikTokAPIResponse<ProductDiagnosisResponse>> {
    return this.request({
      method: "GET",
      path: `/product/202405/products/diagnoses`,
      query,
    });
  }

  /**
   * Retrieve global product categories.
   */
  getGlobalCategories(
    query: GetGlobalCategoriesQuery,
  ): Promise<TikTokAPIResponse<GetGlobalCategoriesResponse>> {
    return this.request({
      method: "GET",
      path: `/product/202309/global_categories`,
      query,
    });
  }

  /**
   * Get global attributes for a specific category.
   */
  getGlobalAttributes(
    params: GetGlobalAttributesQuery,
  ): Promise<TikTokAPIResponse<GetGlobalAttributeResponse>> {
    return this.request({
      method: "GET",
      path: `/product/202309/categories/${params.category_id}/global_attributes`,
      query: params.query,
    });
  }

  /**
   * Create a new manufacturer entry.
   */
  createManufacturer(
    body: CreateManufacturerInput,
  ): Promise<TikTokAPIResponse<CreateManufacturerResponse>> {
    return this.request({
      method: "POST",
      path: `/product/202409/compliance/manufacturers`,
      body: body,
    });
  }

  /**
   * Search manufacturers with filters and query.
   */
  searchManufacturer(
    params: SearchManufacturerQuery,
  ): Promise<TikTokAPIResponse<GetManufacturersResponse>> {
    return this.request({
      method: "POST",
      path: `/product/202501/compliance/manufacturers/search`,
      query: params.query,
      body: params.body,
    });
  }

  /**
   * Partially edit manufacturer information by ID.
   */
  editPartialManufacturer(
    params: EditPartialManufacturerParam,
  ): Promise<TikTokAPIResponse<object>> {
    return this.request({
      method: "POST",
      path: `/product/202409/compliance/manufacturers/${params.manufacturer_id}/partial_edit`,
      body: params.body,
    });
  }

  /**
   * Deactivate products by given list.
   */
  deactivateProducts(
    body: DeactivateProductInput,
  ): Promise<TikTokAPIResponse<object>> {
    return this.request({
      method: "POST",
      path: `/product/202309/products/deactivate`,
      body: body,
    });
  }

  /**
   * Activate products by given list.
   */
  activateProducts(
    body: ActivateProductInput,
  ): Promise<TikTokAPIResponse<object>> {
    return this.request({
      method: "POST",
      path: `/product/202309/products/activate`,
      body: body,
    });
  }

  /**
   * Delete products by given list.
   */
  deleteProducts(body: DeleteProductInput): Promise<TikTokAPIResponse<object>> {
    return this.request({
      method: "DELETE",
      path: `/product/202309/products`,
      body: body,
    });
  }

  /**
   * Upload product images using multipart/form-data.
   */
  async uploadProductImage(
    body: UploadImageParams,
  ): Promise<TikTokAPIResponse<UploadImageResponse>> {
    const formData = new FormData();
    formData.append("data", body.data, "product_name");
    formData.append("use_case", body.use_case);

    return this.requestMultipart({
      method: "POST",
      path: "/product/202309/images/upload",
      body: formData,
    });
  }

  /**
   * Optimize images for products.
   */
  async optimizedImages(
    body: OptimizedImagesInput,
  ): Promise<TikTokAPIResponse<OptimizedImagesResponse | object>> {
    return this.request({
      method: "POST",
      path: "/product/202404/images/optimize",
      body: body,
    });
  }

  /**
   * Create a new product with given details.
   */
  async createProduct(
    body: CreateProductInput,
  ): Promise<TikTokAPIResponse<CreateProductResponse | object>> {
    return this.request({
      method: "POST",
      path: "/product/202309/products",
      body: body,
    });
  }

  /**
   * Edit a product with given details.
   */
  async editProduct(
    params: EditProductParams,
  ): Promise<TikTokAPIResponse<EditProductResponse | object>> {
    return this.request({
      method: "PUT",
      path: `/product/202309/products/${params.product_id}`,
      body: params.body,
    });
  }

  /**
   * Partially edit a product with given details.
   * This endpoint allows updating specific fields of a product without requiring all fields.
   */
  async partialEditProduct(
    params: PartialEditProductParams,
  ): Promise<TikTokAPIResponse<PartialEditProductResponse | object>> {
    return this.request({
      method: "POST",
      path: `/product/202309/products/${params.product_id}/partial_edit`,
      body: params.body,
    });
  }

  /**
   * Recover deleted product using product ID.
   * @see https://partner.tiktokshop.com/doc/page/661176
   * @param body - Payload containing the product_id to recover.
   */
  async recoverProduct(
    body: RecoverProductBody,
  ): Promise<TikTokAPIResponse<object>> {
    return this.request({
      method: "POST",
      path: `/product/202309/products/recover`,
      body: body,
    });
  }

  /**
   * Check product listing prerequisites before publishing.
   * @see https://partner.tiktokshop.com/docv2/page/recover-products-202309
   * @param body - Payload containing product details to check listing eligibility.
   */
  async checkProductListing(
    body: CheckProductListingBody,
  ): Promise<TikTokAPIResponse<CheckProductListingResponse>> {
    return this.request({
      method: "POST",
      path: `/product/202309/products/listing_check`,
      body: body,
    });
  }

  /**
   * Upload a file (e.g., product image or certificate).
   * @see https://partner.tiktokshop.com/docv2/page/upload-product-file-202309
   * @param body - File and metadata required for upload.
   */
  async uploadProductFile(
    body: UploadProductFileParams,
  ): Promise<TikTokAPIResponse<UploadProductFileResponse>> {
    const formData = new FormData();
    formData.append("data", body.data, body.name);
    formData.append("name", body.name);

    return this.requestMultipart({
      method: "POST",
      path: "/product/202309/files/upload",
      body: formData,
    });
  }

  /**
   * Search inventory by filters like product_id or status.
   * @see https://partner.tiktokshop.com/docv2/page/inventory-search-202309
   * @param body - Payload to filter and search product inventory.
   */
  async searchInventory(
    body: SearchInventoryBody,
  ): Promise<TikTokAPIResponse<SearchInventoryResponse>> {
    return this.request({
      method: "POST",
      path: "/product/202309/inventory/search",
      body,
    });
  }

  /**
   * Update price of a product SKU.
   * @see https://partner.tiktokshop.com/docv2/page/update-price-202309
   * @param params - Object containing product_id and body with price data.
   */
  async updateProductPrice(
    params: UpdateProductPriceInput,
  ): Promise<TikTokAPIResponse<UpdateProductPriceResponse>> {
    return this.request({
      method: "POST",
      path: `/product/202309/products/${params.product_id}/prices/update`,
      body: params.body,
    });
  }

  /**
   * Update inventory of a product SKU.
   * @see https://partner.tiktokshop.com/docv2/page/update-inventory-202309
   * @param params - Object containing product_id and inventory data.
   */
  async updateProductInventory(
    params: UpdateProductInventoryInput,
  ): Promise<TikTokAPIResponse<UpdateProductInventoryResponse>> {
    return this.request({
      method: "POST",
      path: `/product/202309/products/${params.product_id}/inventory/update`,
      body: params.body,
    });
  }

  /**
   * Get recommended global categories for a product.
   * @see https://partner.tiktokshop.com/docv2/page/recommend-global-categories-202309
   * @param body - Object with product information to get category suggestions.
   */
  async recommendGlobalCategory(
    body: RecommendGlobalCategoryInput,
  ): Promise<TikTokAPIResponse<RecommendGlobalCategoryResponse>> {
    return this.request({
      method: "POST",
      path: "/product/202309/global_categories/recommend",
      body,
    });
  }

  /**
   * Get global category rules (e.g., attributes, requirements).
   * @see https://partner.tiktokshop.com/docv2/page/get-global-category-rules-202309
   * @param params - Params containing category_id and optional query.
   */
  async getGlobalCategoryRules(
    params: GetGlobalCategoryRulesParams,
  ): Promise<TikTokAPIResponse<GetGlobalCategoryRulesResponse>> {
    return this.request({
      method: "GET",
      path: `/product/202309/categories/${params.category_id}/global_rules`,
      query: params.query,
    });
  }

  /**
   * Create a new global product.
   * @see https://partner.tiktokshop.com/docv2/page/create-global-product-202309
   * @param body - Payload for creating a global product.
   */
  async createGlobalProduct(
    body: CreateGlobalProductInput,
  ): Promise<TikTokAPIResponse<CreateGlobalProductResponse>> {
    return this.request({
      method: "POST",
      path: "/product/202309/global_products",
      body,
    });
  }

  /**
   * Edit a global product by ID.
   * @see https://partner.tiktokshop.com/docv2/page/edit-global-product-202309
   * @param params - Object containing global_product_id and updated product body.
   */
  async editGlobalProduct(
    params: EditGlobalProductInput,
  ): Promise<TikTokAPIResponse<EditGlobalProductResponse>> {
    return this.request({
      method: "PUT",
      path: `/product/202309/global_products/${params.global_product_id}`,
      body: params.body,
    });
  }

  /**
   * Delete one or multiple global products.
   * @see https://partner.tiktokshop.com/docv2/page/delete-global-products-202309
   * @param body - Payload containing IDs of global products to delete.
   */
  async deleteGlobalProducts(
    body: DeleteGlobalProductsInput,
  ): Promise<TikTokAPIResponse<DeleteGlobalProductsResponse>> {
    return this.request({
      method: "DELETE",
      path: "/product/202309/global_products",
      body,
    });
  }

  /**
   * Search for global products using filters and pagination.
   * @see https://partner.tiktokshop.com/docv2/page/search-global-products-202312
   * @param params - Object with query and body filters.
   */
  async searchGlobalProducts(
    params: SearchGlobalProductsInput,
  ): Promise<TikTokAPIResponse<SearchGlobalProductsResponse>> {
    return this.request({
      method: "POST",
      path: "/product/202312/global_products/search",
      query: params.query,
      body: params.body,
    });
  }
  /**
   * Update inventory for a specific global product.
   * @see https://partner.tiktokshop.com/docv2/page/update-global-inventory-202309
   * @param params - Params containing global_product_id and new inventory data.
   */
  async updateGlobalInventory(
    params: UpdateGlobalInventoryInput,
  ): Promise<TikTokAPIResponse<UpdateGlobalInventoryResponse>> {
    return this.request({
      method: "POST",
      path: `/product/202309/global_products/${params.global_product_id}/inventory/update`,
      body: params.body,
    });
  }

  /**
   * Get a specific global product by ID.
   * @see https://partner.tiktokshop.com/docv2/page/get-global-product-202309
   * @param global_product_id - ID of the global product to retrieve.
   */
  async getGlobalProduct(
    global_product_id: string,
  ): Promise<TikTokAPIResponse<GetGlobalProductResponse>> {
    return this.request({
      method: "GET",
      path: `/product/202309/global_products/${global_product_id}`,
    });
  }

  /**
   * Publish a global product to a specific market or all markets.
   * @see https://partner.tiktokshop.com/docv2/page/publish-global-product-202309
   * @param params - Object containing global_product_id and publish config.
   */
  async publishGlobalProduct(
    params: PublishGlobalProductInput,
  ): Promise<TikTokAPIResponse<PublishGlobalProductResponse>> {
    return this.request({
      method: "POST",
      path: `/product/202309/global_products/${params.global_product_id}/publish`,
      body: params.body,
    });
  }

  /**
   * Create image translation tasks for multiple product images.
   * @see https://partner.tiktokshop.com/docv2/page/create-image-translation-tasks-202505
   * @param body - List of image URLs and target languages.
   */
  async createImageTranslationTasks(
    body: CreateImageTranslationTasksInput,
  ): Promise<TikTokAPIResponse<CreateImageTranslationTasksResponse>> {
    return this.request({
      method: "POST",
      path: "/product/202505/images/translation_tasks",
      body,
    });
  }

  /**
   * Get status of image translation tasks.
   * @see https://partner.tiktokshop.com/docv2/page/get-image-translation-tasks-202506
   * @param query - Object containing task_ids for status lookup.
   */
  async getImageTranslationTasks(
    query: GetImageTranslationTasksQuery,
  ): Promise<TikTokAPIResponse<GetImageTranslationTasksResponse>> {
    return this.request({
      method: "GET",
      path: "/product/202506/images/translation_tasks",
      query: query,
    });
  }
}
