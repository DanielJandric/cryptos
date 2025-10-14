import { TrendingUp, TrendingDown, Brain, Coins, Gauge } from "lucide-react";

export default function ModelExplanation() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <div className="card p-5">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="size-5 text-emerald-400" /> Phase haussière
        </h2>
        <p className="text-sm text-slate-300/90">
          En moyenne ~1064 jours du creux au sommet. Croissance exponentielle
          alimentée par l&apos;adoption, la liquidité et l&apos;effet de rareté.
        </p>
      </div>
      <div className="card p-5">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <TrendingDown className="size-5 text-rose-400" /> Phase baissière
        </h2>
        <p className="text-sm text-slate-300/90">
          En moyenne ~364 jours du sommet au creux suivant. Décompression des
          valorisations et reflux de la liquidité.
        </p>
      </div>
      <div className="card p-5 md:col-span-2">
        <h3 className="text-lg font-semibold mb-3">Pourquoi ça fonctionne</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2"><Brain className="size-4 text-blue-400" /><span className="font-medium">Psychologie</span></div>
            <p className="text-sm text-slate-300/90">Cycles d&apos;euphorie et de peur structurent les tendances prolongées.</p>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2"><Coins className="size-4 text-emerald-400" /><span className="font-medium">Liquidité</span></div>
            <p className="text-sm text-slate-300/90">Les flux de capitaux et la macro influencent fortement l&apos;amplitude.</p>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2"><Gauge className="size-4 text-amber-400" /><span className="font-medium">Halving</span></div>
            <p className="text-sm text-slate-300/90">La réduction de l&apos;émission renforce la dynamique de rareté.</p>
          </div>
        </div>
      </div>
    </section>
  );
}


