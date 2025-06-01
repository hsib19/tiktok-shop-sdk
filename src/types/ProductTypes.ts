import fs from 'fs';

// Represents the result of a prerequisite check
export type CheckResult = {
    is_failed: boolean;
    fail_reasons?: string[];
};

// Represents a single checkable field
export type PrerequisiteField = {
    id: string;
    name: string;
    check_result: CheckResult;
};

// Main response structure for "Check Listing Prerequisites"
export type CheckListingPrerequisitesResponse = {
    shop: {
        status: string | PrerequisiteField;
        tax_info: string | PrerequisiteField;
        gne: {
            product_quantity_limit: string | PrerequisiteField;
            epr: string | PrerequisiteField;
        };
        logistics: {
            pickup_warehouse: string | PrerequisiteField;
            return_warehouse: string | PrerequisiteField;
            shipping_template: string | PrerequisiteField;
            delivery_option: string | PrerequisiteField;
        };
        contact_info: string | PrerequisiteField;
        bank_account: string | PrerequisiteField;
    };
};

type locale = string | "de-DE" | "en-GB" | "en-IE" | "en-US" | "es-ES" | "es-MX" | "fr-FR" | "id-ID" | "it-IT" | "ja-JP" | "ms-MY" | "pt-BR" | "th-TH" | "vi-VN" | "zh-CN";

export type GetCategoriesQuery = {
    locale?: locale;
    keyword?: string;
    category_version?: string | "v1" | "v2";
    listing_platform?: string | "TIKTOK_SHOP" | "TOKOPEDIA";
    include_prohibited_categories?: boolean;
}

export interface Category {
    id: string;
    parent_id: string;
    local_name: string;
    is_leaf: boolean;
    permission_statuses: string[];
}

export type CategoriesResponse = {
    categories: Category[]
}

export type RecommendCategoryByProductParams = {
    product_title: string;
    description?: string;
    images?: {
        url: string;
        width?: number;
        height?: number;
    }[];
    category_version?: 'v1' | 'v2';
    listing_platform?: 'TIKTOK_SHOP' | 'TOKOPEDIA';
    include_prohibited_categories?: boolean;
}

export interface RecommendCategoryByProductResponse {
    leaf_category_id: string;
    categories: {
        id: string;
        name: string;
        level: number;
        is_leaf: boolean;
        permission_statuses: string[];
    }[];
}

export type GetCategoryRules  = {
    category_version?: "v1" | "v2";
    locale?: locale;
}

export type GetCategoryInput = {
    category_id: string;
    query: GetCategoryRules
}

export type GetCategoryRulesQuery = GetCategoryInput;
export type GetCategoryAttributes = GetCategoryInput;

export interface GetAttributesResponse {
    attributes: Attribute[];
}

export interface Attribute {
    id?: string;
    name?: string;
    type?: string; 
    is_requried?: boolean; 
    values?: AttributeValue[];
    value_data_format?: string; 
    is_customizable?: boolean;
    requirement_conditions?: RequirementCondition[];
    is_multiple_selection?: boolean;
}

export interface AttributeValue {
    id: string;
    name: string;
}

export interface RequirementCondition {
    condition_type: string; 
    attribute_id: string;
    attribute_value_id: string;
}


export interface GetCategoryRulesResponse {
    product_certifications: ProductCertification[];
    size_chart: {
        is_supported: boolean;
        is_required: boolean;
    };
    cod: {
        is_supported: boolean;
    };
    package_dimension: {
        is_required: boolean;
    };
    epr: {
        is_required: boolean;
    };
    responsible_person: {
        is_required: boolean;
    };
    manufacturer: {
        is_required: boolean;
    };
    allowed_special_product_types: string[]; 
}

export interface ProductCertification {
    id: string;
    name: string;
    is_required: boolean;
    document_details: string;
    sample_image_url: string;
    requirement_conditions: RequirementCondition[];
    expiration_date: {
        is_required: boolean;
    };
}

