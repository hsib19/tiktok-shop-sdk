import 'dotenv/config';

import { TikTokAPIError, TikTokShopSDK } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

export async function main() {
  try {
    // Set Access Token
    sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);
    // Set Category Assets Cipher
    sdk.setCategoryAssetsCipher(process.env.TIKTOK_SHOP_CIPHER!);

    const response = await sdk.affiliatePartner.editAffiliatePartnerCampaign(
      '10934583045',
      {
        name: 'my first campaign',
        description: 'campaign for test',
        campaign_start_time: 1712941200,
        campaign_end_time: 1715878799,
        registration_start_time: 1712941200,
        registration_end_time: 1713891599,
        commission_rate: 1000,
        contact_info: {
          whatsapp: '+14255550100',
          email: '123456@gmail.com',
          phone: '+14255550100',
          zalo: '+14255550100',
          viber: '+14255550100',
          line: '+14255550100',
        },
        target_shop_codes: ['THCBELNL4Y'],
        target_seller_types: ['CROSS_BORDER'],
      },
    );

    console.log(response);
  } catch (error) {
    if (error instanceof TikTokAPIError) {
      console.error('TikTok API Error:', error.message);
      console.error('Status Code:', error.code);
      console.log('Request Id: ', error.request_id);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}
