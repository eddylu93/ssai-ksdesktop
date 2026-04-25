import axios from "axios";
import { apiClient } from "./client";
import type { Advertiser, LatestSnapshot } from "../types/advertisers";

type AdvertisersResponse = Advertiser[];
type SnapshotResponse = LatestSnapshot | null;

export async function getAdvertisers(): Promise<Advertiser[]> {
  const { data } = await apiClient.get<AdvertisersResponse>("/api/advertisers");
  return data;
}

export async function getLatestSnapshot(
  advertiserId: string
): Promise<LatestSnapshot | null> {
  try {
    const { data } = await apiClient.get<SnapshotResponse>(
      `/api/advertisers/${advertiserId}/snapshot/latest`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }

    throw error;
  }
}
