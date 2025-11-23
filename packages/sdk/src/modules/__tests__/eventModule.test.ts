import { EventModule } from "../EventModule";
import { DeleteShopWebhookBody, UpdateShopWebhookBody } from "@types";

describe("EventModule", () => {
  let mockRequest: jest.Mock;
  let eventModule: EventModule;

  beforeEach(() => {
    mockRequest = jest.fn();
    eventModule = new EventModule(mockRequest);
  });

  describe("getShopWebhooks", () => {
    it("should call request with correct GET params and return response", async () => {
      const mockResponse = {
        code: 0,
        data: { webhooks: [{ id: "wh1", event_type: "order.create" }] },
        message: "success",
      };
      mockRequest.mockResolvedValue(mockResponse);

      const result = await eventModule.getShopWebhooks();

      expect(mockRequest).toHaveBeenCalledWith({
        method: "GET",
        path: "/event/202309/webhooks",
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe("updateShopWebhook", () => {
    it("should call request with correct PUT params and body, then return response", async () => {
      const body: UpdateShopWebhookBody = {
        event_type: "ORDER_STATUS_CHANGE",
        address: "https://example.com/webhook",
      };
      const mockResponse = {
        code: 0,
        message: "updated successfully",
        data: {},
      };
      mockRequest.mockResolvedValue(mockResponse);

      const result = await eventModule.updateShopWebhook(body);

      expect(mockRequest).toHaveBeenCalledWith({
        method: "PUT",
        path: "/event/202309/webhooks",
        body,
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe("deleteShopWebhook", () => {
    it("should call request with correct DELETE params and body, then return response", async () => {
      const body: DeleteShopWebhookBody = { event_type: "ORDER_STATUS_CHANGE" };
      const mockResponse = {
        code: 0,
        message: "deleted successfully",
        data: {},
      };
      mockRequest.mockResolvedValue(mockResponse);

      const result = await eventModule.deleteShopWebhook(body);

      expect(mockRequest).toHaveBeenCalledWith({
        method: "DELETE",
        path: "/event/202309/webhooks",
        body,
      });
      expect(result).toBe(mockResponse);
    });
  });
});
