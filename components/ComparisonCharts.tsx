"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getDurationStats, getPerformanceStats, getAverages } from "@/lib/chartData";

export default function ComparisonCharts() {
  const duration = getDurationStats().map((d) => ({
    name: `Cycle ${d.cycleId}`,
    Hausse: d.bullDays,
    Baisse: d.bearDays,
  }));
  const perf = getPerformanceStats().map((p) => ({
    name: `Cycle ${p.cycleId}`,
    Gain: p.gainPct,
    Perte: Math.abs(p.dropPct),
  }));
  const avg = getAverages();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <div className="card p-4">
        <h3 className="text-lg font-semibold mb-3">Durée des phases (jours)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={duration}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Hausse" fill="#22c55e" />
              <Bar dataKey="Baisse" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card p-4">
        <h3 className="text-lg font-semibold mb-3">Performance (%)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={perf}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Gain" fill="#22c55e" />
              <Bar dataKey="Perte" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card p-4 lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="card p-3 border-emerald-500/40">
          <p className="text-xs text-slate-400">Durée moyenne hausse</p>
          <p className="text-2xl font-bold">{avg.avgBull}j</p>
        </div>
        <div className="card p-3 border-rose-500/40">
          <p className="text-xs text-slate-400">Durée moyenne baisse</p>
          <p className="text-2xl font-bold">{avg.avgBear}j</p>
        </div>
        <div className="card p-3 border-emerald-500/40">
          <p className="text-xs text-slate-400">Gain moyen</p>
          <p className="text-2xl font-bold">+{avg.avgGain}%</p>
        </div>
        <div className="card p-3 border-amber-500/40">
          <p className="text-xs text-slate-400">Perte moyenne</p>
          <p className="text-2xl font-bold">{avg.avgDrop}%</p>
        </div>
      </div>
    </section>
  );
}


