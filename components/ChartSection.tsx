"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
  Line,
  ReferenceArea,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import {
  generateAllSeries,
  mergeSeries,
  mergeSeriesByDayIndex,
  getSummaryStatsWithBottom,
  getMaxCycleDays,
} from "@/lib/chartData";
import RadialProgress from "./RadialProgress";
import { useUIStore } from "@/lib/store";
import { HALVINGS, SERIES_COLORS, SCENARIO_BOTTOMS } from "@/lib/constants";
import type { BtcHistory } from "@/types";
import { CYCLE_3 } from "@/lib/data/cycles";
import ChartAnnotations from "./ChartAnnotations";
import ExportPNGButton from "./ExportPNGButton";
import ChartTLDR from "./ChartTLDR";

function formatDate(t: number) {
  const d = new Date(t);
  return d.toLocaleDateString("fr-FR", { year: "numeric", month: "short" });
}

type TooltipPayloadItem = {
  dataKey: string;
  name: string;
  value: number;
  color?: string;
  payload?: Record<string, unknown>;
};

type ChartRecord = {
  timestamp?: number;
  day?: number;
  c1: number | null;
  c2: number | null;
  c3: number | null;
  projected: boolean;
  btc?: number;
};

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: number | string }) {
  if (!active || !payload?.length || label == null) return null;
  const ts = typeof label === "number" ? label : Number(label);
  if (!Number.isFinite(ts)) return null;
  const date = new Date(ts);
  return (
    <div className="card p-3">
      <p className="text-xs text-slate-400">{date.toLocaleDateString("fr-FR")}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-sm">
          <span className="inline-block size-2 rounded-full" style={{ background: p.color }} />
          <span className="min-w-14 inline-block">{p.name}</span>
          <strong>{Math.round(p.value).toLocaleString("en-US")}$</strong>
        </div>
      ))}
      {payload[0]?.payload && (payload[0].payload as { projected?: boolean }).projected && (
        <p className="mt-2 text-xs text-amber-300">Valeurs projetées</p>
      )}
    </div>
  );
}

