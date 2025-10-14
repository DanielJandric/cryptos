"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useUIStore } from "@/lib/store";

const steps = [
  { target: "theorie", title: "Théorie", text: "Découvrez le modèle 1064/364 et ses mécanismes clés." },
  { target: "graphique", title: "Graphique", text: "Comparez les cycles, activez la projection et explorez en log." },
  { target: "points", title: "Points clés", text: "Forces et limites du modèle pour une lecture équilibrée." },
];

export default function GuidedTour() {
  const show = useUIStore((s) => s.showTour);
  const toggle = useUIStore((s) => s.toggleTour);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!show) setIdx(0);
  }, [show]);

  if (!show) return null;
  const step = steps[idx];
  const el = typeof document !== "undefined" ? document.getElementById(step.target) : null;
  const rect = el?.getBoundingClientRect();
  const top = (rect?.top ?? 120) + window.scrollY - 16;
  const left = (rect?.left ?? 16) + 16;

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none">
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute" style={{ top, left }}>
        <div className="pointer-events-auto card p-4 border-blue-500/40 bg-slate-900/90 max-w-[280px]">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">{step.title}</h4>
            <button onClick={toggle} aria-label="Fermer" className="p-1 rounded hover:bg-slate-800/60">
              <X className="size-4" />
            </button>
          </div>
          <p className="text-sm text-slate-300/90">{step.text}</p>
          <div className="mt-3 flex items-center justify-between">
            <button
              className="px-3 py-1.5 rounded border border-slate-700 text-slate-200 hover:bg-slate-800/60"
              onClick={() => setIdx((v) => Math.max(0, v - 1))}
              disabled={idx === 0}
            >
              Précédent
            </button>
            {idx < steps.length - 1 ? (
              <button
                className="px-3 py-1.5 rounded border border-blue-600 bg-blue-600 text-white hover:bg-blue-500"
                onClick={() => setIdx((v) => Math.min(steps.length - 1, v + 1))}
              >
                Suivant
              </button>
            ) : (
              <button
                className="px-3 py-1.5 rounded border border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-500"
                onClick={toggle}
              >
                Terminer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


