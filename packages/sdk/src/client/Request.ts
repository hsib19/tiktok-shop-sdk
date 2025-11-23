import { RequestOptions, TikTokAPIResponse } from "@types";
import { generateSignature, handleResponse, TikTokAPIError } from "@utils";

/**
 * Generic TikTok API request function
 * This function constructs the full API request by:
 * - Building query parameters including required authentication fields
 * - Generating the request signature using the app secret
 * - Appending all query parameters to the URL (including nested query objects)
 * - Adding necessary HTTP headers including access token if provided
 * - Sending the request via Axios
 * - Handling and parsing the response or errors gracefully
 *
 * @template T - Expected shape of the response data
 * @param {RequestOptions} options - Options for the request, including method, path, query, body, and config
 * @returns {Promise<TikTokAPIResponse<T>>} - Promise resolving to typed TikTok API response
 */
export async function request<T>({
  method,
  path,
  query = {},
  body,
  config,
}: RequestOptions): Promise<TikTokAPIResponse<T>> {
  // Generate the current UNIX timestamp in seconds as a string, required for signing the request
  const timestamp = Math.floor(Date.now() / 1000).toString();

  // Prepare unsigned query parameters, merging user query with required TikTok parameters
  // Here we assume query is a flat object; if nested objects exist, flattening may be needed before this step
  const unsignedQuery: Record<string, unknown> = {
    ...query,
    app_key: config.appKey,
    timestamp,
  };

  // Include shop cipher in query parameters if available (used for shop-specific requests)
  if (config.shopCipher) {
    unsignedQuery.shop_cipher = config.shopCipher;
  }

  // Generate the request signature using the provided app secret, path, query, and body
  // Signature version 'v1' is used explicitly here
  const sign = generateSignature({
    appSecret: config.appSecret,
    path,
    query: unsignedQuery,
    body: body?.body ?? body,
    version: "v1",
  });

  // Construct the final query object by spreading unsignedQuery and adding the signature
  // Note: If 'query' property itself contains a nested object, it should already be flattened to avoid "[object Object]"
  const fullQuery = {
    ...unsignedQuery,
    sign,
  };

  // Create the full request URL with base URL and path
  const url = new URL(path, config.baseURL);

  // Append query parameters to the URL's search params
  Object.entries(fullQuery).forEach(([key, val]) => {
    if (val === undefined) return; // Skip undefined values

    if (key === "query" && typeof val === "object" && val !== null) {
      // If 'query' is an object, append its individual properties as separate query params
      Object.entries(val).forEach(([innerKey, innerVal]) => {
        if (innerVal === undefined) return;

        // If inner value is an array of primitives, join with commas
        if (Array.isArray(innerVal)) {
          url.searchParams.append(innerKey, innerVal.join(","));
        }
        // Otherwise, if primitive value, add directly
        else if (
          typeof innerVal === "string" ||
          typeof innerVal === "number" ||
          typeof innerVal === "boolean"
        ) {
          url.searchParams.append(innerKey, String(innerVal));
        }
      });
    } else {
      // Handle array values by joining with commas (e.g., product_ids=1,2,3)
      if (Array.isArray(val)) {
        url.searchParams.append(key, val.join(","));
      }
      // For normal string/number/boolean values, append directly
      else if (
        typeof val === "string" ||
        typeof val === "number" ||
        typeof val === "boolean"
      ) {
        url.searchParams.append(key, String(val));
      }
    }
  });

  // console.log(body)
  // return null;

  // Prepare request headers, including JSON content type
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add access token header if provided (used for authenticated requests)
  if (config.accessToken) {
    headers["x-tts-access-token"] = config.accessToken;
  }

  try {
    // Send the HTTP request using fetch API with the constructed URL, method, headers, and body
    const response = await fetch(url.toString(), {
      method,
      headers,
      body:
        (body?.body ?? body) ? JSON.stringify(body?.body ?? body) : undefined,
    });

    // Parse the response data as JSON
    const data = await response.json();

    // For non-2xx responses, check if we have TikTok API error format
    if (!response.ok) {
      if (typeof data.code === "number" && typeof data.message === "string") {
        // Throw a specialized TikTokAPIError with code, message, and request ID
        throw new TikTokAPIError(
          data.code,
          data.message,
          data.request_id || "",
        );
      }
      // Fallback: throw a generic HTTP error
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    // Handle and return the processed response data
    return handleResponse<T>(data);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      // Handle fetch-specific errors (network issues, etc.)
      throw new Error(`Network error: ${error.message}`);
    }

    // Check if this is a response parsing error
    if (error instanceof SyntaxError) {
      throw new Error(`Response parsing error: ${error.message}`);
    }

    // Re-throw any other unexpected errors (including TikTokAPIError from handleResponse)
    throw error;
  }
}