export interface RequirementCondition {
    condition_type: string;
    attribute_id: string;
    attribute_value_id: string;
}


export type BrandInput = {
    name: string;
}

export interface BrandCreateResponse {
    id: string;
}

export type BrandFilterInput = {
    category_id?: string;
    is_authorized?: boolean;
    brand_name?: string;
    page_size: number;
    page_token?: string;
    category_version?: 'v1' | 'v2';
}

export type GetBrandsResponse = {
    brands: {
        id: string;
        name: string;
        authorized_status: string | 'AUTHORIZED' | 'UNAUTHORIZED'; 
        is_t1_brand: boolean;
        brand_status: string | 'AVAILABLE' | 'UNAVAILABLE'; 
    }[];
    total_count: number;
    next_page_token: string;
};

export type SearchSizeChartsFilter = {
    page_size: number;
    page_token?: string;
    locale?: locale
}

export type SearchSizeChartsBody = {
    ids?: string[];
    keyword?: string;
}

export type SearchSizeChartsInput = {
    query: SearchSizeChartsFilter;
    body?: SearchSizeChartsBody;
}

export type SearchSizeChartResponse = {
    size_chart: {
        template_id: string;
        template_name: string;
        images: {
            uri: string;
            url: string;
            locale: string;
        }[];
    }[];
    next_page_token: string;
    total_count: number;
};


export type SearchProductsQuery = {
    page_size: number;
    page_token?: string;
}

export type ListingQualityTier = 'POOR' | 'FAIR' | 'GOOD';
export type ListingPlatform = 'TIKTOK_SHOP';
export type AuditStatus = 'AUDITING' | 'REJECTED' | 'PASSED';
export type ProductStatus = 'ALL' | "DRAFT" | "PENDING" | "FAILED" | "ACTIVATE" | "SELLER_DEACTIVATED" | "PLATFORM_DEACTIVATED" | "FREEZE" | "DELETED";

export type SearchProductInput = {
    query: SearchProductsQuery;
    body: SearchProductsBody
}

export type SearchProductsBody = {
    status?: ProductStatus;
    seller_skus?: string[];
    create_time_ge?: number;
    create_time_le?: number;
    update_time_ge?: number;
    update_time_le?: number;
    category_version?: string;
    listing_quality_tiers?: ListingQualityTier[];
    listing_platforms?: ListingPlatform[];
    audit_status?: AuditStatus[];
    sku_ids?: string[];
}

export interface SearchProductsResponse {
    total_count: number;
    products: {
        id: string;
        title: string;
        status: string;
        skus: {
            id: string;
            seller_sku: string;
            price: {
                currency: string;
                tax_exclusive_price: string;
                sale_price: string;
            };
            inventory: {
                warehouse_id: string;
                quantity: number;
            }[];
            list_price: {
                amount: string;
                currency: string;
            };
            external_list_prices: {
                source: string;
                amount: string;
                currency: string;
            }[];
            pre_sale: {
                type: string;
                fulfillment_type: {
                    handling_duration_days: number;
                    release_date: number;
                };
            };
        }[];
        sales_regions: string[];
        create_time: number;
        update_time: number;
        product_sync_fail_reasons: string[];
        is_not_for_sale: boolean;
        recommended_categories: {
            id: string;
            local_name: string;
        }[];
        listing_quality_tier: string;
        integrated_platform_statuses: {
            platform: string;
            status: string;
        }[];
        audit: {
            status: string;
            pre_approved_reasons: string[];
        };
        product_families: {
            id: string;
            products: {
                id: string;
            }[];
        }[];
    }[];
    next_page_token?: string;
}


export type GetProductParams = {
    product_id: string;
    query: {
        return_under_review_version?: boolean;
    }
}

