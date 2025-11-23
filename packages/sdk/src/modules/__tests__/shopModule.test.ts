import { ShopModule } from "../ShopModule";

describe("ShopModule", () => {
  let mockRequest: jest.Mock;
  let shopModule: ShopModule;

  beforeEach(() => {
    mockRequest = jest.fn();
    shopModule = new ShopModule(mockRequest);
  });

  describe("getAuthorizedShops", () => {
    it("should call request with correct params and return response", async () => {
      const mockResponse = {
        code: 0,
        data: { shops: [{ id: "shop1" }] },
        message: "success",
      };
      mockRequest.mockResolvedValue(mockResponse);

      const result = await shopModule.getAuthorizedShops();

      expect(mockRequest).toHaveBeenCalledWith({
        method: "GET",
        path: "/authorization/202309/shops",
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe("getCategoryAssets", () => {
    it("should call request with correct params and return response", async () => {
      const mockResponse = {
        code: 0,
        data: { assets: ["asset1", "asset2"] },
        message: "success",
      };
      mockRequest.mockResolvedValue(mockResponse);

      const result = await shopModule.getCategoryAssets();

      expect(mockRequest).toHaveBeenCalledWith({
        method: "GET",
        path: "/authorization/202405/category_assets",
      });
      expect(result).toBe(mockResponse);
    });
  });
});
