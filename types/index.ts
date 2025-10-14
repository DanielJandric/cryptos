// Types TypeScript pour l'application d'analyse des cycles Bitcoin

export type CycleId = 1 | 2 | 3;

export type CyclePhase = "bull" | "bear";

export interface CycleDefinition {
  id: CycleId;
  name: string;
  bottomDate: Date; // date du creux de départ
  bottomPriceUsd: number;
  topDate: Date; // date du sommet
  topPriceUsd: number;
  nextBottomDate: Date; // date du creux suivant (ou projetée)
  nextBottomPriceUsd: number; // prix du creux suivant (ou projeté)
  bullDays: number; // durée hausse
  bearDays: number; // durée baisse
  gainPct: number; // ex: 13000 -> +13,000%
  dropPct: number; // ex: -84 -> -84%
  isProjected?: boolean; // true pour les valeurs estimées
}

export interface ChartPoint {
  timestamp: number; // epoch ms
  price: number; // prix en USD
  cycleId: CycleId;
  phase: CyclePhase;
  projected: boolean;
}

export interface CycleSeries {
  id: CycleId;
  name: string;
  points: ChartPoint[];
}

export interface SummaryStats {
  currentPriceEstimate: number;
  daysSinceTop: number;
  daysToProjectedBottom: number;
  currentPhase: CyclePhase;
  bearTotalDays: number;
  bearProgressPct: number;
}

export interface DurationStats {
  cycleId: CycleId;
  bullDays: number;
  bearDays: number;
}

export interface PerformanceStats {
  cycleId: CycleId;
  gainPct: number;
  dropPct: number;
}

// Marché (yfinance)
export interface BtcHistoryPoint {
  t: number; // epoch ms
  c: number; // close
}

export interface BtcHistory {
  source: string;
  symbol: string;
  lastUpdated: string;
  data: BtcHistoryPoint[];
}

export interface BtcSpot {
  symbol: string;
  price: number;
  ts: number; // epoch ms
}

export interface IndexHistoryPoint {
  t: number;
  c: number;
}
export interface IndexHistory {
  source: string;
  symbol: string;
  lastUpdated: string;
  data: IndexHistoryPoint[];
}