export type GetProductResponse = {
    id: string;
    status: string;
    title: string;
    category_chains: {
        id: string;
        parent_id: string;
        local_name: string;
        is_leaf: boolean;
    }[];
    brand: {
        id: string;
        name: string;
    };
    main_images: {
        height: number;
        width: number;
        thumb_urls: string[];
        uri: string;
        urls: string[];
    }[];
    video: {
        id: string;
        cover_url: string;
        format: string;
        url: string;
        width: number;
        height: number;
        size: number;
    };
    description: string;
    package_dimensions: {
        length: string;
        width: string;
        height: string;
        unit: string;
    };
    package_weight: {
        value: string;
        unit: string;
    };
    skus: {
        id: string;
        seller_sku: string;
        price: {
            tax_exclusive_price: string;
            sale_price: string;
            currency: string;
            unit_price: string;
        };
        inventory: {
            warehouse_id: string;
            quantity: number;
        }[];
        identifier_code: {
            code: string;
            type: string;
        };
        sales_attributes: {
            id: string;
            name: string;
            value_id: string;
            value_name: string;
            sku_img: {
                height: number;
                width: number;
                thumb_urls: string[];
                uri: string;
                urls: string[];
            };
            supplementary_sku_images: {
                uri: string;
                height: number;
                width: number;
                thumb_urls: string[];
                urls: string[];
            }[];
        }[];
        external_sku_id: string;
        combined_skus: {
            product_id: string;
            sku_id: string;
            sku_count: number;
        }[];
        global_listing_policy: {
            price_sync: boolean;
            inventory_type: string;
            replicate_source: {
                product_id: string;
                shop_id: string;
                sku_id: string;
            };
        };
        sku_unit_count: string;
        external_urls: string[];
        extra_identifier_codes: string[];
        pre_sale: {
            type: string;
            fulfillment_type: {
                handling_duration_days: number;
                release_date: number;
            };
        };
        list_price: {
            amount: string;
            currency: string;
        };
        external_list_prices: {
            source: string;
            amount: string;
            currency: string;
        }[];
    }[];
    certifications: {
        id: string;
        title: string;
        files: {
            id: string;
            urls: string[];
            name: string;
            format: string;
        }[];
        images: {
            height: number;
            width: number;
            thumb_urls: string[];
            uri: string;
            urls: string[];
        }[];
        expiration_date: number;
    }[];
    size_chart: {
        image: {
            height: number;
            width: number;
            thumb_urls: string[];
            uri: string;
            urls: string[];
        };
        template: {
            id: string;
        };
    };
    is_cod_allowed: boolean;
    product_attributes: {
        id: string;
        name: string;
        values: {
            id: string;
            name: string;
        }[];
    }[];
    audit_failed_reasons: {
        position: string;
        reasons: string[];
        suggestions: string[];
        listing_platform: string;
    }[];
    update_time: number;
    create_time: number;
    delivery_options: {
        id: string;
        name: string;
        is_available: boolean;
    }[];
    external_product_id: string;
    product_types: string[];
    is_not_for_sale: boolean;
    recommended_categories: {
        id: string;
        local_name: string;
    }[];
    manufacturer_ids: string[];
    responsible_person_ids: string[];
    listing_quality_tier: string;
    integrated_platform_statuses: {
        platform: string;
        status: string;
    }[];
    shipping_insurance_requirement: string;
    minimum_order_quantity: number;
    is_pre_owned: boolean;
    audit: {
        status: string;
        pre_approved_reasons: string[];
    };
    global_product_association: {
        global_product_id: string;
        sku_mappings: {
            global_sku_id: string;
            local_sku_id: string;
            sales_attribute_mappings: {
                local_attribute_id: string;
                global_attribute_id: string;
                local_value_id: string;
                global_value_id: string;
            }[];
        }[];
    };
    prescription_requirement: {
        needs_prescription: boolean;
    };
    product_families: {
        id: string;
        products: {
            id: string;
        }[];
    }[];
};

