// Données des cycles Bitcoin selon le modèle 1064/364
// Toutes les dates sont en UTC pour éviter les décalages de fuseau

import { makeUtcDate } from "../utils";
import type { CycleDefinition } from "@/types";

export const CYCLE_1: CycleDefinition = {
  id: 1,
  name: "Cycle 1 (2015-2018)",
  bottomDate: makeUtcDate(2015, 1, 14),
  bottomPriceUsd: 152,
  topDate: makeUtcDate(2017, 12, 17),
  topPriceUsd: 19783,
  nextBottomDate: makeUtcDate(2018, 12, 15),
  nextBottomPriceUsd: 3191,
  bullDays: 1068,
  bearDays: 363,
  gainPct: 13000,
  dropPct: -84,
};

export const CYCLE_2: CycleDefinition = {
  id: 2,
  name: "Cycle 2 (2018-2022)",
  bottomDate: makeUtcDate(2018, 12, 15),
  bottomPriceUsd: 3191,
  topDate: makeUtcDate(2021, 11, 10),
  topPriceUsd: 69044,
  nextBottomDate: makeUtcDate(2022, 11, 9),
  nextBottomPriceUsd: 15476,
  bullDays: 1061,
  bearDays: 364,
  gainPct: 2063,
  dropPct: -78,
};

export const CYCLE_3: CycleDefinition = {
  id: 3,
  name: "Cycle 3 (2022-2026)",
  bottomDate: makeUtcDate(2022, 11, 9),
  bottomPriceUsd: 15476,
  topDate: makeUtcDate(2025, 10, 6),
  topPriceUsd: 125482,
  nextBottomDate: makeUtcDate(2026, 10, 5),
  nextBottomPriceUsd: 35000,
  bullDays: 1062,
  bearDays: 364,
  gainPct: 711,
  dropPct: -72,
  isProjected: true,
};

export const CYCLES: CycleDefinition[] = [CYCLE_1, CYCLE_2, CYCLE_3];


