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
    id: string;
    name: string;
    type: string; 
    is_requried: boolean; 
    values: AttributeValue[];
    value_data_format: string; 
    is_customizable: boolean;
    requirement_conditions: RequirementCondition[];
    is_multiple_selection: boolean;
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
