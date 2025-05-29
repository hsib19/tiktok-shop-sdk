import crypto from 'crypto';

interface SignatureInput {
    appSecret: string;
    path: string;
    query?: Record<string, unknown>;
    body?: unknown;
    version?: 'v1' | 'v2'; // Optional: Signature version (defaults to 'v1')
}

/**
 * Generates a HMAC-SHA256 signature for TikTok Shop API requests.
 * Supports both v1 and v2 signing formats.
 */
export function generateSignature({
    appSecret,
    path,
    query = {},
    body = {},
    version = 'v1', 
}: SignatureInput): string {
    // Remove parameters that should NOT be included in the signature
    const cleanQuery = { ...query };
    delete cleanQuery.sign;
    delete cleanQuery.access_token;

    // Sort query keys alphabetically
    const sortedKeys = Object.keys(cleanQuery).sort();

    // Build sorted query string based on version format
    // v2: "key=value&key2=value2"
    // v1: "keyvaluekey2value2"
    const sortedQuery =
        version === 'v2'
            ? sortedKeys.map((key) => `${key}=${cleanQuery[key]}`).join('&')
            : sortedKeys.map((key) => `${key}${cleanQuery[key]}`).join('');

    // Serialize body to JSON string if it's a non-empty object
    const bodyString =
        body && typeof body === 'object' && Object.keys(body).length > 0
            ? JSON.stringify(body)
            : '';

    // Construct the base string for signing
    // v2: appSecret + path + sortedQuery + body
    // v1: appSecret + path + sortedQuery + body + appSecret
    const baseString =
        version === 'v2'
            ? `${appSecret}${path}${sortedQuery}${bodyString}`
            : `${appSecret}${path}${sortedQuery}${bodyString}${appSecret}`;

    // Generate HMAC-SHA256 signature using the base string and appSecret
    const sign = crypto.createHmac('sha256', appSecret).update(baseString).digest('hex');

    // Return the computed signature string
    return sign;
}