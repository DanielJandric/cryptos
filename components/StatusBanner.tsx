"use client";

import { useEffect, useState } from "react";
import { TrendingDown } from "lucide-react";
import { getSummaryStats, formatMoney } from "@/lib/chartData";
import type { BtcSpot } from "@/types";

export function StatusBanner() {
  const stats = getSummaryStats();
  const [spot, setSpot] = useState<BtcSpot | null>(null);

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
      aria-label="Bannière de statut du cycle"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/15 rounded-lg">
          <TrendingDown className="size-6 animate-float" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-wide/4 text-white/80">Phase actuelle</p>
          <p className="text-xl font-semibold">Baisse en cours</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-white/80">Spot BTC / Estimation</p>
        <p className="text-2xl font-bold">
          {spot ? `$${Math.round(spot.price).toLocaleString("en-US")}` : formatMoney(stats.currentPriceEstimate)}
        </p>
      </div>
    </div>
  );
}

export default StatusBanner;


