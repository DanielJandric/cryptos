// Génération des données graphiques et statistiques

import type {
  ChartPoint,
  CycleDefinition,
  CycleSeries,
  CycleId,
  CyclePhase,
  SummaryStats,
  DurationStats,
  PerformanceStats,
} from "@/types";
import { addDays, diffInDays, expInterpolate, formatCurrencyUSD, makeUtcDate } from "./utils";
import { CYCLES, CYCLE_3 } from "./data/cycles";

export const DATA_STEP_DAYS = 15; // points tous les 15 jours
export const PROJECTION_CUTOFF = makeUtcDate(2025, 10, 14);

export function generateCycleSeries(cycle: CycleDefinition): CycleSeries {
  const points: ChartPoint[] = [];

  // Phase haussière
  const bullSteps = Math.max(1, Math.ceil(cycle.bullDays / DATA_STEP_DAYS));
  for (let i = 0; i <= bullSteps; i++) {
    const progress = i / bullSteps;
    const date = addDays(cycle.bottomDate, Math.round(progress * cycle.bullDays));
    const price = expInterpolate(cycle.bottomPriceUsd, cycle.topPriceUsd, progress);
    points.push({
      timestamp: date.getTime(),
      price,
      cycleId: cycle.id,
      phase: "bull",
      projected: cycle.id === 3 && date > PROJECTION_CUTOFF,
    });
  }

  // Phase baissière
  const bearSteps = Math.max(1, Math.ceil(cycle.bearDays / DATA_STEP_DAYS));
  for (let i = 1; i <= bearSteps; i++) {
    const progress = i / bearSteps;
    const date = addDays(cycle.topDate, Math.round(progress * cycle.bearDays));
    const price = expInterpolate(cycle.topPriceUsd, cycle.nextBottomPriceUsd, progress);
    points.push({
      timestamp: date.getTime(),
      price,
      cycleId: cycle.id,
      phase: "bear",
      projected: cycle.id === 3 && date > PROJECTION_CUTOFF,
    });
  }

  return { id: cycle.id, name: cycle.name, points };
}

export function generateAllSeries(): CycleSeries[] {
  return CYCLES.map(generateCycleSeries);
}

// Fusionne les séries pour Recharts: un tableau d'objets par timestamp
export type MergedRow = {
  timestamp: number;
  c1: number | null;
  c2: number | null;
  c3: number | null;
  projected: boolean; // pour cycle 3
};

export function mergeSeries(seriesList: CycleSeries[], showProjection: boolean): MergedRow[] {
  const timestamps = new Set<number>();
  const byCycle: Record<CycleId, Map<number, ChartPoint>> = {
    1: new Map(),
    2: new Map(),
    3: new Map(),
  };
  for (const s of seriesList) {
    for (const p of s.points) {
      timestamps.add(p.timestamp);
      byCycle[s.id].set(p.timestamp, p);
    }
  }

  const ordered = Array.from(timestamps).sort((a, b) => a - b);
  return ordered.map((t) => {
    const p1 = byCycle[1].get(t);
    const p2 = byCycle[2].get(t);
    const p3 = byCycle[3].get(t);
    const projected = !!p3?.projected;
    return {
      timestamp: t,
      c1: p1?.price ?? null,
      c2: p2?.price ?? null,
      c3: !showProjection && projected ? null : p3?.price ?? null,
      projected,
    };
  });
}

// Fusion par index de jour depuis le creux initial de chaque cycle
export type DayRow = {
  day: number; // jour depuis le creux (t=0)
  c1: number | null;
  c2: number | null;
  c3: number | null;
  projected: boolean;
};

