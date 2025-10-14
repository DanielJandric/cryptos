"use client";

import { useEffect, useState } from "react";
import { TrendingDown } from "lucide-react";
import { getSummaryStats, formatMoney } from "@/lib/chartData";
import type { BtcSpot } from "@/types";
import { SCENARIO_BOTTOMS } from "@/lib/constants";
import { useUIStore } from "@/lib/store";
import { useI18n } from "@/hooks/useI18n";

export function StatusBanner() {
  const scenario = useUIStore((s) => s.scenario);
  const stats = getSummaryStats();
  const [spot, setSpot] = useState<BtcSpot | null>(null);
  const { msg } = useI18n();

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const res = await fetch("/data/spot.json", { cache: "no-store" });
        if (res.ok) setSpot(await res.json());
      } catch {}
    };
    fetchSpot();
    const id = setInterval(fetchSpot, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="card card-hover p-4 md:p-5 bg-orange-red text-white flex items-center justify-between gap-4"
      aria-label={msg("Bannière de statut du cycle", "Cycle status banner")}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/15 rounded-lg">
          <TrendingDown className="size-6 animate-float" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-wide/4 text-white/80">{msg("Phase actuelle", "Current phase")}</p>
          <p className="text-xl font-semibold">{msg("Baisse en cours", "Bear phase")}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-white/80">{msg("Spot BTC / Estimation", "Spot BTC / Estimate")}</p>
        <p className="text-2xl font-bold">
          {spot ? `$${Math.round(spot.price).toLocaleString("en-US")}` : formatMoney(stats.currentPriceEstimate)}
        </p>
        <div className="mt-2 text-xs text-white/80 flex items-center gap-2 justify-end">
          <span>{msg("Scénario:", "Scenario:")}</span>
          <select
            className="bg-white/10 border border-white/20 rounded px-2 py-1"
            value={scenario}
            onChange={(e) => useUIStore.getState().setScenario(e.target.value as "soft" | "base" | "severe")}
            aria-label={msg("Sélection du scénario", "Select scenario")}
          >
            <option value="soft">{msg("Doux", "Soft")} (~${SCENARIO_BOTTOMS.soft.toLocaleString("en-US")})</option>
            <option value="base">{msg("Base", "Base")} (~${SCENARIO_BOTTOMS.base.toLocaleString("en-US")})</option>
            <option value="severe">{msg("Sévère", "Severe")} (~${SCENARIO_BOTTOMS.severe.toLocaleString("en-US")})</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default StatusBanner;


