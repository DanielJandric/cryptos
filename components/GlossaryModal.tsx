"use client";

import { useState } from "react";
import { BookOpen, X } from "lucide-react";

const TERMS = [
  { term: "FOMO", text: "Fear Of Missing Out – peur de rater la hausse, achats tardifs." },
  { term: "Capitulation", text: "Phase de ventes massives en fin de baisse, sentiment extrême." },
  { term: "Drawdown", text: "Baisse maximale entre un pic et un creux." },
  { term: "Halving", text: "Division par deux de la récompense de minage, tous ~4 ans." },
  { term: "Log scale", text: "Échelle logarithmique qui linéarise les pourcentages de variation." },
];

export default function GlossaryModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-700 text-slate-200 hover:bg-slate-800"
        aria-label="Ouvrir le glossaire"
      >
        <BookOpen className="size-4" /> Glossaire
      </button>
      {open && (
        <div className="fixed inset-0 z-[70]">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[520px] card p-5">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Glossaire</h4>
              <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-slate-800" aria-label="Fermer">
                <X className="size-4" />
              </button>
            </div>
            <ul className="space-y-2 text-sm">
              {TERMS.map((t) => (
                <li key={t.term} className="card p-3">
                  <p className="font-medium">{t.term}</p>
                  <p className="text-slate-300/90">{t.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}


