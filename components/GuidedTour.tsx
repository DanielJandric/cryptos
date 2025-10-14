"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useUIStore } from "@/lib/store";

const steps = [
  {
    target: "theorie",
    title: "Théorie",
    text:
      "Le modèle 1064/364 alterne ~1064j de hausse et ~364j de baisse. Lisez la définition, les données historiques et les limites pour bien cadrer vos attentes.",
  },
  {
    target: "graphique",
    title: "Graphique",
    text:
      "Comparez les cycles, activez/masquez la projection, et utilisez l’export PNG. Le mode scénario dans la bannière ajuste le creux projeté.",
  },
  {
    target: "graphique",
    title: "Annotations",
    text:
      "Repères: halving (vert), ATH (bleu), creux projeté (ambre). Passez en log pour mieux lire les amplitudes fortes.",
  },
  {
    target: "points",
    title: "Points clés",
    text:
      "Retenez le TL;DR: outil utile mais non déterministe. Combinez avec d’autres indicateurs, gérez votre risque, et pensez long terme.",
  },
];

export default function GuidedTour() {
  const show = useUIStore((s) => s.showTour);
  // const toggle = useUIStore((s) => s.toggleTour);
  const setTour = useUIStore((s) => s.setTour);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!show) setIdx(0);
  }, [show]);

  // Scroll to the current step target when tour is visible
  useEffect(() => {
    if (!show) return;
    const targetId = steps[idx]?.target;
    if (!targetId) return;
    const element = document.getElementById(targetId);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [show, idx]);

  if (!show) return null;
  const step = steps[idx];
  const el = typeof document !== "undefined" ? document.getElementById(step.target) : null;
  const rect = el?.getBoundingClientRect();
  const vw = typeof window !== "undefined" ? window.innerWidth : 390;
  const vh = typeof window !== "undefined" ? window.innerHeight : 844;
  const bubbleW = 280; // approx max width
  const bubbleH = 140; // approx height
  // Use viewport coordinates (rect.top/left) to position within fixed overlay
  let top = (rect?.top ?? 120) + 16;
  let left = (rect?.left ?? 16) + 16;
  // Clamp inside viewport to avoid off-screen on iPhone
  if (top + bubbleH > vh - 16) top = Math.max(16, vh - bubbleH - 16);
  if (left + bubbleW > vw - 16) left = Math.max(16, vw - bubbleW - 16);

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none">
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute" style={{ top, left }}>
        <div className="pointer-events-auto card p-4 border-blue-500/40 bg-slate-900/90 max-w-[280px] max-h-[60vh] overflow-auto">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">{step.title}</h4>
            <button onClick={() => setTour(false)} aria-label="Fermer" className="p-1 rounded hover:bg-slate-800/60">
              <X className="size-4" />
            </button>
          </div>
          <p className="text-sm text-slate-300/90">{step.text}</p>
        </div>
      </div>
      {/* Fixed bottom controls for mobile accessibility */}
      <div className="pointer-events-auto fixed inset-x-0 bottom-0 p-3">
        <div className="mx-auto max-w-6xl flex items-center justify-between gap-2">
          <button
            className="px-3 py-2 rounded-md border border-slate-700 bg-slate-900/80 text-slate-200 hover:bg-slate-800/80"
            onClick={() => setIdx((v) => Math.max(0, v - 1))}
            disabled={idx === 0}
          >
            Précédent
          </button>
          {idx < steps.length - 1 ? (
            <button
              className="px-3 py-2 rounded-md border border-blue-600 bg-blue-600 text-white hover:bg-blue-500"
              onClick={() => setIdx((v) => Math.min(steps.length - 1, v + 1))}
            >
              Suivant
            </button>
          ) : (
            <button
              className="px-3 py-2 rounded-md border border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-500"
              onClick={() => setTour(false)}
            >
              Terminer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


