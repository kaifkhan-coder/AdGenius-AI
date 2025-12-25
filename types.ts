
export type Platform = 'instagram' | 'tiktok' | 'linkedin' | 'facebook';

export interface AdCampaign {
  id: string;
  brandName: string;
  productDescription: string;
  targetAudience: string;
  goal: string;
  platform: Platform;
  tone: string;
}

export interface AdCopy {
  headline: string;
  body: string;
  cta: string;
  hashtags: string[];
}

export interface GeneratedAd {
  id: string;
  campaign: AdCampaign;
  copy: AdCopy[];
  imageUrl: string;
  createdAt: number;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
}