export type EditResponsiblePersonInput = {
    responsible_person_id: string;
    body: CreateResponsiblePersonInput;
}

export type CreateResponsiblePersonInput = {
    name: string;
    email: string;
    phone_number: {
        country_code: string;
        local_number: string;
    };
    address: {
        street_address_line1: string;
        street_address_line2?: string;
        district?: string;
        city?: string;
        postal_code: string;
        province?: string;
        country: string;
    };
    locale?: string;
};

export interface CreateResponsiblePersonResponse {
    "responsible_person_id": string;
}

export type SearchResponsiblePersonsQuery = {
    page_size: number;
    page_token?: string;
}

export type SearchResponsiblePersonsInput = {
    responsible_person_ids?: string[];
    keyword?: string;
}

export type SearchResponsiblePersonsParam = {
    query: SearchResponsiblePersonsQuery,
    body: SearchResponsiblePersonsInput,
}

export type SearchResponsiblePersonsResponse = {
    responsible_persons: {
        id: string;
        name: string;
        email: string;
        phone_number: {
            country_code: string;
            local_number: string;
        };
        address: {
            street_address_line1: string;
            street_address_line2?: string;
            district?: string;
            city?: string;
            postal_code: string;
            province?: string;
            country: string;
        };
        locale?: string;
    }[];
    total_count: number,
    next_page_token: string;
};

export type GetRecommendedProductTitleAndDescriptionQuery = {
    product_ids: string[];
}

export interface GetRecommendedProductTitleAndDescriptionResponse {
    products: {
        id: string,
        suggestions: {
                field: string,
                items: { text: string; }[]
            }[];
    }[];
}


export type GetProductSEOWordsResponse = {
    products:{
        id: string,
        seo_words: 
            {
            text: string
            }[]
    }[];
}

export interface ProductDiagnosisResponse {
    products: DiagnosedProduct[];
}

export interface DiagnosedProduct {
    id: string;
    listing_quality: ListingQuality;
    diagnoses: Diagnosis[];
}

export interface ListingQuality {
    current_tier: string;
    remaining_recommendations: number;
}

export interface Diagnosis {
    field: string;
    diagnosis_results: DiagnosisResult[];
    suggestion: Suggestion;
}

export interface DiagnosisResult {
    code: string;
    how_to_solve: string;
    quality_tier: string; 
}

export interface Suggestion {
    seo_words: TextItem[];
    smart_texts: TextItem[];
    images: ImageItem[];
}

export interface TextItem {
    text: string;
}

export interface ImageItem {
    height: number;
    width: number;
    uri: string;
    url: string;
    optimized_uri: string;
    optimized_url: string;
}


export type GetGlobalCategoriesQuery = {
    locale?: locale;
    keyword?: string;
    category_version?: 'v1' | 'v2'
}


export interface GetGlobalCategoriesResponse {
    categories: Category[];
}

export interface Category {
    id: string;
    parent_id: string;
    local_name: string;
    is_leaf: boolean;
    permission_statuses: PermissionStatus[];
}

export type PermissionStatus = 'AVAILABLE' | 'UNAVAILABLE' | string; 

export type GetGlobalAttributesInput = {
    locale?: locale;
    category_version?: 'v1' | 'v2'
}

export type GetGlobalAttributesQuery = {
    category_id: string;
    query?: GetGlobalAttributesInput
}

export interface GetGlobalAttributeResponse {
    attributes: GetGlobalAttributes[];
}

export interface GetGlobalAttributes {
    id: string;
    name: string;
    type: string;
    is_requried: boolean;
    values: AttributeValue[];
    is_multiple_selection: boolean;
    is_customizable: boolean;
    requirement_conditions: RequirementConditionGlobal[];
    optional_regions: string[];
    required_regions: string[];
}

export interface AttributeValue {
    id: string;
    name: string;
}