export default function ChartSection() {
  const showProjection = useUIStore((s) => s.showProjection);
  const scenario = useUIStore((s) => s.scenario);
  const xMode = useUIStore((s) => s.xMode);
  const dayOffset = useUIStore((s) => s.dayOffset);
  const yScale = useUIStore((s) => s.yScale);
  const showBtc = useUIStore((s) => s.showBtc);
  const series = useMemo(() => generateAllSeries(), []);
  const dataDate = useMemo(() => mergeSeries(series, showProjection), [series, showProjection]);
  const dataDays = useMemo(() => mergeSeriesByDayIndex(series, showProjection), [series, showProjection]);
  const [btc, setBtc] = useState<BtcHistory | null>(null);
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/data/btc-history.json", { cache: "no-store" });
        if (res.ok) setBtc(await res.json());
      } catch {}
    };
    load();
  }, []);

  const chartData = useMemo<ChartRecord[]>(() => {
    if (xMode === "days") {
      return dataDays as unknown as ChartRecord[];
    }
    // date mode merges real BTC history
    const map = new Map<number, { timestamp: number; c1: number | null; c2: number | null; c3: number | null; projected: boolean; btc?: number }>();
    for (const row of dataDate) map.set(row.timestamp, { ...row });
    for (const p of (btc?.data ?? [])) {
      const existing = map.get(p.t);
      if (existing) {
        existing.btc = p.c;
      } else {
        map.set(p.t, { timestamp: p.t, c1: null, c2: null, c3: null, projected: false, btc: p.c });
      }
    }
    return Array.from(map.values()).sort((a, b) => a.timestamp - b.timestamp);
  }, [dataDate, dataDays, btc, xMode]);
  const stats = getSummaryStatsWithBottom(SCENARIO_BOTTOMS[scenario]);

  return (
    <section className="card p-4 md:p-6">
      <ChartTLDR />
      <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold">Graphique principal (log)</h3>
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-300/90">Projection cycle 3</label>
          <input
            type="checkbox"
            checked={showProjection}
            onChange={() => useUIStore.getState().toggleProjection()}
            aria-label="Afficher/masquer la projection du cycle 3"
          />
          <label className="text-sm text-slate-300/90 hidden md:inline">Axe</label>
          <select
            className="hidden md:inline bg-slate-900/60 border border-slate-700 rounded px-2 py-1 text-sm"
            value={xMode}
            onChange={(e) => useUIStore.getState().setXMode(e.target.value as "date" | "days")}
            aria-label="Mode de l'axe X"
          >
            <option value="date">Date</option>
            <option value="days">Jours depuis creux</option>
          </select>
          <ExportPNGButton targetId="main-chart" />
        </div>
      </div>

      <div id="main-chart" className="w-full h-[260px] sm:h-[300px] md:h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="gradC1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor={SERIES_COLORS.c1} stopOpacity={0.45} />
                <stop offset="95%" stopColor={SERIES_COLORS.c1} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradC2" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor={SERIES_COLORS.c2} stopOpacity={0.45} />
                <stop offset="95%" stopColor={SERIES_COLORS.c2} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradC3" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor={SERIES_COLORS.c3} stopOpacity={0.45} />
                <stop offset="95%" stopColor={SERIES_COLORS.c3} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            {xMode === "days" ? (
              <XAxis dataKey="day" tickFormatter={(v) => `${v}j`} interval="preserveStartEnd" stroke="#64748b" />
            ) : (
              <XAxis dataKey="timestamp" tickFormatter={formatDate} interval="preserveStartEnd" stroke="#64748b" />
            )}
            <YAxis scale={yScale} domain={["auto", "auto"]} tickFormatter={(v) => `$${Math.round(v)}`} stroke="#64748b" />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#94a3b8", strokeDasharray: 4 }} />
            <Legend wrapperStyle={{ color: "#cbd5e1" }} />

            {/* Lignes de référence (exemple: sommet cycle 3 et creux projeté) */}
            {xMode === "date" && (
              <ReferenceLine x={new Date().getTime()} stroke="#94a3b8" strokeDasharray={6} label={{ value: "Aujourd\'hui", fill: "#94a3b8" }} />
            )}
            <ReferenceLine y={CYCLE_3.topPriceUsd} stroke="#60a5fa" strokeDasharray={6} label={{ value: "ATH C3", fill: "#60a5fa" }} />
            <ReferenceLine y={CYCLE_3.nextBottomPriceUsd} stroke="#f59e0b" strokeDasharray={6} label={{ value: "Creux proj.", fill: "#f59e0b" }} />

            {/* Shading bull/bear pour cycle 3 */}
            {xMode === "date" ? (
              <>
                <ReferenceArea x1={CYCLE_3.bottomDate.getTime()} x2={CYCLE_3.topDate.getTime()} y1={0} y2={Infinity} fill="#16a34a" fillOpacity={0.06} />
                <ReferenceArea x1={CYCLE_3.topDate.getTime()} x2={CYCLE_3.nextBottomDate.getTime()} y1={0} y2={Infinity} fill="#ef4444" fillOpacity={0.06} />
                {HALVINGS.map((d) => (
                  <ReferenceLine key={d.toISOString()} x={d.getTime()} stroke="#22c55e" strokeDasharray={4} label={{ value: "Halving", fill: "#22c55e" }} />
                ))}
              </>
            ) : (
              <>
                <ReferenceArea x1={0} x2={CYCLE_3.bullDays} y1={0} y2={Infinity} fill="#16a34a" fillOpacity={0.06} />
                <ReferenceArea x1={CYCLE_3.bullDays} x2={CYCLE_3.bullDays + CYCLE_3.bearDays} y1={0} y2={Infinity} fill="#ef4444" fillOpacity={0.06} />
              </>
            )}

            {/* Scrubber (ligne verticale) */}
            {xMode === "days" ? (
              <ReferenceLine x={dayOffset} stroke="#94a3b8" strokeDasharray={6} />
            ) : (
              <ReferenceLine x={CYCLE_3.bottomDate.getTime() + dayOffset * 86400000} stroke="#94a3b8" strokeDasharray={6} />
            )}

            <Area type="monotone" name="Cycle 1" dataKey="c1" stroke={SERIES_COLORS.c1} fillOpacity={1} fill="url(#gradC1)" connectNulls />
            <Area type="monotone" name="Cycle 2" dataKey="c2" stroke={SERIES_COLORS.c2} fillOpacity={1} fill="url(#gradC2)" connectNulls />
            <Area type="monotone" name="Cycle 3" dataKey="c3" stroke={SERIES_COLORS.c3} fillOpacity={1} fill="url(#gradC3)" connectNulls />
            {showBtc && btc && xMode === "date" && (
              <Line
                type="monotone"
                name="BTC réel"
                dataKey="btc"
                stroke="#fde68a"
                dot={false}
                strokeWidth={1.5}
                connectNulls
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Mobile action bar under chart */}
      <div className="md:hidden mt-2 flex items-center gap-2">
        <label className="text-xs text-slate-400">Axe</label>
        <select
          className="bg-slate-900/60 border border-slate-700 rounded px-2 py-1 text-sm"
          value={xMode}
          onChange={(e) => useUIStore.getState().setXMode(e.target.value as "date" | "days")}
          aria-label="Mode de l'axe X (mobile)"
        >
          <option value="date">Date</option>
          <option value="days">Jours</option>
        </select>
        <label className="text-xs text-slate-400">Scrub</label>
        <input
          type="range"
          min={0}
          max={getMaxCycleDays()}
          value={dayOffset}
          onChange={(e) => useUIStore.getState().setDayOffset(parseInt(e.target.value, 10))}
          className="flex-1"
          aria-label="Scrubber (jours)"
        />
        <button
          className="px-2 py-1 rounded border border-slate-700 text-slate-200 hover:bg-slate-800"
          onClick={() => {
            useUIStore.getState().setYScale(yScale === "log" ? "linear" : "log");
          }}
          aria-label="Basculer l'échelle Y log/lin"
        >
          {yScale === "log" ? "Y: log" : "Y: lin"}
        </button>
        <button
          className="px-2 py-1 rounded border border-slate-700 text-slate-200 hover:bg-slate-800"
          onClick={() => useUIStore.getState().toggleShowBtc()}
          aria-label="Afficher/masquer BTC réel"
        >
          {showBtc ? "BTC: on" : "BTC: off"}
        </button>
      </div>
      <ChartAnnotations />

      {/* Stats résumées sous le graphique */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <div className="card p-3">
          <p className="text-xs text-slate-400">Phase</p>
          <p className="text-xl font-semibold capitalize">{stats.currentPhase}</p>
        </div>
        <div className="card p-3">
          <p className="text-xs text-slate-400">Jour depuis le top</p>
          <p className="text-xl font-semibold">{stats.daysSinceTop}</p>
        </div>
        <div className="card p-3">
          <p className="text-xs text-slate-400">Jours jusqu&apos;au creux projeté</p>
          <p className="text-xl font-semibold">{stats.daysToProjectedBottom}</p>
        </div>
        <div className="card p-3 flex items-center gap-3">
          {stats.currentPhase === "bear" && (
            <div className="shrink-0">
              <RadialProgress value={stats.bearProgressPct} label={`Bear ${stats.daysSinceTop}/${stats.bearTotalDays}j`} size={72} />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-xs text-slate-400">Prix actuel estimé</p>
            <p className="text-xl font-semibold truncate">${Math.round(stats.currentPriceEstimate).toLocaleString("en-US")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}


