import { create } from "zustand";
import { getAdvertisers, getLatestSnapshot } from "../api/advertisers";
import type { Advertiser, LatestSnapshot } from "../types/advertisers";

interface AdvertisersState {
  advertisers: Advertiser[];
  selectedId?: string;
  snapshots: Record<string, LatestSnapshot | null>;
  isLoading: boolean;
  error?: string;
  loadAdvertisers: () => Promise<void>;
  selectAdvertiser: (advertiserId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "加载失败，请稍后重试。";
}

export const useAdvertisersStore = create<AdvertisersState>((set, get) => ({
  advertisers: [],
  selectedId: undefined,
  snapshots: {},
  isLoading: false,
  error: undefined,
  async loadAdvertisers() {
    set({ isLoading: true, error: undefined });

    try {
      const advertisers = await getAdvertisers();
      const currentSelected = get().selectedId;
      const selectedId =
        currentSelected && advertisers.some((item) => item.id === currentSelected)
          ? currentSelected
          : advertisers[0]?.id;

      set({ advertisers, selectedId, isLoading: false });

      if (selectedId) {
        await get().selectAdvertiser(selectedId);
      }
    } catch (error) {
      set({
        advertisers: [],
        selectedId: undefined,
        snapshots: {},
        isLoading: false,
        error: getErrorMessage(error)
      });
    }
  },
  async selectAdvertiser(advertiserId) {
    set({ selectedId: advertiserId, isLoading: true, error: undefined });

    try {
      const snapshot = await getLatestSnapshot(advertiserId);
      set((state) => ({
        snapshots: {
          ...state.snapshots,
          [advertiserId]: snapshot
        },
        isLoading: false
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: getErrorMessage(error)
      });
    }
  },
  async refresh() {
    await get().loadAdvertisers();
  }
}));
