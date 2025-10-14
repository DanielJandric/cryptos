"use client";

import { Info } from "lucide-react";
import { HALVINGS } from "@/lib/constants";

export default function ChartAnnotations() {
  // Simple badges sous le graphique qui scrollent vers les repères
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {HALVINGS.map((d) => (
        <span key={d.toISOString()} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded border border-emerald-500/40 text-emerald-300 bg-emerald-500/10">
          <Info className="size-3" /> Halving {d.toISOString().slice(0, 10)}
        </span>
      ))}
      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded border border-blue-500/40 text-blue-300 bg-blue-500/10">
        <Info className="size-3" /> ATH C3 (ligne bleue)
      </span>
      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded border border-amber-500/40 text-amber-300 bg-amber-500/10">
        <Info className="size-3" /> Creux projeté (ligne ambre)
      </span>
    </div>
  );
}


