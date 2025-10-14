"use client";

import { create } from "zustand";

export type ActiveTab = "graph" | "cycles" | "comparison";

interface UIState {
  activeTab: ActiveTab;
  showProjection: boolean;
  xMode: "date" | "days";
  dayOffset: number; // pour scrubber (jours depuis début)
  setActiveTab: (tab: ActiveTab) => void;
  toggleProjection: () => void;
  setXMode: (m: "date" | "days") => void;
  setDayOffset: (n: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: "graph",
  showProjection: true,
  xMode: "date",
  dayOffset: 0,
  setActiveTab: (activeTab) => set({ activeTab }),
  toggleProjection: () => set((s) => ({ showProjection: !s.showProjection })),
  setXMode: (xMode) => set({ xMode }),
  setDayOffset: (dayOffset) => set({ dayOffset }),
}));


