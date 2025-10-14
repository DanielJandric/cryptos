import { AlertTriangle } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

export default function Warning() {
  const { msg } = useI18n();
  const points = [
    msg("Ce contenu est informatif, pas un conseil en investissement.", "This content is informational, not financial advice."),
    msg("Les performances passées ne préjugent pas des performances futures.", "Past performance does not guarantee future results."),
    msg("Les crypto-actifs sont volatils et peuvent entraîner une perte totale.", "Crypto-assets are volatile and can lead to total loss."),
    msg("Faites vos propres recherches (DYOR) et gérez votre risque.", "Do your own research (DYOR) and manage your risk."),
    msg("Respectez la législation locale et fiscale en vigueur.", "Comply with applicable local and tax laws."),
  ];
  return (
    <section className="card p-5 border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-orange-500/10">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="size-5 text-amber-400" />
        <h3 className="text-lg font-semibold">{msg("Avertissement", "Warning")}</h3>
      </div>
      <ul className="list-disc list-inside text-sm space-y-1">
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <p className="text-xs text-slate-400 mt-3">
        {msg(
          "L'utilisation de cette application implique l'acceptation de ces avertissements. L'auteur décline toute responsabilité.",
          "Using this app implies acceptance of these warnings. The author disclaims any liability."
        )}
      </p>
    </section>
  );
}


