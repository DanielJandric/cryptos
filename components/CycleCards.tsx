import { CYCLES } from "@/lib/data/cycles";

export default function CycleCards() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {CYCLES.map((c) => (
        <div key={c.id} className="card card-hover p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">{c.name}</h3>
            {c.id === 3 && <span className="badge-amber">En cours</span>}
          </div>
          <div className="text-sm text-slate-300/90 space-y-1">
            <p><span className="text-slate-400">Creux:</span> {c.bottomDate.toISOString().slice(0,10)} • ${c.bottomPriceUsd.toLocaleString("en-US")}</p>
            <p><span className="text-slate-400">Sommet:</span> {c.topDate.toISOString().slice(0,10)} • ${c.topPriceUsd.toLocaleString("en-US")}</p>
            <p><span className="text-slate-400">Creux suivant:</span> {c.nextBottomDate.toISOString().slice(0,10)} • ${c.nextBottomPriceUsd.toLocaleString("en-US")}{c.isProjected ? " (est.)" : ""}</p>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="card p-2">
              <p className="text-xs text-slate-400">Hausse</p>
              <p className="text-lg font-semibold">{c.bullDays}j</p>
            </div>
            <div className="card p-2">
              <p className="text-xs text-slate-400">Baisse</p>
              <p className="text-lg font-semibold">{c.bearDays}j</p>
            </div>
            <div className="card p-2">
              <p className="text-xs text-slate-400">Gain/Perte</p>
              <p className="text-lg font-semibold">+{c.gainPct}% / {c.dropPct}%</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}


