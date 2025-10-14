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
import type { ModelHitRate } from "@/types";

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

// Variante acceptant un creux projeté différent (scénarios)
export function getSummaryStatsWithBottom(overrideBottomUsd: number, now = new Date()): SummaryStats {
  const cycle = { ...CYCLE_3, nextBottomPriceUsd: overrideBottomUsd } as CycleDefinition;
  const daysSinceTop = Math.max(0, diffInDays(cycle.topDate, now));
  const daysToProjectedBottom = Math.max(0, diffInDays(now, cycle.nextBottomDate));
  const totalBearDays = Math.max(1, diffInDays(cycle.topDate, cycle.nextBottomDate));
  let currentPriceEstimate = cycle.topPriceUsd;
  let currentPhase: CyclePhase = "bull";
  if (now.getTime() <= cycle.topDate.getTime()) {
    currentPhase = "bull";
    const elapsed = Math.max(0, diffInDays(cycle.bottomDate, now));
    const progress = Math.min(1, elapsed / Math.max(1, cycle.bullDays));
    currentPriceEstimate = expInterpolate(cycle.bottomPriceUsd, cycle.topPriceUsd, progress);
  } else {
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

// Hit rate du modèle 1064/364 :
// - Critère: une prédiction est "hit" si l'erreur absolue de durée (jours) est <= 2% de la durée attendue
// - On évalue bull et bear séparément sur cycles historiques 1 et 2
export function computeModelHitRate(): ModelHitRate {
  const consider: CycleDefinition[] = [CYCLES[0], CYCLES[1]];
  const expectedBull = 1064;
  const expectedBear = 364;
  const tolBull = Math.round(expectedBull * 0.02);
  const tolBear = Math.round(expectedBear * 0.02);
  let bullHits = 0;
  let bearHits = 0;
  let bullAbsErr = 0;
  let bearAbsErr = 0;
  for (const c of consider) {
    const errB = Math.abs(c.bullDays - expectedBull);
    const errD = Math.abs(c.bearDays - expectedBear);
    bullAbsErr += errB;
    bearAbsErr += errD;
    if (errB <= tolBull) bullHits++;
    if (errD <= tolBear) bearHits++;
  }
  const cycles = consider.length;
  const totalPreds = cycles * 2;
  const overallPct = Math.round(((bullHits + bearHits) / totalPreds) * 100);
  return {
    cycles,
    bullDurationHits: bullHits,
    bearDurationHits: bearHits,
    bullAvgErrorDays: Math.round(bullAbsErr / cycles),
    bearAvgErrorDays: Math.round(bearAbsErr / cycles),
    overallPct,
  };
}

function phaseAtDay(c: CycleDefinition, daySinceBottom: number): CyclePhase | "after" {
  if (daySinceBottom < c.bullDays) return "bull";
  if (daySinceBottom < c.bullDays + c.bearDays) return "bear";
  return "after";
}

export function computeDailyConsistency(now = new Date()) {
  const cyclesRef = [CYCLES[0], CYCLES[1]];
  const daySinceBottom = Math.max(0, diffInDays(CYCLE_3.bottomDate, now));
  const maxDay = Math.min(daySinceBottom, CYCLE_3.bullDays + CYCLE_3.bearDays);
  const series: { day: number; hitPct: number }[] = [];
  let sum = 0;
  for (let d = 0; d <= maxDay; d++) {
    const phase3 = phaseAtDay(CYCLE_3, d);
    const hits = cyclesRef.reduce((acc, c) => acc + (phaseAtDay(c, d) === phase3 ? 1 : 0), 0);
    const pct = Math.round((hits / cyclesRef.length) * 100);
    sum += pct;
    series.push({ day: d, hitPct: pct });
  }
  const cumulative = series.length ? Math.round(sum / series.length) : 0;
  return { series, cumulative, daySinceBottom: maxDay };
}

export function computeCycle3RepeatProbability(now = new Date()) {
  const cyclesRef = [CYCLES[0], CYCLES[1]];
  const daySinceBottom = Math.max(0, diffInDays(CYCLE_3.bottomDate, now));
  const daySinceTop = Math.max(0, diffInDays(CYCLE_3.topDate, now));
  const phaseToday = now.getTime() <= CYCLE_3.topDate.getTime() ? "bull" : "bear" as CyclePhase;
  const phaseAgreementPctToday = Math.round(
    (cyclesRef.reduce((acc, c) => acc + (phaseAtDay(c, daySinceBottom) === phaseToday ? 1 : 0), 0) / cyclesRef.length) * 100
  );
  // Probabilité que la baisse continue au moins jusqu'à aujourd'hui (survie) et jusqu'à 364j
  const N = cyclesRef.length;
  let bearSurvival = 0;
  let bottomByTarget = 0;
  const expectedBear = 364;
  const tolBear = Math.round(expectedBear * 0.02);
  for (const c of cyclesRef) {
    if (c.bearDays >= daySinceTop) bearSurvival++;
    if (Math.abs(c.bearDays - expectedBear) <= tolBear) bottomByTarget++;
  }
  const bearSurvivalProb = phaseToday === "bear" ? Math.round((bearSurvival / N) * 100) : 0;
  const bottomByTargetProb = Math.round((bottomByTarget / N) * 100);
  return { phaseAgreementPctToday, bearSurvivalProb, bottomByTargetProb };
}

export function computeCycleRepeatHitRate(tolPct = 0.02) {
  const expectedBull = 1064;
  const expectedBear = 364;
  const tolBull = Math.round(expectedBull * tolPct);
  const tolBear = Math.round(expectedBear * tolPct);
  const refs = [CYCLES[0], CYCLES[1]];
  const n = refs.length;
  const bullHitsRef = refs.reduce(
    (acc, c) => acc + (Math.abs(c.bullDays - expectedBull) <= tolBull ? 1 : 0),
    0
  );
  const bearHitsRef = refs.reduce(
    (acc, c) => acc + (Math.abs(c.bearDays - expectedBear) <= tolBear ? 1 : 0),
    0
  );
  // Beta(1,1) laplace smoothing (add-one)
  const bullPredictive = (bullHitsRef + 1) / (n + 2);
  const bearPredictive = (bearHitsRef + 1) / (n + 2);
  // Si la durée bull du cycle 3 est déjà connue, on fige sa contribution
  const bullFixed = Math.abs(CYCLE_3.bullDays - expectedBull) <= tolBull ? 1 : 0;
  const joint = Math.round(100 * (bullFixed * bearPredictive)) / 100;
  return {
    tolPct,
    bullFixed, // 0 ou 1 selon si bull du cycle 3 est dans la tolérance
    bearPredictive: Math.round(bearPredictive * 100) / 100,
    jointProb: Math.round(joint * 100) / 100,
    context: {
      refs: n,
      bullHitsRef,
      bearHitsRef,
      expectedBull,
      expectedBear,
      tolBull,
      tolBear,
    },
  };
}

// Bootstrap simple (avec remplacement) sur les 2 cycles de référence
export function bootstrapRepeatHitRate(tolPct = 0.02, iterations = 10_000) {
  const expectedBull = 1064;
  const expectedBear = 364;
  const tolBull = Math.round(expectedBull * tolPct);
  const tolBear = Math.round(expectedBear * tolPct);
  const bullRef = [CYCLES[0].bullDays, CYCLES[1].bullDays];
  const bearRef = [CYCLES[0].bearDays, CYCLES[1].bearDays];
  const n = bullRef.length;
  let sum = 0;
  const samples: number[] = [];
  for (let i = 0; i < iterations; i++) {
    // échantillon bootstrap de n éléments avec remplacement
    let bullHits = 0;
    let bearHits = 0;
    for (let k = 0; k < n; k++) {
      const b = bullRef[Math.floor(Math.random() * n)];
      const d = bearRef[Math.floor(Math.random() * n)];
      if (Math.abs(b - expectedBull) <= tolBull) bullHits++;
      if (Math.abs(d - expectedBear) <= tolBear) bearHits++;
    }
    const bullProb = (bullHits + 1) / (n + 2); // lissage
    const bearProb = (bearHits + 1) / (n + 2);
    // Bull C3 est déjà fixé (1 si dans tolérance, sinon 0)
    const bullFixed = Math.abs(CYCLE_3.bullDays - expectedBull) <= tolBull ? 1 : 0;
    const joint = bullFixed * bearProb;
    samples.push(joint);
    sum += joint;
  }
  samples.sort((a, b) => a - b);
  const mean = sum / iterations;
  const ciLow = samples[Math.floor(iterations * 0.025)];
  const ciHigh = samples[Math.floor(iterations * 0.975)];
  return {
    tolPct,
    mean: Math.round(mean * 100) / 100,
    ci95: [Math.round(ciLow * 100) / 100, Math.round(ciHigh * 100) / 100] as [number, number],
  };
}

export function robustnessAcrossThresholds() {
  const th = [0.01, 0.02, 0.03];
  return th.map((t) => ({
    tolPct: t,
    repeat: computeCycleRepeatHitRate(t),
    bootstrap: bootstrapRepeatHitRate(t, 5000),
  }));
}

export function halvingContext(now = new Date()) {
  // dernier halving connu et prochain approximé (+4 ans)
  const sorted = [makeUtcDate(2016, 7, 9), makeUtcDate(2020, 5, 11), makeUtcDate(2024, 4, 20)].sort((a, b) => a.getTime() - b.getTime());
  let last = sorted[0];
  for (const d of sorted) if (d.getTime() <= now.getTime()) last = d;
  const next = makeUtcDate(last.getUTCFullYear() + 4, last.getUTCMonth() + 1, last.getUTCDate());
  const since = diffInDays(last, now);
  const toNext = Math.max(0, diffInDays(now, next));
  return { lastHalving: last, nextHalvingApprox: next, daysSince: since, daysToNextApprox: toNext };
}


