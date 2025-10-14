import { CheckCircle2, XCircle } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

export default function KeyTakeaways() {
  const { msg } = useI18n();
  const strengths = [
    {
      title: msg("Robuste historiquement", "Historically robust"),
      desc: msg(
        "Deux cycles complets confirment la structure 1064/364.",
        "Two full cycles confirm the 1064/364 structure."
      ),
    },
    {
      title: msg("Lisible", "Readable"),
      desc: msg(
        "Cadre simple pour cadrer les attentes et la gestion du risque.",
        "Simple framework to guide expectations and risk management."
      ),
    },
    {
      title: msg("Complémentaire", "Complementary"),
      desc: msg(
        "S'articule avec le halving et les flux de liquidité.",
        "Aligns with halving and liquidity flows."
      ),
    },
  ];
  const limits = [
    {
      title: msg("Échantillon réduit", "Limited sample"),
      desc: msg("Seulement quelques occurrences (n bas).", "Few observations (low n)."),
    },
    {
      title: msg("Chocs exogènes", "Exogenous shocks"),
      desc: msg(
        "Risque de déviation en cas d'événements macro imprévus.",
        "Deviation risk in unforeseen macro events."
      ),
    },
    {
      title: msg("Projection incertaine", "Uncertain projection"),
      desc: msg(
        "Les prix projetés ne sont pas des garanties.",
        "Projected prices are not guarantees."
      ),
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <div className="card p-5 border-emerald-500/40">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><CheckCircle2 className="size-5 text-emerald-400" /> {msg("Forces du modèle", "Model strengths")}</h3>
        <ul className="space-y-2 text-sm">
          {strengths.map((s) => (
            <li key={s.title} className="flex items-start gap-2">
              <span className="mt-1 size-2 rounded-full bg-emerald-400" />
              <div>
                <p className="font-medium">{s.title}</p>
                <p className="text-slate-300/90">{s.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="card p-5 border-rose-500/40">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><XCircle className="size-5 text-rose-400" /> {msg("Limites du modèle", "Model limitations")}</h3>
        <ul className="space-y-2 text-sm">
          {limits.map((s) => (
            <li key={s.title} className="flex items-start gap-2">
              <span className="mt-1 size-2 rounded-full bg-rose-400" />
              <div>
                <p className="font-medium">{s.title}</p>
                <p className="text-slate-300/90">{s.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}


