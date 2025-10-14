"use client";

import { create } from "zustand";

export type ActiveTab = "graph" | "cycles" | "comparison";

interface UIState {
  activeTab: ActiveTab;
  showProjection: boolean;
  setActiveTab: (tab: ActiveTab) => void;
  toggleProjection: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: "graph",
  showProjection: true,
  setActiveTab: (activeTab) => set({ activeTab }),
  toggleProjection: () => set((s) => ({ showProjection: !s.showProjection })),
}));