export interface RequirementConditionGlobal {
    region: string;
    condition_type: string;
    attribute_id: string;
    attribute_value_id: string;
}

export type CreateManufacturerInput = {
    name: string;
    email: string;
    registered_trade_name?: string;
    phone_number: {
        country_code: string;
        local_number: string;
    };
    address: string;
    locale?: locale;
};

export interface CreateManufacturerResponse {
    manufacturer_id?: string;
}

export type ManufacturerInputBody = {
    manufacturer_ids?: string[];
    keyword?: string;
    locales?: locale;
}

export type SearchManufacturerQuery = {
    body: ManufacturerInputBody;
    query: SearchProductsQuery
};

export interface GetManufacturersResponse {
    manufacturers: Manufacturer[];
    total_count: number;
    next_page_token: string;
}

export interface Manufacturer {
    id: string;
    regional_profiles: RegionalProfile[];
}

export interface RegionalProfile {
    locale: string;
    name: string;
    registered_trade_name: string;
    email: string;
    phone_number: PhoneNumber;
    address: string;
}

export interface PhoneNumber {
    country_code: string;
    local_number: string;
}

export type EditPartialManufacturerParam = {
    manufacturer_id: string;
    body: CreateManufacturerInput
}


export type DeactivateProductInput = {
    product_ids: string[];
    listing_platforms?: Platforms[];
}

export type ActivateProductInput = {
    product_ids: string[];
    listing_platforms?: Platforms[];
}

export type DeleteProductInput = {
    product_ids: string[];
}

export type Platforms = "TOKOPEDIA" | "TIKTOK_SHOP";

export interface UploadImageParams extends Record<string, unknown> {
    data: Buffer | fs.ReadStream;
    use_case: use_case;
}

type use_case = "MAIN_IMAGE" | "ATTRIBUTE_IMAGE" | "DESCRIPTION_IMAGE" | "CERTIFICATION_IMAGE"

export interface UploadImageResponse {
    uri: string;
    url: string;
    height: number;
    width: number;
    use_case: use_case
}

export type OptimizedImagesInput = {
    images: {
        uri: string;
        optimization_mode: ("WHITE_BACKGROUND")[];
    }[]
}

export type OptimizedImage = {
    height: number;
    width: number;
    original_uri: string;
    original_url: string;
    optimized_uri: string;
    optimized_url: string;
    optimize_status: "SUCCESS" | "FAIL" | string;
};

export type OptimizedImagesResponse = {
    images: OptimizedImage[];
};

export type CreateProductInput = {
    title: string;
    description: string;
    category_id: string;
    brand_id?: string;
    save_mode?: 'LISTING' | 'DRAFT';
    main_images: {
        uri: string;
    }[];
    skus: {
        sales_attributes: {
            id: string;
            value_id: string;
            value_name: string;
            sku_img?: {
                uri: string;
            };
            name?: string;
            supplementary_sku_images?: {
                uri: string;
            }[];
        }[];
        inventory: {
            warehouse_id: string;
            quantity: number;
        }[];
        seller_sku?: string;
        price: {
            amount: string;
            currency: string;
        };
        external_sku_id?: string;
        identifier_code?: {
            code: string;
            type: string;
        };
        combined_skus?: {
            product_id: string;
            sku_id: string;
            sku_count: number;
        }[];
        sku_unit_count?: string;
        external_urls?: string[];
        extra_identifier_codes?: string[];
        pre_sale?: {
            type: string;
            fulfillment_type: {
                handling_duration_days: number;
                release_date: number;
            };
        };
        list_price?: {
            amount: string;
            currency: string;
        };
        external_list_prices?: {
            source: string;
            amount: string;
            currency: string;
        }[];
    }[];
    is_cod_allowed?: boolean;
    certifications?: {
        id: string;
        images?: {
            uri: string;
        }[];
        files?: {
            id: string;
            name: string;
            format: string;
        }[];
        expiration_date?: number;
    }[];
    package_dimensions?: {
        length: string;
        width: string;
        height: string;
        unit: string;
    };
    package_weight: {
        value: string;
        unit: string;
    };
    product_attributes?: {
        id: string;
        values: {
            id: string;
            name: string;
        }[];
    }[];
    video?: {
        id: string;
    };
    external_product_id?: string;
    delivery_option_ids?: string[];
    size_chart?: {
        image: {
            uri: string;
        };
        template?: {
            id: string;
        };
    };
    primary_combined_product_id?: string;
    is_not_for_sale?: boolean;
    category_version?: string;
    manufacturer_ids?: string[];
    responsible_person_ids?: string[];
    listing_platforms?: string[];
    shipping_insurance_requirement?: 'REQUIRED' | 'NOT_REQUIRED';
    minimum_order_quantity?: number;
    is_pre_owned?: boolean;
    idempotency_key?: string;
};

