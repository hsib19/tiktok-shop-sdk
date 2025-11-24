import { FulfillmentModule } from '@modules';
import {
  ApiResponse,
  CombinablePackageBody,
  CombinePackageResponse,
  CreateFirstMileBundleBody,
  CreateFirstMileBundleResponse,
  CreatePackageBody,
  CreatePackagesResponse,
  GetEligibleShippingServiceInput,
  GetEligibleShippingServiceResponse,
  GetOrderSplitAttributesQuery,
  GetOrderSplitAttributesResponse,
  GetPackageHandoverTimeSlotsResponse,
  RequestFunction,
  SearchCombinablePackagesQuery,
  SearchCombinablePackagesResponse,
  SearchPackageInput,
  SearchPackageResponse,
  SplitOrdersQuery,
  SplittableGroupsResponse,
  TikTokAPIResponse,
  UncombinePackagesBody,
  UncombinePackagesResponse,
} from '@types';

const mockRequest: jest.MockedFunction<RequestFunction> = jest.fn();

const fulfillment = new FulfillmentModule(mockRequest);

describe('FulfillmentModule', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getOrderSplitAttributes with correct params', async () => {
    const params: GetOrderSplitAttributesQuery = {
      order_ids: ['02503490534545'],
    };
    const mockResponse: TikTokAPIResponse<GetOrderSplitAttributesResponse> = {
      code: 0,
      message: 'Success',
      request_id: '34975394573945',
      data: {
        split_attributes: [
          {
            order_id: '556643423444',
            can_split: false,
            reason: 'Order has been canceled',
            must_split: false,
            must_split_reasons: [
              {
                type: 'CATEGORY_ITEM_LIMITATION',
                category_id: '601990',
                max_count: '2',
              },
            ],
          },
        ],
      },
    };
    mockRequest.mockResolvedValueOnce(mockResponse);

    const res = await fulfillment.getOrderSplitAttributes(params);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'GET',
      path: '/fulfillment/202309/orders/split_attributes',
      query: params,
    });
    expect(res).toEqual(mockResponse);
  });

  it('should call splitOrders with correct params', async () => {
    const params: SplitOrdersQuery = {
      order_id: '580196086824799013',
      body: {
        splittable_groups: [
          {
            id: '123',
            order_line_item_ids: ['580196086825061157'],
          },
        ],
      },
    };

    const mockResponse: TikTokAPIResponse<SplittableGroupsResponse> = {
      data: {
        packages: [
          {
            id: '223362377512830222',
            order_line_item_ids: ['sjklfjs983475'],
          },
        ],
      },
      code: 0,
      message: 'success',
      request_id: '3948579385394545',
    };
    mockRequest.mockResolvedValueOnce(mockResponse);

    const res = await fulfillment.splitOrders(params);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'POST',
      path: `/fulfillment/202309/orders/${params.order_id}/split`,
      body: params.body,
    });
    expect(res).toEqual(mockResponse);
  });

  it('should call getEligibleShippingService correctly', async () => {
    const params: GetEligibleShippingServiceInput = {
      order_id: '1162200639229365029',
      body: {
        order_line_item_ids: ['580205195696245541'],
        weight: {
          value: '0.4',
          unit: 'GRAM',
        },
        dimension: {
          length: '0.3',
          width: '0.2',
          height: 'CM',
          unit: 'INCH',
        },
      },
    };
    const mockResponse: TikTokAPIResponse<GetEligibleShippingServiceResponse> =
      {
        data: {
          order_id: '28823355942588',
          order_line_id: ['32132124331234'],
          weight: {
            value: '1.2',
            unit: 'GRAM',
          },
          shipping_services: [
            {
              id: '288233559123860015',
              name: 'UPS-first class',
              price: '5',
              currency: 'USD',
              earliest_delivery_days: 3,
              latest_delivery_days: 5,
              is_default: false,
              shipping_provider_name: 'UPS',
              shipping_provider_id: '288233559123860012',
            },
          ],
          dimension: {
            length: '0.3',
            width: '0.2',
            height: '0.04',
            unit: 'INCH',
          },
        },
        code: 0,
        message: 'Success',
        request_id: '3498573894534',
      };
    mockRequest.mockResolvedValueOnce(mockResponse);

    const res = await fulfillment.getEligibleShippingService(params);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'POST',
      path: `/fulfillment/202309/orders/${params.order_id}/shipping_services/query`,
      body: params.body,
    });
    expect(res).toEqual(mockResponse);
  });

  it('should call searchCombinablePackages correctly', async () => {
    const params: SearchCombinablePackagesQuery = { page_size: 10 };
    const mockResponse: TikTokAPIResponse<SearchCombinablePackagesResponse> = {
      data: {
        combinable_packages: [
          {
            id: '57466538837665',
            order_ids: ['57466538837665', '57466538837666'],
          },
        ],
        next_page_token:
          '6AsPQsUMvH3RkchNUPPh22NROHkE0D8pmq/N5M1kHYcZmtRyv9aVrNv65W7Q6tFA',
        total_count: 10,
      },
      code: 0,
      message: 'Success',
      request_id: '398573945345',
    };
    mockRequest.mockResolvedValueOnce(mockResponse);

    const res = await fulfillment.searchCombinablePackages(params);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'GET',
      path: '/fulfillment/202309/combinable_packages/search',
      query: params,
    });
    expect(res).toEqual(mockResponse);
  });

  it('should call getPackageHandoverTimeSlots correctly', async () => {
    const packageId = 'pkg-123';
    const mockResponse: TikTokAPIResponse<GetPackageHandoverTimeSlotsResponse> =
      {
        code: 0,
        message: 'success',
        data: { can_pickup: true },
        request_id: '298472849234343',
      };
    mockRequest.mockResolvedValueOnce(mockResponse);

    const res = await fulfillment.getPackageHandoverTimeSlots(packageId);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'GET',
      path: `/fulfillment/202309/packages/${packageId}/handover_time_slots`,
    });
    expect(res).toEqual(mockResponse);
  });

  it('should call searchPackage correctly', async () => {
    const params: SearchPackageInput = {
      query: {
        page_size: 10,
      },
      body: {
        create_time_ge: 1623812664,
        create_time_lt: 1623812664,
        update_time_ge: 1623812664,
        update_time_lt: 1623812664,
        package_status: 'PROCESSING',
      },
    };
    const mockResponse: TikTokAPIResponse<SearchPackageResponse> = {
      code: 0,
      message: 'success',
      data: {
        next_page_token:
          '6AsPQsUMvH3RkchNUPPh22NROHkE0D8pmq/N5M1kHYcZmtRyv9aVrNv65W7Q6tFA',
        total_count: 221,
        packages: [
          {
            id: '577828281214600000',
            orders: [
              {
                id: '577828281214600000',
                skus: [
                  {
                    id: '577828281214883345',
                    name: 'white,128g',
                    image_url:
                      'https://p19-oec-sg.ibyteimg.com/tos-maliva-i-o3syd03w52-us/12345670',
                    quantity: 5,
                  },
                ],
              },
            ],
            create_time: 1635338186,
            update_time: 1635338186,
            status: 'PROCESSING',
            tracking_number: '6617675021119438849',
            shipping_provider_name: 'TT Virtual express',
            shipping_provider_id: '6617675021119438849',
            order_line_item_ids: ['1729382476852921560'],
          },
        ],
      },
      request_id: '298472849234343',
    };
    mockRequest.mockResolvedValueOnce(mockResponse);

    const res = await fulfillment.searchPackage(params);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'POST',
      path: `/fulfillment/202309/packages/search`,
      query: params.query,
      body: params.body,
    });
    expect(res).toEqual(mockResponse);
  });

  it('should call createPackage correctly', async () => {
    const params: CreatePackageBody = {
      order_id: '1162200639229365029',
      order_line_item_ids: ['580205195696245541'],
      dimension: {
        length: '1.2',
        width: '0.2',
        height: '0.03',
        unit: 'CM',
      },
      shipping_service_id: '6617675021119438849',
      weight: {
        value: '1.2',
        unit: 'GRAM',
      },
    };
    const mockResponse: TikTokAPIResponse<CreatePackagesResponse> = {
      code: 0,
      message: 'success',
      data: {
        order_id: '2882335594258860015',
        order_line_item_ids: ['32132124331234'],
        dimension: {
          length: '1.2',
          width: '0.2',
          height: '0.03',
          unit: 'CM',
        },
        shipping_service_info: {
          id: '288233559123860015',
          name: 'UPS-first class',
          price: '10',
          currency: 'dollar',
          earliest_delivery_days: 3,
          latest_delivery_days: 5,
          shipping_provider_id: '2882322591238',
          shipping_provider_name: 'UPS',
        },
        package_id: '2882335594258860015',
        weight: {
          value: '1.2',
          unit: 'GRAM',
        },
        create_time: 1623812664,
      },
      request_id: '298472849234343',
    };
    mockRequest.mockResolvedValueOnce(mockResponse);

    const res = await fulfillment.createPackage(params);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'POST',
      path: `/fulfillment/202309/packages`,
      body: params,
    });
    expect(res).toEqual(mockResponse);
  });

  it('should call createFirstMileBundle correctly', async () => {
    const params: CreateFirstMileBundleBody = {
      order_ids: ['1162200639229365029'],
      handover_method: 'PICKUP',
      shipping_provider_id: '6617675021119438849',
      tracking_number: '173988244330623',
      phone_tail_number: '1234',
    };
    const mockResponse: TikTokAPIResponse<CreateFirstMileBundleResponse> = {
      code: 0,
      message: 'success',
      data: {
        first_mile_bundle_id: 'BA123444534',
        url: 'https://open-fs-va.tiktokshop.com/doc_tts/object/28b05?skipCookie=true&timeStamp=1721272360&sign=ef63cd6',
        errors: [
          {
            code: 10007014,
            message: 'invalid package id',
            detail: {
              order_id: '578967030217083407',
            },
          },
        ],
      },
      request_id: '298472849234343',
    };
    mockRequest.mockResolvedValueOnce(mockResponse);

    const res = await fulfillment.createFirstMileBundle(params);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'POST',
      path: `/fulfillment/202407/bundles`,
      body: params,
    });
    expect(res).toEqual(mockResponse);
  });

  it('should call combinablePackage correctly', async () => {
    const params: CombinablePackageBody = {
      combinable_packages: [
        {
          id: '1162200639229365029',
          order_ids: ['580205195696114469', '580195946180217637'],
        },
      ],
    };
    const mockResponse: TikTokAPIResponse<CombinePackageResponse> = {
      code: 0,
      message: 'success',
      data: {
        packages: [
          {
            id: '413234134123412',
            order_ids: ['1233213123123', '32132131231'],
          },
        ],
        errors: [
          {
            code: 10007014,
            message: 'fulfillment not allow combine package',
            detail: {
              package_id: '1231231231231313123132',
            },
          },
        ],
      },
      request_id: '298472849234343',
    };
    mockRequest.mockResolvedValueOnce(mockResponse);

    const res = await fulfillment.combinablePackage(params);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'POST',
      path: `/fulfillment/202309/packages/combine`,
      body: params,
    });
    expect(res).toEqual(mockResponse);
  });

  it('should call uncombinePackages correctly', async () => {
    const params: UncombinePackagesBody = {
      package_id: '1162200639229365029',
      body: {
        order_ids: ['580205195696114469', '1162118637559581477'],
      },
    };
    const mockResponse: TikTokAPIResponse<UncombinePackagesResponse> = {
      code: 0,
      message: 'success',
      data: {
        packages: [
          {
            id: '123456',
            order_ids: ['576462377512830168', '576462377512830168'],
          },
        ],
      },
      request_id: '298472849234343',
    };
    mockRequest.mockResolvedValueOnce(mockResponse);

    const res = await fulfillment.uncombinePackages(params);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'POST',
      path: `/fulfillment/202309/packages/${params.package_id}/uncombine`,
      body: params.body,
    });
    expect(res).toEqual(mockResponse);
  });
});
