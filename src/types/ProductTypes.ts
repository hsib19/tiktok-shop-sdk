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

export type GetCategoriesQuery = {
    locale?: string | "de-DE" | "en-GB" | "en-IE" | "en-US" | "es-ES" | "es-MX" | "fr-FR" | "id-ID" | "it-IT" | "ja-JP" | "ms-MY" | "pt-BR" | "th-TH" | "vi-VN" | "zh-CN";
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
