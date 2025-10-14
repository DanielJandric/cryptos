"use client";

import { create } from "zustand";

export type ActiveTab = "graph" | "cycles" | "comparison";
export type Scenario = "soft" | "base" | "severe";

interface UIState {
  activeTab: ActiveTab;
  showProjection: boolean;
  xMode: "date" | "days";
  dayOffset: number; // pour scrubber (jours depuis début)
  scenario: Scenario;
  showTour: boolean;
  activeSectionId: string | null;
  yScale: "log" | "linear";
  showBtc: boolean;
  setActiveTab: (tab: ActiveTab) => void;
  toggleProjection: () => void;
  setXMode: (m: "date" | "days") => void;
  setDayOffset: (n: number) => void;
  setScenario: (s: Scenario) => void;
  toggleTour: () => void;
  setTour: (value: boolean) => void;
  setActiveSection: (id: string | null) => void;
  setYScale: (s: "log" | "linear") => void;
  toggleShowBtc: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: "graph",
  showProjection: true,
  xMode: "date",
  dayOffset: 0,
  scenario: "base",
  showTour: false,
  activeSectionId: null,
  yScale: "log",
  showBtc: true,
  setActiveTab: (activeTab) => set({ activeTab }),
  toggleProjection: () => set((s) => ({ showProjection: !s.showProjection })),
  setXMode: (xMode) => set({ xMode }),
  setDayOffset: (dayOffset) => set({ dayOffset }),
  setScenario: (scenario) => set({ scenario }),
  toggleTour: () => set((s) => ({ showTour: !s.showTour })),
  setTour: (value) => set({ showTour: value }),
  setActiveSection: (activeSectionId) => set({ activeSectionId }),
  setYScale: (yScale) => set({ yScale }),
  toggleShowBtc: () => set((s) => ({ showBtc: !s.showBtc })),
}));


