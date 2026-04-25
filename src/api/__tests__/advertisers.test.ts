import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "../client";
import { getAdvertisers, getLatestSnapshot } from "../advertisers";

describe("advertisers api", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns advertisers from the server", async () => {
    vi.spyOn(apiClient, "get").mockResolvedValueOnce({
      data: [
        { id: "adv_1", name: "广告主 A" },
        { id: "adv_2", name: "广告主 B" }
      ]
    } as never);

    await expect(getAdvertisers()).resolves.toEqual([
      { id: "adv_1", name: "广告主 A" },
      { id: "adv_2", name: "广告主 B" }
    ]);
  });

  it("returns the latest snapshot for a selected advertiser", async () => {
    vi.spyOn(apiClient, "get").mockResolvedValueOnce({
      data: {
        advertiser_id: "adv_1",
        advertiser_name: "广告主 A",
        snapshot_at: "2026-04-25T10:00:00Z",
        cost: 10,
        impressions: 1000,
        clicks: 10,
        conversions: 2,
        revenue: 30,
        roi: 3,
        ctr: 0.01,
        cvr: 0.2,
        cpa: 5
      }
    } as never);

    await expect(getLatestSnapshot("adv_1")).resolves.toMatchObject({
      advertiser_id: "adv_1",
      advertiser_name: "广告主 A",
      roi: 3
    });
  });
});
