import { AlertTriangle } from "lucide-react";

export default function Warning() {
  const points = [
    "Ce contenu est informatif, pas un conseil en investissement.",
    "Les performances passées ne préjugent pas des performances futures.",
    "Les crypto-actifs sont volatils et peuvent entraîner une perte totale.",
    "Faites vos propres recherches (DYOR) et gérez votre risque.",
    "Respectez la législation locale et fiscale en vigueur.",
  ];
  return (
    <section className="card p-5 border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-orange-500/10">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="size-5 text-amber-400" />
        <h3 className="text-lg font-semibold">Avertissement</h3>
      </div>
      <ul className="list-disc list-inside text-sm space-y-1">
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <p className="text-xs text-slate-400 mt-3">
        L&apos;utilisation de cette application implique l&apos;acceptation de ces
        avertissements. L&apos;auteur décline toute responsabilité.
      </p>
    </section>
  );
}


