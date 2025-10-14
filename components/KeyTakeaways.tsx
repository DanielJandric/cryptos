import { CheckCircle2, XCircle } from "lucide-react";

export default function KeyTakeaways() {
  const strengths = [
    {
      title: "Robuste historiquement",
      desc: "Deux cycles complets confirment la structure 1064/364.",
    },
    {
      title: "Lisible",
      desc: "Cadre simple pour cadrer les attentes et la gestion du risque.",
    },
    {
      title: "Complémentaire",
      desc: "S'articule avec le halving et les flux de liquidité.",
    },
  ];
  const limits = [
    {
      title: "Échantillon réduit",
      desc: "Seulement quelques occurrences (n bas).",
    },
    {
      title: "Chocs exogènes",
      desc: "Risque de déviation en cas d'événements macro imprévus.",
    },
    {
      title: "Projection incertaine",
      desc: "Les prix projetés ne sont pas des garanties.",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <div className="card p-5 border-emerald-500/40">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><CheckCircle2 className="size-5 text-emerald-400" /> Forces du modèle</h3>
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
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><XCircle className="size-5 text-rose-400" /> Limites du modèle</h3>
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


