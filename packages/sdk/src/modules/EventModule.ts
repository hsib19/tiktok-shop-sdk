import {
  ApiResponse,
  DeleteShopWebhookBody,
  GetWebhooksResponse,
  RequestFunction,
  UpdateShopWebhookBody,
  TikTokAPIResponse,
} from "@types";

/**
 * EventModule handles requests related to webhook management
 * under the current TikTok Shop access token.
 *
 * This includes retrieving, updating, and deleting shop-level webhooks.
 */
export class EventModule {
  // Request function is injected from SDK and pre-configured with auth and app config
  constructor(private request: RequestFunction) {}

  /**
   * Retrieve a list of webhooks registered for the current shop.
   * Requires a valid `x-tts-access-token` header to be set.
   *
   * @returns A promise resolving to the webhook list and metadata.
   */
  async getShopWebhooks(): Promise<TikTokAPIResponse<GetWebhooksResponse>> {
    return this.request({
      method: "GET",
      path: "/event/202309/webhooks",
    });
  }

  /**
   * Register or update a shop webhook.
   * Requires a valid access token and properly formatted request body.
   *
   * @param body - The webhook configuration to update.
   * @returns A generic API response indicating success or failure.
   */
  async updateShopWebhook(
    body: UpdateShopWebhookBody,
  ): Promise<TikTokAPIResponse<ApiResponse>> {
    return this.request({
      method: "PUT",
      path: "/event/202309/webhooks",
      body,
    });
  }

  /**
   * Delete a registered shop webhook.
   * Requires the webhook identifier or relevant body data to be passed.
   *
   * @param body - The deletion parameters (e.g., event_type or address).
   * @returns A generic API response confirming deletion.
   */
  async deleteShopWebhook(
    body: DeleteShopWebhookBody,
  ): Promise<TikTokAPIResponse<ApiResponse>> {
    return this.request({
      method: "DELETE",
      path: "/event/202309/webhooks",
      body,
    });
  }
}
