import HitRateCard from "./HitRateCard";
import { computeModelHitRate } from "@/lib/chartData";

export default function HitRateSection() {
  const hr = computeModelHitRate();
  return (
    <section className="flex flex-col gap-3">
      <HitRateCard />
      <div className="card p-4">
        <h4 className="font-semibold mb-2">Détails</h4>
        <ul className="text-sm list-disc list-inside text-slate-300/90 space-y-1">
          <li>Cycles considérés: {hr.cycles} (historiques)</li>
          <li>Critère d&apos;accord: erreur ≤ 2% de la durée attendue (bull 1064 / bear 364)</li>
          <li>Hits bull: {hr.bullDurationHits}/{hr.cycles} • erreur moyenne {hr.bullAvgErrorDays}j</li>
          <li>Hits bear: {hr.bearDurationHits}/{hr.cycles} • erreur moyenne {hr.bearAvgErrorDays}j</li>
          <li>Note: le cycle en cours n&apos;est pas pris en compte dans ce calcul.</li>
        </ul>
      </div>
    </section>
  );
}


