export interface Geolocation {
  latitude: string;
  longitude: string;
}

export interface WarehouseAddress {
  region: string;
  state: string;
  city: string;
  distict: string;
  town: string;
  contact_person: string;
  first_name: string;
  last_name: string;
  first_name_local_script: string;
  last_name_local_script: string;
  postal_code: string;
  full_address: string;
  region_code: string;
  phone_number: string;
  address_line1: string;
  address_line2: string;
  address_line3: string;
  address_line4: string;
  geolocation: Geolocation;
}

export interface Warehouse {
  id?: string;
  name?: string;
  effect_status?: string;
  type?: 'SALES_WAREHOUSE' | string;
  sub_type?: 'DOMESTIC_WAREHOUSE' | string;
  is_default?: boolean;
  address?: WarehouseAddress;
}

export interface GlobalSellerWarehouse {
  id?: string;
  name?: string;
  ownership?: string;
}

export interface DimensionLimit {
  max_height: number;
  max_length: number;
  max_width: number;
  unit: 'INCH' | 'CM' | string;
}

export interface WeightLimit {
  max_weight: number;
  min_weight: number;
  unit: 'GRAM' | 'KG' | string;
}

export interface DeliveryOption {
  id?: string;
  name?: string;
  type?: 'STANDARD' | 'EXPRESS' | string;
  description?: string;
  dimension_limit?: DimensionLimit;
  weight_limit?: WeightLimit;
  platform?: ('TOKOPEDIA' | 'TIKTOK_SHOP' | string)[];
}

export interface ShippingProviders {
  id: string;
  name: string;
}

export type DeliveryOptions = DeliveryOption[];

export type GetWarehousesResponse = {
  warehouses: Warehouse[];
};
export interface GetGlobalSellerWarehousesResponse {
  global_warehouses: GlobalSellerWarehouse[];
}
export interface GetWarehousesDeliveryOptionsResponse {
  delivery_options: DeliveryOption[];
}

export interface GetShippingProvidersResponse {
  shipping_providers: ShippingProviders[];
}
