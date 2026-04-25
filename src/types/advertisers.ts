export interface Advertiser {
  id: string;
  name: string;
}

export interface LatestSnapshot {
  advertiser_id: string;
  advertiser_name: string;
  snapshot_at: string;
  cost: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  roi: number;
  ctr: number;
  cvr: number;
  cpa: number;
}
