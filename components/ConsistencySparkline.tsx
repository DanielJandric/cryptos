"use client";

import { useMemo } from "react";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import { computeDailyConsistency } from "@/lib/chartData";

export default function ConsistencySparkline() {
  const daily = useMemo(() => computeDailyConsistency(), []);
  const data = daily.series.map((s) => ({ x: s.day, y: s.hitPct }));
  return (
    <div className="h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 6, right: 6, left: 6, bottom: 2 }}>
          <Line type="monotone" dataKey="y" stroke="#34d399" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