export function mergeSeriesByDayIndex(seriesList: CycleSeries[], showProjection: boolean): DayRow[] {
  const perCycle: Record<CycleId, Map<number, number>> = { 1: new Map(), 2: new Map(), 3: new Map() };
  const maxByCycle: Record<CycleId, number> = { 1: 0, 2: 0, 3: 0 };
  for (const s of seriesList) {
    const firstTs = s.points[0]?.timestamp ?? 0;
    for (const p of s.points) {
      const day = Math.round((p.timestamp - firstTs) / (1000 * 60 * 60 * 24));
      perCycle[s.id].set(day, p.price);
      if (day > maxByCycle[s.id]) maxByCycle[s.id] = day;
    }
  }
  const maxDay = Math.max(maxByCycle[1], maxByCycle[2], maxByCycle[3]);
  const rows: DayRow[] = [];
  for (let d = 0; d <= maxDay; d++) {
    const c1 = perCycle[1].get(d) ?? null;
    const c2 = perCycle[2].get(d) ?? null;
    const c3 = perCycle[3].get(d) ?? null;
    rows.push({ day: d, c1, c2, c3: c3, projected: false });
  }
  // Marquer projeté pour c3 après PROJECTION_CUTOFF
  const cutoffTs = PROJECTION_CUTOFF.getTime();
  const c3Series = seriesList.find((s) => s.id === 3);
  if (c3Series) {
    const firstTs = c3Series.points[0]?.timestamp ?? 0;
    const cutoffDay = Math.max(0, Math.round((cutoffTs - firstTs) / (1000 * 60 * 60 * 24)));
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].day > cutoffDay) rows[i].projected = true;
    }
  }
  if (!showProjection) {
    for (const r of rows) {
      if (r.projected) r.c3 = null;
    }
  }
  return rows;
}

export function getMaxCycleDays(): number {
  return CYCLES.reduce((m, c) => Math.max(m, c.bullDays + c.bearDays), 0);
}

export function getSummaryStats(now = new Date()): SummaryStats {
  const cycle = CYCLE_3;
  const daysSinceTop = Math.max(0, diffInDays(cycle.topDate, now));
  const daysToProjectedBottom = Math.max(0, diffInDays(now, cycle.nextBottomDate));
  const totalBearDays = Math.max(1, diffInDays(cycle.topDate, cycle.nextBottomDate));
  // Estimation du prix actuel en utilisant l'interpolation exponentielle dans la phase en cours
  let currentPriceEstimate = cycle.topPriceUsd;
  let currentPhase: CyclePhase = "bull";
  if (now.getTime() <= cycle.topDate.getTime()) {
    // encore en hausse
    currentPhase = "bull";
    const elapsed = Math.max(0, diffInDays(cycle.bottomDate, now));
    const progress = Math.min(1, elapsed / Math.max(1, cycle.bullDays));
    currentPriceEstimate = expInterpolate(cycle.bottomPriceUsd, cycle.topPriceUsd, progress);
  } else {
    // en baisse
    currentPhase = "bear";
    const elapsed = Math.max(0, diffInDays(cycle.topDate, now));
    const progress = Math.min(1, elapsed / totalBearDays);
    currentPriceEstimate = expInterpolate(cycle.topPriceUsd, cycle.nextBottomPriceUsd, progress);
  }

  const bearProgressPct = currentPhase === "bear" ? Math.round((daysSinceTop / totalBearDays) * 100) : 0;

  return {
    currentPriceEstimate,
    daysSinceTop,
    daysToProjectedBottom,
    currentPhase,
    bearTotalDays: totalBearDays,
    bearProgressPct,
  };
}

export function getDurationStats(): DurationStats[] {
  return CYCLES.map((c) => ({ cycleId: c.id, bullDays: c.bullDays, bearDays: c.bearDays }));
}

export function getPerformanceStats(): PerformanceStats[] {
  return CYCLES.map((c) => ({ cycleId: c.id, gainPct: c.gainPct, dropPct: c.dropPct }));
}

export function getAverages() {
  const durations = getDurationStats();
  const perf = getPerformanceStats();
  const avgBull = Math.round(durations.reduce((s, d) => s + d.bullDays, 0) / durations.length);
  const avgBear = Math.round(durations.reduce((s, d) => s + d.bearDays, 0) / durations.length);
  const avgGain = Math.round(perf.reduce((s, p) => s + p.gainPct, 0) / perf.length);
  const avgDrop = Math.round(perf.reduce((s, p) => s + p.dropPct, 0) / perf.length);
  return { avgBull, avgBear, avgGain, avgDrop };
}

export function formatMoney(value: number) {
  return formatCurrencyUSD(value);
}


