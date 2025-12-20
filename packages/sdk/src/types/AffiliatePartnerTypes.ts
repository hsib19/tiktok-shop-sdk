export type CreateAffiliatePartnerCampaignBody = {
  name: string;
  description: string;
  campaign_start_time: number;
  campaign_end_time: number;
  registration_start_time: number;
  registration_end_time: number;
  commission_rate: number;
  contact_info: ContactInfo;
  target_shop_codes?: string[];
  target_seller_types?: ('LOCAL' | 'CROSS_BORDER')[];
};

type ContactInfo = {
  whatsapp?: string;
  email: string;
  phone?: string;
  zalo?: string;
  viber?: string;
  line?: string;
};

export type CreateAffiliatePartnerCampaignResponse = {
  campaign_id: string;
};