export type CreateProductResponse = {
    product_id: string;
    skus: {
        id: string;
        seller_sku: string;
        sales_attributes: {
            id: string;
            value_id: string;
        }[];
        external_sku_id: string;
    }[];
    warnings?: {
        message: string;
    }[];
};

export type EditProductBody = {
    description: string;
    category_id: string;
    main_images: {
        uri: string;
    }[];
    skus: {
        id: string;
        sales_attributes: {
            id: string;
            name: string;
            value_id: string;
            value_name: string;
            sku_img: {
                uri: string;
            };
            supplementary_sku_images: {
                uri: string;
            }[];
        }[];
        seller_sku: string;
        price: {
            amount: string;
            currency: string;
            sale_price: string;
        };
        external_sku_id: string;
        identifier_code: {
            code: string;
            type: string;
        };
        inventory?: {
            warehouse_id: string;
            quantity?: number;
        }[];
        combined_skus?: {
            product_id: string;
            sku_id: string;
            sku_count: number;
        }[];
        sku_unit_count?: string;
        external_urls?: string[];
        extra_identifier_codes?: string[];
        pre_sale?: {
            type: string;
            fulfillment_type: {
                handling_duration_days: number;
                release_date: number;
            };
        };
        list_price?: {
            amount: string;
            currency: string;
        };
        external_list_prices?: {
            source: string;
            amount: string;
            currency: string;
        }[];
    }[];
    title: string;
    package_weight: {
        value: string;
        unit: string;
    };
    brand_id?: string;
    is_cod_allowed?: boolean;
    certifications?: {
        id: string;
        images: {
            uri: string;
        }[];
        files: {
            id: string;
            name: string;
            format: string;
        }[];
        expiration_date: number;
    }[];
    product_attributes?: {
        id: string;
        values: {
            id: string;
            name: string;
        }[];
    }[];
    size_chart?: {
        image: {
            uri: string;
        };
        template?: {
            id: string;
        };
    };
    package_dimensions?: {
        length: string;
        width: string;
        height: string;
        unit: string;
    };
    external_product_id?: string;
    delivery_option_ids?: string[];
    video?: {
        id: string;
    };
    category_version?: string;
    manufacturer_ids?: string[];
    responsible_person_ids?: string[];
    listing_platforms?: string[];
    shipping_insurance_requirement?: string;
    is_pre_owned?: boolean;
    minimum_order_quantity?: number;
};


export type EditProductResponse = {
    product_id?: string;
    skus?: {
        id?: string;
        seller_sku?: string;
        sales_attributes?: {
            id?: string;
            value_id?: string;
        }[];
        external_sku_id?: string;
    }[];
    warnings?: {
        message?: string;
    }[];
    audit?: {
        status?: string | 'AUDITING' | 'REJECTED' | 'APPROVED'; 
    };
};

export type EditProductParams = {
    product_id: string;
    body: EditProductBody
}

export type RecoverProductBody = {
    product_ids: string[];
}
