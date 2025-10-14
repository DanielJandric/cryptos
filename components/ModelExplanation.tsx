import { TrendingUp, TrendingDown, Brain, Coins, Gauge } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

export default function ModelExplanation() {
  const { msg } = useI18n();
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <div className="card p-5">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="size-5 text-emerald-400" /> {msg("Phase haussière", "Bull phase")}
        </h2>
        <p className="text-sm text-slate-300/90">
          {msg(
            "En moyenne ~1064 jours du creux au sommet. Croissance exponentielle alimentée par l'adoption, la liquidité et l'effet de rareté.",
            "On average ~1064 days from bottom to top. Exponential growth driven by adoption, liquidity and scarcity dynamics."
          )}
        </p>
      </div>
      <div className="card p-5">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <TrendingDown className="size-5 text-rose-400" /> {msg("Phase baissière", "Bear phase")}
        </h2>
        <p className="text-sm text-slate-300/90">
          {msg(
            "En moyenne ~364 jours du sommet au creux suivant. Décompression des valorisations et reflux de la liquidité.",
            "On average ~364 days from the top to the next bottom. Valuation decompression and liquidity outflows."
          )}
        </p>
      </div>
      <div className="card p-5 md:col-span-2">
        <h3 className="text-lg font-semibold mb-3">{msg("Pourquoi ça fonctionne", "Why it works")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2"><Brain className="size-4 text-blue-400" /><span className="font-medium">{msg("Psychologie", "Psychology")}</span></div>
            <p className="text-sm text-slate-300/90">{msg("Cycles d'euphorie et de peur structurent les tendances prolongées.", "Euphoria and fear cycles shape extended trends.")}</p>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2"><Coins className="size-4 text-emerald-400" /><span className="font-medium">{msg("Liquidité", "Liquidity")}</span></div>
            <p className="text-sm text-slate-300/90">{msg("Les flux de capitaux et la macro influencent fortement l'amplitude.", "Capital flows and macro strongly affect amplitudes.")}</p>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2"><Gauge className="size-4 text-amber-400" /><span className="font-medium">Halving</span></div>
            <p className="text-sm text-slate-300/90">{msg("La réduction de l'émission renforce la dynamique de rareté.", "Issuance cuts strengthen scarcity dynamics.")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}


