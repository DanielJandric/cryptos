"use client";

import { useEffect, useMemo, useState } from "react";
import type { BtcHistory, IndexHistory } from "@/types";

function pearson(xs: number[], ys: number[]): number {
  const n = Math.min(xs.length, ys.length);
  if (n <= 2) return 0;
  const x = xs.slice(xs.length - n);
  const y = ys.slice(ys.length - n);
  const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const mx = mean(x);
  const my = mean(y);
  let num = 0;
  let dx = 0;
  let dy = 0;
  for (let i = 0; i < n; i++) {
    const vx = x[i] - mx;
    const vy = y[i] - my;
    num += vx * vy;
    dx += vx * vx;
    dy += vy * vy;
  }
  const den = Math.sqrt(dx * dy) || 1;
  return num / den;
}

export default function CorrelationCard() {
  const [btc, setBtc] = useState<BtcHistory | null>(null);
  const [ndq, setNdq] = useState<IndexHistory | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const r1 = await fetch("/data/btc-history.json", { cache: "no-store" });
        if (r1.ok) setBtc(await r1.json());
        const r2 = await fetch("/data/nasdaq-history.json", { cache: "no-store" });
        if (r2.ok) setNdq(await r2.json());
      } catch {}
    };
    load();
  }, []);

  const corr30 = useMemo(() => {
    if (!btc || !ndq) return null;
    const byTs = new Map<number, number>();
    for (const p of ndq.data) byTs.set(p.t, p.c);
    const last30btc: number[] = [];
    const last30ndq: number[] = [];
    const btcData = btc.data.slice(-60); // more buffer in case of missing days
    for (let i = btcData.length - 1; i >= 0 && last30btc.length < 30; i--) {
      const p = btcData[i];
      const ndqVal = byTs.get(p.t);
      if (typeof ndqVal === "number") {
        last30btc.unshift(p.c);
        last30ndq.unshift(ndqVal);
      }
    }
    if (last30btc.length < 10) return null;
    return Math.round(pearson(last30btc, last30ndq) * 100) / 100;
  }, [btc, ndq]);

  return (
    <div className="card p-4 border-cyan-500/30">
      <p className="text-xs text-slate-400">Corrélation 30j BTC/NDQ</p>
      <p className="text-2xl font-bold text-cyan-300">{corr30 === null ? "–" : corr30}</p>
      <p className="text-xs text-slate-400 mt-1">Basé sur jours communs (UTC)</p>
    </div>
  );
}


