export type GetWebhooksResponse = {
  webhooks: {
    event_type: string;
    address: string;
    create_time: number;
    update_time: number;
  }[];
  total_count: number;
};

export type ApiResponse = object;

type EventType =
  | "ORDER_STATUS_CHANGE"
  | "RECIPIENT_ADDRESS_UPDATE"
  | "PACKAGE_UPDATE"
  | "PRODUCT_STATUS_CHANGE"
  | "SELLER_DEAUTHORIZATION"
  | "UPCOMING_AUTHORIZATION_EXPIRATION"
  | "CANCELLATION_STATUS_CHANGE"
  | "RETURN_STATUS_CHANGE"
  | "NEW_CONVERSATION"
  | "NEW_MESSAGE"
  | "PRODUCT_INFORMATION_CHANGE"
  | "PRODUCT_CREATION"
  | "PRODUCT_CATEGORY_CHANGE"
  | "NEW_MESSAGE_LISTENER"
  | "INVOICE_STATUS_CHANGE"
  | "PRODUCT_AUDIT_STATUS_CHANGE"
  | "REVERSE_STATUS_UPDATE";

export type UpdateShopWebhookBody = {
  address: string;
  event_type: EventType;
};

export type DeleteShopWebhookBody = {
  event_type: EventType;
};
